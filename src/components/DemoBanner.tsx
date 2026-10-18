import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 sm:p-4 mb-4 text-amber-900 shadow-xs">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <p className="font-bold tracking-wide uppercase text-amber-800">
            Bản chạy thử nghiệm (DEMO) K52 – Dữ liệu mẫu giả định
          </p>
          <p className="text-amber-700 mt-0.5 leading-relaxed">
            Mọi thông tin học sinh được ẩn danh hóa bằng mã bí danh. Không sử dụng dữ liệu thật của học sinh, không lưu thông tin cá nhân lên mạng và không có thanh toán trực tuyến.
          </p>
        </div>
      </div>
    </div>
  );
};
