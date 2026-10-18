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
  Shirt,
  Sparkles,
} from 'lucide-react';
import { ExchangeItem, ItemCategory } from '../types';
import { DemoBanner } from './DemoBanner';
import { ItemCard } from './ItemCard';
import { formatVnd } from '../utils/formatters';

interface HomeScreenProps {
  items: ExchangeItem[];
  onNavigateToWarehouse: () => void;
  onNavigateToRegister: () => void;
  onSelectCategory: (cat: ItemCategory) => void;
  onViewDetail: (item: ExchangeItem) => void;
  onShowQr: (item: ExchangeItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  items,
  onNavigateToWarehouse,
  onNavigateToRegister,
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

  const categories: { key: ItemCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'TEXTBOOK', label: 'Sách giáo khoa', icon: <BookOpen className="w-5 h-5 text-emerald-700" /> },
    { key: 'EXAM_DOCUMENT', label: 'Tài liệu ôn thi', icon: <FileText className="w-5 h-5 text-emerald-700" /> },
    { key: 'TECH_DEVICE', label: 'Máy tính & Thiết bị', icon: <Calculator className="w-5 h-5 text-emerald-700" /> },
    { key: 'STUDY_TOOL', label: 'Dụng cụ học tập', icon: <Layers className="w-5 h-5 text-emerald-700" /> },
    { key: 'UNIFORM_ACCESSORY', label: 'Đồng phục & Phụ kiện', icon: <Shirt className="w-5 h-5 text-emerald-700" /> },
    { key: 'REFERENCE_BOOK', label: 'Sách tham khảo', icon: <Sparkles className="w-5 h-5 text-emerald-700" /> },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      <DemoBanner />

      {/* Hero Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trạm chia sẻ tri thức học đường K52</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Alpha-K52: Tri thức trao tay, học đường thêm xanh!
          </h1>

          <p className="text-emerald-100 text-xs sm:text-base leading-relaxed">
            AlphaK52 là dự án khởi nghiệp của học sinh lớp 11A1, Trường THPT Lương Văn Tri. Chúng tôi xây dựng nền tảng kết nối mua, bán, cho thuê, ký gửi và trao tặng sách, đồ dùng học tập còn giá trị sử dụng, góp phần tiết kiệm chi phí học tập, hạn chế lãng phí và lan tỏa lối sống xanh trong cộng đồng học sinh.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToWarehouse}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition"
            >
              <Search className="w-4 h-4" />
              <span>Khám phá kho ({totalItems})</span>
            </button>

            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-400/40 backdrop-blur-xs transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng ký gửi đồ</span>
            </button>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900">{totalItems}</p>
            <p className="text-xs text-slate-500">Món đồ trong kho</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900">{totalReuses}</p>
            <p className="text-xs text-slate-500">Vòng tái sử dụng</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900">{giftCount}</p>
            <p className="text-xs text-slate-500">Món quà tặng 0đ</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900">
              {Math.round(estimatedSavings / 1000)}k ₫
            </p>
            <p className="text-xs text-slate-500">Tiết kiệm ước tính</p>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Danh mục vật phẩm học tập
          </h2>
          <button
            onClick={onNavigateToWarehouse}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {categories.map((cat) => (
            <div
                key={cat.key}
                onClick={() => {
                  onSelectCategory(cat.key);
                  onNavigateToWarehouse();
                }}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition cursor-pointer text-center flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center mb-2 transition">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">
                  {cat.label}
                </h3>
              </div>
            ))}
        </div>
      </div>

      {/* Highlights / Recent Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Vật phẩm mới lên trạm K52
            </h2>
            <p className="text-xs text-slate-500">Các món đồ vừa được kiểm duyệt sẵn sàng nhận</p>
          </div>
          <button
            onClick={onNavigateToWarehouse}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Kho đầy đủ &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* Locker Operation Flow */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-sm sm:text-base">
          <QrCode className="w-5 h-5 text-emerald-700" />
          <span>Quy trình 3 bước tại Tủ Đồ Trạm K52 (Sảnh Nhà A)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-emerald-950 mt-3">
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-800 block mb-1">1. Đăng ký & Cấp mã</span>
            <p className="text-xs text-slate-600">
              Học sinh điền thông tin tặng/bán/thuê. Ban quản trị duyệt và sinh mã QR định danh (không lộ thông tin cá nhân).
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-800 block mb-1">2. Đặt đồ vào ô tủ</span>
            <p className="text-xs text-slate-600">
              Người gửi dán mã và gửi đồ tại ô tủ được chỉ định (VD: Tủ K52 Ô số 12).
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-800 block mb-1">3. Quét mã & Nhận đồ</span>
            <p className="text-xs text-slate-600">
              Người cần đến nhận đồ theo lịch hẹn, kiểm tra mã vật phẩm và hoàn tất nhận hoặc trả sau khi hết kỳ học.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
