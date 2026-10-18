# Kế hoạch phát triển: Hệ sinh thái Alpha-K52 – Trạm giao dịch tri thức & Tuần hoàn học liệu học đường

> **Đơn vị thực hiện**: Nhóm học sinh Lớp 11A1 (Khóa 52) – Trường THPT Lương Văn Tri (Văn Quan, Lạng Sơn)  
> **Giáo viên hướng dẫn**: Cô Hứa Thị Thanh Thương  
> **Cuộc thi**: "Học sinh, sinh viên với ý tưởng khởi nghiệp" Cấp tỉnh năm 2026 – Lĩnh vực Kinh doanh tạo tác động xã hội

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Dựa trên hồ sơ thuyết minh dự án chi tiết tháng 10/2026 của học sinh Trường THPT Lương Văn Tri, các quyết định kiến trúc và trải nghiệm người dùng được thiết kế chuẩn mực như sau:

- **Confirmed Decision 1: Cấu trúc đa phân hệ đồng bộ**: Nâng cấp toàn diện ứng dụng từ một web quản lý kho đơn thuần thành một **Hệ sinh thái số Alpha-K52 hoàn chỉnh**, tích hợp đầy đủ 5 phân hệ cốt lõi:
  1. **Alpha Pass**: Thẻ định danh QR học sinh, ví điểm trao đổi nội bộ **Alpha Coin** (quy chuẩn không quy đổi tiền mặt), Wishlist cá nhân và nhật ký nhận/gửi học liệu.
  2. **Alpha Manager**: Hệ thống nghiệp vụ thủ kho / Ban quản lý (BQL) trạm với cơ chế quét đối chiếu **2 mã QR** (Thẻ Alpha Pass + Tem QR vật phẩm), kiểm định tình trạng A/B/C, phân bổ ô tủ trạm (Station Locker), sổ cái Coin Ledger và ghi chép bút toán điều chỉnh không xóa lịch sử.
  3. **Alpha Match**: Động cơ thuật toán ghép nối thông minh dựa trên nhu cầu khai báo trước (Wishlist) đối chiếu với kho vật phẩm theo Môn học · Khối lớp (10–12) · Ấn bản/Phiên bản sách · Tình trạng · Hình thức (Tặng/Thuê/Đổi/Mua).
  4. **Alpha Heritage & Alpha Share**: Kho chia sẻ học liệu tự biên soạn có bản quyền và cam kết cho phép từ học sinh giỏi; Quỹ học liệu Alpha Share hỗ trợ bảo mật danh tính cho học sinh hoàn cảnh khó khăn.
  5. **Alpha Eco & Alpha Discovery**: Phân hệ sản phẩm tạo dòng tiền thật (Doanh thu bọc/làm mới sách, combo dụng cụ Discovery, bookmark/thiệp giấy mầm thảo mộc từ giấy thừa STEM) tách bạch hoàn toàn với số liệu tác động xã hội.
- **Confirmed Decision 2: Chế độ Thuyết minh & Gian hàng số (Competition Pitch & Exhibit Mode)**: Bổ sung chế độ chuyên biệt dành cho Ban Giám khảo (BGK) và người xem cuộc thi: Đọc trực tiếp Bản thuyết minh 6 trang chuẩn thể thức, xem Canvas mô hình kinh doanh, bảng tính tài chính độ nhạy hòa vốn (3,8 tháng), hồ sơ đội thi 11A1 và mô phỏng chu trình thực tế 1 chạm.
- **Confirmed Decision 3: Cơ chế QR Scanner linh hoạt**: Tích hợp cả trình quét Camera HTML5 thực tế và chế độ mô phỏng quét nhanh (Demo Barcode Scanner) để kiểm thử mượt mà trên mọi thiết bị máy tính, máy tính bảng và điện thoại.

---

## 1. Overview & Core Concept

### What It Does
**Alpha-K52** là giải pháp trạm trung chuyển tri thức và tuần hoàn học liệu học đường tại Trường THPT Lương Văn Tri. Nền tảng giải quyết triệt để vấn đề lãng phí sách vở, tài liệu và dụng cụ học tập sau mỗi kỳ học bằng cách kết nối người dư với người cần thông qua quy trình chuẩn hóa:
- **Thu thập nhu cầu trước (Alpha Wishlist)** thay vì thu gom tự phát.
- **Ghép nối chính xác (Alpha Match)** theo chương trình GDPT mới (Sách Kết nối tri thức, Cánh Diều, Chân trời sáng tạo...).
- **Truy vết đường đi vật phẩm bằng 2 mã QR**: QR thẻ thành viên (Alpha Pass) và QR tem vật phẩm.
- **Quản lý điểm Alpha Coin minh bạch** trong sổ cái (Ledger), tách biệt dòng điểm nội bộ với dòng tiền thật từ các dịch vụ giá trị gia tăng (bọc sách, combo STEM Eco).

