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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import com.example.model.GradeLevel
import com.example.model.ItemCategory
import com.example.model.TransactionType
import com.example.model.UserRole
import com.example.ui.components.DemoNoticeBanner
import com.example.ui.components.ItemCard
import com.example.ui.theme.AlphaGreenContainer
import com.example.ui.theme.AlphaGreenDark
import com.example.ui.theme.AlphaGreenOnContainer
import com.example.ui.theme.AlphaGreenPrimary
import com.example.viewmodel.FilterState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WarehouseScreen(
    items: List<ExchangeItem>,
    filterState: FilterState,
    currentRole: UserRole,
    onSearchChange: (String) -> Unit,
    onCategoryChange: (ItemCategory?) -> Unit,
    onGradeChange: (GradeLevel) -> Unit,
    onTransactionTypeChange: (TransactionType?) -> Unit,
    onToggleFreeOnly: (Boolean) -> Unit,
    onToggleAvailableOnly: (Boolean) -> Unit,
    onResetFilters: () -> Unit,
    onViewDetail: (ExchangeItem) -> Unit,
    onShowQr: (ExchangeItem) -> Unit,
    onOpenAddDialog: () -> Unit,
    modifier: Modifier = Modifier
) {
    var showAdvancedFilters by remember { mutableStateOf(false) }

    Box(modifier = modifier.fillMaxSize()) {
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(14.dp))
                DemoNoticeBanner()
                Spacer(modifier = Modifier.height(10.dp))

                // Title & Inventory Count
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "Kho Vật Phẩm Học Tập",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = "Tìm kiếm & khám phá sách vở, thiết bị K52",
                            fontSize = 12.sp,
                            color = Color(0xFF64748B)
                        )
                    }

                    Surface(
                        color = AlphaGreenContainer,
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            text = "${items.size} kết quả",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = AlphaGreenOnContainer,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        )
                    }
                }
            }

            // Search Bar
            item {
                OutlinedTextField(
                    value = filterState.searchQuery,
                    onValueChange = onSearchChange,
                    modifier = Modifier.fillMaxWidth(),
                    placeholder = { Text("Tìm theo tên sách, môn học, mã vật phẩm...") },
                    leadingIcon = {
                        Icon(Icons.Default.Search, contentDescription = "Search", tint = AlphaGreenPrimary)
                    },
                    trailingIcon = {
                        if (filterState.searchQuery.isNotEmpty()) {
                            IconButton(onClick = { onSearchChange("") }) {
                                Icon(Icons.Default.Clear, contentDescription = "Clear")
                            }
                        }
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(12.dp)
                )
            }

            // Grade Level Filter Chips
            item {
                Column {
                    Text(
                        text = "Khối lớp:",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF475569)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(GradeLevel.values().toList()) { grade ->
                            val isSelected = filterState.selectedGrade == grade
                            FilterChip(
                                selected = isSelected,
                                onClick = { onGradeChange(grade) },
                                label = { Text(grade.displayName, fontSize = 11.sp) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = AlphaGreenPrimary,
                                    selectedLabelColor = Color.White
                                )
                            )
                        }
                    }
                }
            }

            // Transaction Type Chips (Tặng 0đ, Thuê, Bán, Đổi, Ký gửi)
            item {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Hình thức giao dịch:",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Color(0xFF475569)
                        )
                        Text(
                            text = if (showAdvancedFilters) "Thu gọn bộ lọc" else "+ Thêm bộ lọc",
                            fontSize = 11.sp,
                            color = AlphaGreenPrimary,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.clickable { showAdvancedFilters = !showAdvancedFilters }
                        )
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        item {
                            FilterChip(
                                selected = filterState.selectedTransactionType == null,
                                onClick = { onTransactionTypeChange(null) },
                                label = { Text("Tất cả", fontSize = 11.sp) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = AlphaGreenDark,
                                    selectedLabelColor = Color.White
                                )
                            )
                        }
                        items(TransactionType.values().toList()) { type ->
                            val isSelected = filterState.selectedTransactionType == type
                            FilterChip(
                                selected = isSelected,
                                onClick = { onTransactionTypeChange(if (isSelected) null else type) },
                                label = { Text(type.displayName, fontSize = 11.sp) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = Color(type.badgeColorHex),
                                    selectedLabelColor = Color.White
                                )
                            )
                        }
                    }
                }
            }

            // Expandable Category & Price filters
            if (showAdvancedFilters) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = "Lọc theo nhóm hàng:",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF1E293B)
                            )
                            Spacer(modifier = Modifier.height(6.dp))
                            LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                item {
                                    FilterChip(
                                        selected = filterState.selectedCategory == null,
                                        onClick = { onCategoryChange(null) },
                                        label = { Text("Tất cả nhóm", fontSize = 11.sp) }
                                    )
                                }
                                items(ItemCategory.values().toList()) { cat ->
                                    val isSelected = filterState.selectedCategory == cat
                                    FilterChip(
                                        selected = isSelected,
                                        onClick = { onCategoryChange(if (isSelected) null else cat) },
                                        label = { Text(cat.displayName, fontSize = 11.sp) }
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                FilterChip(
                                    selected = filterState.onlyGiftOrFree,
                                    onClick = { onToggleFreeOnly(!filterState.onlyGiftOrFree) },
                                    label = { Text("Chỉ đồ Miễn phí / Tặng 0đ", fontSize = 11.sp) }
                                )
                                FilterChip(
                                    selected = filterState.onlyAvailable,
                                    onClick = { onToggleAvailableOnly(!filterState.onlyAvailable) },
                                    label = { Text("Chỉ đồ Sẵn sàng", fontSize = 11.sp) }
                                )
                            }

                            Spacer(modifier = Modifier.height(6.dp))

                            TextButton(
                                onClick = onResetFilters,
                                modifier = Modifier.align(Alignment.End)
                            ) {
                                Text("Đặt lại tất cả bộ lọc", fontSize = 11.sp, color = Color(0xFFDC2626))
                            }
                        }
                    }
                }
            }

            // Results list or Empty State
            if (items.isEmpty()) {
                item {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 40.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Không tìm thấy vật phẩm phù hợp",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF64748B)
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Hãy thử đổi từ khóa tìm kiếm hoặc bấm đặt lại bộ lọc.",
                            fontSize = 12.sp,
                            color = Color(0xFF94A3B8)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Button(
                            onClick = onResetFilters,
                            colors = ButtonDefaults.buttonColors(containerColor = AlphaGreenPrimary)
                        ) {
                            Text("Xem tất cả vật phẩm")
                        }
                    }
                }
            } else {
                items(items, key = { it.id }) { item ->
                    ItemCard(
                        item = item,
                        onViewDetail = onViewDetail,
                        onShowQr = onShowQr
                    )
                }
            }

            item {
                Spacer(modifier = Modifier.height(80.dp))
            }
        }

        // Floating Action Button to Add New Item to Warehouse
        FloatingActionButton(
            onClick = onOpenAddDialog,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(20.dp),
            containerColor = AlphaGreenPrimary,
            contentColor = Color.White
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Item")
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = if (currentRole == UserRole.ADMIN) "+ Nhập kho" else "+ Đăng vật phẩm",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
            }
        }
    }
}
