package com.example.viewmodel

import androidx.lifecycle.ViewModel
import com.example.data.DemoDataProvider
import com.example.model.ActionLogType
import com.example.model.ExchangeItem
import com.example.model.GradeLevel
import com.example.model.ItemCategory
import com.example.model.ItemCondition
import com.example.model.ItemStatus
import com.example.model.RegistrationRequest
import com.example.model.RequestStatus
import com.example.model.TransactionLog
import com.example.model.TransactionType
import com.example.model.UserRole
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

data class FilterState(
    val searchQuery: String = "",
    val selectedCategory: ItemCategory? = null,
    val selectedGrade: GradeLevel = GradeLevel.ALL,
    val selectedTransactionType: TransactionType? = null,
    val onlyAvailable: Boolean = false,
    val onlyGiftOrFree: Boolean = false,
    val maxPrice: Long? = null
)

data class AlphaUiState(
    val items: List<ExchangeItem> = DemoDataProvider.getInitialItems(),
    val requests: List<RegistrationRequest> = DemoDataProvider.getInitialRequests(),
    val logs: List<TransactionLog> = DemoDataProvider.getInitialLogs(),
    val currentRole: UserRole = UserRole.STUDENT,
    val filter: FilterState = FilterState(),
    val selectedItemForQr: ExchangeItem? = null,
    val selectedItemForDetail: ExchangeItem? = null,
    val showAddDialog: Boolean = false,
    val notificationMessage: String? = null,
    val adminPinError: String? = null
)