### Target Audience & Persona
1. **Học sinh THPT (Khối 10, 11, 12)**: Tìm sách giáo khoa, sách bài tập, máy tính cầm tay Casio, thước kẻ kỹ thuật với chi phí tiết kiệm hoặc mượn miễn phí; chia sẻ tài liệu tự ôn tập (Alpha Heritage); tích lũy điểm Coin để đổi học liệu khác.
2. **Ban Quản lý Trạm (Học sinh 11A1 & Đoàn trường)**: Thủ kho kiểm định chất lượng sách vở (tình trạng 90% Like New, 80% Very Good, có ghi chú nhẹ...), xếp vào ô tủ K52-Locker, xác nhận bàn giao và đối soát sổ sách.
3. **Phụ huynh & Nhà trường**: Yên tâm về tính minh bạch, tiết kiệm ngân sách gia đình, giáo dục ý thức sẻ chia và bảo vệ môi trường theo định hướng STEM.
4. **Ban Giám khảo Cuộc thi Khởi nghiệp 2026**: Đánh giá tính khả thi, tính sáng tạo, mô hình tài chính và tác động xã hội có minh chứng rõ ràng.

### Key Value
- **Giảm 60–80% chi phí học liệu** cho gia đình học sinh.
- **Không tồn kho chết**: Chỉ nhận và gom học liệu đúng với danh sách học sinh đang có nhu cầu.
- **Minh bạch tài chính & trách nhiệm**: Tách bạch 100% giữa điểm trao đổi Coin và doanh thu tiền mặt; không thương mại hóa học liệu từ thiện.

---

## 2. User Experience & Visual Design

### Design Language & System (Tuân thủ Frontend Design Constitution)
- **Aesthetic Direction**: Hiện đại, thanh lịch, tinh thần học đường Lương Văn Tri – Văn Quan. Kết hợp màu xanh thông tri thức (Forest Green / Pine `#184E38`), xanh ngọc dịu (`#2D8A63`), nền ấm nhẹ tạo cảm giác sách giấy thân thiện (`#F8FAF8`), bề mặt trắng sạch ngà (`#FFFFFF`).
- **Zero-Pill Discipline**: Tuyệt đối không dùng các khối pill capsule ngột ngạt để bọc metadata tĩnh. Dùng chữ unboxed tinh gọn ngăn cách bằng dấu chấm giữa `·` hoặc gạch chéo `/`. Thẻ lọc (Segmented Controls) sử dụng phong cách nút bấm phẳng dải tab rõ ràng.
- **Top Bar Contract**: Đúng chuẩn 3 phân vùng (Zone 1: Logo & Tên trạm một dòng `Alpha-K52` · Zone 2: 5 liên kết điều hướng sạch gọn · Zone 3: Thẻ định danh Alpha Pass hoặc Nút chuyển quyền Thủ kho BQL).
- **Tabular Figures**: Toàn bộ số lượng, mã định danh `K52-SGK-01`, số dư Alpha Coin, thời gian giao dịch và bảng phân tích tài chính đều sử dụng `tabular-nums font-mono`.

### Navigation Architecture (Hệ thống phân hệ)
1. **Trạm giao dịch & Ghép nối (Alpha Match & Exchange)**:
   - Thanh tìm kiếm và bộ lọc đa chiều (Khối 10-11-12, Môn học, Phiên bản bộ sách, Tình trạng A/B/C).
   - Công cụ **Alpha Match Generator**: Học sinh nhập nhu cầu (Wishlist) $\rightarrow$ Hệ thống quét kho theo thuật toán trọng số và trả về danh sách ghép nối đề xuất ngay lập tức.
   - Thẻ hiển thị học liệu trực quan, có mã tem QR, vị trí ô tủ (`Tủ A-02`, `Tủ B-05`) và nút "Đặt chỗ nhận tại trạm".
