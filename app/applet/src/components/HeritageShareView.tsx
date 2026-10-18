import React, { useState } from 'react';
import {
  BookOpen,
  Heart,
  ShieldCheck,
  Download,
  Eye,
  Plus,
  Share2,
  Lock,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { HeritageDocument, ExchangeItem, AlphaPassMember } from '../types';

interface HeritageShareViewProps {
  heritageDocs: HeritageDocument[];
  items: ExchangeItem[];
  activeMember: AlphaPassMember;
  onContributeDoc: (doc: Omit<HeritageDocument, 'id' | 'code' | 'downloadCount'>) => void;
  onReserveShareItem: (itemCode: string, alias: string) => void;
}

export const HeritageShareView: React.FC<HeritageShareViewProps> = ({
  heritageDocs,
  items,
  activeMember,
  onContributeDoc,
  onReserveShareItem,
}) => {
  const [activeTab, setActiveTab] = useState<'heritage' | 'share'>('heritage');
  const [selectedDoc, setSelectedDoc] = useState<HeritageDocument | null>(null);
  const [showContributeModal, setShowContributeModal] = useState(false);

  // New Heritage form
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Toán học');
  const [gradeLevel, setGradeLevel] = useState<'GRADE_10' | 'GRADE_11' | 'GRADE_12'>('GRADE_11');
  const [description, setDescription] = useState('');
  const [pagesCount, setPagesCount] = useState(10);
  const [tagsInput, setTagsInput] = useState('Ôn thi HK1, Bí kíp 11A1');
  const [hasAgreement, setHasAgreement] = useState(false);

  // Share items (items in warehouse that are 0đ / GIFT)
  const shareItems = items.filter(
    (item) => item.transactionType === 'GIFT' && item.status === 'AVAILABLE'
  );

  const handleSubmitHeritage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !hasAgreement) return;

    onContributeDoc({
      title: title.trim(),
      subject,
      gradeLevel,
      authorAlias: activeMember.aliasName,
      authorClass: activeMember.realClass,
      description: description.trim(),
      pagesCount: Number(pagesCount) || 1,
      hasPermissionAgreement: true,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setTitle('');
    setDescription('');
    setShowContributeModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#184E38] via-[#23684B] to-[#2D8A63] text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-100 text-xs font-medium">
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>Trụ cột Xã hội & Trí tuệ bản địa Alpha-K52</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Alpha Heritage & Quỹ Tri Thức Alpha Share
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed text-balance">
            Tiếp nối tri thức giữa các thế hệ học sinh THPT Lương Văn Tri: Lưu trữ học liệu tự biên soạn có bản quyền và chuyển giao tài liệu học tập miễn phí cho học sinh có hoàn cảnh khó khăn.
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'heritage'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Alpha Heritage (Học liệu tự biên soạn)
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'share'
                  ? 'bg-white text-[#184E38] shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Alpha Share (Quỹ tặng sách miễn phí)
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Alpha Heritage */}
      {activeTab === 'heritage' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Kho học liệu tự biên soạn – THPT Lương Văn Tri ({heritageDocs.length})
              </h2>
              <p className="text-xs text-stone-500">
                Tài liệu có sự đồng ý của tác giả học sinh, được kiểm duyệt nội dung an toàn và không dùng đề mật
              </p>
            </div>
            <button
              onClick={() => setShowContributeModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors shrink-0 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Đóng góp học liệu Heritage</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heritageDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-stone-200 p-5 hover:border-emerald-700 shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#184E38] font-bold">
                      {doc.code}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Có cam kết tác quyền
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="text-stone-500">
                    Bởi: <strong className="text-stone-800">{doc.authorAlias}</strong> ({doc.authorClass})
                  </div>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex items-center gap-1 font-semibold text-[#184E38] hover:underline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem & Tải</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Alpha Share */}
      {activeTab === 'share' && (
        <div className="space-y-6">
          <div className="bg-rose-50/60 rounded-xl border border-rose-200/80 p-5 flex items-start gap-4">
            <Heart className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 space-y-1.5">
              <h3 className="font-bold text-sm text-rose-950">
                Cam kết Quỹ hỗ trợ học sinh – Alpha Share (Bảo mật danh tính)
              </h3>
              <p className="leading-relaxed">
                Tất cả học liệu trong mục này được các cựu học sinh và thành viên trạm K52 trao tặng với mức phí <strong>0 VNĐ và 0 Alpha Coin</strong>. Nhóm dự án THPT Lương Văn Tri cam kết tuyệt đối không công khai danh tính, hoàn cảnh hay chụp ảnh học sinh nhận đồ hỗ trợ khi chưa có sự cho phép của gia đình và nhà trường.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h2 className="text-base font-bold text-stone-900">
              Sách và vật phẩm trao tặng sẵn sàng ({shareItems.length})
            </h2>
            <span className="text-xs text-stone-500">
              Nhận trực tiếp tại tủ trạm K52
            </span>
          </div>

          {shareItems.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl text-xs text-stone-500 border border-dashed border-stone-200">
              Hiện tại các học liệu tặng đợt này đã được chuyển giao hết. Hãy đăng ký Wishlist để khi có đợt quyên góp mới, hệ thống sẽ ưu tiên gửi đến bạn!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shareItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-[#184E38] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#184E38] font-bold">
                        {item.code}
                      </span>
                      <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                        Tặng 0 VNĐ
                      </span>
                    </div>

                    <h3 className="font-bold text-xs text-stone-900">
                      {item.name}
                    </h3>

                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {item.notes}
                    </p>

                    <div className="text-[11px] text-stone-500">
                      Vị trí lưu kho: <strong className="text-stone-800">{item.stationLocker}</strong>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Tuần hoàn: {item.reuseCount} lượt
                    </span>
                    <button
                      onClick={() => onReserveShareItem(item.code, activeMember.aliasName)}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#184E38] text-white rounded-md hover:bg-[#123b2b] transition-colors"
                    >
                      Đăng ký nhận
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Doc Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#184E38] font-bold">
                  {selectedDoc.code}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl space-y-2 text-xs text-stone-600">
              <div>
                <strong>Tác giả:</strong> {selectedDoc.authorAlias} (Học sinh Lớp {selectedDoc.authorClass} – THPT Lương Văn Tri)
              </div>
              <div>
                <strong>Số trang học liệu:</strong> {selectedDoc.pagesCount} trang
              </div>
              <div>
                <strong>Lượt học sinh đã tải về:</strong> {selectedDoc.downloadCount} lượt
              </div>
              <div className="pt-2 border-t border-stone-200/80 leading-relaxed">
                {selectedDoc.description}
              </div>
            </div>

            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Học liệu đã ký cam kết sử dụng hợp lệ và cho phép học sinh tải về phục vụ ôn tập.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-3 py-2 text-xs text-stone-600 hover:text-stone-800"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  alert(`Đang mở tải tài liệu [${selectedDoc.code}]: ${selectedDoc.title}. Chúc bạn học tốt!`);
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải học liệu (PDF / Sơ đồ)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribute Doc Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                Đóng góp học liệu tự biên soạn vào Alpha Heritage
              </h3>
              <button
                onClick={() => setShowContributeModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitHeritage} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tiêu đề tài liệu / Sơ đồ tư duy
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="VD: Tổng hợp kiến thức Hình học không gian 11..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Môn học
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="GRADE_10">Lớp 10</option>
                    <option value="GRADE_11">Lớp 11</option>
                    <option value="GRADE_12">Lớp 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Mô tả nội dung & phương pháp học
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="Nêu tóm tắt giá trị của tài liệu giúp các bạn ôn thi..."
                  required
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreement}
                    onChange={(e) => setHasAgreement(e.target.checked)}
                    className="mt-0.5 rounded text-[#184E38] focus:ring-[#184E38]"
                    required
                  />
                  <span className="text-[11px] text-stone-600 leading-relaxed">
                    Tôi cam kết đây là tài liệu do tôi hoặc nhóm học tập tự biên soạn, không sao chép trái phép, không chứa đề thi bảo mật hoặc thông tin riêng tư, và đồng ý cho phép học sinh THPT Lương Văn Tri tải về học tập miễn phí.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContributeModal(false)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!hasAgreement}
                  className="px-4 py-2 bg-[#184E38] disabled:bg-stone-300 text-white font-semibold rounded-lg hover:bg-[#123b2b]"
                >
                  Gửi duyệt vào kho Heritage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
