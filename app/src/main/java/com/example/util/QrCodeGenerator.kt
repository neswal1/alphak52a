package com.example.util

/**
 * Pure Kotlin QR Code Matrix Generator (Version 1 & Version 2)
 * Creates valid 2D bit matrices readable by standard QR scanners.
 * Strictly encodes ONLY the item identifier code (e.g., "K52-SGK-01" or "ALPHA-K52:K52-SGK-01").
 * Contains ZERO personal student data.
 */
object QrCodeGenerator {

    data class QrMatrix(val size: Int, val modules: Array<BooleanArray>)

    fun generate(data: String): QrMatrix {
        val payload = if (data.startsWith("K52-") || data.startsWith("ALPHA-K52:")) {
            data
        } else {
            "ALPHA-K52:$data"
        }

        // For payloads under 14 bytes, Version 1 (21x21, EC Level M: 16 data codewords, 10 EC codewords)
        // For payloads under 26 bytes, Version 2 (25x25, EC Level M: 28 data codewords, 16 EC codewords)
        val version = if (payload.length <= 14) 1 else 2
        val size = 17 + 4 * version
        val matrix = Array(size) { BooleanArray(size) { false } }
        val reserved = Array(size) { BooleanArray(size) { false } }

        // 1. Finder patterns (top-left, top-right, bottom-left)
        placeFinderPattern(matrix, reserved, 0, 0)
        placeFinderPattern(matrix, reserved, size - 7, 0)
        placeFinderPattern(matrix, reserved, 0, size - 7)

        // 2. Alignment pattern for Version 2 (center at 18, 18)
        if (version >= 2) {
            placeAlignmentPattern(matrix, reserved, 18, 18)
        }

        // 3. Timing patterns
        for (i in 8 until size - 8) {
            val isDark = (i % 2 == 0)
            if (!reserved[6][i]) {
                matrix[6][i] = isDark
                reserved[6][i] = true
            }
            if (!reserved[i][6]) {
                matrix[i][6] = isDark
                reserved[i][6] = true
            }
        }

        // 4. Reserve format info areas
        for (i in 0..8) {
            reserved[8][i] = true
            reserved[i][8] = true
            reserved[8][size - 1 - i] = true
            reserved[size - 1 - i][8] = true
        }
        // Dark module
        matrix[4 * version + 9][8] = true
        reserved[4 * version + 9][8] = true

        // 5. Build Byte Mode bitstream
        val bits = mutableListOf<Boolean>()
        // Mode indicator: 0100 (Byte mode)
        addBits(bits, 0b0100, 4)
        // Character count indicator (8 bits for V1-V9 in byte mode)
        val bytes = payload.toByteArray(Charsets.ISO_8859_1)
        addBits(bits, bytes.size, 8)
        // Data bytes
        for (b in bytes) {
            addBits(bits, b.toInt() and 0xFF, 8)
        }
        // Terminator (up to 4 bits)
        val totalDataCodewords = if (version == 1) 16 else 28
        val totalDataBits = totalDataCodewords * 8
        val termLen = (totalDataBits - bits.size).coerceIn(0, 4)
        addBits(bits, 0, termLen)

        // Pad to byte boundary
        while (bits.size % 8 != 0) {
            bits.add(false)
        }

        // Pad codewords (0xEC, 0x11)
        val padBytes = intArrayOf(0xEC, 0x11)
        var padIndex = 0
        while (bits.size < totalDataBits) {
            addBits(bits, padBytes[padIndex % 2], 8)
            padIndex++
        }

        // Convert bits to data codewords
        val dataCodewords = IntArray(totalDataCodewords)
        for (i in 0 until totalDataCodewords) {
            var byteVal = 0
            for (j in 0 until 8) {
                if (bits[i * 8 + j]) {
                    byteVal = byteVal or (1 shl (7 - j))
                }
            }
            dataCodewords[i] = byteVal
        }

        // 6. Calculate Reed-Solomon Error Correction
        val ecCodewordsCount = if (version == 1) 10 else 16
        val ecCodewords = calculateReedSolomon(dataCodewords, ecCodewordsCount)

        // Combine all codewords
        val allCodewords = dataCodewords + ecCodewords
        val allBits = mutableListOf<Boolean>()
        for (cw in allCodewords) {
            addBits(allBits, cw, 8)
        }

        // 7. Place data bits in zigzag upward/downward
        var bitIdx = 0
        var upward = true
        var x = size - 1
        while (x > 0) {
            if (x == 6) x-- // Skip vertical timing column
            val yRange = if (upward) (size - 1 downTo 0) else (0 until size)
            for (y in yRange) {
                for (colOffset in 0..1) {
                    val currX = x - colOffset
                    if (!reserved[y][currX]) {
                        val bit = if (bitIdx < allBits.size) allBits[bitIdx++] else false
                        // Mask pattern 0: (row + col) % 2 == 0
                        val mask = (y + currX) % 2 == 0
                        matrix[y][currX] = bit xor mask
                    }
                }
            }
            upward = !upward
            x -= 2
        }

        // 8. Place Format Information (EC Level M = 00, Mask 0 = 000 => 00000 => with BCH & mask 0x5412 = 101010000010010)
        val formatBits = intArrayOf(1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0)
        applyFormatInfo(matrix, size, formatBits)

        return QrMatrix(size, matrix)
    }

