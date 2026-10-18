import React, { useState } from 'react';
import {
  FileText,
  Users,
  Award,
  TrendingUp,
  Shield,
  Layers,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  Download,
  Building,
} from 'lucide-react';

export const ProposalPitchScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'document' | 'canvas' | 'financial' | 'team'>('document');
  const [sensitivityPercent, setSensitivityPercent] = useState<number>(100);

  // Financial simulation calculations based on Section 5 of the proposal
  const comboRevenue = (750000 * sensitivityPercent) / 100;
  const comboCost = (510000 * sensitivityPercent) / 100;

  const bookCoverRevenue = (400000 * sensitivityPercent) / 100;
  const bookCoverCost = (150000 * sensitivityPercent) / 100;

  const ecoRevenue = (480000 * sensitivityPercent) / 100;
  const ecoCost = (240000 * sensitivityPercent) / 100;

  const totalRevenue = comboRevenue + bookCoverRevenue + ecoRevenue;
  const totalDirectCost = comboCost + bookCoverCost + ecoCost;
  const grossProfit = totalRevenue - totalDirectCost;
  const fixedCost = 400000; // Chi phí vận hành cố định theo thuyết minh
  const netOperatingProfit = grossProfit - fixedCost;
  const initialCap = 1250000; // Vốn khởi tạo 1.250.000đ
  const paybackMonths =
    netOperatingProfit > 0 ? (initialCap / netOperatingProfit).toFixed(1) : 'Không hòa vốn';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123b2b] via-[#184E38] to-[#2D8A63] text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-100 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Hồ Sơ Dự Thi Cấp Tỉnh Năm 2026 · Lĩnh vực Kinh doanh Tạo tác động xã hội</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Bản Thuyết Minh Dự Án: Alpha-K52
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed text-balance">
            Dự án nghiên cứu & triển khai bởi nhóm học sinh Lớp 11A1 (Khóa 52) – Trường THPT Lương Văn Tri (Văn Quan, Lạng Sơn) dưới sự hướng dẫn chuyên môn của Cô Hứa Thị Thanh Thương.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveSubTab('document')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'document'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Toàn văn Bản Thuyết Minh 6 Trang
            </button>
            <button
              onClick={() => setActiveSubTab('canvas')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'canvas'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Mô hình Kinh doanh Canvas (9 Ô)
            </button>
            <button
              onClick={() => setActiveSubTab('financial')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'financial'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Mô phỏng Tài chính & Độ nhạy (3,8 Tháng)
            </button>
            <button
              onClick={() => setActiveSubTab('team')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeSubTab === 'team'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Đội ngũ Thực hiện Lớp 11A1 & Cố vấn
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab 1: Toàn văn Thuyết minh 6 Trang */}
      {activeSubTab === 'document' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8 max-w-4xl mx-auto text-stone-800 font-sans leading-relaxed text-sm">
          {/* Header Cover Information */}
          <div className="text-center pb-8 border-b-2 border-stone-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              CUỘC THI “HỌC SINH, SINH VIÊN VỚI Ý TƯỞNG KHỞI NGHIỆP” CẤP TỈNH NĂM 2026
            </div>
            <div className="text-xs font-semibold text-stone-600">
              LĨNH VỰC: KINH DOANH TẠO TÁC ĐỘNG XÃ HỘI
            </div>
            <h2 className="text-2xl font-black text-[#184E38] tracking-tight uppercase pt-2">
              BẢN THUYẾT MINH DỰ ÁN: ALPHA-K52
            </h2>
            <div className="text-base font-semibold text-stone-800">
              TRẠM GIAO DỊCH TRI THỨC VÀ VẬT PHẨM HỌC TẬP
            </div>
            <p className="text-xs italic text-stone-500 max-w-lg mx-auto">
              Ứng dụng Alpha Pass – Alpha Manager – Alpha Match trong kết nối và tuần hoàn học liệu học đường
            </p>
            <div className="pt-3 text-xs font-medium text-stone-700">
              Nhóm thực hiện: Học sinh lớp 11A1 (Khóa 52) · Trường THPT Lương Văn Tri (Văn Quan, tháng 10/2026)
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#184E38] uppercase border-b border-stone-200 pb-1">
              Trang 1: Thông tin vắn tắt về các thành viên & Cam kết
            </h3>
            <div className="bg-stone-50 p-4 rounded-xl space-y-2 text-xs">
              <p><strong>Trường/lớp:</strong> 11A1 – Trường THPT Lương Văn Tri (Huyện Văn Quan, Tỉnh Lạng Sơn).</p>
              <p><strong>Người hướng dẫn:</strong> Cô Hứa Thị Thanh Thương – Giáo viên Trường THPT Lương Văn Tri (Cố vấn STEM Alpha Eco, mô hình khởi nghiệp, phân tích hiệu quả và tuân thủ an toàn).</p>
              <div className="pt-2">
                <strong>Danh sách 05 học sinh thực hiện:</strong>
                <ol className="list-decimal pl-5 pt-1 space-y-1">
                  <li>Trưởng nhóm 11A1: Điều phối tổng thể, kế hoạch tài chính, đối soát sổ sách.</li>
                  <li>Phụ trách Công nghệ: Phần mềm Alpha Manager, thẻ số Alpha Pass, thuật toán Alpha Match.</li>
                  <li>Phụ trách Vận hành: Tiếp nhận kho học liệu Alpha Exchange, phân bổ ô tủ, Quỹ Alpha Share.</li>
                  <li>Phụ trách Tri thức & Truyền thông: Thư viện Alpha Heritage, khảo sát nhu cầu, truyền thông lớp.</li>
                  <li>Phụ trách STEM & Kiểm định: Hoạt động tái chế giấy mầm Alpha Eco, Combo Discovery, kiểm định sách A/B/C.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#184E38] uppercase border-b border-stone-200 pb-1">
              Trang 2: Tóm tắt dự án & Cơ chế giao dịch
            </h3>
            <p className="text-xs leading-relaxed text-stone-700">
              <strong>Ý tưởng chính:</strong> Alpha-K52 hình thành trạm giao dịch học liệu học đường kết nối người có sách, dụng cụ còn sử dụng tốt với người có nhu cầu; kết hợp thẻ Alpha Pass gắn QR, phần mềm quản lý Alpha Manager và chức năng ghép nối Alpha Match để giảm lãng phí, hỗ trợ học tập và khuyến khích tái sử dụng.
            </p>
            <p className="text-xs leading-relaxed text-stone-700">
              <strong>Cơ chế giao dịch:</strong> Quét mã Alpha Pass tại trạm; giao dịch có sự xác nhận của nhân viên được phân quyền và được ghi vào sổ cái. Alpha Coin chỉ là điểm trao đổi nội bộ, không bán và không quy đổi tiền mặt trong giai đoạn thử nghiệm.
            </p>
            <p className="text-xs leading-relaxed text-stone-700">
              <strong>Hai lớp giá trị tách biệt:</strong> Hoạt động trao đổi học liệu và hỗ trợ cộng đồng tạo tác động xã hội (đo bằng số sách, chi phí tiết kiệm cho học sinh); các nguồn thu tiền thật đến từ combo dụng cụ, dịch vụ bọc/làm mới sách và sản phẩm Alpha Eco có thể bán được.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#184E38] uppercase border-b border-stone-200 pb-1">
              Trang 3: Tính độc đáo, sáng tạo (Ba điểm cải tiến có thể chứng minh)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900">1. Ghép nối theo nhu cầu thật</div>
                <div className="text-stone-600">
                  Alpha Match tiếp nhận yêu cầu trước khi có hàng, đối chiếu môn – lớp – phiên bản – tình trạng để giảm thu gom sai nhu cầu.
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900">2. Truy vết bằng 2 mã QR</div>
                <div className="text-stone-600">
                  Thẻ Alpha Pass định danh thành viên + QR gắn với từng vật phẩm lưu thông tin người nhận, người duyệt, đối soát vòng đời học liệu.
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900">3. Tác động xã hội độc lập</div>
                <div className="text-stone-600">
                  Alpha Share thống kê vật phẩm tặng và học sinh được hỗ trợ bảo mật danh tính; không đồng nhất đóng góp xã hội với doanh thu tiền mặt.
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#184E38] uppercase border-b border-stone-200 pb-1">
              Trang 4–5: Kế hoạch tài chính & Quản trị rủi ro
            </h3>
            <div className="bg-stone-50 p-4 rounded-xl text-xs space-y-2">
              <div className="font-bold text-stone-800">
                Kịch bản hoạt động 01 tháng ổn định (Minh bạch chi phí):
              </div>
              <ul className="list-disc pl-5 space-y-1 text-stone-600 font-mono">
                <li>30 Combo Discovery × 25.000đ = 750.000đ (Vốn 510.000đ)</li>
                <li>50 lượt bọc sách × 8.000đ = 400.000đ (Vật tư 150.000đ)</li>
                <li>40 sản phẩm Eco giấy mầm × 12.000đ = 480.000đ (Vốn 240.000đ)</li>
                <li>Tổng doanh thu tháng: <strong>1.630.000 VNĐ</strong> | Chi phí trực tiếp: <strong>900.000 VNĐ</strong></li>
                <li>Lãi gộp: <strong>730.000 VNĐ</strong> | Chi phí cố định trạm: <strong>400.000 VNĐ</strong></li>
                <li>Chênh lệch thu – chi ròng: <strong>330.000 VNĐ/tháng</strong> (Thời gian hoàn vốn 3,8 tháng).</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#184E38] uppercase border-b border-stone-200 pb-1">
              Trang 6: Video Pitch & Gian hàng triển lãm số
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Video Pitch thời lượng dưới 3 phút tập trung vào các cảnh quay thực nghiệm: Quét mã Alpha Pass $\rightarrow$ Mở hồ sơ nhân viên $\rightarrow$ Nhập Wishlist $\rightarrow$ Alpha Match gợi ý phù hợp $\rightarrow$ Thủ kho xác nhận bàn giao tại ô tủ $\rightarrow$ Giới thiệu quy trình sản xuất giấy mầm STEM.
            </p>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Business Model Canvas */}
      {activeSubTab === 'canvas' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Business Model Canvas – Mô Hình Kinh Doanh Alpha-K52
              </h2>
              <p className="text-xs text-stone-500">
                9 thành phần cốt lõi của mô hình kinh doanh tạo tác động xã hội tại THPT Lương Văn Tri
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#184E38] bg-emerald-50 px-2.5 py-1 rounded">
              BMC Chuẩn Khởi Nghiệp 2026
            </span>
          </div>

          {/* 9 Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            {/* 1. Key Partners */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>1. ĐỐI TÁC CHÍNH</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Ban Giám hiệu, Đoàn trường THPT Lương Văn Tri</li>
                <li>Tác giả học liệu (học sinh đạt giải HSG, cựu học sinh)</li>
                <li>Phụ huynh học sinh và các cửa hàng văn phòng phẩm địa phương</li>
              </ul>
            </div>

            {/* 2. Key Activities */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>2. HOẠT ĐỘNG CHÍNH</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Khảo sát nhu cầu học liệu trước (Alpha Wishlist)</li>
                <li>Kiểm định chất lượng và gắn mã QR tem sách</li>
                <li>Ghép nối Alpha Match và bàn giao tại ô tủ K52</li>
                <li>Sản xuất giấy mầm STEM Eco & Combo Discovery</li>
              </ul>
            </div>

            {/* 3. Value Proposition */}
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                <span>3. GIẢI PHÁP GIÁ TRỊ</span>
              </div>
              <ul className="text-emerald-900 space-y-1 text-[11px] list-disc pl-4">
                <li>Tìm đúng sách và dụng cụ học tập nhanh hơn 99%</li>
                <li>Tiết kiệm 60–80% chi phí mua sách mới cho phụ huynh</li>
                <li>Giao dịch truy vết 100% bằng 2 mã QR minh bạch</li>
                <li>Tái chế giấy sạch thành giấy mầm bảo vệ môi trường</li>
              </ul>
            </div>

            {/* 4. Customer Relationships */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>4. QUAN HỆ KHÁCH HÀNG</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Thẻ số Alpha Pass gắn mã QR riêng</li>
                <li>Hỗ trợ trực tiếp tại trạm học đường trong giờ ra chơi</li>
                <li>Ghi nhận danh hiệu cống hiến & tích lũy điểm Coin</li>
                <li>Bảo mật danh tính tuyệt đối cho học sinh nhận hỗ trợ</li>
              </ul>
            </div>

            {/* 5. Customer Segments */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>5. PHÂN KHÚC KHÁCH HÀNG</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Học sinh khối 10, 11, 12 THPT Lương Văn Tri</li>
                <li>Phụ huynh quan tâm đến chi phí và chất lượng sách</li>
                <li>Học sinh có hoàn cảnh khó khăn cần nhận tài trợ</li>
                <li>Khách hàng mua sản phẩm quà tặng Eco/Combo STEM</li>
              </ul>
            </div>

            {/* 6. Key Resources */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 md:col-span-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>6. TÀI NGUYÊN CHÍNH</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Đội ngũ 05 học sinh Lớp 11A1 & Cố vấn chuyên môn cô Hứa Thị Thanh Thương</li>
                <li>Hệ sinh thái phần mềm: Alpha Manager, Alpha Match, Alpha Pass QR</li>
                <li>Hệ thống 30 ô tủ trạm K52 (Station Lockers) đặt tại trường</li>
                <li>Quy trình kiểm định và tiêu chuẩn định giá học liệu A/B/C</li>
              </ul>
            </div>

            {/* 7. Channels */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 md:col-span-3">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>7. KÊNH PHÂN PHỐI</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4">
                <li>Trạm giao dịch cố định tại hành lang trường THPT Lương Văn Tri</li>
                <li>Ứng dụng Web-App Alpha-K52 hỗ trợ tra cứu trực tuyến</li>
                <li>Gian hàng trưng bày tại Ngày hội STEM / Hội chợ Khởi nghiệp trường và tỉnh</li>
                <li>Kênh truyền thông Đoàn trường và các buổi sinh hoạt dưới cờ</li>
              </ul>
            </div>

            {/* 8. Cost Structure */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 md:col-span-2">
              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs text-[#184E38]">
                <span>8. CẤU TRÚC CHI PHÍ</span>
              </div>
              <ul className="text-stone-600 space-y-1 text-[11px] list-disc pl-4 font-mono">
                <li>Chi phí phôi thẻ và tem nhãn QR: 150.000đ</li>
                <li>Giá vốn combo dụng cụ Discovery: 17.000đ/bộ</li>
                <li>Vật tư bọc và nẹp góc sách: 3.000đ/quyển</li>
                <li>Nguyên liệu làm giấy mầm Eco: 6.000đ/sản phẩm</li>
                <li>Chi phí duy trì trạm & hao hụt cố định: 400.000đ/tháng</li>
              </ul>
            </div>

            {/* 9. Revenue Streams */}
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2 md:col-span-3">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                <span>9. DÒNG DOANH THU THỰC TẾ (KHÔNG HẠCH TOÁN COIN)</span>
              </div>
              <ul className="text-emerald-900 space-y-1 text-[11px] list-disc pl-4 font-mono">
                <li>Bán combo dụng cụ Alpha Discovery: 25.000đ/bộ (lãi gộp 8.000đ)</li>
                <li>Dịch vụ bọc và làm mới sách giáo khoa: 8.000đ/quyển (lãi gộp 5.000đ)</li>
                <li>Bán sản phẩm STEM giấy mầm Eco: 12.000đ–25.000đ (lãi gộp 6.000đ–13.000đ)</li>
                <li>Tuyệt đối không bán sách tặng, không quy đổi Alpha Coin thành tiền mặt.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Financial Simulator */}
      {activeSubTab === 'financial' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Mô Phỏng Tài Chính & Phân Tích Độ Nhạy Rủi Ro (Mục 5.2)
              </h2>
              <p className="text-xs text-stone-500">
                Thử nghiệm các kịch bản doanh số thực tế từ 20% đến 120% kế hoạch để kiểm tra điểm hòa vốn
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-600 font-semibold">Tỷ lệ kế hoạch:</span>
              <span className="text-sm font-mono font-bold text-[#184E38] bg-emerald-50 px-2.5 py-1 rounded">
                {sensitivityPercent}%
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="bg-stone-50 p-4 rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-stone-600">
              <span>20% (Kịch bản thị trường chậm)</span>
              <span className="font-bold text-stone-800">50% (Điểm hòa vốn nhạy cảm)</span>
              <span>100% (Kế hoạch chuẩn 1 tháng)</span>
              <span>120% (Mùa tựu trường cao điểm)</span>
            </div>
            <input
              type="range"
              min="20"
              max="120"
              step="5"
              value={sensitivityPercent}
              onChange={(e) => setSensitivityPercent(parseInt(e.target.value))}
              className="w-full accent-[#184E38] cursor-pointer"
            />
          </div>

          {/* Key Simulation KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-[11px] text-stone-500 font-medium">Doanh thu tháng</div>
              <div className="text-lg font-bold font-mono text-stone-900">
                {Math.round(totalRevenue).toLocaleString('vi-VN')} đ
              </div>
              <div className="text-[10px] text-stone-400">Combo + Bọc sách + Eco</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-[11px] text-stone-500 font-medium">Chi phí trực tiếp</div>
              <div className="text-lg font-bold font-mono text-stone-900">
                {Math.round(totalDirectCost).toLocaleString('vi-VN')} đ
              </div>
              <div className="text-[10px] text-stone-400">Giá vốn hàng bán</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-[11px] text-stone-500 font-medium">Lãi gộp sản phẩm</div>
              <div className="text-lg font-bold font-mono text-emerald-700">
                {Math.round(grossProfit).toLocaleString('vi-VN')} đ
              </div>
              <div className="text-[10px] text-stone-400">Trước chi phí trạm 400k</div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <div className="text-[11px] text-stone-500 font-medium">Lãi ròng hoạt động</div>
              <div
                className={`text-lg font-bold font-mono ${
                  netOperatingProfit >= 0 ? 'text-[#184E38]' : 'text-rose-600'
                }`}
              >
                {Math.round(netOperatingProfit).toLocaleString('vi-VN')} đ
              </div>
              <div className="text-[10px] text-stone-400">
                {netOperatingProfit >= 0 ? `Hoàn vốn: ~${paybackMonths} tháng` : 'Kịch bản cần trợ cấp'}
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Khoản mục sản phẩm</th>
                  <th className="py-2.5 px-3 text-right">Số lượng bán</th>
                  <th className="py-2.5 px-3 text-right">Doanh thu (đ)</th>
                  <th className="py-2.5 px-3 text-right">Chi phí vốn (đ)</th>
                  <th className="py-2.5 px-3 text-right text-emerald-800">Lãi gộp (đ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-stone-800">
                    Combo Alpha Discovery (25.000đ/bộ)
                  </td>
                  <td className="py-2 px-3 text-right">{Math.round((30 * sensitivityPercent) / 100)} bộ</td>
                  <td className="py-2 px-3 text-right">{Math.round(comboRevenue).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right text-stone-500">{Math.round(comboCost).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700">
                    {Math.round(comboRevenue - comboCost).toLocaleString('vi-VN')}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-stone-800">
                    Dịch vụ bọc & làm mới sách (8.000đ/quyển)
                  </td>
                  <td className="py-2 px-3 text-right">{Math.round((50 * sensitivityPercent) / 100)} quyển</td>
                  <td className="py-2 px-3 text-right">{Math.round(bookCoverRevenue).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right text-stone-500">{Math.round(bookCoverCost).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700">
                    {Math.round(bookCoverRevenue - bookCoverCost).toLocaleString('vi-VN')}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans font-medium text-stone-800">
                    Sản phẩm STEM Alpha Eco (12.000đ/sp)
                  </td>
                  <td className="py-2 px-3 text-right">{Math.round((40 * sensitivityPercent) / 100)} sp</td>
                  <td className="py-2 px-3 text-right">{Math.round(ecoRevenue).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right text-stone-500">{Math.round(ecoCost).toLocaleString('vi-VN')}</td>
                  <td className="py-2 px-3 text-right font-bold text-emerald-700">
                    {Math.round(ecoRevenue - ecoCost).toLocaleString('vi-VN')}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-stone-50/70 border-t-2 border-stone-200 font-mono font-bold">
                <tr>
                  <td className="py-2.5 px-3 font-sans">TỔNG CỘNG HOẠT ĐỘNG</td>
                  <td className="py-2.5 px-3 text-right">-</td>
                  <td className="py-2.5 px-3 text-right text-stone-900">{Math.round(totalRevenue).toLocaleString('vi-VN')}</td>
                  <td className="py-2.5 px-3 text-right text-stone-500">{Math.round(totalDirectCost).toLocaleString('vi-VN')}</td>
                  <td className="py-2.5 px-3 text-right text-[#184E38]">
                    {Math.round(grossProfit).toLocaleString('vi-VN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-600 leading-relaxed border border-stone-200">
            <strong>Kết luận kiểm định độ nhạy:</strong> Vốn khởi tạo ban đầu là <strong>1.250.000đ</strong>. Ở mức kế hoạch 100%, thời gian hòa vốn đơn giản là <strong>3,8 tháng</strong>. Nếu sản lượng chỉ đạt 50% kế hoạch (lãi gộp 365.000đ so với chi phí cố định 400.000đ), trạm sẽ thâm hụt nhẹ 35.000đ/tháng. Nhóm đã dự trù phương án giảm giờ mở quầy và huy động kệ tái sử dụng để cắt giảm chi phí cố định xuống còn 250.000đ/tháng nhằm đảm bảo an toàn vốn.
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Team and Mentor */}
      {activeSubTab === 'team' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-base font-bold text-stone-900">
              Đội Ngũ Thực Hiện – Lớp 11A1 (Khóa 52) – THPT Lương Văn Tri
            </h2>
            <p className="text-xs text-stone-500">
              Phân công nhiệm vụ cụ thể theo đúng quy định điều lệ Cuộc thi Khởi nghiệp 2026
            </p>
          </div>

          {/* Teacher Mentor */}
          <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                CỐ VẤN DỰ ÁN & HƯỚNG DẪN KHOA HỌC
              </span>
              <h3 className="text-base font-bold text-stone-900">
                Cô Hứa Thị Thanh Thương
              </h3>
              <p className="text-xs text-stone-600">
                Giáo viên Trường THPT Lương Văn Tri (Văn Quan, Lạng Sơn)
              </p>
              <p className="text-xs text-stone-500 pt-1 leading-relaxed max-w-xl">
                Nhiệm vụ: Hướng dẫn hình thành mô hình khởi nghiệp; cố vấn hoạt động STEM Alpha Eco; hướng dẫn thử nghiệm, phân tích hiệu quả, an toàn và tuân thủ quy định học đường.
              </p>
            </div>
          </div>

          {/* 5 Student Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">Học sinh 1 · 11A1</span>
                <span className="text-[10px] font-mono text-[#184E38] font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Trưởng nhóm
                </span>
              </div>
              <p className="text-stone-600">
                <strong>Nhiệm vụ:</strong> Điều phối chung, quản lý tài chính, đối soát sổ sách và đại diện báo cáo với Ban Giám hiệu, Đoàn trường.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">Học sinh 2 · 11A1</span>
                <span className="text-[10px] font-mono text-[#184E38] font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Kỹ thuật & Công nghệ
                </span>
              </div>
              <p className="text-stone-600">
                <strong>Nhiệm vụ:</strong> Xây dựng và vận hành Alpha Manager, phát hành mã thẻ Alpha Pass, tối ưu thuật toán ghép nối Alpha Match.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">Học sinh 3 · 11A1</span>
                <span className="text-[10px] font-mono text-[#184E38] font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Thủ kho & Alpha Share
                </span>
              </div>
              <p className="text-stone-600">
                <strong>Nhiệm vụ:</strong> Quản lý kho Alpha Exchange, sắp xếp 30 ô tủ trạm, tiếp nhận trao tặng và điều phối Quỹ Alpha Share.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">Học sinh 4 · 11A1</span>
                <span className="text-[10px] font-mono text-[#184E38] font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  Heritage & Truyền thông
                </span>
              </div>
              <p className="text-stone-600">
                <strong>Nhiệm vụ:</strong> Phụ trách thư viện học liệu tự biên soạn Alpha Heritage, xin cam kết tác quyền, khảo sát nhu cầu học sinh.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">Học sinh 5 · 11A1</span>
                <span className="text-[10px] font-mono text-[#184E38] font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                  STEM Eco & Kiểm định
                </span>
              </div>
              <p className="text-stone-600">
                <strong>Nhiệm vụ:</strong> Phụ trách xưởng sản xuất giấy mầm thảo mộc Alpha Eco, đóng gói Combo Alpha Discovery, kiểm tra chất lượng sách A/B/C.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
