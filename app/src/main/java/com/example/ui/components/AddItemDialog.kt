package com.example.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddBusiness
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddItemDialog(
    onDismiss: () -> Unit,
    onAddItem: (
        code: String,
        name: String,
        category: ItemCategory,
        gradeLevel: GradeLevel,
        subject: String,
        condition: ItemCondition,
        ownerAlias: String,
        price: Long,
        rentPricePerWeek: Long,
        quantity: Int,
        transactionType: TransactionType,
        notes: String,
        stationLocker: String
    ) -> Unit
) {
    var codeInput by remember { mutableStateOf("") }
    var nameInput by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf(ItemCategory.TEXTBOOK) }
    var selectedGrade by remember { mutableStateOf(GradeLevel.GRADE_10) }
    var subjectInput by remember { mutableStateOf("") }
    var selectedCondition by remember { mutableStateOf(ItemCondition.VERY_GOOD) }
    var ownerAliasInput by remember { mutableStateOf("") }
    var priceInput by remember { mutableStateOf("") }
    var rentPriceInput by remember { mutableStateOf("") }
    var quantityInput by remember { mutableStateOf("1") }
    var selectedTransactionType by remember { mutableStateOf(TransactionType.GIFT) }
    var notesInput by remember { mutableStateOf("") }
    var stationLockerInput by remember { mutableStateOf("Tủ K52 - Ô số 10") }

    var categoryExpanded by remember { mutableStateOf(false) }
    var gradeExpanded by remember { mutableStateOf(false) }
    var conditionExpanded by remember { mutableStateOf(false) }
    var typeExpanded by remember { mutableStateOf(false) }

    var errorMessage by remember { mutableStateOf<String?>(null) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.AddBusiness,
                        contentDescription = null,
                        tint = AlphaGreenPrimary
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Thêm Vật Phẩm Mới",
                        fontSize = 17.sp,
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
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Surface(
                    color = Color(0xFFF0FDF4),
                    shape = RoundedCornerShape(8.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "Vật phẩm được cấp mã định danh duy nhất (VD: K52-SGK-01) để in mã QR dán tủ đồ K52.",
                        fontSize = 11.sp,
                        color = Color(0xFF166534),
                        modifier = Modifier.padding(8.dp)
                    )
                }

                // Code Input (optional, auto-generated if left blank)
                OutlinedTextField(
                    value = codeInput,
                    onValueChange = { codeInput = it },
                    label = { Text("Mã vật phẩm (Bỏ trống để tự sinh)") },
                    placeholder = { Text("VD: K52-SGK-15") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                // Item Name
                OutlinedTextField(
                    value = nameInput,
                    onValueChange = { nameInput = it },
                    label = { Text("Tên sách / Vật phẩm *") },
                    placeholder = { Text("VD: SGK Toán 10 Tập 1") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                // Transaction Type Dropdown
                ExposedDropdownMenuBox(
                    expanded = typeExpanded,
                    onExpandedChange = { typeExpanded = !typeExpanded }
                ) {
                    OutlinedTextField(
                        value = selectedTransactionType.displayName,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Hình thức giao dịch *") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = typeExpanded) },
                        modifier = Modifier
                            .menuAnchor()
                            .fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = typeExpanded,
                        onDismissRequest = { typeExpanded = false }
                    ) {
                        TransactionType.values().forEach { type ->
                            DropdownMenuItem(
                                text = { Text(type.displayName) },
                                onClick = {
                                    selectedTransactionType = type
                                    typeExpanded = false
                                }
                            )
                        }
                    }
                }

                // Category Dropdown
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

                // Grade & Subject Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    ExposedDropdownMenuBox(
                        expanded = gradeExpanded,
                        onExpandedChange = { gradeExpanded = !gradeExpanded },
                        modifier = Modifier.weight(1f)
                    ) {
                        OutlinedTextField(
                            value = selectedGrade.displayName,
                            onValueChange = {},
                            readOnly = true,
                            label = { Text("Khối") },
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = gradeExpanded) },
                            modifier = Modifier.menuAnchor()
                        )
                        ExposedDropdownMenu(
                            expanded = gradeExpanded,
                            onDismissRequest = { gradeExpanded = false }
                        ) {
                            GradeLevel.values().forEach { grade ->
                                DropdownMenuItem(
                                    text = { Text(grade.displayName) },
                                    onClick = {
                                        selectedGrade = grade
                                        gradeExpanded = false
                                    }
                                )
                            }
                        }
                    }

                    OutlinedTextField(
                        value = subjectInput,
                        onValueChange = { subjectInput = it },
                        label = { Text("Môn học") },
                        placeholder = { Text("Toán, Lý, Văn...") },
                        singleLine = true,
                        modifier = Modifier.weight(1f)
                    )
                }

                // Condition Dropdown
                ExposedDropdownMenuBox(
                    expanded = conditionExpanded,
                    onExpandedChange = { conditionExpanded = !conditionExpanded }
                ) {
                    OutlinedTextField(
                        value = selectedCondition.displayName,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Tình trạng vật phẩm *") },
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

                // Price and Rent Price Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = priceInput,
                        onValueChange = { priceInput = it },
                        label = { Text("Giá bán (₫)") },
                        placeholder = { Text("0 nếu tặng") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        singleLine = true,
                        modifier = Modifier.weight(1f)
                    )

                    OutlinedTextField(
                        value = rentPriceInput,
                        onValueChange = { rentPriceInput = it },
                        label = { Text("Giá thuê/tuần") },
                        placeholder = { Text("0") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        singleLine = true,
                        modifier = Modifier.weight(1f)
                    )
                }

                // Quantity & Locker
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedTextField(
                        value = quantityInput,
                        onValueChange = { quantityInput = it },
                        label = { Text("Số lượng") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        singleLine = true,
                        modifier = Modifier.weight(0.7f)
                    )

                    OutlinedTextField(
                        value = stationLockerInput,
                        onValueChange = { stationLockerInput = it },
                        label = { Text("Vị trí ô tủ K52") },
                        placeholder = { Text("Tủ Sảnh A - Ô 05") },
                        singleLine = true,
                        modifier = Modifier.weight(1.3f)
                    )
                }

                // Owner Alias (Student pseudonym)
                OutlinedTextField(
                    value = ownerAliasInput,
                    onValueChange = { ownerAliasInput = it },
                    label = { Text("Bí danh chủ sở hữu (Bảo mật)") },
                    placeholder = { Text("VD: HS K52-Toán") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )

                // Notes
                OutlinedTextField(
                    value = notesInput,
                    onValueChange = { notesInput = it },
                    label = { Text("Ghi chú thêm về vật phẩm") },
                    placeholder = { Text("Tập đề có đáp án, máy tính kèm nắp...") },
                    maxLines = 3,
                    modifier = Modifier.fillMaxWidth()
                )

                if (errorMessage != null) {
                    Text(
                        text = errorMessage ?: "",
                        color = Color(0xFFDC2626),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (nameInput.isBlank()) {
                        errorMessage = "Vui lòng nhập tên sách/vật phẩm!"
                        return@Button
                    }
                    val priceVal = priceInput.toLongOrNull() ?: 0L
                    val rentVal = rentPriceInput.toLongOrNull() ?: 0L
                    val qtyVal = quantityInput.toIntOrNull() ?: 1

                    onAddItem(
                        codeInput,
                        nameInput,
                        selectedCategory,
                        selectedGrade,
                        subjectInput,
                        selectedCondition,
                        ownerAliasInput,
                        priceVal,
                        rentVal,
                        qtyVal,
                        selectedTransactionType,
                        notesInput,
                        stationLockerInput
                    )
                    onDismiss()
                },
                colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text("Lưu vào Kho")
            }
        },
        dismissButton = {
            Button(
                onClick = onDismiss,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF1F5F9), contentColor = Color(0xFF334155)),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text("Hủy")
            }
        }
    )
}
