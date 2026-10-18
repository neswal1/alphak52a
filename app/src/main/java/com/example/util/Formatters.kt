package com.example.util

import java.text.DecimalFormat
import java.text.DecimalFormatSymbols
import java.util.Locale

object Formatters {
    private val currencyFormatter: DecimalFormat by lazy {
        val symbols = DecimalFormatSymbols(Locale("vi", "VN")).apply {
            groupingSeparator = '.'
        }
        DecimalFormat("#,###", symbols)
    }

    fun formatVnd(amount: Long): String {
        return if (amount <= 0L) {
            "0 ₫ (Miễn phí / Tặng)"
        } else {
            "${currencyFormatter.format(amount)} ₫"
        }
    }

    fun formatRentPrice(amount: Long): String {
        return if (amount <= 0L) {
            "Miễn phí"
        } else {
            "${currencyFormatter.format(amount)} ₫ / tuần"
        }
    }
}
