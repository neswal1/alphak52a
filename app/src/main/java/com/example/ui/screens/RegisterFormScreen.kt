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
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.GradeLevel
import com.example.model.ItemCategory
import com.example.model.ItemCondition
import com.example.model.TransactionType
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RegisterFormScreen(
    onSubmitRequest: (
        transactionType: TransactionType,
        itemName: String,
        category: ItemCategory,
        gradeLevel: GradeLevel,
        subject: String,
        condition: ItemCondition,
        proposedPrice: Long,
        proposedRentPrice: Long,
        quantity: Int,
        notes: String,
        studentAlias: String
    ) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedType by remember { mutableStateOf(TransactionType.GIFT) }
    var itemNameInput by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf(ItemCategory.TEXTBOOK) }
    var selectedGrade by remember { mutableStateOf(GradeLevel.GRADE_10) }
    var subjectInput by remember { mutableStateOf("") }
    var selectedCondition by remember { mutableStateOf(ItemCondition.VERY_GOOD) }
    var priceInput by remember { mutableStateOf("") }
    var rentPriceInput by remember { mutableStateOf("") }
    var quantityInput by remember { mutableStateOf("1") }
    var studentAliasInput by remember { mutableStateOf("") }
    var notesInput by remember { mutableStateOf("") }

    var categoryExpanded by remember { mutableStateOf(false) }
    var conditionExpanded by remember { mutableStateOf(false) }
    var isSubmittedSuccess by remember { mutableStateOf(false) }
    var validationError by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        DemoNoticeBanner()

        // Screen Header
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(AlphaGreenContainer, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Assignment,
                    contentDescription = null,
                    tint = AlphaGreenPrimary,
                    modifier = Modifier.size(22.dp)
                )
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(
                    text = "Đăng Ký Vật Phẩm Học Tập",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
                Text(
                    text = "Gửi thông tin để Ban quản trị Trạm K52 duyệt & hỗ trợ giao dịch",
                    fontSize = 12.sp,
                    color = Color(0xFF64748B)
                )
            }
        }

        if (isSubmittedSuccess) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFECFDF5)),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFA7F3D0))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = "Success",
                        tint = Color(0xFF059669),
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Đã gửi phiếu đăng ký thành công!",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF065F46)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Yêu cầu của bạn đã được chuyển vào mục 'Chờ duyệt' trên Trang Quản Trị Trạm K52. Ban quản trị sẽ kiểm tra và cấp mã QR dán tủ đồ.",
                        fontSize = 12.sp,
                        color = Color(0xFF047857),
                        lineHeight = 17.sp,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Button(
                        onClick = {
                            isSubmittedSuccess = false
                            itemNameInput = ""
                            subjectInput = ""
                            notesInput = ""
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary)
                    ) {
                        Text("Tạo phiếu đăng ký khác")
                    }
                }
            }
        } else {
            // Transaction Type Selector
            Text(
                text = "1. Chọn hình thức bạn muốn tham gia *",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E293B)
            )

            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(TransactionType.values().toList()) { type ->
                    val isSelected = selectedType == type
                    FilterChip(
                        selected = isSelected,
                        onClick = {
                            selectedType = type
                            if (type == TransactionType.GIFT) {
                                priceInput = "0"
                                rentPriceInput = "0"
                            }
                        },
                        label = { Text(type.displayName, fontSize = 12.sp) },
                        colors = FilterChipDefaults.filterChipColors(
                            selectedContainerColor = Color(type.badgeColorHex),
                            selectedLabelColor = Color.White
                        )
                    )
                }
            }

            // Explanatory note for the selected type
            Surface(
                color = Color(0xFFF8FAFC),
                shape = RoundedCornerShape(8.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = when (selectedType) {
                        TransactionType.GIFT -> "🎁 Tặng 0đ: Bạn trao tặng miễn phí sách hoặc dụng cụ cho bạn học sinh khác có hoàn cảnh khó khăn hoặc cần tài liệu."
                        TransactionType.RENT -> "⏱ Cho thuê/mượn: Bạn cho bạn khác mượn tài liệu/thiết bị trong thời gian ngắn (đợt thi, học kỳ) với chi phí nhỏ bảo dưỡng."
                        TransactionType.SALE -> "🏷 Bán lại: Bạn chuyển nhượng lại đồ dùng học tập đã qua sử dụng với giá học sinh hợp lý."
                        TransactionType.EXCHANGE -> "🔄 Trao đổi: Bạn muốn đổi sách hoặc đồng phục của mình lấy một món đồ khác tương đương."
                        TransactionType.CONSIGNMENT -> "📦 Ký gửi trạm: Bạn gửi đồ vào tủ đồ K52 để thủ kho trạm tự động kết nối và bàn giao khi có bạn cần."
                        TransactionType.WANTED -> "🔍 Cần tìm/mua: Đăng tin cần tìm sách vở, tài liệu mà bạn đang cần trạm hỗ trợ tìm kiếm."
                    },
                    fontSize = 11.sp,
                    color = Color(0xFF475569),
                    modifier = Modifier.padding(10.dp)
                )
            }

            Text(
                text = "2. Thông tin vật phẩm *",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E293B)
            )

            OutlinedTextField(
                value = itemNameInput,
                onValueChange = { itemNameInput = it },
                label = { Text("Tên sách / Vật phẩm học tập *") },
                placeholder = { Text("VD: Bộ SGK Chân Trời Sáng Tạo Toán 10") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            // Category & Grade
            ExposedDropdownMenuBox(
                expanded = categoryExpanded,
                onExpandedChange = { categoryExpanded = !categoryExpanded }
            ) {
                OutlinedTextField(
                    value = selectedCategory.displayName,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Nhóm hàng *") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = categoryExpanded) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = categoryExpanded,
                    onDismissRequest = { categoryExpanded = false }
                ) {
                    ItemCategory.values().forEach { cat ->
                        DropdownMenuItem(
                            text = { Text(cat.displayName) },
                            onClick = {
                                selectedCategory = cat
                                categoryExpanded = false
                            }
                        )
                    }
                }
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = subjectInput,
                    onValueChange = { subjectInput = it },
                    label = { Text("Môn học *") },
                    placeholder = { Text("Toán, Văn, Lý...") },
                    singleLine = true,
                    modifier = Modifier.weight(1f)
                )

                OutlinedTextField(
                    value = quantityInput,
                    onValueChange = { quantityInput = it },
                    label = { Text("Số lượng") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    singleLine = true,
                    modifier = Modifier.weight(0.7f)
                )
            }

            // Grade selection
            Text(
                text = "Khối lớp áp dụng:",
                fontSize = 12.sp,
                color = Color(0xFF475569)
            )
            LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                items(GradeLevel.values().toList()) { grade ->
                    FilterChip(
                        selected = selectedGrade == grade,
                        onClick = { selectedGrade = grade },
                        label = { Text(grade.displayName, fontSize = 11.sp) }
                    )
                }
            }

            // Condition dropdown
            ExposedDropdownMenuBox(
                expanded = conditionExpanded,
                onExpandedChange = { conditionExpanded = !conditionExpanded }
            ) {
                OutlinedTextField(
                    value = selectedCondition.displayName,
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Tình trạng thực tế *") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = conditionExpanded) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = conditionExpanded,
                    onDismissRequest = { conditionExpanded = false }
                ) {
                    ItemCondition.values().forEach { cond ->
                        DropdownMenuItem(
                            text = { Text(cond.displayName) },
                            onClick = {
                                selectedCondition = cond
                                conditionExpanded = false
                            }
                        )
                    }
                }
            }

            // Pricing if applicable
            if (selectedType == TransactionType.SALE || selectedType == TransactionType.RENT || selectedType == TransactionType.CONSIGNMENT) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = priceInput,
                        onValueChange = { priceInput = it },
                        label = { Text("Giá đề xuất (₫)") },
                        placeholder = { Text("0") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        singleLine = true,
                        modifier = Modifier.weight(1f)
                    )

                    if (selectedType == TransactionType.RENT) {
                        OutlinedTextField(
                            value = rentPriceInput,
                            onValueChange = { rentPriceInput = it },
                            label = { Text("Giá thuê/tuần (₫)") },
                            placeholder = { Text("0") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                            singleLine = true,
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }

            // Notes
            OutlinedTextField(
                value = notesInput,
                onValueChange = { notesInput = it },
                label = { Text("Ghi chú chi tiết cho Ban Quản Trị Trạm") },
                placeholder = { Text("Sách có ghi chú hay, cần đổi đồng phục size khác, điểm hẹn tại sảnh A...") },
                modifier = Modifier.fillMaxWidth(),
                minLines = 2
            )

            // Section 3: Privacy and Pseudonym
            Text(
                text = "3. Định danh học sinh & Bảo mật cá nhân *",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E293B)
            )

            OutlinedTextField(
                value = studentAliasInput,
                onValueChange = { studentAliasInput = it },
                label = { Text("Mã bí danh hiển thị (Ví dụ: HS K52-Toán)") },
                placeholder = { Text("Không dùng họ tên thật để bảo vệ quyền riêng tư") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )

            // Strict Privacy Assurance Banner
            Surface(
                color = Color(0xFFF0FDF4),
                shape = RoundedCornerShape(10.dp),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.Shield,
                        contentDescription = "Shield",
                        tint = Color(0xFF16A34A),
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Quy định bảo mật K52: Số điện thoại hoặc họ tên thật của học sinh KHÔNG BAO GIỜ bị công khai trên ứng dụng hay mã QR. Trạm K52 đóng vai trò trung gian tiếp nhận và bàn giao an toàn.",
                        fontSize = 11.sp,
                        color = Color(0xFF166534),
                        lineHeight = 15.sp
                    )
                }
            }

            if (validationError != null) {
                Text(
                    text = validationError ?: "",
                    color = Color(0xFFDC2626),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            // Submit Button
            Button(
                onClick = {
                    if (itemNameInput.isBlank()) {
                        validationError = "Vui lòng nhập tên sách/vật phẩm!"
                        return@Button
                    }
                    val priceVal = priceInput.toLongOrNull() ?: 0L
                    val rentVal = rentPriceInput.toLongOrNull() ?: 0L
                    val qtyVal = quantityInput.toIntOrNull() ?: 1

                    onSubmitRequest(
                        selectedType,
                        itemNameInput,
                        selectedCategory,
                        selectedGrade,
                        subjectInput,
                        selectedCondition,
                        priceVal,
                        rentVal,
                        qtyVal,
                        notesInput,
                        studentAliasInput
                    )
                    isSubmittedSuccess = true
                    validationError = null
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.Send, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Gửi Phiếu Đăng Ký Lên Trạm K52",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Spacer(modifier = Modifier.height(30.dp))
        }
    }
}