2. **Thẻ thành viên số (Alpha Pass Wallet)**:
   - Thẻ định danh số độc bản: Mã định danh ngẫu nhiên (ví dụ `PASS-K52-9482`), Avatar bí danh học sinh, Cấp độ cống hiến, Số dư **Alpha Coin**.
   - Danh sách Wishlist cá nhân đang chờ ghép nối.
   - Lịch sử tích lũy/sử dụng Coin và các vật phẩm đã từng tuần hoàn.
3. **Cổng điều hành trạm (Alpha Manager - Admin Portal)**:
   - Bảng điều khiển tác nghiệp nhanh: Quét QR thành viên + Quét QR vật phẩm $\rightarrow$ Tự động khớp lệnh bàn giao/nhận trả.
   - Phê duyệt yêu cầu gửi đồ (Approve / Reject kèm lý do cụ thể).
   - Kiểm tra ô tủ trạm (Locker Grid 30 ngăn trực quan, xem ngăn nào trống, ngăn nào có đồ).
   - Sổ cái kiểm toán Coin Ledger & Transaction Log: Cho phép ghi nhận "Bút toán điều chỉnh" minh bạch khi có sai lệch, không xóa lịch sử.
4. **Góc Tri Thức & Sáng Tạo (Heritage, Eco & Discovery)**:
   - **Alpha Heritage**: Thư viện tài liệu tự biên soạn (Đề thi thử, sơ đồ tư duy môn Sinh/Hóa/Văn, bí kíp học tập của học sinh 11A1), có nút xem trước tài liệu và ghi nhận bản quyền tác giả học sinh.
   - **Alpha Eco**: Trưng bày sản phẩm tái chế STEM (Bookmark giấy mầm hạt giống rau cải/hoa cúc, thiệp handmade từ giấy thừa học đường) kèm hướng dẫn quy trình STEM của cô Hứa Thị Thanh Thương.
   - **Alpha Discovery**: Danh mục Combo đồ dùng học tập chất lượng cao (Combo Hình học THPT, Combo Bút viết thi THPT) và Báo giá dịch vụ bọc/làm mới sách.
5. **Báo cáo Tác động Xã hội & Tài chính (Impact & Finance Dashboard)**:
   - 4 chỉ số tác động xã hội độc lập: Tổng học liệu tuần hoàn, Ước tính chi phí tiết kiệm cho học sinh, Khối lượng giấy sạch tái chế, Tỷ lệ ghép nối thành công.
   - Bảng phân tích kinh doanh thực tế: Doanh thu combo, dịch vụ bọc sách, lãi gộp dự kiến, thời gian hòa vốn 3.8 tháng và kịch bản phân tích độ nhạy rủi ro.
6. **Hồ sơ Thuyết minh & Gian hàng số Cuộc thi 2026**:
   - Toàn văn Bản thuyết minh dự án 6 trang chính thức được trình bày chuẩn khoa học.
   - Danh sách 05 học sinh 11A1 đảm nhiệm 5 nhiệm vụ cụ thể và Giáo viên hướng dẫn.
   - Video Pitch Guide & Kịch bản thuyết trình gian hàng tại Ngày hội Khởi nghiệp 2026.

---

## 3. Key Product Decisions & Trade-Offs

### Quyết định 1: Tách bạch tuyệt đối giữa Điểm trao đổi (Alpha Coin) và Tiền mặt (Cash)
- **Giải pháp**: Alpha Coin là điểm trao đổi nội bộ, chỉ phát sinh khi học sinh trao đổi/quyên góp học liệu thành công. Không cho phép mua nạp Coin bằng tiền mặt, không cho phép rút Coin ra tiền mặt.
- **Lý do**: Đảm bảo tuân thủ 100% quy chế nhà trường, ngăn chặn việc thương mại hóa bất hợp pháp trong học đường, đồng thời bảo đảm tính nhân văn của mô hình Kinh doanh Tác động Xã hội. Doanh thu tiền mặt của dự án chỉ đến từ các sản phẩm vật lý giá trị gia tăng tự sản xuất (Combo Discovery, Dịch vụ bọc sách, Giấy mầm Eco).

### Quyết định 2: Thuật toán ghép nối Alpha Match theo nhu cầu trước (Demand-First)
- **Giải pháp**: Xây dựng thuật toán tính toán độ phù hợp (Match Score %):
  $$\text{Match Score} = W_{\text{grade}} \cdot S_{\text{grade}} + W_{\text{subject}} \cdot S_{\text{subject}} + W_{\text{edition}} \cdot S_{\text{edition}} + W_{\text{type}} \cdot S_{\text{type}}$$
