import React, { useState } from 'react';
import {
  Leaf,
  Package,
  Sparkles,
  Scissors,
  CheckCircle2,
  Sprout,
  ShoppingBag,
  Info,
  Calendar,
} from 'lucide-react';
import { EcoProduct, DiscoveryCombo, AlphaPassMember } from '../types';

interface EcoDiscoveryViewProps {
  ecoProducts: EcoProduct[];
  discoveryCombos: DiscoveryCombo[];
  activeMember: AlphaPassMember;
  onOrderProduct: (productName: string, price: number) => void;
  onRequestBookCover: (bookCount: number, total: number) => void;
}

export const EcoDiscoveryView: React.FC<EcoDiscoveryViewProps> = ({
  ecoProducts,
  discoveryCombos,
  activeMember,
  onOrderProduct,
  onRequestBookCover,
}) => {
  const [activeTab, setActiveTab] = useState<'eco' | 'discovery' | 'book_service'>('eco');

  // Book Covering Service Calculator State
  const [bookCount, setBookCount] = useState<number>(3);
  const [useCornerReinforce, setUseCornerReinforce] = useState(true);
  const [serviceDone, setServiceDone] = useState(false);

  const PRICE_PER_BOOK = 8000;
  const CORNER_ADDON = 2000;
  const totalPrice = bookCount * (PRICE_PER_BOOK + (useCornerReinforce ? CORNER_ADDON : 0));

  const handleBookCoverOrder = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestBookCover(bookCount, totalPrice);
    setServiceDone(true);
    setTimeout(() => setServiceDone(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#184E38] via-[#23684B] to-[#2D8A63] text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-100 text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>Nguồn thu tự chủ & Hoạt động STEM Alpha-K52</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Alpha Eco & Chuỗi Dịch Vụ Tạo Doanh Thu Thực
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed text-balance">
            Dự án vận hành theo nguyên tắc kinh doanh tác động xã hội: Toàn bộ nguồn thu từ Combo dụng cụ, dịch vụ bọc sách và sản phẩm STEM giấy mầm được tái đầu tư duy trì hạ tầng trạm và gây quỹ tặng sách cho học sinh.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveTab('eco')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'eco'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              STEM Alpha Eco (Giấy mầm sinh học)
            </button>
            <button
              onClick={() => setActiveTab('discovery')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'discovery'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Combo Alpha Discovery (Dụng cụ học tập)
            </button>
            <button
              onClick={() => setActiveTab('book_service')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'book_service'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Dịch vụ bọc & Làm mới sách (8.000đ)
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: STEM Alpha Eco */}
      {activeTab === 'eco' && (
        <div className="space-y-6">
          {/* STEM Process Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-sm text-emerald-950">
                Quy trình STEM tái chế giấy sạch thành Giấy Mầm Thảo Mộc (K52 Eco)
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dưới sự cố vấn khoa học của <strong>Cô Hứa Thị Thanh Thương</strong> (Trường THPT Lương Văn Tri), nhóm 11A1 thu gom giấy kiểm tra, giấy thi thử đã dùng hết để ngâm ủ bột giấy tự nhiên, kết hợp hạt giống rau cải ngọt và hoa cúc bản địa Văn Quan. Sản phẩm vừa dùng làm kẹp sách, vừa có thể gieo trồng trực tiếp vào chậu đất sau khi sử dụng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1">1. Thu gom giấy sạch</div>
                <div className="text-[11px] text-stone-500">Giấy không dính dầu mỡ, mực in độc hại</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1">2. Xay ủ bột giấy</div>
                <div className="text-[11px] text-stone-500">Ngâm nước ấm, ép sợi cellulose mịn</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1">3. Cấy hạt mầm</div>
                <div className="text-[11px] text-stone-500">Phân bố đều hạt mầm cải ngọt / hoa cúc</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1">4. Ép phẳng & Phơi gió</div>
                <div className="text-[11px] text-stone-500">Phơi tự nhiên trong bóng râm giữ độ nảy mầm</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecoProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-[#184E38] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#184E38] font-bold">
                      {p.code}
                    </span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      Hạt mầm: {p.seedType}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900">
                    {p.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="bg-stone-50 p-2.5 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Giá niêm yết:</span>
                      <strong className="text-stone-900 font-mono text-sm">
                        {p.price.toLocaleString('vi-VN')} đ
                      </strong>
                    </div>
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>Chi phí vốn sản xuất:</span>
                      <span className="font-mono">{p.cost.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 text-[11px] font-semibold">
                      <span>Lãi gộp duy trì quỹ trạm:</span>
                      <span className="font-mono">+{(p.price - p.cost).toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Còn lại: {p.inStock} chiếc
                  </span>
                  <button
                    onClick={() => onOrderProduct(p.name, p.price)}
                    className="px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Đặt mua tại trạm</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Discovery Combos */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Combo dụng cụ học tập thiết yếu Alpha Discovery
              </h2>
              <p className="text-xs text-stone-500">
                Đóng gói tiêu chuẩn, giá học sinh 25.000đ/bộ (nguồn thu trực tiếp bổ trợ chi phí vận hành trạm)
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg">
              Kế hoạch: 30 combo/tháng · Doanh thu 750.000đ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discoveryCombos.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:border-[#184E38] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#184E38]">
                      {c.code}
                    </span>
                    <span className="text-base font-bold font-mono text-[#184E38]">
                      {c.price.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900">
                    {c.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="bg-stone-50 rounded-lg p-3 space-y-1.5">
                    <div className="text-xs font-bold text-stone-700 mb-1">
                      Thành phần đóng gói chi tiết:
                    </div>
                    {c.itemsIncluded.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-stone-600 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-stone-500 flex justify-between pt-1">
                    <span>Giá vốn nhập: <strong>{c.cost.toLocaleString('vi-VN')} đ</strong></span>
                    <span className="text-emerald-700 font-semibold">Lãi gộp: <strong>+{(c.price - c.cost).toLocaleString('vi-VN')} đ/bộ</strong></span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Tồn kho sẵn: {c.inStock} bộ
                  </span>
                  <button
                    onClick={() => onOrderProduct(c.name, c.price)}
                    className="px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mua combo tại Trạm K52</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Book Covering & Renewal Service */}
      {activeTab === 'book_service' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-stone-900">
                Dịch vụ Bọc & Làm mới Sách Giáo Khoa An Toàn
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Nhiều bạn học sinh muốn giữ gìn sách cẩn thận suốt cả năm học hoặc làm mới lại sách đã cũ. Trạm K52 cung cấp dịch vụ làm sạch trang sách, nẹp góc chống quăn mép và bọc kiếng bảo vệ chuẩn học đường.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-800">1. Làm sạch an toàn</div>
                <div className="text-stone-500 text-[11px]">
                  Tẩy sạch vết bút chì, lau bìa cồn nhẹ pha loãng, không dùng hóa chất mạnh
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-800">2. Nẹp góc chống quăn</div>
                <div className="text-stone-500 text-[11px]">
                  Gia cố 4 góc bìa sách bằng decal trong chịu lực giúp sách luôn phẳng
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-800">3. Bọc màng nilon dẻo</div>
                <div className="text-stone-500 text-[11px]">
                  Màng bọc cao cấp không nhăn, kèm nhãn tên đồng bộ của Trạm Alpha-K52
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>Minh bạch tài chính dịch vụ:</span>
              </div>
              <ul className="list-disc pl-5 text-stone-600 space-y-1 text-[11px]">
                <li>Giá dịch vụ trọn gói: <strong>8.000 VNĐ / quyển</strong></li>
                <li>Chi phí vật tư trực tiếp (màng bọc, keo, nhãn): <strong>3.000 VNĐ / quyển</strong></li>
                <li>Lãi gộp đóng góp vào quỹ hoạt động trạm: <strong>5.000 VNĐ / quyển</strong></li>
                <li>Chỉ tiêu mô phỏng: 50 lượt/tháng $\rightarrow$ Doanh thu 400.000đ, Lãi gộp 250.000đ.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 pb-2 border-b border-stone-200">
              Đặt lịch làm mới sách tại trạm
            </h3>

            <form onSubmit={handleBookCoverOrder} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Số lượng sách cần bọc / làm mới
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={bookCount}
                    onChange={(e) => setBookCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-3 py-2 border border-stone-300 rounded-lg text-center font-bold font-mono text-sm"
                  />
                  <span className="text-stone-500">quyển sách giáo khoa</span>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCornerReinforce}
                    onChange={(e) => setUseCornerReinforce(e.target.checked)}
                    className="mt-0.5 rounded text-[#184E38]"
                  />
                  <div>
                    <div className="font-semibold text-stone-800">
                      Gia cố thêm 4 góc bìa sách (+2.000đ/quyển)
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Chống gãy góc bìa khi bỏ vào cặp sách
                    </div>
                  </div>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-1.5 font-mono">
                <div className="flex justify-between text-stone-600">
                  <span className="font-sans">Đơn giá cơ bản:</span>
                  <span>{PRICE_PER_BOOK.toLocaleString('vi-VN')} đ × {bookCount}</span>
                </div>
                {useCornerReinforce && (
                  <div className="flex justify-between text-stone-600">
                    <span className="font-sans">Phụ phí gia cố góc:</span>
                    <span>{CORNER_ADDON.toLocaleString('vi-VN')} đ × {bookCount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#184E38] pt-2 border-t border-stone-200">
                  <span className="font-sans">Tổng thanh toán dự kiến:</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              {serviceDone && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã ghi nhận yêu cầu! Hãy mang sách đến ô Tủ E-02 tại trạm K52 trong giờ ra chơi.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors shadow-xs"
              >
                Gửi yêu cầu bọc sách cho BQL Trạm K52
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
