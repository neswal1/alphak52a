package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AssignmentTurnedIn
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material.icons.filled.Recycling
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.ExchangeItem
import com.example.model.ItemStatus
import com.example.model.TransactionType
import com.example.model.UserRole
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenPrimary
import com.example.util.Formatters

@Composable
fun ItemDetailDialog(
    item: ExchangeItem,
    currentRole: UserRole,
    onDismiss: () -> Unit,
    onShowQr: (ExchangeItem) -> Unit,
    onReserve: (String, String) -> Unit,
    onHandover: (String, String, String) -> Unit,
    onReturn: (String, com.example.model.ItemCondition, String, String) -> Unit
) {
    var showReserveForm by remember { mutableStateOf(false) }
    var studentAliasInput by remember { mutableStateOf("") }

    var showHandoverForm by remember { mutableStateOf(false) }
    var recipientAliasInput by remember { mutableStateOf("") }
    var handoverNotesInput by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Surface(
                        color = Color(0xFFF1F5F9),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = item.code,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF334155),
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "Chi tiết vật phẩm",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                }
                IconButton(onClick = onDismiss) {
                    Icon(Icons.Default.Close, contentDescription = "Close")
                }
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState())
            ) {
                // Name & Type
                Text(
                    text = item.name,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )

                Spacer(modifier = Modifier.height(8.dp))

                // Badges
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Surface(
                        color = Color(item.transactionType.badgeColorHex).copy(alpha = 0.12f),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = item.transactionType.displayName,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(item.transactionType.badgeColorHex),
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }

                    Surface(
                        color = Color(item.status.colorHex).copy(alpha = 0.12f),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = item.status.displayName,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(item.status.colorHex),
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Details grid
                DetailRow(label = "Danh mục", value = item.category.displayName)
                DetailRow(label = "Môn học", value = item.subject)
                DetailRow(label = "Khối lớp", value = item.gradeLevel.displayName)
                DetailRow(label = "Tình trạng", value = item.condition.displayName)
                DetailRow(label = "Số lượng", value = "${item.quantity} bộ/chiếc")

                if (item.transactionType == TransactionType.RENT) {
                    DetailRow(label = "Giá thuê", value = Formatters.formatRentPrice(item.rentPricePerWeek))
                    if (item.price > 0) {
                        DetailRow(label = "Giá mua đứt", value = Formatters.formatVnd(item.price))
                    }
                } else if (item.transactionType == TransactionType.GIFT) {
                    DetailRow(label = "Hình thức", value = "Tặng miễn phí 0 ₫ cho học sinh cần")
                } else {
                    DetailRow(label = "Giá bán đề xuất", value = Formatters.formatVnd(item.price))
                }

                DetailRow(label = "Tủ đồ Trạm K52", value = item.stationLocker)
                DetailRow(label = "Chủ sở hữu", value = item.ownerAlias)
                DetailRow(label = "Ngày tiếp nhận", value = item.createdAt)

                Spacer(modifier = Modifier.height(8.dp))

                // Reuse highlight card
                Surface(
                    color = Color(0xFFF0FDF4),
                    shape = RoundedCornerShape(8.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Recycling,
                            contentDescription = "Reuse",
                            tint = Color(0xFF16A34A),
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Vật phẩm này đã qua ${item.reuseCount} chu kỳ tái sử dụng tri thức trong trường!",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF15803D)
                        )
                    }
                }

                if (item.notes.isNotBlank()) {
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Ghi chú & mô tả:",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF334155)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = item.notes,
                        fontSize = 12.sp,
                        color = Color(0xFF475569),
                        lineHeight = 16.sp
                    )
                }

                // Privacy warning
                Spacer(modifier = Modifier.height(10.dp))
                Surface(
                    color = Color(0xFFFEF2F2),
                    shape = RoundedCornerShape(6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Lock, contentDescription = null, tint = Color(0xFFDC2626), modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Bảo mật: Thông tin liên lạc chỉ được ban quản trị trạm sử dụng để hỗ trợ bàn giao, không công khai lên mạng.",
                            fontSize = 10.sp,
                            color = Color(0xFF991B1B)
                        )
                    }
                }

                // If reserve form triggered
                if (showReserveForm) {
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Đăng ký nhận / giữ chỗ:",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = AlphaGreenDark
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = studentAliasInput,
                        onValueChange = { studentAliasInput = it },
                        label = { Text("Mã / Bí danh học sinh (VD: HS K52-Toán)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = {
                            if (studentAliasInput.isNotBlank()) {
                                onReserve(item.code, studentAliasInput)
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Xác nhận giữ chỗ tại Trạm")
                    }
                }

                // If Admin handover form triggered
                if (showHandoverForm && currentRole == UserRole.ADMIN) {
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Xuất kho & Bàn giao đồ:",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0284C7)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = recipientAliasInput,
                        onValueChange = { recipientAliasInput = it },
                        label = { Text("Bí danh người nhận (VD: HS 10A1)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    OutlinedTextField(
                        value = handoverNotesInput,
                        onValueChange = { handoverNotesInput = it },
                        label = { Text("Ghi chú biên bản bàn giao") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = {
                            if (recipientAliasInput.isNotBlank()) {
                                onHandover(item.code, recipientAliasInput, handoverNotesInput)
                                onDismiss()
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7)),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Xác nhận Bàn giao & Ghi log")
                    }
                }
            }
        },
        confirmButton = {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = { onShowQr(item) },
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.weight(1f)
                ) {
                    Icon(Icons.Default.QrCode, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Mã QR", fontSize = 12.sp)
                }

                if (currentRole == UserRole.STUDENT && item.status == ItemStatus.AVAILABLE && !showReserveForm) {
                    Button(
                        onClick = { showReserveForm = true },
                        colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier.weight(1.3f)
                    ) {
                        Text("Giữ chỗ nhận đồ", fontSize = 12.sp)
                    }
                } else if (currentRole == UserRole.ADMIN) {
                    if (item.status == ItemStatus.AVAILABLE && !showHandoverForm) {
                        Button(
                            onClick = { showHandoverForm = true },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7)),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.weight(1.3f)
                        ) {
                            Text("Xuất / Bàn giao", fontSize = 12.sp)
                        }
                    } else if (item.status == ItemStatus.RENTED) {
                        Button(
                            onClick = {
                                onReturn(item.code, item.condition, item.stationLocker, "Trả sau kỳ mượn")
                                onDismiss()
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier.weight(1.3f)
                        ) {
                            Text("Nhận trả đồ", fontSize = 12.sp)
                        }
                    }
                }
            }
        }
    )
}

@Composable
private fun DetailRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, fontSize = 12.sp, color = Color(0xFF64748B))
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = value,
            fontSize = 12.sp,
            fontWeight = FontWeight.Medium,
            color = Color(0xFF1E293B)
        )
    }
}
