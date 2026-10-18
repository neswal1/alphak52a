package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme =
  darkColorScheme(
    primary = AlphaGreenLight,
    onPrimary = Color.Black,
    primaryContainer = AlphaGreenDark,
    onPrimaryContainer = Color.White,
    secondary = AlphaAccentTeal,
    background = DarkGreenBackground,
    surface = DarkGreenSurface,
    surfaceVariant = DarkGreenSurfaceVariant,
    onBackground = Color.White,
    onSurface = Color.White
  )

private val LightColorScheme =
  lightColorScheme(
    primary = AlphaGreenPrimary,
    onPrimary = Color.White,
    primaryContainer = AlphaGreenContainer,
    onPrimaryContainer = AlphaGreenOnContainer,
    secondary = AlphaGreenDark,
    onSecondary = Color.White,
    tertiary = AlphaAccentTeal,
    background = AlphaBackgroundLight,
    surface = AlphaSurfaceLight,
    surfaceVariant = AlphaSurfaceVariant,
    onBackground = AlphaTextPrimary,
    onSurface = AlphaTextPrimary,
    outline = AlphaBorderLight
  )

@Composable
fun MyApplicationTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  dynamicColor: Boolean = false, // Keep consistent green brand identity
  content: @Composable () -> Unit,
) {
  val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

  MaterialTheme(colorScheme = colorScheme, typography = Typography, content = content)
}
