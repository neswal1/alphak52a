package com.example.data

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

object DemoDataProvider {

    fun getInitialItems(): List<ExchangeItem> = listOf(
        ExchangeItem(
            id = "item_1",
            code = "K52-SGK-01",
            name = "Bộ SGK Chân Trời Sáng Tạo Toán 10 (Tập 1 & 2)",
            category = ItemCategory.TEXTBOOK,
            gradeLevel = GradeLevel.GRADE_10,
            subject = "Toán học",
            condition = ItemCondition.VERY_GOOD,
            ownerAlias = "Học sinh K52-Chuyên Toán (Ẩn danh)",
            price = 0L,
            rentPricePerWeek = 0L,
            quantity = 2,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.GIFT,
            notes = "Có bọc bìa kiếng cẩn thận, kèm một số ghi chú giải nhanh phương pháp vecto và hàm số.",
            stationLocker = "Tủ K52 - Ô số 12 (Sảnh Nhà A)",
            reuseCount = 3,
            createdAt = "12/10/2026"
        ),
        ExchangeItem(
            id = "item_2",
            code = "K52-MAY-02",
            name = "Máy tính bỏ túi Casio fx-580VN X",
            category = ItemCategory.TECH_DEVICE,
            gradeLevel = GradeLevel.ALL,
            subject = "Toán / Khoa học",
            condition = ItemCondition.LIKE_NEW,
            ownerAlias = "Cựu học sinh K51 gửi lại",
            price = 320000L,
            rentPricePerWeek = 15000L,
            quantity = 1,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.RENT,
            notes = "Còn tem bảo hành chính hãng, phím bấm cực nảy, đầy đủ nắp bảo vệ. Rất hợp cho đợt thi giữa kỳ.",
            stationLocker = "Tủ K52 - Ô số 04 (Phòng Thiết bị)",
            reuseCount = 5,
            createdAt = "14/10/2026"
        ),
        ExchangeItem(
            id = "item_3",
            code = "K52-TL-03",
            name = "Cẩm nang Sơ đồ tư duy Lịch sử 12 ôn thi Tốt nghiệp",
            category = ItemCategory.EXAM_DOCUMENT,
            gradeLevel = GradeLevel.GRADE_12,
            subject = "Lịch sử",
            condition = ItemCondition.GOOD_WITH_NOTES,
            ownerAlias = "Thành viên K52-Sử",
            price = 0L,
            rentPricePerWeek = 0L,
            quantity = 3,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.GIFT,
            notes = "Tóm tắt mốc sự kiện 1919-2000 bằng sơ đồ cây dễ nhớ, viết tay nắn nót.",
            stationLocker = "Tủ K52 - Ô số 18",
            reuseCount = 2,
            createdAt = "15/10/2026"
        ),
        ExchangeItem(
            id = "item_4",
            code = "K52-DC-04",
            name = "Bộ Compa kỹ thuật & Thước parabol Master",
            category = ItemCategory.STUDY_TOOL,
            gradeLevel = GradeLevel.GRADE_11,
            subject = "Toán / Kỹ thuật",
            condition = ItemCondition.LIKE_NEW,
            ownerAlias = "HS Khối 11 (Ký gửi)",
            price = 35000L,
            rentPricePerWeek = 5000L,
            quantity = 1,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.SALE,
            notes = "Hộp kim loại nguyên vẹn, kim nhọn và chì sơ cua còn nguyên.",
            stationLocker = "Tủ K52 - Ô số 07",
            reuseCount = 1,
            createdAt = "16/10/2026"
        ),
        ExchangeItem(
            id = "item_5",
            code = "K52-SGK-05",
            name = "Sách Tiếng Anh Global Success 11 (Student Book)",
            category = ItemCategory.TEXTBOOK,
            gradeLevel = GradeLevel.GRADE_11,
            subject = "Tiếng Anh",
            condition = ItemCondition.VERY_GOOD,
            ownerAlias = "Học sinh 11A3",
            price = 25000L,
            rentPricePerWeek = 0L,
            quantity = 1,
            status = ItemStatus.RENTED,
            transactionType = TransactionType.CONSIGNMENT,
            notes = "Đang được bạn học sinh K52 mượn học kỳ 1.",
            stationLocker = "Tủ K52 - Ô số 02",
            reuseCount = 2,
            createdAt = "10/10/2026"
        ),
        ExchangeItem(
            id = "item_6",
            code = "K52-DP-06",
            name = "Áo khoác đồng phục mùa đông K52 (Size L)",
            category = ItemCategory.UNIFORM_ACCESSORY,
            gradeLevel = GradeLevel.ALL,
            subject = "Đồng phục trường",
            condition = ItemCondition.LIKE_NEW,
            ownerAlias = "Cựu học sinh tốt nghiệp",
            price = 0L,
            rentPricePerWeek = 0L,
            quantity = 1,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.EXCHANGE,
            notes = "Đã giặt sạch thơm tho, khóa kéo mượt, muốn đổi lấy đồng phục thể thao Size M hoặc tặng bạn cần.",
            stationLocker = "Tủ K52 - Móc treo số 01",
            reuseCount = 2,
            createdAt = "16/10/2026"
        ),
        ExchangeItem(
            id = "item_7",
            code = "K52-TL-07",
            name = "Tuyển tập 50 đề thi HSG Vật lý 10 có giải chi tiết",
            category = ItemCategory.EXAM_DOCUMENT,
            gradeLevel = GradeLevel.GRADE_10,
            subject = "Vật lý",
            condition = ItemCondition.GOOD_WITH_NOTES,
            ownerAlias = "Đội tuyển Lý K52",
            price = 20000L,
            rentPricePerWeek = 5000L,
            quantity = 2,
            status = ItemStatus.AVAILABLE,
            transactionType = TransactionType.CONSIGNMENT,
            notes = "In 2 mặt rõ nét, có highlight các bẫy đề thi tỉnh.",
            stationLocker = "Tủ K52 - Ô số 15",
            reuseCount = 4,
            createdAt = "17/10/2026"
        )
    )