class AlphaK52ViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(AlphaUiState())
    val uiState: StateFlow<AlphaUiState> = _uiState.asStateFlow()

    private val dateFormat = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale("vi", "VN"))

    private fun getCurrentTimeString(): String = dateFormat.format(Date())

    // --- Role Switching (Simulated Server / PIN Check) ---
    fun switchRole(newRole: UserRole, enteredPin: String = ""): Boolean {
        if (newRole == UserRole.ADMIN) {
            // Simulated server authentication check
            if (enteredPin == "1234" || enteredPin == "k52admin") {
                _uiState.update {
                    it.copy(
                        currentRole = UserRole.ADMIN,
                        adminPinError = null,
                        notificationMessage = "Đã xác thực thành công quyền Quản trị viên Kho K52"
                    )
                }
                return true
            } else {
                _uiState.update {
                    it.copy(adminPinError = "Mã PIN quản trị không chính xác! (Mã thử nghiệm demo: 1234)")
                }
                return false
            }
        } else {
            _uiState.update {
                it.copy(
                    currentRole = UserRole.STUDENT,
                    adminPinError = null,
                    notificationMessage = "Đã chuyển về giao diện Học sinh / Người tìm đồ"
                )
            }
            return true
        }
    }

    fun dismissNotification() {
        _uiState.update { it.copy(notificationMessage = null) }
    }

    // --- Filter Controls ---
    fun updateSearchQuery(query: String) {
        _uiState.update { it.copy(filter = it.filter.copy(searchQuery = query)) }
    }

    fun updateCategoryFilter(cat: ItemCategory?) {
        _uiState.update { it.copy(filter = it.filter.copy(selectedCategory = cat)) }
    }

    fun updateGradeFilter(grade: GradeLevel) {
        _uiState.update { it.copy(filter = it.filter.copy(selectedGrade = grade)) }
    }

    fun updateTransactionTypeFilter(type: TransactionType?) {
        _uiState.update { it.copy(filter = it.filter.copy(selectedTransactionType = type)) }
    }

    fun toggleOnlyAvailable(enabled: Boolean) {
        _uiState.update { it.copy(filter = it.filter.copy(onlyAvailable = enabled)) }
    }

    fun toggleOnlyGiftOrFree(enabled: Boolean) {
        _uiState.update { it.copy(filter = it.filter.copy(onlyGiftOrFree = enabled)) }
    }

    fun resetFilters() {
        _uiState.update { it.copy(filter = FilterState()) }
    }

    // --- Modals ---
    fun showQrForItem(item: ExchangeItem) {
        _uiState.update { it.copy(selectedItemForQr = item) }
    }

    fun closeQrDialog() {
        _uiState.update { it.copy(selectedItemForQr = null) }
    }

    fun showItemDetail(item: ExchangeItem) {
        _uiState.update { it.copy(selectedItemForDetail = item) }
    }

    fun closeItemDetail() {
        _uiState.update { it.copy(selectedItemForDetail = null) }
    }

    // --- Direct Inventory Addition (Admin or Verified Student) ---
    fun addItemDirectly(
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
    ) {
        val uniqueCode = if (code.isBlank()) {
            val prefix = when (category) {
                ItemCategory.TEXTBOOK -> "SGK"
                ItemCategory.REFERENCE_BOOK -> "STK"
                ItemCategory.EXAM_DOCUMENT -> "TL"
                ItemCategory.STUDY_TOOL -> "DC"
                ItemCategory.TECH_DEVICE -> "MAY"
                ItemCategory.UNIFORM_ACCESSORY -> "DP"
                ItemCategory.OTHER -> "VP"
            }
            "K52-$prefix-${(10 + _uiState.value.items.size + 1)}"
        } else {
            code.trim().uppercase()
        }

        val newItem = ExchangeItem(
            id = "item_${System.currentTimeMillis()}",
            code = uniqueCode,
            name = name.trim(),
            category = category,
            gradeLevel = gradeLevel,
            subject = subject.trim().ifEmpty { "Chung" },
            condition = condition,
            ownerAlias = ownerAlias.trim().ifEmpty { "Học sinh K52 (Ẩn danh)" },
            price = price,
            rentPricePerWeek = rentPricePerWeek,
            quantity = quantity.coerceAtLeast(1),
            status = ItemStatus.AVAILABLE,
            transactionType = transactionType,
            notes = notes.trim(),
            stationLocker = stationLocker.trim().ifEmpty { "Tủ trạm K52" },
            reuseCount = 1,
            createdAt = SimpleDateFormat("dd/MM/yyyy", Locale("vi", "VN")).format(Date())
        )

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = ActionLogType.STOCK_IN,
            itemCode = uniqueCode,
            itemName = name,
            actor = if (_uiState.value.currentRole == UserRole.ADMIN) "BQL Trạm K52 (Admin)" else "Học sinh đăng ký",
            notes = "Nhập kho vật phẩm mới vào ô tủ $stationLocker. Tình trạng: ${condition.displayName}"
        )

        _uiState.update {
            it.copy(
                items = listOf(newItem) + it.items,
                logs = listOf(newLog) + it.logs,
                notificationMessage = "Đã thêm thành công vật phẩm $uniqueCode vào Kho trạm!"
            )
        }
    }

    // --- Student Registration Requests ---
    fun submitRegistrationRequest(
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
    ) {
        val count = _uiState.value.requests.size + _uiState.value.items.size + 1
        val prefix = when (category) {
            ItemCategory.TEXTBOOK -> "SGK"
            ItemCategory.REFERENCE_BOOK -> "STK"
            ItemCategory.EXAM_DOCUMENT -> "TL"
            ItemCategory.STUDY_TOOL -> "DC"
            ItemCategory.TECH_DEVICE -> "MAY"
            ItemCategory.UNIFORM_ACCESSORY -> "DP"
            ItemCategory.OTHER -> "VP"
        }
        val genCode = "K52-$prefix-$count"

        val newRequest = RegistrationRequest(
            id = "req_${System.currentTimeMillis()}",
            itemCode = genCode,
            transactionType = transactionType,
            itemName = itemName.trim(),
            category = category,
            gradeLevel = gradeLevel,
            subject = subject.trim().ifEmpty { "Chung" },
            condition = condition,
            proposedPrice = proposedPrice,
            proposedRentPrice = proposedRentPrice,
            quantity = quantity.coerceAtLeast(1),
            notes = notes.trim(),
            studentAlias = studentAlias.trim().ifEmpty { "Học sinh K52 (Ẩn danh)" },
            status = RequestStatus.PENDING,
            submittedAt = getCurrentTimeString()
        )

        _uiState.update {
            it.copy(
                requests = listOf(newRequest) + it.requests,
                notificationMessage = "Đã gửi phiếu đăng ký [$genCode]! Quản trị viên Kho K52 sẽ kiểm tra và duyệt nhập kho."
            )
        }
    }

    // --- Admin Operations: Approve Request & Stock-In ---
    fun approveRequest(requestId: String, targetLocker: String = "Tủ K52 - Ô chờ") {
        val req = _uiState.value.requests.find { it.id == requestId } ?: return
        val updatedRequests = _uiState.value.requests.map {
            if (it.id == requestId) it.copy(status = RequestStatus.APPROVED) else it
        }

        val newItem = ExchangeItem(
            id = "item_${System.currentTimeMillis()}",
            code = req.itemCode,
            name = req.itemName,
            category = req.category,
            gradeLevel = req.gradeLevel,
            subject = req.subject,
            condition = req.condition,
            ownerAlias = req.studentAlias,
            price = req.proposedPrice,
            rentPricePerWeek = req.proposedRentPrice,
            quantity = req.quantity,
            status = ItemStatus.AVAILABLE,
            transactionType = req.transactionType,
            notes = req.notes,
            stationLocker = targetLocker,
            reuseCount = 1,
            createdAt = SimpleDateFormat("dd/MM/yyyy", Locale("vi", "VN")).format(Date())
        )

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = ActionLogType.APPROVE_REQUEST,
            itemCode = req.itemCode,
            itemName = req.itemName,
            actor = "BQL Trạm K52 (Admin)",
            notes = "Đã phê duyệt yêu cầu từ ${req.studentAlias} và tự động nhập kho vào $targetLocker."
        )

        _uiState.update {
            it.copy(
                requests = updatedRequests,
                items = listOf(newItem) + it.items,
                logs = listOf(newLog) + it.logs,
                notificationMessage = "Đã duyệt yêu cầu và nhập kho món đồ ${req.itemCode} thành công!"
            )
        }
    }

    fun rejectRequest(requestId: String, reason: String) {
        val req = _uiState.value.requests.find { it.id == requestId } ?: return
        val updatedRequests = _uiState.value.requests.map {
            if (it.id == requestId) it.copy(status = RequestStatus.REJECTED, rejectionReason = reason) else it
        }

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = ActionLogType.REJECT_REQUEST,
            itemCode = req.itemCode,
            itemName = req.itemName,
            actor = "BQL Trạm K52 (Admin)",
            notes = "Từ chối yêu cầu: $reason"
        )

        _uiState.update {
            it.copy(
                requests = updatedRequests,
                logs = listOf(newLog) + it.logs,
                notificationMessage = "Đã từ chối yêu cầu ${req.itemCode}."
            )
        }
    }

    // --- Admin Operations: Handover / Stock-Out ---
    fun handoverItem(itemCode: String, recipientAlias: String, notes: String = "") {
        val currentItem = _uiState.value.items.find { it.code == itemCode } ?: return
        val newStatus = if (currentItem.transactionType == TransactionType.RENT) ItemStatus.RENTED else ItemStatus.HANDED_OVER

        val updatedItems = _uiState.value.items.map {
            if (it.code == itemCode) {
                it.copy(
                    status = newStatus,
                    reuseCount = it.reuseCount + 1
                )
            } else it
        }

        val action = if (currentItem.transactionType == TransactionType.RENT) ActionLogType.HANDOVER else ActionLogType.STOCK_OUT

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = action,
            itemCode = currentItem.code,
            itemName = currentItem.name,
            actor = "BQL Trạm K52 (Thủ kho)",
            notes = "Bàn giao cho người nhận: $recipientAlias. Ghi chú: ${notes.ifEmpty { "Giao dịch thành công tại Trạm K52" }}"
        )

        _uiState.update {
            it.copy(
                items = updatedItems,
                logs = listOf(newLog) + it.logs,
                notificationMessage = "Đã bàn giao vật phẩm ${currentItem.code} cho $recipientAlias."
            )
        }
    }

    // --- Admin Operations: Return Item (Trả đồ sau thuê/mượn) ---
    fun returnItem(itemCode: String, newCondition: ItemCondition, lockerReturn: String, notes: String = "") {
        val currentItem = _uiState.value.items.find { it.code == itemCode } ?: return

        val updatedItems = _uiState.value.items.map {
            if (it.code == itemCode) {
                it.copy(
                    status = ItemStatus.AVAILABLE,
                    condition = newCondition,
                    stationLocker = lockerReturn.ifEmpty { it.stationLocker }
                )
            } else it
        }

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = ActionLogType.RETURN_ITEM,
            itemCode = currentItem.code,
            itemName = currentItem.name,
            actor = "BQL Trạm K52 (Kiểm định viên)",
            notes = "Đã nhận trả đồ vào $lockerReturn. Tình trạng sau trả: ${newCondition.displayName}. ${notes.ifEmpty { "Kiểm tra nguyên vẹn" }}"
        )

        _uiState.update {
            it.copy(
                items = updatedItems,
                logs = listOf(newLog) + it.logs,
                notificationMessage = "Đã hoàn tất nhận trả đồ cho vật phẩm ${currentItem.code}. Vật phẩm sẵn sàng phục vụ tiếp!"
            )
        }
    }

    // --- Quick Reserve / Register Interest (Student Action) ---
    fun reserveItem(itemCode: String, studentAlias: String) {
        val currentItem = _uiState.value.items.find { it.code == itemCode } ?: return
        if (currentItem.status != ItemStatus.AVAILABLE) return

        val updatedItems = _uiState.value.items.map {
            if (it.code == itemCode) it.copy(status = ItemStatus.RESERVED) else it
        }

        val newLog = TransactionLog(
            id = "log_${System.currentTimeMillis()}",
            timestamp = getCurrentTimeString(),
            actionType = ActionLogType.HANDOVER,
            itemCode = currentItem.code,
            itemName = currentItem.name,
            actor = studentAlias,
            notes = "Học sinh $studentAlias đã đăng ký nhận/giữ chỗ. Chờ thủ kho xuất đồ tại ${currentItem.stationLocker}."
        )

        _uiState.update {
            it.copy(
                items = updatedItems,
                logs = listOf(newLog) + it.logs,
                selectedItemForDetail = null,
                notificationMessage = "Đã đặt chỗ thành công món đồ ${currentItem.code}! Vui lòng đến ${currentItem.stationLocker} trong vòng 24h."
            )
        }
    }

    // --- Filtered Items calculation ---
    fun getFilteredItems(): List<ExchangeItem> {
        val s = _uiState.value
        val q = s.filter.searchQuery.trim().lowercase()

        return s.items.filter { item ->
            // Search query matches name, code, subject, notes, or ownerAlias
            val matchesQuery = q.isEmpty() ||
                item.name.lowercase().contains(q) ||
                item.code.lowercase().contains(q) ||
                item.subject.lowercase().contains(q) ||
                item.notes.lowercase().contains(q)

            // Category match
            val matchesCategory = s.filter.selectedCategory == null || item.category == s.filter.selectedCategory

            // Grade match
            val matchesGrade = s.filter.selectedGrade == GradeLevel.ALL ||
                item.gradeLevel == GradeLevel.ALL ||
                item.gradeLevel == s.filter.selectedGrade

            // Transaction Type match
            val matchesType = s.filter.selectedTransactionType == null || item.transactionType == s.filter.selectedTransactionType

            // Availability match
            val matchesAvailability = !s.filter.onlyAvailable || item.status == ItemStatus.AVAILABLE

            // Free or gift match
            val matchesFree = !s.filter.onlyGiftOrFree || (item.price == 0L && item.rentPricePerWeek == 0L) || item.transactionType == TransactionType.GIFT

            // Max price match
            val matchesPrice = s.filter.maxPrice == null || item.price <= s.filter.maxPrice

            matchesQuery && matchesCategory && matchesGrade && matchesType && matchesAvailability && matchesFree && matchesPrice
        }
    }
}