    private fun addBits(list: MutableList<Boolean>, value: Int, count: Int) {
        for (i in count - 1 downTo 0) {
            list.add(((value shr i) and 1) == 1)
        }
    }

    private fun placeFinderPattern(m: Array<BooleanArray>, res: Array<BooleanArray>, startX: Int, startY: Int) {
        for (y in -1..7) {
            for (x in -1..7) {
                val px = startX + x
                val py = startY + y
                if (px in m.indices && py in m.indices) {
                    res[py][px] = true
                    if (x in 0..6 && y in 0..6) {
                        m[py][px] = (x == 0 || x == 6 || y == 0 || y == 6 || (x in 2..4 && y in 2..4))
                    } else {
                        m[py][px] = false
                    }
                }
            }
        }
    }

    private fun placeAlignmentPattern(m: Array<BooleanArray>, res: Array<BooleanArray>, centerX: Int, centerY: Int) {
        for (y in -2..2) {
            for (x in -2..2) {
                val px = centerX + x
                val py = centerY + y
                res[py][px] = true
                m[py][px] = (x == -2 || x == 2 || y == -2 || y == 2 || (x == 0 && y == 0))
            }
        }
    }

    private fun applyFormatInfo(m: Array<BooleanArray>, size: Int, fmt: IntArray) {
        // Top-left
        val coordsTopLeft = arrayOf(
            Pair(8, 0), Pair(8, 1), Pair(8, 2), Pair(8, 3), Pair(8, 4), Pair(8, 5),
            Pair(8, 7), Pair(8, 8), Pair(7, 8), Pair(5, 8), Pair(4, 8), Pair(3, 8),
            Pair(2, 8), Pair(1, 8), Pair(0, 8)
        )
        for (i in 0 until 15) {
            val bit = fmt[i] == 1
            val (y, x) = coordsTopLeft[i]
            m[y][x] = bit
        }

        // Split between bottom-left and top-right
        for (i in 0..6) {
            m[size - 1 - i][8] = (fmt[i] == 1)
        }
        for (i in 7..14) {
            m[8][size - 15 + i] = (fmt[i] == 1)
        }
    }

    // GF(256) arithmetic for Reed-Solomon Error Correction
    private val expTable = IntArray(256)
    private val logTable = IntArray(256)

    init {
        var x = 1
        for (i in 0 until 255) {
            expTable[i] = x
            logTable[x] = i
            x = x shl 1
            if ((x and 0x100) != 0) {
                x = x xor 0x11D
            }
        }
        expTable[255] = expTable[0]
    }

    private fun gfMultiply(x: Int, y: Int): Int {
        if (x == 0 || y == 0) return 0
        return expTable[(logTable[x] + logTable[y]) % 255]
    }

    private fun calculateReedSolomon(data: IntArray, ecCount: Int): IntArray {
        // Generator polynomial for ecCount roots
        var gen = intArrayOf(1)
        for (i in 0 until ecCount) {
            val root = expTable[i]
            val nextGen = IntArray(gen.size + 1)
            for (j in gen.indices) {
                nextGen[j] = nextGen[j] xor gen[j]
                nextGen[j + 1] = nextGen[j + 1] xor gfMultiply(gen[j], root)
            }
            gen = nextGen
        }

        // Remainder calculation (division)
        val remainder = IntArray(ecCount)
        for (datum in data) {
            val factor = datum xor remainder[0]
            System.arraycopy(remainder, 1, remainder, 0, ecCount - 1)
            remainder[ecCount - 1] = 0
            if (factor != 0) {
                for (j in 0 until ecCount) {
                    remainder[j] = remainder[j] xor gfMultiply(gen[j + 1], factor)
                }
            }
        }
        return remainder
    }
}
