package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.AutoStories
import androidx.compose.material.icons.filled.Checkroom
import androidx.compose.material.icons.filled.Handshake
import androidx.compose.material.icons.filled.Inventory
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.filled.QrCodeScanner
import androidx.compose.material.icons.filled.Recycling
import androidx.compose.material.icons.filled.Savings
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.VolunteerActivism
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.ExchangeItem
import com.example.model.ItemCategory
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.components.ItemCard
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary

@Composable
fun HomeScreen(
    items: List<ExchangeItem>,
    onNavigateToWarehouse: () -> Unit,
    onNavigateToRegister: () -> Unit,
    onSelectCategory: (ItemCategory) -> Unit,
    onViewDetail: (ExchangeItem) -> Unit,
    onShowQr: (ExchangeItem) -> Unit,
    modifier: Modifier = Modifier
) {
    val totalItems = items.size
    val totalReuses = items.sumOf { it.reuseCount }
    val giftItemsCount = items.count { it.transactionType == com.example.model.TransactionType.GIFT }
    val estimatedSavings = items.sumOf { (it.price.coerceAtLeast(40000L)) * it.reuseCount }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        // Prominent Demo Banner
        DemoNoticeBanner()

        Spacer(modifier = Modifier.height(14.dp))

        // Hero Project Intro Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = AlphaGreenDark),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier
                    .background(
                        Brush.verticalGradient(
                            listOf(AlphaGreenDark, Color(0xFF0A4023))
                        )
                    )
                    .padding(20.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(Color.White.copy(alpha = 0.2f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Psychology,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(26.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = "ALPHA - K52",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White,
                            letterSpacing = 1.sp
                        )
                        Text(
                            text = "Trạm giao dịch tri thức & vật phẩm học tập",
                            fontSize = 12.sp,
                            color = Color(0xFFA7F3D0)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                Text(
                    text = "Không gian chia sẻ, trao đổi, cho thuê và tặng sách vở, dụng cụ học tập của học sinh K52. Tái sử dụng tri thức – Lan tỏa tinh thần học đường xanh!",
                    fontSize = 13.sp,
                    color = Color(0xFFE2E8F0),
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Button(
                        onClick = onNavigateToWarehouse,
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color.White,
                            contentColor = AlphaGreenDark
                        ),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(Icons.Default.Search, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(text = "Khám phá kho", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }

                    OutlinedButton(
                        onClick = onNavigateToRegister,
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color.White.copy(alpha = 0.8f)),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(Icons.Default.AddCircle, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(text = "Đăng ký gửi đồ", fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Quick Impact Stats
        Text(
            text = "Tác động tái sử dụng học đường K52",
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF0F172A)
        )

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            StatCard(
                icon = Icons.Default.Inventory,
                number = "$totalItems",
                label = "Món trong kho",
                iconTint = AlphaGreenPrimary,
                modifier = Modifier.weight(1f)
            )
            StatCard(
                icon = Icons.Default.Recycling,
                number = "$totalReuses",
                label = "Vòng tái sử dụng",
                iconTint = Color(0xFF059669),
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            StatCard(
                icon = Icons.Default.VolunteerActivism,
                number = "$giftItemsCount",
                label = "Vật phẩm tặng 0đ",
                iconTint = Color(0xFF7C3AED),
                modifier = Modifier.weight(1f)
            )
            StatCard(
                icon = Icons.Default.Savings,
                number = "${estimatedSavings / 1000}k ₫",
                label = "Tiết kiệm ước tính",
                iconTint = Color(0xFFD97706),
                modifier = Modifier.weight(1f)
            )
        }

        Spacer(modifier = Modifier.height(22.dp))

        // Categories Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Danh mục vật phẩm",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A)
            )
            Text(
                text = "Xem tất cả",
                fontSize = 12.sp,
                color = AlphaGreenPrimary,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.clickable { onNavigateToWarehouse() }
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Category Cards Grid (Horizontal scrollable or grid)
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(ItemCategory.values().toList()) { cat ->
                CategoryTile(
                    category = cat,
                    itemCount = items.count { it.category == cat },
                    onClick = {
                        onSelectCategory(cat)
                        onNavigateToWarehouse()
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Highlight Items
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Vật phẩm mới lên trạm",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A)
            )
            Text(
                text = "Toàn bộ kho (${items.size})",
                fontSize = 12.sp,
                color = AlphaGreenPrimary,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.clickable { onNavigateToWarehouse() }
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items.take(4).forEach { item ->
                ItemCard(
                    item = item,
                    onViewDetail = onViewDetail,
                    onShowQr = onShowQr
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Locker Guide Card
        Surface(
            color = Color(0xFFF1F5F9),
            shape = RoundedCornerShape(12.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCBD5E1)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.QrCodeScanner,
                        contentDescription = null,
                        tint = AlphaGreenDark,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Quy trình Trạm giao dịch K52:",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1E293B)
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "1. Học sinh đăng ký tặng/bán/thuê/đổi/ký gửi trên ứng dụng.\n" +
                           "2. Ban quản trị trạm duyệt và dán tem mã QR định danh lên vật phẩm.\n" +
                           "3. Đồ được đặt an toàn tại Tủ đồ K52 (Sảnh Nhà A). Học sinh đến nhận đồ nhanh chóng mà không cần lộ thông tin cá nhân.",
                    fontSize = 11.sp,
                    color = Color(0xFF475569),
                    lineHeight = 16.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

@Composable
private fun StatCard(
    icon: ImageVector,
    number: String,
    label: String,
    iconTint: Color,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        color = Color.White,
        shape = RoundedCornerShape(12.dp),
        shadowElevation = 1.dp,
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .background(iconTint.copy(alpha = 0.12f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(imageVector = icon, contentDescription = null, tint = iconTint, modifier = Modifier.size(20.dp))
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(text = number, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                Text(text = label, fontSize = 11.sp, color = Color(0xFF64748B))
            }
        }
    }
}

@Composable
private fun CategoryTile(
    category: ItemCategory,
    itemCount: Int,
    onClick: () -> Unit
) {
    Surface(
        modifier = Modifier
            .width(135.dp)
            .clickable { onClick() },
        color = Color.White,
        shape = RoundedCornerShape(12.dp),
        shadowElevation = 1.dp,
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(AlphaGreenContainer, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = when (category) {
                        ItemCategory.TEXTBOOK -> Icons.Default.MenuBook
                        ItemCategory.REFERENCE_BOOK -> Icons.Default.AutoStories
                        ItemCategory.EXAM_DOCUMENT -> Icons.Default.Psychology
                        ItemCategory.STUDY_TOOL -> Icons.Default.Inventory
                        ItemCategory.TECH_DEVICE -> Icons.Default.QrCodeScanner
                        ItemCategory.UNIFORM_ACCESSORY -> Icons.Default.Checkroom
                        ItemCategory.OTHER -> Icons.Default.Handshake
                    },
                    contentDescription = null,
                    tint = AlphaGreenPrimary,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = category.displayName,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF1E293B),
                maxLines = 1
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = "$itemCount vật phẩm",
                fontSize = 10.sp,
                color = Color(0xFF64748B)
            )
        }
    }
}
