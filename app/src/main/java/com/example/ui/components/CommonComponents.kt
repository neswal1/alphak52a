package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AdminPanelSettings
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.ExchangeItem
import com.example.model.ItemCategory
import com.example.model.ItemStatus
import com.example.model.TransactionType
import com.example.model.UserRole
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary
import com.example.util.Formatters

@Composable
fun DemoNoticeBanner(modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        color = Color(0xFFFEF3C7),
        shape = RoundedCornerShape(8.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFFCD34D))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.WarningAmber,
                contentDescription = "Demo Notice",
                tint = Color(0xFFB45309),
                modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column {
                Text(
                    text = "BẢN CHẠY THỬ (DEMO) K52 – DỮ LIỆU MẪU MÔ PHỎNG",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = Color(0xFF92400E)
                )
                Text(
                    text = "Mọi thông tin học sinh được ẩn danh hóa. Không lưu thông tin cá nhân thực tế và không có thanh toán trực tuyến.",
                    fontSize = 11.sp,
                    color = Color(0xFF78350F),
                    lineHeight = 15.sp
                )
            }
        }
    }
}

@Composable
fun RoleSwitcherBar(
    currentRole: UserRole,
    onRoleChangeRequested: (UserRole, String) -> Boolean,
    errorMessage: String? = null,
    modifier: Modifier = Modifier
) {
    var showPinDialog by remember { mutableStateOf(false) }
    var pinInput by remember { mutableStateOf("") }
    var localError by remember { mutableStateOf<String?>(null) }

    Surface(
        modifier = modifier.fillMaxWidth(),
        color = Color.White,
        shape = RoundedCornerShape(12.dp),
        shadowElevation = 1.dp,
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
    ) {
        Row(
            modifier = Modifier
                .padding(horizontal = 14.dp, vertical = 10.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .background(
                            if (currentRole == UserRole.ADMIN) Color(0xFFFEF2F2) else AlphaGreenContainer,
                            CircleShape
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = if (currentRole == UserRole.ADMIN) Icons.Default.AdminPanelSettings else Icons.Default.Person,
                        contentDescription = "Role Icon",
                        tint = if (currentRole == UserRole.ADMIN) Color(0xFFDC2626) else AlphaGreenPrimary,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Vai trò hiện tại: ${currentRole.displayName}",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF1E293B)
                    )
                    Text(
                        text = if (currentRole == UserRole.ADMIN) "Toàn quyền quản trị kho & kiểm duyệt" else "Xem kho, tìm kiếm, gửi đăng ký",
                        fontSize = 11.sp,
                        color = Color(0xFF64748B)
                    )
                }
            }

            OutlinedButton(
                onClick = {
                    if (currentRole == UserRole.ADMIN) {
                        onRoleChangeRequested(UserRole.STUDENT, "")
                    } else {
                        localError = null
                        pinInput = ""
                        showPinDialog = true
                    }
                },
                shape = RoundedCornerShape(8.dp),
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (currentRole == UserRole.ADMIN) Color(0xFFCBD5E1) else AlphaGreenPrimary
                ),
                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.SwapHoriz,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = if (currentRole == UserRole.ADMIN) Color(0xFF475569) else AlphaGreenPrimary
                )
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = if (currentRole == UserRole.ADMIN) "Chuyển Học sinh" else "Vào Quản trị",
                    fontSize = 12.sp,
                    color = if (currentRole == UserRole.ADMIN) Color(0xFF475569) else AlphaGreenPrimary,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }

    if (showPinDialog) {
        AlertDialog(
            onDismissRequest = { showPinDialog = false },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.AdminPanelSettings, contentDescription = null, tint = AlphaGreenPrimary)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Xác thực Quản trị viên Kho K52", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                }
            },
            text = {
                Column {
                    Text(
                        text = "Vui lòng nhập mã bảo mật quản trị viên trạm để duyệt yêu cầu, nhập xuất kho và bàn giao vật phẩm.",
                        fontSize = 13.sp,
                        color = Color(0xFF475569)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "(Mã PIN thử nghiệm DEMO: 1234)",
                        fontSize = 12.sp,
                        color = Color(0xFF0F766E),
                        fontWeight = FontWeight.Medium
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    OutlinedTextField(
                        value = pinInput,
                        onValueChange = { pinInput = it },
                        label = { Text("Mã PIN Quản trị") },
                        visualTransformation = PasswordVisualTransformation(),
                        singleLine = true,
                        isError = localError != null || errorMessage != null,
                        modifier = Modifier.fillMaxWidth()
                    )
                    val errorToShow = localError ?: errorMessage
                    if (errorToShow != null) {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = errorToShow, color = Color(0xFFDC2626), fontSize = 12.sp)
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val success = onRoleChangeRequested(UserRole.ADMIN, pinInput)
                        if (success) {
                            showPinDialog = false
                        } else {
                            localError = "Mã PIN không đúng (Gợi ý: 1234)"
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary)
                ) {
                    Text("Xác nhận")
                }
            },
            dismissButton = {
                TextButton(onClick = { showPinDialog = false }) {
                    Text("Hủy")
                }
            }
        )
    }
}