    fun getInitialRequests(): List<RegistrationRequest> = listOf(
        RegistrationRequest(
            id = "req_1",
            itemCode = "K52-SGK-08",
            transactionType = TransactionType.GIFT,
            itemName = "Bộ sách Ngữ văn 10 Kết Nối Tri Thức (Tập 1 + 2)",
            category = ItemCategory.TEXTBOOK,
            gradeLevel = GradeLevel.GRADE_10,
            subject = "Ngữ văn",
            condition = ItemCondition.VERY_GOOD,
            proposedPrice = 0L,
            proposedRentPrice = 0L,
            quantity = 1,
            notes = "Mình đã thi học kỳ xong, muốn tặng lại cho các bạn khóa dưới cần sách học.",
            studentAlias = "HS Khóa K52-Văn",
            status = RequestStatus.PENDING,
            submittedAt = "17/10/2026 08:30"
        ),
        RegistrationRequest(
            id = "req_2",
            itemCode = "K52-MAY-09",
            transactionType = TransactionType.RENT,
            itemName = "Máy tính Vinacal 680EX Plus màu xanh dương",
            category = ItemCategory.TECH_DEVICE,
            gradeLevel = GradeLevel.ALL,
            subject = "Toán / Khoa học",
            condition = ItemCondition.LIKE_NEW,
            proposedPrice = 280000L,
            proposedRentPrice = 12000L,
            quantity = 1,
            notes = "Muốn cho các bạn thuê theo tuần đợt ôn thi hoặc bán lại cho bạn nào chưa có máy tính.",
            studentAlias = "HS Lớp 12 Tin",
            status = RequestStatus.PENDING,
            submittedAt = "17/10/2026 09:15"
        ),
        RegistrationRequest(
            id = "req_3",
            itemCode = "K52-DC-10",
            transactionType = TransactionType.CONSIGNMENT,
            itemName = "Hộp bút màu vẽ kiến trúc Touch Cool 36 màu",
            category = ItemCategory.STUDY_TOOL,
            gradeLevel = GradeLevel.ALL,
            subject = "Mỹ thuật / Đồ họa",
            condition = ItemCondition.GOOD_WITH_NOTES,
            proposedPrice = 60000L,
            proposedRentPrice = 10000L,
            quantity = 1,
            notes = "Các màu cơ bản còn mực nhiều, ký gửi trạm để bạn nào thi vẽ mượn dùng.",
            studentAlias = "HS K52-CLB Nghệ thuật",
            status = RequestStatus.PENDING,
            submittedAt = "16/10/2026 14:00"
        )
    )

    fun getInitialLogs(): List<TransactionLog> = listOf(
        TransactionLog(
            id = "log_1",
            timestamp = "17/10/2026 08:15",
            actionType = ActionLogType.STOCK_IN,
            itemCode = "K52-TL-07",
            itemName = "Tuyển tập 50 đề thi HSG Vật lý 10",
            actor = "BQL Trạm K52 (Thủ kho)",
            notes = "Đã tiếp nhận 2 quyển tài liệu ký gửi, cấp nhãn QR dán bìa ngoài."
        ),
        TransactionLog(
            id = "log_2",
            timestamp = "16/10/2026 16:45",
            actionType = ActionLogType.HANDOVER,
            itemCode = "K52-SGK-05",
            itemName = "Sách Tiếng Anh Global Success 11",
            actor = "BQL Trạm K52",
            notes = "Đã bàn giao cho học sinh mượn học kỳ 1 theo phiếu số #BG-24."
        ),
        TransactionLog(
            id = "log_3",
            timestamp = "15/10/2026 11:20",
            actionType = ActionLogType.APPROVE_REQUEST,
            itemCode = "K52-DC-04",
            itemName = "Bộ Compa kỹ thuật & Thước parabol Master",
            actor = "BQL Trạm K52",
            notes = "Phê duyệt đơn đăng ký bán lại, hẹn nhận vật phẩm tại sảnh Nhà A."
        ),
        TransactionLog(
            id = "log_4",
            timestamp = "14/10/2026 10:00",
            actionType = ActionLogType.STOCK_IN,
            itemCode = "K52-MAY-02",
            itemName = "Máy tính bỏ túi Casio fx-580VN X",
            actor = "BQL Trạm K52",
            notes = "Kiểm tra pin và chức năng màn hình tốt. Đưa vào ô tủ số 04."
        ),
        TransactionLog(
            id = "log_5",
            timestamp = "12/10/2026 15:30",
            actionType = ActionLogType.STOCK_IN,
            itemCode = "K52-SGK-01",
            itemName = "Bộ SGK Chân Trời Sáng Tạo Toán 10",
            actor = "BQL Trạm K52",
            notes = "Nhận tặng từ học sinh K52-Toán. Gắn mã định danh và lưu kho."
        )
    )
}
