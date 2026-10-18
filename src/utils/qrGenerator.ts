/**
 * Standalone QR Code Generator for Item Codes (Strictly item ID only - Zero personal data)
 */
export interface QrMatrix {
  size: number;
  modules: boolean[][];
}

// GF(256) tables
const expTable: number[] = new Array(256);
const logTable: number[] = new Array(256);

let x = 1;
for (let i = 0; i < 255; i++) {
  expTable[i] = x;
  logTable[x] = i;
  x <<= 1;
  if (x & 0x100) {
    x ^= 0x11d;
  }
}
expTable[255] = expTable[0];

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return expTable[(logTable[a] + logTable[b]) % 255];
}

function calculateReedSolomon(data: number[], ecCount: number): number[] {
  let gen = [1];
  for (let i = 0; i < ecCount; i++) {
    const root = expTable[i];
    const nextGen = new Array(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      nextGen[j] ^= gen[j];
      nextGen[j + 1] ^= gfMultiply(gen[j], root);
    }
    gen = nextGen;
  }

  const remainder = new Array(ecCount).fill(0);
  for (const datum of data) {
    const factor = datum ^ remainder[0];
    for (let j = 0; j < ecCount - 1; j++) {
      remainder[j] = remainder[j + 1];
    }
    remainder[ecCount - 1] = 0;
    if (factor !== 0) {
      for (let j = 0; j < ecCount; j++) {
        remainder[j] ^= gfMultiply(gen[j + 1], factor);
      }
    }
  }
  return remainder;
}

export function generateQrMatrix(data: string): QrMatrix {
  const payload = data.trim();
  const version = payload.length <= 14 ? 1 : 2;
  const size = 17 + 4 * version;

  const matrix: boolean[][] = Array.from({ length: size }, () =>
    new Array(size).fill(false)
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    new Array(size).fill(false)
  );

  function placeFinder(startX: number, startY: number) {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const px = startX + x;
        const py = startY + y;
        if (px >= 0 && px < size && py >= 0 && py < size) {
          reserved[py][px] = true;
          if (x >= 0 && x <= 6 && y >= 0 && y <= 6) {
            matrix[py][px] =
              x === 0 ||
              x === 6 ||
              y === 0 ||
              y === 6 ||
              (x >= 2 && x <= 4 && y >= 2 && y <= 4);
          } else {
            matrix[py][px] = false;
          }
        }
      }
    }
  }

  placeFinder(0, 0);
  placeFinder(size - 7, 0);
  placeFinder(0, size - 7);

  if (version >= 2) {
    const cx = 18;
    const cy = 18;
    for (let y = -2; y <= 2; y++) {
      for (let x = -2; x <= 2; x++) {
        reserved[cy + y][cx + x] = true;
        matrix[cy + y][cx + x] =
          x === -2 || x === 2 || y === -2 || y === 2 || (x === 0 && y === 0);
      }
    }
  }

  for (let i = 8; i < size - 8; i++) {
    const isDark = i % 2 === 0;
    if (!reserved[6][i]) {
      matrix[6][i] = isDark;
      reserved[6][i] = true;
    }
    if (!reserved[i][6]) {
      matrix[i][6] = isDark;
      reserved[i][6] = true;
    }
  }

  for (let i = 0; i <= 8; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
  matrix[4 * version + 9][8] = true;
  reserved[4 * version + 9][8] = true;

  const bits: boolean[] = [];
  function addBits(val: number, count: number) {
    for (let i = count - 1; i >= 0; i--) {
      bits.push(((val >> i) & 1) === 1);
    }
  }

  // Byte mode 0100
  addBits(0b0100, 4);
  const bytes = new TextEncoder().encode(payload);
  addBits(bytes.length, 8);
  for (const b of bytes) {
    addBits(b, 8);
  }

  const totalDataCodewords = version === 1 ? 16 : 28;
  const totalDataBits = totalDataCodewords * 8;
  const termLen = Math.min(4, Math.max(0, totalDataBits - bits.length));
  addBits(0, termLen);

  while (bits.length % 8 !== 0) {
    bits.push(false);
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < totalDataBits) {
    addBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const dataCodewords: number[] = [];
  for (let i = 0; i < totalDataCodewords; i++) {
    let bVal = 0;
    for (let j = 0; j < 8; j++) {
      if (bits[i * 8 + j]) {
        bVal |= 1 << (7 - j);
      }
    }
    dataCodewords.push(bVal);
  }

  const ecCount = version === 1 ? 10 : 16;
  const ecCodewords = calculateReedSolomon(dataCodewords, ecCount);
  const allCodewords = [...dataCodewords, ...ecCodewords];

  const allBits: boolean[] = [];
  for (const cw of allCodewords) {
    for (let i = 7; i >= 0; i--) {
      allBits.push(((cw >> i) & 1) === 1);
    }
  }

  let bitIdx = 0;
  let upward = true;
  let currX = size - 1;

  while (currX > 0) {
    if (currX === 6) currX--;
    const yStart = upward ? size - 1 : 0;
    const yEnd = upward ? -1 : size;
    const yStep = upward ? -1 : 1;

    for (let y = yStart; y !== yEnd; y += yStep) {
      for (let col = 0; col < 2; col++) {
        const xPos = currX - col;
        if (!reserved[y][xPos]) {
          const bit = bitIdx < allBits.length ? allBits[bitIdx++] : false;
          const mask = (y + xPos) % 2 === 0;
          matrix[y][xPos] = bit !== mask;
        }
      }
    }
    upward = !upward;
    currX -= 2;
  }

  const fmt = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
  const coordsTopLeft = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
    [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8],
    [2, 8], [1, 8], [0, 8]
  ];
  for (let i = 0; i < 15; i++) {
    const [y, x] = coordsTopLeft[i];
    matrix[y][x] = fmt[i] === 1;
  }
  for (let i = 0; i <= 6; i++) {
    matrix[size - 1 - i][8] = fmt[i] === 1;
  }
  for (let i = 7; i < 15; i++) {
    matrix[8][size - 15 + i] = fmt[i] === 1;
  }

  return { size, modules: matrix };
}