- **Lý do**: Tránh tình trạng của các chương trình quyên góp truyền thống (thu về hàng trăm cuốn sách cũ không đúng chương trình cải cách hoặc không có người dùng, gây tồn kho và ẩm mốc).

### Quyết định 3: Sổ cái kiểm toán bất biến (Immutable Audit Ledger) với Bút toán điều chỉnh
- **Giải pháp**: Nghiêm cấm hành vi sửa/xóa giao dịch cũ trong cơ sở dữ liệu. Nếu thủ kho nhập nhầm hoặc học sinh đổi ý, hệ thống yêu cầu lập một bản ghi "Bút toán điều chỉnh" (Adjusting Entry) có ghi rõ nguyên nhân và người phê duyệt.
- **Lý do**: Đáp ứng nguyên tắc minh bạch và kiểm soát rủi ro được nhấn mạnh trong Thuyết minh dự án của THPT Lương Văn Tri.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                ALPHA-K52 CLIENT APPLICATION                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark · Nav Links · Alpha Pass Switch · Admin Role Auth)     │
├──────────────────────────────────────────┬─────────────────────────────────────────────┤
│             STUDENT WORKSPACE            │            ADMIN / BQL WORKSPACE            │
│  ┌────────────────────────────────────┐  │  ┌───────────────────────────────────────┐  │
│  │ 1. Trạm giao dịch & Alpha Match    │  │  │ 1. Trạm tác nghiệp 2 mã QR             │  │
│  │    - Bộ lọc Môn/Khớp lớp/Ấn bản    │  │  │    - Scan Alpha Pass (Khách)          │  │
│  │    - Wishlist khai báo nhu cầu     │  │  │    - Scan QR Item (Học liệu)          │  │
│  │    - Ghép nối thông minh & Giữ chỗ │  │  │    - Phân bổ Ô tủ Trạm (Locker Grid)  │  │
│  │ 2. Thẻ số Alpha Pass & Ví Coin     │  │  │ 2. Duyệt đơn đăng ký gửi đồ           │  │
│  │    - QR Card · Lịch sử Coin        │  │  │ 3. Sổ cái Coin & Transaction Ledger   │  │
│  │ 3. Alpha Heritage & Alpha Share    │  │  │    - Bút toán điều chỉnh minh bạch    │  │
│  │    - Thư viện ôn tập có bản quyền  │  │  │ 4. Kiểm kê tồn kho & Quỹ hỗ trợ       │  │
│  │ 4. Alpha Eco & Alpha Discovery     │  │  └───────────────────────────────────────┘  │
│  │    - Giấy mầm STEM · Combo dụng cụ │                                                │
│  └────────────────────────────────────┘                                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                        EXHIBIT & COMPETITION PITCH WORKSPACE                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ - Toàn văn Bản thuyết minh 6 trang chính thức (THPT Lương Văn Tri - 10/2026)     │  │
│  │ - Bảng phân tích Canvas & Mô hình tài chính độ nhạy 3.8 tháng hòa vốn            │  │
│  │ - Video Pitch Guide & Thông tin danh sách 5 thành viên 11A1 & GVHD               │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                        SHARED CORE SERVICES & STATE ENGINES                            │
│  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ Storage & State   │  │ Alpha Match Engine│  │ QR Generator &   │  │ Coin & Ledger│  │
│  │ (LocalStorage API)│  │ (Weighted Match)  │  │ HTML5/Mock Scan  │  │ Audit Engine │  │
│  └───────────────────┘  └───────────────────┘  └──────────────────┘  └──────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities

