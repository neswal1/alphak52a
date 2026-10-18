import React from 'react';
import {
  CheckCircle2,
  Clock,
  Shield,
  GraduationCap,
  Sparkles,
  QrCode,
  Lock,
} from 'lucide-react';
import { DemoBanner } from './DemoBanner';

export const AboutScreen: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <DemoBanner />

      {/* Intro Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Alpha-K52 – Trạm Giao Dịch Tri Thức
            </h1>
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold">
              Vật phẩm học tập & Sách vở học sinh
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Dự án được xây dựng nhằm phục vụ học sinh khóa K52 và các khóa kế tiếp. Thay vì sách giáo khoa, máy tính cầm tay, đồ dùng vẽ kỹ thuật bị lãng phí sau mỗi năm học, trạm đóng vai trò cầu nối điều phối: cho thuê, tặng 0đ, trao đổi hoặc bán lại với chi phí tối thiểu.
        </p>
      </div>

      {/* Active Features */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-slate-900 text-base">
            Các chức năng ĐÃ HOẠT ĐỘNG (Bản thử nghiệm)
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              1. Trang chủ giới thiệu & danh mục vật phẩm
            </strong>
            <p className="text-slate-600 text-xs">
              Thống kê tác động xanh, số lượt tái sử dụng, danh mục nhóm hàng trực quan và danh sách sản phẩm mới.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              2. Kho vật phẩm & thêm sản phẩm trực tiếp
            </strong>
            <p className="text-slate-600 text-xs">
              Đầy đủ mã định danh duy nhất (K52-XXX), tên, môn học, khối lớp, tình trạng, giá bán, giá thuê, ô tủ vị trí và trạng thái kho.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              3. Tìm kiếm & bộ lọc đa tiêu chí
            </strong>
            <p className="text-slate-600 text-xs">
              Tìm theo tên sách, môn học, khối lớp (10-12), khoảng giá (miễn phí), và 6 hình thức giao dịch.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              4. Biểu mẫu đăng ký 6 hình thức
            </strong>
            <p className="text-slate-600 text-xs">
              Đăng ký Bán, Mua/Tìm, Thuê, Tặng 0đ, Trao đổi hoặc Ký gửi. Thông tin tự động đưa vào hàng chờ duyệt của trạm.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              5. Trang quản trị & Phân quyền bảo mật (Mã PIN: 1234)
            </strong>
            <p className="text-slate-600 text-xs">
              Kiểm tra quyền truy cập; duyệt yêu cầu nhập kho, xuất kho bàn giao đồ, nhận trả đồ sau khi thuê và ghi sổ nhật ký.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              6. Bảng theo dõi giao dịch & Thống kê tái sử dụng
            </strong>
            <p className="text-slate-600 text-xs">
              Đếm số vòng đời tái sử dụng, số tiền học sinh tiết kiệm được và nhật ký giao dịch toàn hệ thống.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <strong className="text-emerald-900 block font-bold mb-0.5">
              7. Tạo mã QR định danh vật phẩm
            </strong>
            <p className="text-slate-600 text-xs">
              Mã QR SVG tự sinh chỉ chứa DUY NHẤT mã vật phẩm để in dán nhãn tủ đồ K52; tuyệt đối không chứa số điện thoại hay họ tên học sinh.
            </p>
          </div>
        </div>
      </div>

      {/* Pending Features */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Clock className="w-5 h-5 text-amber-600" />
          <h2 className="font-bold text-slate-900 text-base">
            Các chức năng CẦN HOÀN THIỆN TIẾP THEO
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block font-bold mb-0.5">
              1. Cơ sở dữ liệu đám mây (Cloud Database)
            </strong>
            <p className="text-slate-600 text-xs">
              Hiện tại đang dùng bộ nhớ cục bộ có nhãn DEMO. Phiên bản chính thức sẽ lưu trữ vĩnh viễn trên máy chủ đám mây của trường.
            </p>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block font-bold mb-0.5">
              2. Đăng nhập qua tài khoản trường (SSO)
            </strong>
            <p className="text-slate-600 text-xs">
              Xác thực danh tính học sinh tự động bằng email trường mà vẫn đảm bảo tính ẩn danh đối với công chúng.
            </p>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block font-bold mb-0.5">
              3. Quét mã QR trực tiếp qua Camera thiết bị
            </strong>
            <p className="text-slate-600 text-xs">
              Mở camera quét nhanh tem dán trên gáy sách khi học sinh lấy hoặc trả đồ tại tủ trạm sảnh A.
            </p>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <strong className="text-amber-900 block font-bold mb-0.5">
              4. Điểm thưởng xanh / Alpha Coin (phiên bản tương lai)
            </strong>
            <p className="text-slate-600 text-xs">
              Theo định hướng, phiên bản đầu tiên chưa cần Alpha Coin hay thanh toán online; tương lai sẽ có thể tích lũy điểm xanh đổi quà.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
