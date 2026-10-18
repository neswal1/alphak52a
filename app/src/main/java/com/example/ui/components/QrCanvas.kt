package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.example.util.QrCodeGenerator

@Composable
fun QrCanvas(
    payload: String,
    modifier: Modifier = Modifier,
    sizeDp: Dp = 200.dp,
    darkColor: Color = Color(0xFF132218),
    lightColor: Color = Color.White
) {
    val qrMatrix = remember(payload) {
        QrCodeGenerator.generate(payload)
    }

    Box(
        modifier = modifier
            .size(sizeDp)
            .background(lightColor, RoundedCornerShape(12.dp))
            .border(1.dp, Color(0xFFD6E6DA), RoundedCornerShape(12.dp))
            .padding(14.dp),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.size(sizeDp - 28.dp)) {
            val moduleCount = qrMatrix.size
            val moduleSizePx = size.width / moduleCount

            // Background
            drawRect(color = lightColor)

            // Draw dark modules
            for (row in 0 until moduleCount) {
                for (col in 0 until moduleCount) {
                    if (qrMatrix.modules[row][col]) {
                        drawRect(
                            color = darkColor,
                            topLeft = Offset(col * moduleSizePx, row * moduleSizePx),
                            size = Size(moduleSizePx, moduleSizePx)
                        )
                    }
                }
            }
        }
    }
}