@Composable
fun ItemCard(
    item: ExchangeItem,
    onViewDetail: (ExchangeItem) -> Unit,
    onShowQr: (ExchangeItem) -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onViewDetail(item) },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.5.dp),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            // Header Row: Code & Transaction Type badge
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Item Unique Code Pill
                Surface(
                    color = Color(0xFFF1F5F9),
                    shape = RoundedCornerShape(6.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCBD5E1))
                ) {
                    Text(
                        text = item.code,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF334155),
                        modifier = Modifier.padding(horizontal = 7.dp, vertical = 3.dp)
                    )
                }

                // Type Badge
                Surface(
                    color = Color(item.transactionType.badgeColorHex).copy(alpha = 0.12f),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = item.transactionType.displayName,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(item.transactionType.badgeColorHex),
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Item Name
            Text(
                text = item.name,
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                color = Color(0xFF0F172A),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )

            Spacer(modifier = Modifier.height(4.dp))

            // Subject & Grade & Category
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "${item.subject} • ${item.gradeLevel.displayName}",
                    fontSize = 12.sp,
                    color = Color(0xFF475569)
                )
                Spacer(modifier = Modifier.weight(1f))
                Text(
                    text = "SL: ${item.quantity}",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color(0xFF0F766E)
                )
            }

            Spacer(modifier = Modifier.height(6.dp))

            // Condition & Reuse Count
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = item.condition.displayName,
                    fontSize = 11.sp,
                    color = Color(0xFF64748B),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f, fill = false)
                )

                if (item.reuseCount > 1) {
                    Surface(
                        color = Color(0xFFECFDF5),
                        shape = RoundedCornerShape(4.dp)
                    ) {
                        Text(
                            text = "♻ Đã tái dùng ${item.reuseCount} lần",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF059669),
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Pricing & Status Row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Bottom
            ) {
                Column {
                    when (item.transactionType) {
                        TransactionType.RENT -> {
                            Text(
                                text = "Thuê: ${Formatters.formatRentPrice(item.rentPricePerWeek)}",
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF2563EB)
                            )
                            if (item.price > 0L) {
                                Text(
                                    text = "Hoặc mua đứt: ${Formatters.formatVnd(item.price)}",
                                    fontSize = 11.sp,
                                    color = Color(0xFF64748B)
                                )
                            }
                        }
                        TransactionType.GIFT -> {
                            Text(
                                text = "Tặng 0 ₫ (Miễn phí)",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF059669)
                            )
                        }
                        TransactionType.EXCHANGE -> {
                            Text(
                                text = "Trao đổi vật phẩm",
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF7C3AED)
                            )
                        }
                        else -> {
                            Text(
                                text = Formatters.formatVnd(item.price),
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = AlphaGreenDark
                            )
                        }
                    }
                }

                // Status chip
                Surface(
                    color = Color(item.status.colorHex).copy(alpha = 0.12f),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = item.status.displayName,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(item.status.colorHex),
                        modifier = Modifier.padding(horizontal = 7.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Action Buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = { onShowQr(item) },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(8.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(vertical = 4.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCBD5E1))
                ) {
                    Icon(
                        imageVector = Icons.Default.QrCode,
                        contentDescription = "QR Code",
                        modifier = Modifier.size(16.dp),
                        tint = Color(0xFF334155)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = "Mã QR", fontSize = 12.sp, color = Color(0xFF334155))
                }

                Button(
                    onClick = { onViewDetail(item) },
                    modifier = Modifier.weight(1.4f),
                    shape = RoundedCornerShape(8.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(vertical = 4.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary)
                ) {
                    Text(text = "Chi tiết", fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
            }
        }
    }
}
