package com.example.model

enum class ItemCategory(val displayName: String, val iconName: String) {
    TEXTBOOK("Sách giáo khoa", "MenuBook"),
    REFERENCE_BOOK("Sách tham khảo", "AutoStories"),
    EXAM_DOCUMENT("Tài liệu ôn thi", "Description"),
    STUDY_TOOL("Dụng cụ học tập", "Architecture"),
    TECH_DEVICE("Máy tính & Thiết bị", "Calculate"),
    UNIFORM_ACCESSORY("Đồng phục & Phụ kiện", "Checkroom"),
    OTHER("Vật phẩm khác", "Category")
}

enum class GradeLevel(val displayName: String) {
    ALL("Đa khối / Chung"),
    GRADE_10("Khối 10"),
    GRADE_11("Khối 11"),
    GRADE_12("Khối 12")
}

enum class TransactionType(val displayName: String, val badgeColorHex: Long) {
    GIFT("Tặng 0đ", 0xFF059669),
    RENT("Cho thuê", 0xFF2563EB),
    SALE("Bán lại", 0xFFD97706),
    EXCHANGE("Trao đổi", 0xFF7C3AED),
    CONSIGNMENT("Ký gửi trạm", 0xFF0F766E),
    WANTED("Cần mua/tìm", 0xFFDC2626)
}

enum class ItemCondition(val displayName: String) {
    LIKE_NEW("Mới 99% (Nguyên bản)"),
    VERY_GOOD("Rất tốt 90-95%"),
    GOOD_WITH_NOTES("Tốt 80% (Có ghi chú hay)"),
    ACCEPTABLE("Khá 70% (Còn dùng tốt)")
}

enum class ItemStatus(val displayName: String, val colorHex: Long) {
    AVAILABLE("Sẵn sàng trong kho", 0xFF16A34A),
    RESERVED("Đã hẹn lấy", 0xFFD97706),
    RENTED("Đang cho thuê", 0xFF2563EB),
    HANDED_OVER("Đã bàn giao", 0xFF4B5563),
    PENDING_APPROVAL("Chờ kiểm duyệt", 0xFF9333EA)
}

data class ExchangeItem(
    val id: String,
    val code: String, // Ví dụ: K52-SGK-01
    val name: String,
    val category: ItemCategory,
    val gradeLevel: GradeLevel,
    val subject: String,
    val condition: ItemCondition,
    val ownerAlias: String, // Biệt danh bảo mật của học sinh, ví dụ "HS K52-Toán"
    val price: Long = 0L, // Giá bán (0đ nếu tặng/đổi)
    val rentPricePerWeek: Long = 0L, // Giá thuê theo tuần/kỳ
    val quantity: Int = 1,
    val status: ItemStatus = ItemStatus.AVAILABLE,
    val transactionType: TransactionType = TransactionType.SALE,
    val notes: String = "",
    val stationLocker: String = "Tủ K52 - Tầng 1 Nhà A",
    val reuseCount: Int = 1, // Số lần đã được học sinh trước chuyển giao lại
    val createdAt: String = "15/10/2026"
)

enum class RequestStatus(val displayName: String) {
    PENDING("Chờ duyệt"),
    APPROVED("Đã duyệt nhập kho"),
    REJECTED("Từ chối")
}

data class RegistrationRequest(
    val id: String,
    val itemCode: String,
    val transactionType: TransactionType,
    val itemName: String,
    val category: ItemCategory,
    val gradeLevel: GradeLevel,
    val subject: String,
    val condition: ItemCondition,
    val proposedPrice: Long,
    val proposedRentPrice: Long,
    val quantity: Int,
    val notes: String,
    val studentAlias: String, // Giả lập bí danh học sinh
    val internalContactNotice: String = "Lưu an toàn nội bộ Đoàn - Trạm K52 (không công khai)",
    val status: RequestStatus = RequestStatus.PENDING,
    val submittedAt: String = "Hôm nay",
    val rejectionReason: String? = null
)

enum class ActionLogType(val displayName: String, val badgeColorHex: Long) {
    STOCK_IN("Nhập kho", 0xFF16A34A),
    STOCK_OUT("Xuất kho", 0xFFEA580C),
    HANDOVER("Bàn giao", 0xFF0284C7),
    RETURN_ITEM("Trả đồ", 0xFF10B981),
    APPROVE_REQUEST("Duyệt đăng ký", 0xFF8B5CF6),
    REJECT_REQUEST("Từ chối đơn", 0xFFEF4444)
}

data class TransactionLog(
    val id: String,
    val timestamp: String,
    val actionType: ActionLogType,
    val itemCode: String,
    val itemName: String,
    val actor: String, // Quản trị viên Kho K52
    val notes: String
)

enum class UserRole(val displayName: String) {
    STUDENT("Học sinh / Người tìm đồ"),
    ADMIN("Quản trị viên Kho K52")
}
