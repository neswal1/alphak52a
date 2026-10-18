import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Plus,
  Coins,
  Shield,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { AlphaPassMember, WishlistDemand, CoinLedgerRecord } from '../types';
import { generateQrMatrix } from '../utils/qrGenerator';

interface AlphaPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMember: AlphaPassMember;
  allMembers: AlphaPassMember[];
  onSelectMember: (member: AlphaPassMember) => void;
  wishlist: WishlistDemand[];
  onAddWishlist: (demand: Omit<WishlistDemand, 'id' | 'createdAt' | 'status'>) => void;
  coinLedger: CoinLedgerRecord[];
}

export const AlphaPassModal: React.FC<AlphaPassModalProps> = ({
  isOpen,
  onClose,
  activeMember,
  allMembers,
  onSelectMember,
  wishlist,
  onAddWishlist,
  coinLedger,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'wishlist' | 'ledger'>('card');
  const [showAddWishlist, setShowAddWishlist] = useState(false);

  // Add Wishlist Form State
  const [subject, setSubject] = useState('Toán học');
  const [gradeLevel, setGradeLevel] = useState<'GRADE_10' | 'GRADE_11' | 'GRADE_12'>('GRADE_11');
  const [titleOrKeyword, setTitleOrKeyword] = useState('');
  const [bookSeries, setBookSeries] = useState('Kết nối tri thức với cuộc sống');
  const [preferredType, setPreferredType] = useState<'GIFT' | 'RENT' | 'EXCHANGE' | 'SALE'>('GIFT');
  const [urgency, setUrgency] = useState<'NORMAL' | 'HIGH'>('NORMAL');

  if (!isOpen) return null;

  const memberWishlists = wishlist.filter(
    (w) => w.studentPassCode === activeMember.passCode
  );

  const memberLedger = coinLedger.filter(
    (c) => c.studentPassCode === activeMember.passCode
  );

  // Generate QR matrix for the member card
  const qrMatrix = generateQrMatrix(
    JSON.stringify({
      type: 'ALPHA_PASS_MEMBER',
      passCode: activeMember.passCode,
      alias: activeMember.aliasName,
      class: activeMember.realClass,
      school: 'THPT Lương Văn Tri',
    })
  );

  const handleSubmitWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleOrKeyword.trim()) return;

    onAddWishlist({
      studentPassCode: activeMember.passCode,
      studentAlias: activeMember.aliasName,
      subject,
      gradeLevel,
      titleOrKeyword: titleOrKeyword.trim(),
      bookSeries,
      expectedCondition: 'VERY_GOOD',
      preferredType,
      urgency,
    });

    setTitleOrKeyword('');
    setShowAddWishlist(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#184E38] text-white flex items-center justify-center font-bold text-sm">
              α
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Thẻ số Alpha Pass & Ví điểm Alpha Coin
              </h2>
              <p className="text-xs text-stone-500">
                Mã định danh thành viên và cổng theo dõi tuần hoàn học liệu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Switcher Toolbar */}
        <div className="px-6 py-3 bg-stone-100/60 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-600">Thành viên đang chọn:</span>
            <select
              value={activeMember.passCode}
              onChange={(e) => {
                const found = allMembers.find((m) => m.passCode === e.target.value);
                if (found) onSelectMember(found);
              }}
              className="bg-white border border-stone-300 rounded px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#184E38]"
            >
              {allMembers.map((m) => (
                <option key={m.passCode} value={m.passCode}>
                  {m.aliasName} ({m.realClass}) – {m.coinBalance} Coin
                </option>
              ))}
            </select>
          </div>
          <div className="text-stone-500 font-mono text-[11px]">
            Gia nhập: {activeMember.joinDate}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 px-6 pt-2 bg-white gap-6">
          <button
            onClick={() => setActiveTab('card')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'card'
                ? 'border-[#184E38] text-[#184E38]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Thẻ QR Alpha Pass
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'border-[#184E38] text-[#184E38]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Nhu cầu cá nhân (Wishlist)</span>
            {memberWishlists.length > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-stone-100 font-bold">
                {memberWishlists.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'ledger'
                ? 'border-[#184E38] text-[#184E38]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Biến động Alpha Coin ({memberLedger.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          {activeTab === 'card' && (
            <div className="space-y-6">
              {/* Alpha Pass Card Visual */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#123b2b] via-[#184E38] to-[#2D8A63] text-white p-6 shadow-xl overflow-hidden">
                {/* Decorative background geometry */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute right-24 -top-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left: Info */}
                  <div className="space-y-3 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono tracking-widest text-emerald-200 uppercase">
                        THPT Lương Văn Tri · Alpha-K52
                      </span>
                    </div>

                    <div>
                      <div className="text-xl font-bold tracking-tight">
                        {activeMember.aliasName}
                      </div>
                      <div className="text-xs text-emerald-100 font-mono">
                        Lớp {activeMember.realClass} · {activeMember.passCode}
                      </div>
                    </div>

                    <div className="inline-block px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-medium text-emerald-100">
                      Danh hiệu: {activeMember.badgeTitle}
                    </div>

                    {/* Stats */}
                    <div className="pt-2 grid grid-cols-3 gap-3 border-t border-white/15">
                      <div>
                        <div className="text-[10px] text-emerald-200">Đã đóng góp</div>
                        <div className="text-sm font-bold font-mono">
                          {activeMember.contributedCount} món
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-200">Đã nhận về</div>
                        <div className="text-sm font-bold font-mono">
                          {activeMember.receivedCount} món
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-200">Tiết kiệm ước tính</div>
                        <div className="text-sm font-bold font-mono text-amber-200">
                          {activeMember.savedMoneyEst.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: QR Code */}
                  <div className="bg-white p-3 rounded-xl text-stone-900 shadow-md text-center shrink-0">
                    <div className="text-[10px] font-semibold text-stone-600 mb-1">
                      MÃ THÀNH VIÊN
                    </div>
                    {/* SVG QR Matrix */}
                    <svg
                      viewBox={`0 0 ${qrMatrix.length} ${qrMatrix.length}`}
                      className="w-32 h-32 mx-auto"
                      shapeRendering="crispEdges"
                    >
                      {qrMatrix.map((row, r) =>
                        row.map((cell, c) =>
                          cell ? (
                            <rect
                              key={`${r}-${c}`}
                              x={c}
                              y={r}
                              width={1}
                              height={1}
                              fill="#132218"
                            />
                          ) : null
                        )
                      )}
                    </svg>
                    <div className="text-[10px] font-mono font-bold text-[#184E38] mt-1">
                      {activeMember.passCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coin Wallet Explanation */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex items-start gap-3">
                <Coins className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="font-semibold text-stone-800">
                    Quy chuẩn Alpha Coin (Điểm trao đổi nội bộ):
                  </div>
                  <p className="leading-relaxed">
                    Alpha Coin không phải tiền mặt, không được mua bán hoặc quy đổi ra tiền trong giai đoạn thử nghiệm. Điểm được cấp khi bạn chuyển giao sách hoặc tài liệu đạt chuẩn kiểm định vào trạm, và được dùng để giữ chỗ hoặc đổi học liệu khác.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Danh sách nhu cầu của bạn (Alpha Wishlist)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Khai báo trước để thuật toán Alpha Match tự động ghép nối khi có học liệu về trạm
                  </p>
                </div>
                <button
                  onClick={() => setShowAddWishlist(!showAddWishlist)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Đăng nhu cầu mới</span>
                </button>
              </div>

              {/* Add Wishlist Inline Form */}
              {showAddWishlist && (
                <form
                  onSubmit={handleSubmitWishlist}
                  className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3"
                >
                  <div className="text-xs font-bold text-stone-800">
                    Thêm nhu cầu học liệu cần tìm
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        Môn học
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                        placeholder="VD: Toán học, Hóa học, Sinh học..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        Khối lớp
                      </label>
                      <select
                        value={gradeLevel}
                        onChange={(e) =>
                          setGradeLevel(e.target.value as 'GRADE_10' | 'GRADE_11' | 'GRADE_12')
                        }
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                      >
                        <option value="GRADE_10">Lớp 10</option>
                        <option value="GRADE_11">Lớp 11</option>
                        <option value="GRADE_12">Lớp 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-stone-600 font-medium mb-1">
                      Tên sách / Dụng cụ chi tiết
                    </label>
                    <input
                      type="text"
                      value={titleOrKeyword}
                      onChange={(e) => setTitleOrKeyword(e.target.value)}
                      placeholder="VD: SGK Toán 11 Tập 2, Máy tính fx-580..."
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        Bộ sách / Ấn bản
                      </label>
                      <input
                        type="text"
                        value={bookSeries}
                        onChange={(e) => setBookSeries(e.target.value)}
                        placeholder="Kết nối tri thức / Cánh Diều / Chân trời..."
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        Hình thức mong muốn
                      </label>
                      <select
                        value={preferredType}
                        onChange={(e) =>
                          setPreferredType(e.target.value as 'GIFT' | 'RENT' | 'EXCHANGE' | 'SALE')
                        }
                        className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white"
                      >
                        <option value="GIFT">Xin tặng miễn phí</option>
                        <option value="RENT">Mượn / Thuê theo tuần</option>
                        <option value="EXCHANGE">Đổi bằng sách khác</option>
                        <option value="SALE">Mua giá học sinh</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddWishlist(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-[#184E38] text-white rounded hover:bg-[#123b2b]"
                    >
                      Lưu nhu cầu
                    </button>
                  </div>
                </form>
              )}

              {/* Wishlist List */}
              {memberWishlists.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs bg-stone-50 rounded-xl border border-dashed border-stone-200">
                  Bạn chưa đăng ký nhu cầu nào. Hãy bấm "Đăng nhu cầu mới" để thuật toán Alpha Match tự động săn học liệu cho bạn!
                </div>
              ) : (
                <div className="space-y-2">
                  {memberWishlists.map((w) => (
                    <div
                      key={w.id}
                      className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-stone-800 flex items-center gap-2">
                          <span>{w.titleOrKeyword}</span>
                          {w.status === 'MATCHED' && (
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                              Đã ghép nối ({w.matchedItemCode})
                            </span>
                          )}
                        </div>
                        <div className="text-stone-500 text-[11px]">
                          Môn: {w.subject} · {w.gradeLevel === 'GRADE_10' ? 'Lớp 10' : w.gradeLevel === 'GRADE_11' ? 'Lớp 11' : 'Lớp 12'} · {w.bookSeries || 'Tất cả bộ sách'}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-stone-500 font-mono">
                          {w.createdAt.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ledger' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-stone-900">
                Lịch sử cộng/trừ Alpha Coin (Đối soát sổ cái)
              </div>
              {memberLedger.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs bg-stone-50 rounded-xl border border-dashed border-stone-200">
                  Chưa có giao dịch phát sinh Alpha Coin.
                </div>
              ) : (
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden text-xs">
                  {memberLedger.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 bg-white hover:bg-stone-50 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="font-medium text-stone-800">
                          {rec.reason}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {rec.timestamp} · Duyệt: {rec.approvedBy}
                        </div>
                      </div>
                      <div className="text-right shrink-0 font-mono">
                        <div
                          className={`font-bold text-sm ${
                            rec.change > 0 ? 'text-emerald-700' : 'text-stone-700'
                          }`}
                        >
                          {rec.change > 0 ? `+${rec.change}` : rec.change} Coin
                        </div>
                        <div className="text-[10px] text-stone-400">
                          Số dư: {rec.balanceAfter} Coin
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
