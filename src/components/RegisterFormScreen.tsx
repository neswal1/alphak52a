import React, { useState } from 'react';
import {
  Send,
  Shield,
  CheckCircle,
  FileText,
  Gift,
  RefreshCw,
  ShoppingBag,
  Clock,
  Archive,
  Search,
} from 'lucide-react';
import { GradeLevel, ItemCategory, ItemCondition, RegistrationRequest, TransactionType } from '../types';
import { DemoBanner } from './DemoBanner';
import {
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
} from '../utils/formatters';

interface RegisterFormScreenProps {
  onSubmitRequest: (reqData: Omit<RegistrationRequest, 'id' | 'itemCode' | 'status' | 'submittedAt'>) => void;
}

export const RegisterFormScreen: React.FC<RegisterFormScreenProps> = ({ onSubmitRequest }) => {
  const [transactionType, setTransactionType] = useState<TransactionType>('GIFT');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('TEXTBOOK');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('GRADE_10');
  const [subject, setSubject] = useState('');
  const [condition, setCondition] = useState<ItemCondition>('VERY_GOOD');
  const [proposedPrice, setProposedPrice] = useState('0');
  const [proposedRentPrice, setProposedRentPrice] = useState('0');
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [studentAlias, setStudentAlias] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const typeDescriptions: Record<TransactionType, { title: string; desc: string; icon: React.ReactNode }> = {
    GIFT: {
      title: '🎁 Tặng 0 ₫ (Miễn phí)',
      desc: 'Tặng sách vở hoặc đồ dùng cho các bạn học sinh khóa dưới có nhu cầu hoặc hoàn cảnh khó khăn.',
      icon: <Gift className="w-4 h-4 text-emerald-600" />,
    },
    RENT: {
      title: '⏱ Cho thuê / Mượn có kỳ hạn',
      desc: 'Cho các bạn mượn máy tính Casio hoặc tài liệu ôn thi theo tuần hoặc học kỳ với chi phí hỗ trợ nhỏ.',
      icon: <Clock className="w-4 h-4 text-blue-600" />,
    },
    SALE: {
      title: '🏷 Bán lại giá học sinh',
      desc: 'Chuyển nhượng lại dụng cụ, sách bài tập còn mới với giá tiết kiệm cho bạn cùng trường.',
      icon: <ShoppingBag className="w-4 h-4 text-amber-600" />,
    },
    EXCHANGE: {
      title: '🔄 Trao đổi vật phẩm tương đương',
      desc: 'Đổi sách giáo khoa môn này lấy môn khác, hoặc đổi size áo đồng phục học sinh.',
      icon: <RefreshCw className="w-4 h-4 text-purple-600" />,
    },
    CONSIGNMENT: {
      title: '📦 Ký gửi tại tủ trạm K52',
      desc: 'Đặt đồ vào tủ trạm sảnh Nhà A để ban quản trị điều phối bàn giao khi có người cần.',
      icon: <Archive className="w-4 h-4 text-teal-600" />,
    },
    WANTED: {
      title: '🔍 Cần tìm / Cần mua vật phẩm',
      desc: 'Đăng tin tìm sách cũ hoặc máy tính để các bạn có đồ dư thừa liên hệ chuyển tiếp.',
      icon: <Search className="w-4 h-4 text-rose-600" />,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) {
      setError('Vui lòng nhập tên sách hoặc vật phẩm!');
      return;
    }
    if (!studentAlias.trim()) {
      setError('Vui lòng nhập bí danh ẩn danh (VD: HS K52-Toán)!');
      return;
    }

    onSubmitRequest({
      transactionType,
      itemName: itemName.trim(),
      category,
      gradeLevel,
      subject: subject.trim() || 'Chung',
      condition,
      proposedPrice: Number(proposedPrice) || 0,
      proposedRentPrice: Number(proposedRentPrice) || 0,
      quantity: Math.max(1, Number(quantity) || 1),
      notes: notes.trim(),
      studentAlias: studentAlias.trim(),
      internalContactNotice: 'Lưu an toàn nội bộ Trạm K52 (Không công khai)',
    });

    setSubmitted(true);
    setError('');
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto space-y-4 animate-in fade-in duration-200">
        <DemoBanner />
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Đã gửi phiếu đăng ký lên Trạm K52!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Phiếu của bạn đã được chuyển vào hàng chờ duyệt trên <strong>Trang Quản Trị</strong>. Ban quản trị trạm sẽ kiểm định và cấp mã QR định danh trước khi xếp vào tủ đồ K52.
          </p>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium max-w-sm mx-auto">
            Bí danh người gửi: <span className="font-bold">{studentAlias}</span> (An toàn tuyệt đối)
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setItemName('');
                setSubject('');
                setNotes('');
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition"
            >
              Tạo phiếu đăng ký khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-in fade-in duration-200">
      <DemoBanner />

      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Đăng Ký Vật Phẩm Học Tập
            </h1>
            <p className="text-xs text-slate-500">
              Đăng ký Bán, Mua, Thuê, Tặng, Đổi hoặc Ký gửi tại Trạm Alpha-K52
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Section 1: Transaction Type */}
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              1. Chọn hình thức bạn muốn tham gia *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(typeDescriptions) as TransactionType[]).map((typeKey) => {
                const isSelected = transactionType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => {
                      setTransactionType(typeKey);
                      if (typeKey === 'GIFT') {
                        setProposedPrice('0');
                        setProposedRentPrice('0');
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="mt-0.5">{typeDescriptions[typeKey].icon}</div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">
                        {TRANSACTION_TYPE_LABELS[typeKey].label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanatory note */}
            <div className="mt-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              {typeDescriptions[transactionType].desc}
            </div>
          </div>

          {/* Section 2: Item Info */}
          <div className="pt-2 border-t border-slate-100 space-y-3.5">
            <label className="block font-bold text-slate-800">
              2. Thông tin vật phẩm *
            </label>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tên sách / Vật phẩm *
              </label>
              <input
                type="text"
                required
                placeholder="VD: Bộ SGK Toán 10 Kết Nối Tri Thức (Tập 1 & 2)"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nhóm hàng *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Khối lớp *</label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {Object.entries(GRADE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Môn học *</label>
                <input
                  type="text"
                  required
                  placeholder="Toán, Văn, Tiếng Anh, Tin học..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số lượng</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tình trạng thực tế *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {Object.entries(CONDITION_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            {(transactionType === 'SALE' || transactionType === 'RENT' || transactionType === 'CONSIGNMENT') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giá bán đề xuất (₫)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 nếu tặng"
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                {transactionType === 'RENT' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Giá thuê/tuần (₫)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={proposedRentPrice}
                      onChange={(e) => setProposedRentPrice(e.target.value)}
                      className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Ghi chú chi tiết cho Ban Quản Trị Trạm
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Đã ghi chú phương pháp giải nhanh, muốn đổi lấy đồng phục size L..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Section 3: Privacy & Pseudonym */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="block font-bold text-slate-800">
              3. Định danh học sinh & Bảo mật thông tin *
            </label>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bí danh của bạn (Không dùng họ tên thật để bảo vệ quyền riêng tư) *
              </label>
              <input
                type="text"
                required
                placeholder="VD: HS K52-Toán, HS Khối 11, Cựu học sinh 12A1..."
                value={studentAlias}
                onChange={(e) => setStudentAlias(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-900">
              <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold">Cam kết bảo mật tuyệt đối tại Trạm K52:</p>
                <p className="text-emerald-800 mt-0.5">
                  Số điện thoại, địa chỉ hay thông tin lớp học chi tiết KHÔNG BAO GIỜ bị công khai trên mạng hoặc trong mã QR. Ban quản trị trạm đóng vai trò trung gian bàn giao tại tủ đồ trường.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Phiếu Đăng Ký Lên Trạm K52</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
