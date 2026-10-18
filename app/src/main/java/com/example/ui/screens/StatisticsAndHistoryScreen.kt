package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AssignmentTurnedIn
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Inventory
import androidx.compose.material.icons.filled.LocalAtm
import androidx.compose.material.icons.filled.Recycling
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.ExchangeItem
import com.example.model.TransactionLog
import com.example.model.TransactionType
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary
import com.example.util.Formatters

@Composable
fun StatisticsAndHistoryScreen(
    items: List<ExchangeItem>,
    logs: List<TransactionLog>,
    modifier: Modifier = Modifier
) {
    val totalItems = items.size
    val totalReuses = items.sumOf { it.reuseCount }
    val giftCount = items.count { it.transactionType == TransactionType.GIFT }
    val rentCount = items.count { it.transactionType == TransactionType.RENT }
    val saleCount = items.count { it.transactionType == TransactionType.SALE }
    val exchangeCount = items.count { it.transactionType == TransactionType.EXCHANGE }
    val consignmentCount = items.count { it.transactionType == TransactionType.CONSIGNMENT }

    val estimatedSavingMoney = items.sumOf { (it.price.coerceAtLeast(35000L)) * it.reuseCount }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        DemoNoticeBanner()

        // Screen Title
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(AlphaGreenContainer, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.BarChart,
                    contentDescription = null,
                    tint = AlphaGreenPrimary,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(
                    text = "Bảng Theo Dõi Giao Dịch & Thống Kê",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
                Text(
                    text = "Dữ liệu tái sử dụng tri thức và nhật ký hoạt động K52",
                    fontSize = 12.sp,
                    color = Color(0xFF64748B)
                )
            }
        }

        // Green Impact Spotlight Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(14.dp),
            colors = CardDefaults.cardColors(containerColor = AlphaGreenDark)
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Eco,
                        contentDescription = "Green Impact",
                        tint = Color(0xFF86EFAC),
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "CHỈ SỐ HỌC ĐƯỜNG XANH K52",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = Color(0xFF86EFAC),
                        letterSpacing = 1.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(
                            text = "$totalReuses lần",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = "Vòng tái sử dụng đồ dùng",
                            fontSize = 11.sp,
                            color = Color(0xFFA7F3D0)
                        )
                    }

                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = Formatters.formatVnd(estimatedSavingMoney),
                            fontSize = 20.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFFDE047)
                        )
                        Text(
                            text = "Ước tính học sinh tiết kiệm",
                            fontSize = 11.sp,
                            color = Color(0xFFA7F3D0)
                        )
                    }
                }
            }
        }

        // 4 KPI Summary Cards
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            MetricBox(
                icon = Icons.Default.Inventory,
                number = "$totalItems",
                label = "Vật phẩm lưu kho",
                color = AlphaGreenPrimary,
                modifier = Modifier.weight(1f)
            )
            MetricBox(
                icon = Icons.Default.CheckCircle,
                number = "$giftCount",
                label = "Món quà tặng 0đ",
                color = Color(0xFF059669),
                modifier = Modifier.weight(1f)
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            MetricBox(
                icon = Icons.Default.Recycling,
                number = "$rentCount",
                label = "Lượt cho thuê",
                color = Color(0xFF2563EB),
                modifier = Modifier.weight(1f)
            )
            MetricBox(
                icon = Icons.Default.AssignmentTurnedIn,
                number = "${logs.size}",
                label = "Nhật ký giao dịch",
                color = Color(0xFF7C3AED),
                modifier = Modifier.weight(1f)
            )
        }

        // Transaction Type Distribution
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "Cơ cấu hình thức giao dịch",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
                Spacer(modifier = Modifier.height(12.dp))

                TypeProgressRow(label = "Tặng 0đ (Miễn phí)", count = giftCount, total = totalItems, color = Color(0xFF059669))
                TypeProgressRow(label = "Cho thuê / Mượn", count = rentCount, total = totalItems, color = Color(0xFF2563EB))
                TypeProgressRow(label = "Bán lại học sinh", count = saleCount, total = totalItems, color = Color(0xFFD97706))
                TypeProgressRow(label = "Trao đổi vật phẩm", count = exchangeCount, total = totalItems, color = Color(0xFF7C3AED))
                TypeProgressRow(label = "Ký gửi tại trạm K52", count = consignmentCount, total = totalItems, color = Color(0xFF0F766E))
            }
        }

        // Full Transaction History Table
        Text(
            text = "Lịch sử các giao dịch gần nhất (${logs.size})",
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF0F172A)
        )

        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            logs.forEach { log ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                color = Color(log.actionType.badgeColorHex).copy(alpha = 0.12f),
                                shape = RoundedCornerShape(4.dp)
                            ) {
                                Text(
                                    text = log.actionType.displayName,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(log.actionType.badgeColorHex),
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }

                            Text(
                                text = log.timestamp,
                                fontSize = 11.sp,
                                color = Color(0xFF94A3B8)
                            )
                        }

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(
                            text = "[${log.itemCode}] ${log.itemName}",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = Color(0xFF1E293B)
                        )

                        Text(
                            text = log.notes,
                            fontSize = 11.sp,
                            color = Color(0xFF475569)
                        )

                        Spacer(modifier = Modifier.height(2.dp))

                        Text(
                            text = "Người ghi nhận: ${log.actor}",
                            fontSize = 10.sp,
                            color = Color(0xFF64748B)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
private fun MetricBox(
    icon: ImageVector,
    number: String,
    label: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        color = Color.White,
        shape = RoundedCornerShape(10.dp),
        shadowElevation = 0.5.dp,
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Icon(imageVector = icon, contentDescription = null, tint = color, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.height(6.dp))
            Text(text = number, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
            Text(text = label, fontSize = 11.sp, color = Color(0xFF64748B))
        }
    }
}

@Composable
private fun TypeProgressRow(
    label: String,
    count: Int,
    total: Int,
    color: Color
) {
    val progress = if (total > 0) count.toFloat() / total else 0f
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = label, fontSize = 12.sp, color = Color(0xFF334155))
            Text(text = "$count món (${(progress * 100).toInt()}%)", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = color)
        }
        Spacer(modifier = Modifier.height(3.dp))
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp),
            color = color,
            trackColor = Color(0xFFF1F5F9)
        )
    }
}
