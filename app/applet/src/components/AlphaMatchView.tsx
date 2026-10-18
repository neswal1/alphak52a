import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  BookmarkCheck,
  AlertCircle,
  Zap,
} from 'lucide-react';
import {
  ExchangeItem,
  WishlistDemand,
  AlphaPassMember,
  ItemCategory,
  GradeLevel,
} from '../types';

interface AlphaMatchViewProps {
  items: ExchangeItem[];
  wishlist: WishlistDemand[];
  activeMember: AlphaPassMember;
  onReserveItem: (itemCode: string, studentAlias: string) => void;
  onAddWishlist: (demand: Omit<WishlistDemand, 'id' | 'createdAt' | 'status'>) => void;
  onFulfillMatch: (wishlistId: string, itemCode: string) => void;
}

export const AlphaMatchView: React.FC<AlphaMatchViewProps> = ({
  items,
  wishlist,
  activeMember,
  onReserveItem,
  onAddWishlist,
  onFulfillMatch,
}) => {
  const [selectedDemandId, setSelectedDemandId] = useState<string>(
    wishlist[0]?.id || ''
  );
  const [showBenchmarkComparison, setShowBenchmarkComparison] = useState(false);

  // New demand form
  const [showNewDemandModal, setShowNewDemandModal] = useState(false);
  const [formSubject, setFormSubject] = useState('Toán học');
  const [formGrade, setFormGrade] = useState<GradeLevel>('GRADE_11');
  const [formTitle, setFormTitle] = useState('');
  const [formSeries, setFormSeries] = useState('Kết nối tri thức');
  const [formType, setFormType] = useState<'GIFT' | 'RENT' | 'EXCHANGE' | 'SALE'>('GIFT');

  const selectedDemand = wishlist.find((w) => w.id === selectedDemandId) || wishlist[0];

  // Matching algorithm: calculate match score % for an item against a demand
  const calculateMatchScore = (demand: WishlistDemand, item: ExchangeItem) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Subject match (+35)
    if (
      item.subject.toLowerCase().includes(demand.subject.toLowerCase()) ||
      demand.subject.toLowerCase().includes(item.subject.toLowerCase())
    ) {
      score += 35;
      reasons.push('Đúng môn học');
    }

    // 2. Grade level match (+30)
    if (demand.gradeLevel === 'ALL' || item.gradeLevel === 'ALL' || demand.gradeLevel === item.gradeLevel) {
      score += 30;
      reasons.push('Đúng khối lớp');
    }

    // 3. Keyword / title match (+25)
    const demandWords = demand.titleOrKeyword.toLowerCase().split(' ').filter(Boolean);
    const itemNameLower = item.name.toLowerCase();
    let wordMatches = 0;
    demandWords.forEach((word) => {
      if (word.length > 2 && itemNameLower.includes(word)) {
        wordMatches++;
      }
    });
    if (wordMatches > 0) {
      const titleScore = Math.min(25, wordMatches * 10);
      score += titleScore;
      reasons.push('Khớp tên sách/học liệu');
    }

    // 4. Series match (+10)
    if (
      demand.bookSeries &&
      item.bookSeries &&
      (item.bookSeries.toLowerCase().includes(demand.bookSeries.toLowerCase()) ||
        demand.bookSeries.toLowerCase().includes(item.bookSeries.toLowerCase()))
    ) {
      score += 10;
      reasons.push('Khớp bộ sách cải cách');
    }

    return { score: Math.min(100, score), reasons };
  };

  // Get ranked matches for the selected demand
  const matchCandidates = selectedDemand
    ? items
        .filter((item) => item.status === 'AVAILABLE')
        .map((item) => {
          const matchResult = calculateMatchScore(selectedDemand, item);
          return { item, ...matchResult };
        })
        .filter((c) => c.score >= 40)
        .sort((a, b) => b.score - a.score)
    : [];

  const handleCreateDemand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    onAddWishlist({
      studentPassCode: activeMember.passCode,
      studentAlias: activeMember.aliasName,
      subject: formSubject,
      gradeLevel: formGrade,
      titleOrKeyword: formTitle.trim(),
      bookSeries: formSeries,
      expectedCondition: 'VERY_GOOD',
      preferredType: formType,
      urgency: 'HIGH',
    });

    setFormTitle('');
    setShowNewDemandModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner with Clear Value Proposition */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#123b2b] via-[#184E38] to-[#2D8A63] text-white p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-100 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Động cơ ghép nối Alpha Match – Sáng kiến cốt lõi của THPT Lương Văn Tri</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Ghép nối theo nhu cầu thực: Thu thập trước, chuyển giao đúng
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed text-balance">
            Thay vì thu gom sách cũ thụ động gây dư thừa và ẩm mốc, Alpha Match tiếp nhận yêu cầu học sinh trước, tự động tính điểm tương thích theo môn – lớp – bộ sách và phân bổ ngay tại các ô tủ trạm K52.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowNewDemandModal(true)}
              className="px-4 py-2 text-xs font-semibold bg-white text-[#184E38] rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
            >
              + Đăng ký nhu cầu học liệu mới
            </button>
            <button
              onClick={() => setShowBenchmarkComparison(!showBenchmarkComparison)}
              className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
            >
              {showBenchmarkComparison
                ? 'Ẩn bảng đo lường kiểm chứng'
                : 'Xem so sánh hiệu quả với phương pháp thủ công'}
            </button>
          </div>
        </div>
      </div>

      {/* Benchmark comparison test section (from Section 3.2 in proposal) */}
      {showBenchmarkComparison && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Thử nghiệm kiểm chứng: Tra cứu thủ công qua nhóm lớp vs Alpha Match
              </h3>
              <p className="text-xs text-stone-500">
                Theo phương pháp đo lường độc lập tại mục 3.2 của Thuyết minh dự án
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded">
              Minh chứng dữ liệu thực tế
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Chỉ số đo lường</th>
                  <th className="py-2.5 px-3">Phương pháp cũ (Nhắn nhóm lớp / Sổ giấy)</th>
                  <th className="py-2.5 px-3 text-[#184E38]">Ứng dụng Alpha Match (K52)</th>
                  <th className="py-2.5 px-3 text-right">Mức độ cải thiện</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-medium text-stone-800">
                    Thời gian tìm được nguồn sách phù hợp
                  </td>
                  <td className="py-2.5 px-3 text-stone-600">~ 3 ngày (4.320 phút)</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">2,5 phút</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                    Nhanh hơn 99,9%
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-medium text-stone-800">
                    Tỷ lệ khớp đúng bộ sách & ấn bản cải cách
                  </td>
                  <td className="py-2.5 px-3 text-stone-600">38,5% (hay nhầm sách cũ)</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">95,0%</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                    + 56,5% chính xác
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-medium text-stone-800">
                    Tỷ lệ giao dịch hoàn thành đến tay người cần
                  </td>
                  <td className="py-2.5 px-3 text-stone-600">42,0% (thường bị thất lạc)</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">88,2%</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                    Tăng gấp 2,1 lần
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-medium text-stone-800">
                    Số thao tác trung gian cần trao đổi
                  </td>
                  <td className="py-2.5 px-3 text-stone-600">15–20 tin nhắn qua lại</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">2 chạm quét mã QR</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                    Giảm 88% thao tác
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main 2-Column Matching Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Active Wishlists (Demands) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h2 className="text-sm font-bold text-stone-900">
              Yêu cầu học liệu đang chờ ghép ({wishlist.length})
            </h2>
            <span className="text-[11px] text-stone-500">
              Chọn một nhu cầu để xem đề xuất
            </span>
          </div>

          <div className="space-y-2.5">
            {wishlist.map((w) => {
              const isSelected = selectedDemand?.id === w.id;
              const matchesCount = items.filter(
                (item) =>
                  item.status === 'AVAILABLE' && calculateMatchScore(w, item).score >= 40
              ).length;

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedDemandId(w.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border text-left ${
                    isSelected
                      ? 'bg-emerald-50/70 border-[#184E38] shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-xs text-stone-900">
                        {w.titleOrKeyword}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Người gửi: <span className="font-medium text-stone-700">{w.studentAlias}</span> · {w.studentPassCode}
                      </div>
                    </div>
                    {w.status === 'MATCHED' ? (
                      <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        Đã ghép
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                        Chờ ghép ({matchesCount} món)
                      </span>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-200/50 flex flex-wrap items-center gap-2 text-[11px] text-stone-600">
                    <span>Môn: {w.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {w.gradeLevel === 'GRADE_10'
                        ? 'Khối 10'
                        : w.gradeLevel === 'GRADE_11'
                        ? 'Khối 11'
                        : 'Khối 12'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#184E38]">
                      {w.preferredType === 'GIFT'
                        ? 'Xin tặng'
                        : w.preferredType === 'RENT'
                        ? 'Mượn/Thuê'
                        : w.preferredType === 'EXCHANGE'
                        ? 'Đổi sách'
                        : 'Mua lại'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Matched candidates for selected demand */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            {selectedDemand ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-[11px] font-mono text-[#184E38] font-bold">
                      CHI TIẾT NHU CẦU ĐANG XỬ LÝ
                    </span>
                    <h3 className="text-base font-bold text-stone-900">
                      {selectedDemand.titleOrKeyword}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-500 font-mono">
                    Gửi lúc: {selectedDemand.createdAt}
                  </div>
                </div>

                <div className="text-xs text-stone-600 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-50 p-3 rounded-lg">
                  <div>
                    <div className="text-[10px] text-stone-400">Khối lớp</div>
                    <div className="font-semibold text-stone-800">
                      {selectedDemand.gradeLevel === 'GRADE_10'
                        ? 'Lớp 10'
                        : selectedDemand.gradeLevel === 'GRADE_11'
                        ? 'Lớp 11'
                        : 'Lớp 12'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Môn học</div>
                    <div className="font-semibold text-stone-800">
                      {selectedDemand.subject}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Bộ sách ưu tiên</div>
                    <div className="font-semibold text-stone-800">
                      {selectedDemand.bookSeries || 'Bất kỳ'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400">Hình thức nhận</div>
                    <div className="font-semibold text-emerald-800">
                      {selectedDemand.preferredType === 'GIFT'
                        ? 'Tặng miễn phí'
                        : selectedDemand.preferredType === 'RENT'
                        ? 'Thuê tuần'
                        : 'Đổi / Mua'}
                    </div>
                  </div>
                </div>

                {/* Match Results */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Các học liệu sẵn có trong kho phù hợp nhất ({matchCandidates.length})</span>
                    </h4>
                    <span className="text-[11px] text-stone-500">
                      Xếp theo thuật toán trọng số
                    </span>
                  </div>

                  {matchCandidates.length === 0 ? (
                    <div className="p-6 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center space-y-2">
                      <AlertCircle className="w-6 h-6 text-stone-400 mx-auto" />
                      <div className="text-xs font-semibold text-stone-700">
                        Chưa có học liệu hoàn toàn trùng khớp trong kho hiện tại
                      </div>
                      <p className="text-[11px] text-stone-500 max-w-md mx-auto">
                        Hệ thống đã lưu Wishlist này vào hàng đợi ưu tiên. Ngay khi có học sinh nộp sách tương ứng vào trạm, BQL sẽ nhận được thông báo ghép nối tự động.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matchCandidates.map(({ item, score, reasons }) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-stone-200 hover:border-emerald-600 bg-white shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              {/* Match Score Badge */}
                              <span
                                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                                  score >= 80
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                ĐỘ KHỚP {score}%
                              </span>
                              <span className="text-[11px] font-mono text-stone-500">
                                {item.code}
                              </span>
                            </div>

                            <div className="font-bold text-xs text-stone-900">
                              {item.name}
                            </div>

                            <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-1.5">
                              <span>Vị trí: <strong className="text-stone-800">{item.stationLocker}</strong></span>
                              <span aria-hidden="true">·</span>
                              <span>Tình trạng: {item.condition === 'LIKE_NEW' ? 'Như mới 98%' : item.condition === 'VERY_GOOD' ? 'Rất tốt 90%' : 'Tốt, có ghi chú'}</span>
                              <span aria-hidden="true">·</span>
                              <span>{item.price === 0 ? 'Tặng 0đ' : `${item.price.toLocaleString('vi-VN')} đ`} ({item.coinValue} Coin)</span>
                            </div>

                            {/* Reasons tags */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {reasons.map((r, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.2 rounded"
                                >
                                  ✓ {r}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 w-full sm:w-auto">
                            <button
                              onClick={() => {
                                onReserveItem(item.code, selectedDemand.studentAlias);
                                onFulfillMatch(selectedDemand.id, item.code);
                              }}
                              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <BookmarkCheck className="w-3.5 h-3.5" />
                              <span>Khớp & Đặt chỗ tại {item.stationLocker}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-500">
                Hãy chọn một nhu cầu từ danh sách bên trái để kiểm tra thuật toán Alpha Match.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Demand Registration Modal */}
      {showNewDemandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#184E38]" />
                <h3 className="font-bold text-stone-900 text-sm">
                  Đăng ký nhu cầu học liệu (Alpha Wishlist)
                </h3>
              </div>
              <button
                onClick={() => setShowNewDemandModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDemand} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Môn học cần tìm
                </label>
                <input
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="Toán, Vật lý, Hóa học, Ngữ văn..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value as GradeLevel)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="GRADE_10">Lớp 10</option>
                    <option value="GRADE_11">Lớp 11</option>
                    <option value="GRADE_12">Lớp 12</option>
                    <option value="ALL">Toàn trường</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Hình thức mong muốn
                  </label>
                  <select
                    value={formType}
                    onChange={(e) =>
                      setFormType(e.target.value as 'GIFT' | 'RENT' | 'EXCHANGE' | 'SALE')
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="GIFT">Xin tặng từ quỹ Share</option>
                    <option value="RENT">Mượn / Thuê theo tuần</option>
                    <option value="EXCHANGE">Đổi học liệu tương đương</option>
                    <option value="SALE">Mua giá học sinh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tên tài liệu / Sách giáo khoa / Dụng cụ
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="VD: Sách Chuyên đề Toán 11 Tập 1, Máy tính fx-580..."
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Bộ sách (nếu là SGK)
                </label>
                <input
                  type="text"
                  value={formSeries}
                  onChange={(e) => setFormSeries(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="Kết nối tri thức / Cánh Diều / Chân trời sáng tạo"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-stone-500 text-[11px] leading-relaxed">
                Nhu cầu của bạn sẽ được gán với mã thẻ <strong>{activeMember.passCode}</strong> ({activeMember.aliasName}). Hệ thống sẽ tự động ghép nối và ưu tiên xếp chỗ khi có người chuyển giao.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewDemandModal(false)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#184E38] text-white font-semibold rounded-lg hover:bg-[#123b2b]"
                >
                  Đăng nhu cầu lên Alpha Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
