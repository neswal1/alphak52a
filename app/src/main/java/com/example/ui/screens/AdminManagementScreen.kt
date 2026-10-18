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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AdminPanelSettings
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Input
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Outbox
import androidx.compose.material.icons.filled.PendingActions
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.ExchangeItem
import com.example.model.ItemCondition
import com.example.model.ItemStatus
import com.example.model.RegistrationRequest
import com.example.model.RequestStatus
import com.example.model.TransactionLog
import com.example.model.TransactionType
import com.example.model.UserRole
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary
import com.example.util.Formatters

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminManagementScreen(
    currentRole: UserRole,
    items: List<ExchangeItem>,
    requests: List<RegistrationRequest>,
    logs: List<TransactionLog>,
    onAuthenticateAdmin: (String) -> Boolean,
    onApproveRequest: (requestId: String, targetLocker: String) -> Unit,
    onRejectRequest: (requestId: String, reason: String) -> Unit,
    onHandoverItem: (itemCode: String, recipientAlias: String, notes: String) -> Unit,
    onReturnItem: (itemCode: String, newCondition: ItemCondition, lockerReturn: String, notes: String) -> Unit,
    onOpenAddItemDialog: () -> Unit,
    onShowQr: (ExchangeItem) -> Unit,
    modifier: Modifier = Modifier
) {
    var adminPinInput by remember { mutableStateOf("") }
    var pinError by remember { mutableStateOf<String?>(null) }
    var selectedTab by remember { mutableIntStateOf(0) }

    // Dialog state for Handover
    var itemToHandover by remember { mutableStateOf<ExchangeItem?>(null) }
    var handoverRecipient by remember { mutableStateOf("") }
    var handoverNote by remember { mutableStateOf("") }

    // Dialog state for Return
    var itemToReturn by remember { mutableStateOf<ExchangeItem?>(null) }
    var returnCondition by remember { mutableStateOf(ItemCondition.VERY_GOOD) }
    var returnLocker by remember { mutableStateOf("Tủ K52 - Ô số 12") }
    var returnNote by remember { mutableStateOf("") }

    // Dialog state for Reject request
    var requestToReject by remember { mutableStateOf<RegistrationRequest?>(null) }
    var rejectReason by remember { mutableStateOf("Vật phẩm không đạt tiêu chuẩn tái sử dụng hoặc đã có sẵn nhiều.") }

    // If NOT admin, show security authentication gate
    if (currentRole != UserRole.ADMIN) {
        Column(
            modifier = modifier
                .fillMaxSize()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .background(Color(0xFFFEF2F2), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = "Restricted",
                    tint = Color(0xFFDC2626),
                    modifier = Modifier.size(36.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Khu Vực Quản Trị Trạm K52",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A)
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "Chức năng này dành cho Ban Quản Trị Trạm & Đoàn trường K52 để duyệt đơn, xuất nhập kho và bàn giao vật phẩm.",
                fontSize = 12.sp,
                color = Color(0xFF64748B),
                textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                lineHeight = 17.sp
            )

            Spacer(modifier = Modifier.height(14.dp))

            Surface(
                color = Color(0xFFF0FDF4),
                shape = RoundedCornerShape(8.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0))
            ) {
                Text(
                    text = "Mã PIN kiểm tra quyền thử nghiệm DEMO: 1234",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF166534),
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            OutlinedTextField(
                value = adminPinInput,
                onValueChange = {
                    adminPinInput = it
                    pinError = null
                },
                label = { Text("Nhập mã PIN Quản trị") },
                visualTransformation = PasswordVisualTransformation(),
                singleLine = true,
                isError = pinError != null,
                modifier = Modifier.fillMaxWidth(0.85f)
            )

            if (pinError != null) {
                Spacer(modifier = Modifier.height(6.dp))
                Text(text = pinError ?: "", color = Color(0xFFDC2626), fontSize = 12.sp)
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = {
                    val success = onAuthenticateAdmin(adminPinInput)
                    if (!success) {
                        pinError = "Mã PIN sai! Nhập '1234' để vào chế độ Quản trị thử nghiệm."
                    }
                },
                modifier = Modifier
                    .fillMaxWidth(0.85f)
                    .height(44.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                shape = RoundedCornerShape(8.dp)
            ) {
                Icon(Icons.Default.Security, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(6.dp))
                Text("Xác thực & Mở quyền Quản trị")
            }
        }
        return
    }

    // Authenticated Admin Dashboard
    Column(modifier = modifier.fillMaxSize()) {
        Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 10.dp)) {
            DemoNoticeBanner()
            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.AdminPanelSettings,
                        contentDescription = null,
                        tint = Color(0xFFDC2626),
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Column {
                        Text(
                            text = "Bảng Quản Trị Trạm K52",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = "Thủ kho & Ban Quản Trị Hệ Thống",
                            fontSize = 11.sp,
                            color = Color(0xFF64748B)
                        )
                    }
                }

                Button(
                    onClick = onOpenAddItemDialog,
                    colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                    shape = RoundedCornerShape(8.dp),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Text("+ Nhập kho", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }
        }

        // Tabs
        val tabs = listOf(
            "Duyệt yêu cầu (${requests.count { it.status == RequestStatus.PENDING }})",
            "Xuất & Bàn giao",
            "Nhận trả đồ (${items.count { it.status == ItemStatus.RENTED }})",
            "Lịch sử (${logs.size})"
        )

        ScrollableTabRow(
            selectedTabIndex = selectedTab,
            edgePadding = 16.dp,
            containerColor = Color.White,
            indicator = { tabPositions ->
                TabRowDefaults.SecondaryIndicator(
                    modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTab]),
                    color = AlphaGreenPrimary
                )
            }
        ) {
            tabs.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTab == index,
                    onClick = { selectedTab = index },
                    text = {
                        Text(
                            text = title,
                            fontSize = 12.sp,
                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                            color = if (selectedTab == index) AlphaGreenDark else Color(0xFF64748B)
                        )
                    }
                )
            }
        }

        // Tab Contents
        when (selectedTab) {
            0 -> TabPendingRequests(
                requests = requests,
                onApprove = { req -> onApproveRequest(req.id, "Tủ K52 - Ô số ${(10..20).random()}") },
                onReject = { req -> requestToReject = req }
            )
            1 -> TabStockOutAndHandover(
                items = items.filter { it.status == ItemStatus.AVAILABLE || it.status == ItemStatus.RESERVED },
                onInitiateHandover = { item ->
                    itemToHandover = item
                    handoverRecipient = ""
                    handoverNote = ""
                },
                onShowQr = onShowQr
            )
            2 -> TabReturnItems(
                items = items.filter { it.status == ItemStatus.RENTED || it.status == ItemStatus.HANDED_OVER },
                onInitiateReturn = { item ->
                    itemToReturn = item
                    returnCondition = item.condition
                    returnLocker = item.stationLocker
                    returnNote = ""
                }
            )
            3 -> TabAuditLogs(logs = logs)
        }
    }

    // Modal: Handover Confirmation
    if (itemToHandover != null) {
        val target = itemToHandover!!
        AlertDialog(
            onDismissRequest = { itemToHandover = null },
            title = {
                Text(
                    text = "Xuất kho & Bàn giao: ${target.code}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "Vật phẩm: ${target.name}",
                        fontWeight = FontWeight.Medium,
                        fontSize = 13.sp,
                        color = Color(0xFF1E293B)
                    )
                    Text(
                        text = "Vị trí lấy: ${target.stationLocker}",
                        fontSize = 12.sp,
                        color = Color(0xFF64748B)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    OutlinedTextField(
                        value = handoverRecipient,
                        onValueChange = { handoverRecipient = it },
                        label = { Text("Bí danh người nhận (VD: HS 10A2)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = handoverNote,
                        onValueChange = { handoverNote = it },
                        label = { Text("Ghi chú biên bản giao nhận") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (handoverRecipient.isNotBlank()) {
                            onHandoverItem(target.code, handoverRecipient, handoverNote)
                            itemToHandover = null
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7))
                ) {
                    Text("Xác nhận Bàn Giao")
                }
            },
            dismissButton = {
                TextButton(onClick = { itemToHandover = null }) { Text("Hủy") }
            }
        )
    }

    // Modal: Return Confirmation
    if (itemToReturn != null) {
        val target = itemToReturn!!
        AlertDialog(
            onDismissRequest = { itemToReturn = null },
            title = {
                Text(
                    text = "Nhận trả đồ vào kho: ${target.code}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "Vật phẩm: ${target.name}",
                        fontWeight = FontWeight.Medium,
                        fontSize = 13.sp
                    )
                    Text(
                        text = "Kiểm tra tình trạng sau khi hoàn trả:",
                        fontSize = 12.sp,
                        color = Color(0xFF64748B)
                    )
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(ItemCondition.values().toList()) { cond ->
                            FilterChip(
                                selected = returnCondition == cond,
                                onClick = { returnCondition = cond },
                                label = { Text(cond.displayName, fontSize = 10.sp) }
                            )
                        }
                    }
                    OutlinedTextField(
                        value = returnLocker,
                        onValueChange = { returnLocker = it },
                        label = { Text("Ô tủ nhập lại vào trạm") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = returnNote,
                        onValueChange = { returnNote = it },
                        label = { Text("Ghi chú kiểm định") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        onReturnItem(target.code, returnCondition, returnLocker, returnNote)
                        itemToReturn = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981))
                ) {
                    Text("Xác nhận Trả vào kho")
                }
            },
            dismissButton = {
                TextButton(onClick = { itemToReturn = null }) { Text("Hủy") }
            }
        )
    }

    // Modal: Reject Request
    if (requestToReject != null) {
        val req = requestToReject!!
        AlertDialog(
            onDismissRequest = { requestToReject = null },
            title = { Text("Từ chối phiếu đăng ký [${req.itemCode}]", fontSize = 16.sp, fontWeight = FontWeight.Bold) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(text = "Vật phẩm: ${req.itemName}", fontSize = 13.sp)
                    OutlinedTextField(
                        value = rejectReason,
                        onValueChange = { rejectReason = it },
                        label = { Text("Lý do từ chối") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        onRejectRequest(req.id, rejectReason)
                        requestToReject = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626))
                ) {
                    Text("Từ chối đơn")
                }
            },
            dismissButton = {
                TextButton(onClick = { requestToReject = null }) { Text("Hủy") }
            }
        )
    }
}

