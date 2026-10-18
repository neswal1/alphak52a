import React from 'react';
import {
  BookOpen,
  Search,
  PlusCircle,
  RefreshCw,
  Gift,
  PiggyBank,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  QrCode,
  FileText,
  Calculator,
  Sparkles,
  Zap,
  Leaf,
  Heart,
  Award,
} from 'lucide-react';
import { ExchangeItem, ItemCategory } from '../types';
import { ItemCard } from './ItemCard';

interface HomeScreenProps {
  items: ExchangeItem[];
  onNavigateToWarehouse: () => void;
  onNavigateToRegister: () => void;
  onNavigateToMatch: () => void;
  onNavigateToEco: () => void;
  onNavigateToProposal: () => void;
  onSelectCategory: (cat: ItemCategory) => void;
  onViewDetail: (item: ExchangeItem) => void;
  onShowQr: (item: ExchangeItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  items,
  onNavigateToWarehouse,
  onNavigateToRegister,
  onNavigateToMatch,
  onNavigateToEco,
  onNavigateToProposal,
  onSelectCategory,
  onViewDetail,
  onShowQr,
}) => {
  const totalItems = items.length;
  const totalReuses = items.reduce((acc, curr) => acc + curr.reuseCount, 0);
  const giftCount = items.filter((i) => i.transactionType === 'GIFT').length;
  const estimatedSavings = items.reduce(
    (acc, curr) => acc + Math.max(35000, curr.price) * curr.reuseCount,
    0
  );

  const categories: { key: ItemCategory; label: string; count: number }[] = [
    { key: 'TEXTBOOK', label: 'Sách giáo khoa GDPT 2018', count: items.filter((i) => i.category === 'TEXTBOOK').length },
    { key: 'EXAM_DOCUMENT', label: 'Đề cương & Tài liệu ôn thi', count: items.filter((i) => i.category === 'EXAM_DOCUMENT').length },
    { key: 'TECH_DEVICE', label: 'Máy tính Casio & Thiết bị', count: items.filter((i) => i.category === 'TECH_DEVICE').length },
    { key: 'STUDY_TOOL', label: 'Dụng cụ hình học & kỹ thuật', count: items.filter((i) => i.category === 'STUDY_TOOL').length },
    { key: 'REFERENCE_BOOK', label: 'Sách chuyên đề tham khảo', count: items.filter((i) => i.category === 'REFERENCE_BOOK').length },
    { key: 'UNIFORM_ACCESSORY', label: 'Phụ kiện học đường', count: items.filter((i) => i.category === 'UNIFORM_ACCESSORY').length },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#123b2b] via-[#184E38] to-[#2D8A63] text-white p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-emerald-100 text-xs font-medium">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Dự án Khởi nghiệp Cấp tỉnh 2026 · THPT Lương Văn Tri (Lớp 11A1)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            Alpha-K52: Quét thẻ trao tri thức, tiếp nối vòng đời sách!
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed text-balance">
            Giải pháp trạm giao dịch và tuần hoàn học liệu học đường: Ghép nối theo nhu cầu thực tế bằng <strong>Alpha Match</strong>, định danh qua <strong>Alpha Pass</strong> và quản lý kiểm định bằng <strong>Alpha Manager</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToMatch}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#184E38] hover:bg-emerald-50 font-bold text-xs shadow-sm transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Ghép nối thông minh (Alpha Match)</span>
            </button>

            <button
              onClick={onNavigateToWarehouse}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Khám phá kho học liệu ({totalItems})</span>
            </button>

            <button
              onClick={onNavigateToProposal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Xem Thuyết minh Dự án 2026</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermarkless Background Icon */}
        <div className="absolute right-4 -bottom-6 opacity-5 pointer-events-none hidden md:block">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* 5 Core Pillars Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div
          onClick={onNavigateToMatch}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs space-y-1"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Zap className="w-4 h-4 text-[#184E38]" />
            <span>Alpha Match</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            Thu thập nhu cầu trước, ghép nối chính xác môn – lớp – ấn bản
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <QrCode className="w-4 h-4 text-[#184E38]" />
            <span>Alpha Pass</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            Thẻ QR số độc bản, ví điểm Coin nội bộ và danh sách Wishlist
          </p>
        </div>

        <div
          onClick={onNavigateToWarehouse}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs space-y-1"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Package className="w-4 h-4 text-[#184E38]" />
            <span>Alpha Exchange</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            Kho 30 ô tủ trạm K52, kiểm định chất lượng và gắn mã tem
          </p>
        </div>

        <div
          onClick={onNavigateToEco}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs space-y-1"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Leaf className="w-4 h-4 text-[#184E38]" />
            <span>Alpha Eco & STEM</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            Tái chế giấy kiểm tra thành Giấy mầm thảo mộc & Combo Discovery
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Alpha Share</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-2">
            Quỹ tặng sách 0đ cho học sinh khó khăn, bảo mật danh tính
          </p>
        </div>
      </div>

      {/* Quantitative Impact Proof Strip (Claim-to-Proof Adjacency) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-sans text-stone-500">Học liệu sẵn sàng</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums">{totalItems} món</div>
          <div className="text-[10px] font-sans text-stone-400">Đã kiểm duyệt A/B/C</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-sans text-stone-500">Lượt tuần hoàn sách</div>
          <div className="text-xl font-bold text-[#184E38] tabular-nums">{totalReuses} lượt</div>
          <div className="text-[10px] font-sans text-stone-400">Tiếp nối vòng đời sách</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-sans text-stone-500">Quỹ tặng Alpha Share</div>
          <div className="text-xl font-bold text-rose-700 tabular-nums">{giftCount} cuốn</div>
          <div className="text-[10px] font-sans text-stone-400">Học sinh nhận miễn phí 0đ</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-[11px] font-sans text-stone-500">Tiết kiệm ước tính</div>
          <div className="text-xl font-bold text-amber-700 tabular-nums">
            {Math.round(estimatedSavings / 1000)}k VNĐ
          </div>
          <div className="text-[10px] font-sans text-stone-400">Giảm gánh nặng chi phí</div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-stone-200">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Phân loại danh mục học liệu trạm K52
            </h2>
            <p className="text-xs text-stone-500">
              Theo quy chuẩn chương trình THPT và đồ dùng thực hành
            </p>
          </div>
          <button
            onClick={onNavigateToWarehouse}
            className="text-xs font-semibold text-[#184E38] hover:underline flex items-center gap-1"
          >
            <span>Vào kho tìm kiếm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-left">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => {
                onSelectCategory(cat.key);
                onNavigateToWarehouse();
              }}
              className="bg-white p-4 rounded-xl border border-stone-200 hover:border-[#184E38] transition cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div className="text-xs font-bold text-stone-800 leading-snug line-clamp-2">
                {cat.label}
              </div>
              <div className="text-[11px] text-stone-500 font-mono mt-3">
                {cat.count} vật phẩm
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Items in Warehouse */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-stone-200">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Học liệu mới tiếp nhận vào trạm K52
            </h2>
            <p className="text-xs text-stone-500">
              Đã kiểm định nguyên vẹn và sẵn sàng nhận tại các ô tủ
            </p>
          </div>
          <button
            onClick={onNavigateToWarehouse}
            className="text-xs font-semibold text-[#184E38] hover:underline"
          >
            Toàn bộ kho &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.slice(0, 4).map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onViewDetail={onViewDetail}
              onShowQr={onShowQr}
            />
          ))}
        </div>
      </div>

      {/* 3-Step Operation Protocol */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <QrCode className="w-4 h-4 text-[#184E38]" />
          <span>Quy trình 3 bước nhận & chuyển giao tại tủ trạm THPT Lương Văn Tri</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 pt-1">
          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-[#184E38] block text-xs">1. Khai báo nhu cầu (Wishlist)</span>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Học sinh đăng ký sách cần tìm hoặc sách muốn gửi qua Alpha Pass. Thuật toán Alpha Match tự động ghép nối theo môn, khối lớp và bộ sách cải cách.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-[#184E38] block text-xs">2. Kiểm định & Cấp mã QR ô tủ</span>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              BQL Trạm tiếp nhận đồ, kiểm tra trang sách theo thang điểm A/B/C, dán tem QR độc bản và cất vào ngăn tủ K52-Locker quy định.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-[#184E38] block text-xs">3. Quét thẻ nhận & Cộng điểm Coin</span>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Học sinh đến trạm quét mã thẻ Alpha Pass để nhận học liệu. Điểm Alpha Coin nội bộ được cập nhật minh bạch vào sổ cái kiểm toán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