```typescript
// Thành viên & Thẻ Alpha Pass
interface AlphaPassMember {
  id: string;
  passCode: string; // VD: PASS-K52-8821
  aliasName: string; // Tên bí danh học sinh
  grade: '10' | '11' | '12';
  coinBalance: number; // Điểm Alpha Coin nội bộ
  contributedCount: number;
  receivedCount: number;
  qrPayload: string;
  wishlist: WishlistDemand[];
}

// Yêu cầu nhu cầu học liệu (Alpha Wishlist)
interface WishlistDemand {
  id: string;
  studentId: string;
  studentAlias: string;
  subject: string;
  gradeLevel: 'GRADE_10' | 'GRADE_11' | 'GRADE_12';
  titleOrEdition: string; // VD: Sách Chuyên đề Hóa học 11 - Kết nối tri thức
  expectedCondition: 'LIKE_NEW' | 'VERY_GOOD' | 'GOOD_WITH_NOTES';
  preferredType: 'GIFT' | 'RENT' | 'EXCHANGE' | 'SALE';
  maxCoinOrBudget: number;
  status: 'PENDING' | 'MATCHED' | 'FULFILLED';
  createdAt: string;
}

// Học liệu trạm giao dịch (ExchangeItem)
interface ExchangeItem {
  id: string;
  code: string; // VD: K52-SGK-1101
  name: string;
  category: ItemCategory;
  gradeLevel: GradeLevel;
  subject: string;
  condition: ItemCondition;
  ownerAlias: string;
  price: number;
  coinValue: number; // Điểm quy đổi Coin
  quantity: number;
  status: 'AVAILABLE' | 'RESERVED' | 'RENTED' | 'HANDED_OVER';
  transactionType: 'GIFT' | 'RENT' | 'SALE' | 'EXCHANGE';
  stationLocker: string; // Ô tủ trạm (VD: Locker A-03)
  reuseCount: number;
  isbnOrEdition: string;
}

// Sản phẩm Eco & Combo Discovery
interface StationProduct {
  id: string;
  sku: string;
  name: string;
  type: 'ECO_SEED_PAPER' | 'DISCOVERY_COMBO' | 'BOOK_COVER_SERVICE';
  price: number;
  cost: number;
  description: string;
  inStock: number;
  tags: string[];
}
```

---

## 5. Implementation Phases & Verification Steps

1. **Step 1: Củng cố Core Types & Dữ liệu mô phỏng chuẩn Thuyết minh THPT Lương Văn Tri**
   - Bổ sung định nghĩa cho Alpha Pass, Wishlist, Alpha Match, Eco/Discovery, Sổ cái Coin.
   - Xây dựng kho dữ liệu 25+ học liệu thực tế bám sát chương trình THPT (Bộ sách Cánh Diều, Kết nối tri thức, Chân trời sáng tạo, máy tính Casio fx-580VNX, compa thước vẽ...).
2. **Step 2: Nâng cấp Header & Điều hướng Top Bar**
   - Tinh gọn Navigation bar đạt chuẩn Top Bar Contract: Thương hiệu rõ ràng, điều hướng mạch lạc, tích hợp modal đổi quyền Admin bằng PIN `1234`.
3. **Step 3: Xây dựng Module Alpha Match & Wishlist**
   - Giao diện tra cứu và đăng nhu cầu học liệu.
   - Thuật toán ghép nối tự động hiển thị tỷ lệ % tương thích và nút 1-chạm đặt trước.
4. **Step 4: Hoàn thiện Thẻ số Alpha Pass & Ví Coin**
   - Render thẻ Card cá nhân hóa sắc nét kèm mã QR chuẩn.
   - Thống kê đóng góp, biến động số dư Coin có diễn giải chi tiết.
5. **Step 5: Nâng cấp Alpha Manager (Bàn điều hành trạm & 2 mã QR)**
   - Giao diện quét đối chiếu mã Alpha Pass + mã tem học liệu.
   - Trực quan hóa sơ đồ ô tủ Trạm (Locker Grid 30 ngăn).
   - Kiểm toán sổ cái Coin Ledger và ghi chép bút toán điều chỉnh.
6. **Step 6: Tích hợp Alpha Heritage, Alpha Eco & Alpha Discovery**
   - Thư viện tài liệu tự biên soạn của học sinh 11A1 (có bản quyền tác giả).
   - Danh mục sản phẩm tái chế STEM (Giấy mầm sinh học có hạt giống, Bookmark).
   - Bảng giá dịch vụ bọc sách & Combo dụng cụ.
7. **Step 7: Tích hợp Bảng Thuyết minh Dự án & Chế độ Ban Giám khảo (Pitch Mode)**
   - Tích hợp toàn văn hồ sơ thuyết minh dự án 6 trang, Business Model Canvas, Phân tích tài chính hòa vốn 3.8 tháng và kịch bản phân tích độ nhạy.
8. **Step 8: Build Verification (`compile_applet`)**
   - Đảm bảo biên dịch hoàn hảo không lỗi TypeScript và layout mượt mà trên mọi kích thước màn hình.