@Composable
private fun TabPendingRequests(
    requests: List<RegistrationRequest>,
    onApprove: (RegistrationRequest) -> Unit,
    onReject: (RegistrationRequest) -> Unit
) {
    if (requests.isEmpty()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(30.dp),
            contentAlignment = Alignment.Center
        ) {
            Text("Không có phiếu đăng ký nào đang chờ duyệt.", color = Color(0xFF64748B))
        }
    } else {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(requests, key = { it.id }) { req ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = req.itemCode,
                                fontFamily = FontFamily.Monospace,
                                fontWeight = FontWeight.Bold,
                                fontSize = 12.sp,
                                color = AlphaGreenDark
                            )

                            Surface(
                                color = when (req.status) {
                                    RequestStatus.PENDING -> Color(0xFFFEF3C7)
                                    RequestStatus.APPROVED -> Color(0xFFDCFCE7)
                                    RequestStatus.REJECTED -> Color(0xFFFEE2E2)
                                },
                                shape = RoundedCornerShape(4.dp)
                            ) {
                                Text(
                                    text = req.status.displayName,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = when (req.status) {
                                        RequestStatus.PENDING -> Color(0xFFB45309)
                                        RequestStatus.APPROVED -> Color(0xFF15803D)
                                        RequestStatus.REJECTED -> Color(0xFFB91C1C)
                                    },
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(
                            text = req.itemName,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                            color = Color(0xFF0F172A)
                        )

                        Spacer(modifier = Modifier.height(4.dp))

                        Text(
                            text = "Hình thức: ${req.transactionType.displayName} • ${req.category.displayName} • ${req.gradeLevel.displayName}",
                            fontSize = 12.sp,
                            color = Color(0xFF475569)
                        )

                        Text(
                            text = "Người đăng: ${req.studentAlias} (${req.internalContactNotice})",
                            fontSize = 11.sp,
                            color = Color(0xFF0F766E)
                        )

                        if (req.notes.isNotBlank()) {
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(text = "Ghi chú: ${req.notes}", fontSize = 11.sp, color = Color(0xFF64748B))
                        }

                        if (req.status == RequestStatus.PENDING) {
                            Spacer(modifier = Modifier.height(10.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                OutlinedButton(
                                    onClick = { onReject(req) },
                                    modifier = Modifier.weight(1f),
                                    shape = RoundedCornerShape(8.dp),
                                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFEF4444))
                                ) {
                                    Icon(Icons.Default.Close, contentDescription = null, tint = Color(0xFFEF4444), modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Từ chối", fontSize = 11.sp, color = Color(0xFFEF4444))
                                }

                                Button(
                                    onClick = { onApprove(req) },
                                    modifier = Modifier.weight(1.5f),
                                    shape = RoundedCornerShape(8.dp),
                                    colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary)
                                ) {
                                    Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Duyệt & Nhập kho", fontSize = 11.sp)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun TabStockOutAndHandover(
    items: List<ExchangeItem>,
    onInitiateHandover: (ExchangeItem) -> Unit,
    onShowQr: (ExchangeItem) -> Unit
) {
    if (items.isEmpty()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(30.dp),
            contentAlignment = Alignment.Center
        ) {
            Text("Không có vật phẩm nào sẵn sàng bàn giao.", color = Color(0xFF64748B))
        }
    } else {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(items, key = { it.id }) { item ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = item.code,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = Color(0xFF0F766E)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Surface(
                                    color = Color(item.status.colorHex).copy(alpha = 0.12f),
                                    shape = RoundedCornerShape(4.dp)
                                ) {
                                    Text(
                                        text = item.status.displayName,
                                        fontSize = 10.sp,
                                        color = Color(item.status.colorHex),
                                        fontWeight = FontWeight.SemiBold,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Text(
                                text = item.name,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = Color(0xFF1E293B)
                            )
                            Text(
                                text = "Tủ: ${item.stationLocker} • Chủ: ${item.ownerAlias}",
                                fontSize = 11.sp,
                                color = Color(0xFF64748B)
                            )
                        }

                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            OutlinedButton(
                                onClick = { onShowQr(item) },
                                shape = RoundedCornerShape(6.dp),
                                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Icon(Icons.Default.QrCode, contentDescription = null, modifier = Modifier.size(16.dp))
                            }

                            Button(
                                onClick = { onInitiateHandover(item) },
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7)),
                                shape = RoundedCornerShape(6.dp),
                                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                            ) {
                                Text("Bàn giao", fontSize = 11.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun TabReturnItems(
    items: List<ExchangeItem>,
    onInitiateReturn: (ExchangeItem) -> Unit
) {
    if (items.isEmpty()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(30.dp),
            contentAlignment = Alignment.Center
        ) {
            Text("Không có món đồ nào đang cho thuê / đang mượn cần trả.", color = Color(0xFF64748B))
        }
    } else {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(items, key = { it.id }) { item ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "${item.code} • ${item.status.displayName}",
                                fontSize = 11.sp,
                                color = Color(0xFF2563EB),
                                fontWeight = FontWeight.SemiBold
                            )
                            Text(
                                text = item.name,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = Color(0xFF1E293B)
                            )
                            Text(
                                text = "Vị trí trước: ${item.stationLocker}",
                                fontSize = 11.sp,
                                color = Color(0xFF64748B)
                            )
                        }

                        Button(
                            onClick = { onInitiateReturn(item) },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Icon(Icons.Default.Refresh, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Nhận trả", fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun TabAuditLogs(logs: List<TransactionLog>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(logs, key = { it.id }) { log ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
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

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = "[${log.itemCode}] ${log.itemName}",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = Color(0xFF1E293B)
                    )

                    Spacer(modifier = Modifier.height(2.dp))

                    Text(
                        text = log.notes,
                        fontSize = 11.sp,
                        color = Color(0xFF475569)
                    )

                    Text(
                        text = "Thực hiện bởi: ${log.actor}",
                        fontSize = 10.sp,
                        color = Color(0xFF64748B),
                        fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
                    )
                }
            }
        }
    }
}
