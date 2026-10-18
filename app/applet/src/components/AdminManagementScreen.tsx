import React, { useState } from 'react';
import {
  ShieldAlert,
  Check,
  X,
  Package,
  QrCode,
  Lock,
  Plus,
  History,
  AlertCircle,
  FileCheck,
  CreditCard,
  Grid,
  Scale,
  RefreshCw,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import {
  ExchangeItem,
  ItemCondition,
  RegistrationRequest,
  TransactionLog,
  UserRole,
  StationLockerUnit,
  CoinLedgerRecord,
  AlphaPassMember,
} from '../types';
import {
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
  STATUS_LABELS,
  formatVnd,
} from '../utils/formatters';

interface AdminManagementScreenProps {
  currentRole: UserRole;
  items: ExchangeItem[];
  requests: RegistrationRequest[];
  logs: TransactionLog[];
  lockers: StationLockerUnit[];
  coinLedger: CoinLedgerRecord[];
  allMembers: AlphaPassMember[];
  onAuthenticateAdmin: (pin: string) => boolean;
  onApproveRequest: (requestId: string, targetLocker: string) => void;
  onRejectRequest: (requestId: string, reason: string) => void;
  onHandoverItem: (code: string, recipient: string, notes: string) => void;
  onReturnItem: (code: string, cond: ItemCondition, locker: string, notes: string) => void;
  onOpenAddModal: () => void;
  onShowQr: (item: ExchangeItem) => void;
  onAddAdjustingEntry: (
    studentPassCode: string,
    change: number,
    reason: string,
    relatedItemCode?: string
  ) => void;
}

export const AdminManagementScreen: React.FC<AdminManagementScreenProps> = ({
  currentRole,
  items,
  requests,
  logs,
  lockers,
  coinLedger,
  allMembers,
  onAuthenticateAdmin,
  onApproveRequest,
  onRejectRequest,
  onHandoverItem,
  onReturnItem,
  onOpenAddModal,
  onShowQr,
  onAddAdjustingEntry,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<
    'two_qr' | 'requests' | 'lockers' | 'ledger' | 'return'
  >('two_qr');

  // Two-QR Quick Handover / Receive Workbench State
  const [scannedPassCode, setScannedPassCode] = useState<string>(allMembers[0]?.passCode || '');
  const [scannedItemCode, setScannedItemCode] = useState<string>(
    items.find((i) => i.status === 'AVAILABLE')?.code || ''
  );
  const [twoQrSuccessMsg, setTwoQrSuccessMsg] = useState<string | null>(null);

  // Return item state
  const [returnItemCode, setReturnItemCode] = useState<string>('');
  const [returnCondition, setReturnCondition] = useState<ItemCondition>('VERY_GOOD');
  const [returnLocker, setReturnLocker] = useState('Tủ A-06');
  const [returnNotes, setReturnNotes] = useState('');

  // Reject state
  const [rejectTarget, setRejectTarget] = useState<RegistrationRequest | null>(null);
  const [rejectReason, setRejectReason] = useState(
    'Học liệu không phù hợp chương trình hoặc đã có đủ số lượng trong kho trạm.'
  );

  // Adjusting Entry state
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustPassCode, setAdjustPassCode] = useState(allMembers[0]?.passCode || '');
  const [adjustChange, setAdjustChange] = useState<number>(-5);
  const [adjustReason, setAdjustReason] = useState(
    'Bút toán điều chỉnh đối soát cuối ngày: Hoàn trả số dư do hủy giao dịch mượn sách.'
  );
  const [adjustItemCode, setAdjustItemCode] = useState('');

  if (currentRole !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto py-12 space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            Khu vực Quản trị Bàn điều hành Trạm K52
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Dành cho Đội ngũ quản lý Lớp 11A1 thực hiện kiểm định học liệu, phân bổ ô tủ trạm, đối soát sổ cái và vận hành 2 mã QR.
          </p>
          <div className="p-3 bg-stone-50 rounded-lg text-xs font-mono text-stone-700 border border-stone-200">
            Mã PIN thử nghiệm: <strong>1234</strong>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const ok = onAuthenticateAdmin(pinInput);
              if (!ok) setPinError('Mã PIN không đúng! Vui lòng nhập 1234.');
            }}
            className="space-y-3"
          >
            <input
              type="password"
              placeholder="Nhập mã PIN quản trị"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              className="w-full text-center tracking-widest text-base font-mono p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184E38]"
              autoFocus
            />
            {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-[#184E38] text-white text-xs font-semibold rounded-lg hover:bg-[#123b2b] transition-colors"
            >
              Mở khóa Bàn điều hành
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) => r.status === 'PENDING');
  const availableItems = items.filter((i) => i.status === 'AVAILABLE' || i.status === 'RESERVED');
  const selectedMember = allMembers.find((m) => m.passCode === scannedPassCode) || allMembers[0];
  const selectedItem = items.find((i) => i.code === scannedItemCode);

  const handleExecuteTwoQrHandover = () => {
    if (!selectedItem || !selectedMember) return;
    onHandoverItem(
      selectedItem.code,
      `${selectedMember.aliasName} (${selectedMember.passCode})`,
      `Quét khớp 2 mã QR tại bàn BQL. Đã giao từ ${selectedItem.stationLocker}.`
    );
    setTwoQrSuccessMsg(
      `Đã hoàn tất bàn giao [${selectedItem.code}] cho bạn [${selectedMember.aliasName}]. Ô tủ ${selectedItem.stationLocker} đã được giải phóng!`
    );
    setTimeout(() => setTwoQrSuccessMsg(null), 5000);
  };

  const handleCreateAdjustingEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustReason.trim()) return;

    onAddAdjustingEntry(
      adjustPassCode,
      Number(adjustChange),
      adjustReason.trim(),
      adjustItemCode.trim() || undefined
    );
    setShowAdjustModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Admin Top Status */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-[11px] font-mono font-bold text-[#184E38] uppercase">
              BÀN ĐIỀU HÀNH BQL KHO TRẠM ALPHA-K52
            </span>
          </div>
          <h1 className="text-lg font-bold text-stone-900 mt-1">
            Hệ thống Quản trị, Đối soát & Điều phối Ô tủ
          </h1>
          <p className="text-xs text-stone-500">
            Trường THPT Lương Văn Tri · Lớp 11A1 quản trị
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nhập thêm học liệu trực tiếp</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-stone-200 bg-white px-4 rounded-xl gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('two_qr')}
          className={`py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'two_qr'
              ? 'border-[#184E38] text-[#184E38]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Bàn tác nghiệp 2 mã QR (Giao/Nhận)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('requests')}
          className={`py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'requests'
              ? 'border-[#184E38] text-[#184E38]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Duyệt yêu cầu gửi đồ ({pendingRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('lockers')}
          className={`py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'lockers'
              ? 'border-[#184E38] text-[#184E38]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Sơ đồ 30 Ô Tủ Trạm (Lockers)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('ledger')}
          className={`py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'ledger'
              ? 'border-[#184E38] text-[#184E38]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Sổ Cái Đối Soát & Bút Toán Điều Chỉnh</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('return')}
          className={`py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'return'
              ? 'border-[#184E38] text-[#184E38]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Nghiệm thu nhận trả đồ mượn</span>
        </button>
      </div>

      {/* Tab 1: Two-QR Workbench */}
      {activeAdminTab === 'two_qr' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Cơ chế Xác thực & Bàn giao bằng 2 mã QR đồng thời (Bước 5)
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Đối chiếu QR Thẻ Alpha Pass (Người nhận) và QR Tem vật phẩm (Kho học liệu) để ghi nhận giao dịch duy nhất
            </p>
          </div>

          {twoQrSuccessMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{twoQrSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR 1: Alpha Pass Member */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#184E38]" />
                  <span>MÃ QR 1: THẺ ALPHA PASS THÀNH VIÊN</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500">Người nhận đồ</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Chọn mã thẻ Alpha Pass quét tại quầy:
                </label>
                <select
                  value={scannedPassCode}
                  onChange={(e) => setScannedPassCode(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white font-semibold text-stone-800"
                >
                  {allMembers.map((m) => (
                    <option key={m.passCode} value={m.passCode}>
                      {m.passCode} – {m.aliasName} ({m.realClass}) | Dư: {m.coinBalance} Coin
                    </option>
                  ))}
                </select>
              </div>

              {selectedMember && (
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-800">
                    {selectedMember.aliasName} · Lớp {selectedMember.realClass}
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    Danh hiệu: <strong>{selectedMember.badgeTitle}</strong>
                  </div>
                  <div className="text-emerald-700 font-mono font-bold text-xs pt-1">
                    Số dư Alpha Coin khả dụng: {selectedMember.coinBalance} Coin
                  </div>
                </div>
              )}
            </div>

            {/* QR 2: Item Barcode */}
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#184E38]" />
                  <span>MÃ QR 2: TEM VẬT PHẨM LƯU KHO</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500">Học liệu giao</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Chọn mã QR tem học liệu tại ô tủ:
                </label>
                <select
                  value={scannedItemCode}
                  onChange={(e) => setScannedItemCode(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white font-semibold text-stone-800"
                >
                  {availableItems.map((item) => (
                    <option key={item.code} value={item.code}>
                      [{item.code}] {item.name} – {item.stationLocker} ({item.coinValue} Coin)
                    </option>
                  ))}
                </select>
              </div>

              {selectedItem && (
                <div className="bg-white p-3 rounded-lg border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-800">
                    {selectedItem.name}
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    Vị trí: <strong>{selectedItem.stationLocker}</strong> · Tình trạng: {selectedItem.condition}
                  </div>
                  <div className="text-stone-700 text-xs font-mono">
                    Hình thức: {selectedItem.transactionType} · Giá trị quy đổi: {selectedItem.coinValue} Coin
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={handleExecuteTwoQrHandover}
              disabled={!selectedItem || !selectedMember}
              className="px-6 py-2.5 text-xs font-bold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b] transition-colors shadow-sm disabled:bg-stone-300 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Xác nhận khớp 2 mã & Xuất kho bàn giao</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Requests Approval */}
      {activeAdminTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Danh sách yêu cầu gửi học liệu chờ duyệt ({pendingRequests.length})
              </h2>
              <p className="text-xs text-stone-500">
                Kiểm định thực tế, định giá theo bảng phân loại công khai và chỉ định ô tủ lưu trữ
              </p>
            </div>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl text-xs text-stone-500 border border-dashed border-stone-200">
              Hiện không có đơn gửi đồ nào đang chờ duyệt.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-[#184E38] font-bold">
                        {req.itemCode}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900">
                        {req.itemName}
                      </h3>
                      <div className="text-xs text-stone-500">
                        Học sinh gửi: <strong>{req.studentAlias}</strong> · Gửi lúc: {req.submittedAt}
                      </div>
                    </div>
                    <div className="text-xs text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200">
                      Tình trạng khai báo: <strong>{CONDITION_LABELS[req.condition]}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed bg-white p-3 rounded-lg border border-stone-200/80">
                    "{req.notes}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-stone-600">
                      Chỉ dẫn liên hệ nội bộ: <em>{req.internalContactNotice}</em>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRejectTarget(req)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => onApproveRequest(req.id, 'Tủ A-06')}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-[#184E38] hover:bg-[#123b2b] rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt & Nhập vào Tủ A-06</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: 30 Lockers Grid */}
      {activeAdminTab === 'lockers' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Sơ Đồ 30 Ngăn Tủ Trạm K52 (Station Locker Grid)
              </h2>
              <p className="text-xs text-stone-500">
                Tủ đặt tại sảnh hành lang THPT Lương Văn Tri · Theo dõi trực quan ngăn trống và ngăn có sách
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-stone-600">
                <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-300"></span> Trống (Sẵn sàng)
              </span>
              <span className="flex items-center gap-1 text-stone-600">
                <span className="w-3 h-3 rounded bg-stone-800"></span> Đang có học liệu
              </span>
              <span className="flex items-center gap-1 text-stone-600">
                <span className="w-3 h-3 rounded bg-amber-400"></span> Hẹn giữ chỗ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {lockers.map((locker) => {
              const isOccupied = locker.status === 'OCCUPIED';
              const isReserved = locker.status === 'RESERVED';

              return (
                <div
                  key={locker.code}
                  className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between h-28 ${
                    isOccupied
                      ? 'bg-stone-900 text-white border-stone-800'
                      : isReserved
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-emerald-50/40 border-emerald-200 text-stone-700 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm">
                      {locker.code}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isOccupied
                          ? 'bg-stone-700 text-stone-200'
                          : isReserved
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {locker.status === 'OCCUPIED'
                        ? 'CÓ HỌC LIỆU'
                        : locker.status === 'RESERVED'
                        ? 'ĐẶT CHỖ'
                        : 'TRỐNG'}
                    </span>
                  </div>

                  <div className="my-1">
                    {locker.itemName ? (
                      <div className="font-medium text-[11px] line-clamp-2">
                        {locker.itemName}
                      </div>
                    ) : (
                      <div className="text-[11px] text-stone-400 italic">
                        {locker.tier}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] font-mono opacity-80">
                    {locker.itemCode || 'Sẵn sàng xếp'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Ledger & Adjusting Entry */}
      {activeAdminTab === 'ledger' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Sổ Cái Đối Soát Cuối Ngày & Bút Toán Điều Chỉnh (Mục 2.1 & 2.2)
              </h2>
              <p className="text-xs text-stone-500">
                Nguyên tắc bất biến: Tuyệt đối không xóa lịch sử giao dịch cũ; xử lý sai sót bằng Bút toán điều chỉnh minh bạch
              </p>
            </div>
            <button
              onClick={() => setShowAdjustModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Lập bút toán điều chỉnh</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Thời điểm</th>
                  <th className="py-2.5 px-3">Thẻ Alpha Pass</th>
                  <th className="py-2.5 px-3">Nội dung đối soát</th>
                  <th className="py-2.5 px-3 text-right">Biến động Coin</th>
                  <th className="py-2.5 px-3 text-right">Số dư sau</th>
                  <th className="py-2.5 px-3">Người duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {coinLedger.map((rec) => (
                  <tr key={rec.id} className="hover:bg-stone-50">
                    <td className="py-2.5 px-3 text-stone-500 text-[11px]">
                      {rec.timestamp}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-stone-800">
                      {rec.studentPassCode} ({rec.studentAlias})
                    </td>
                    <td className="py-2.5 px-3 font-sans text-stone-700">
                      {rec.reason}
                      {rec.relatedItemCode && (
                        <span className="ml-1 text-[10px] text-[#184E38] font-mono">
                          [{rec.relatedItemCode}]
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        rec.change > 0 ? 'text-emerald-700' : 'text-stone-700'
                      }`}
                    >
                      {rec.change > 0 ? `+${rec.change}` : rec.change}
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-900 font-bold">
                      {rec.balanceAfter}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-stone-500 text-[11px]">
                      {rec.approvedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Return Items */}
      {activeAdminTab === 'return' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Nghiệm thu Nhận trả đồ mượn / thuê
            </h2>
            <p className="text-xs text-stone-500">
              Kiểm định tình trạng sau khi học sinh sử dụng, cập nhật tình trạng mới và trả vào ô tủ trạm
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!returnItemCode) return;
              onReturnItem(returnItemCode, returnCondition, returnLocker, returnNotes);
              setReturnNotes('');
              alert(`Đã nhận trả thành công vật phẩm [${returnItemCode}] vào ${returnLocker}!`);
            }}
            className="max-w-xl space-y-4 text-xs"
          >
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Chọn học liệu nhận lại:
              </label>
              <select
                value={returnItemCode}
                onChange={(e) => setReturnItemCode(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                required
              >
                <option value="">-- Chọn mã vật phẩm --</option>
                {items.map((i) => (
                  <option key={i.code} value={i.code}>
                    [{i.code}] {i.name} (Hiện: {STATUS_LABELS[i.status]})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Kiểm định tình trạng sau hoàn trả
                </label>
                <select
                  value={returnCondition}
                  onChange={(e) => setReturnCondition(e.target.value as ItemCondition)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                >
                  <option value="LIKE_NEW">Như mới 98%</option>
                  <option value="VERY_GOOD">Rất tốt 90%</option>
                  <option value="GOOD_WITH_NOTES">Tốt, có ghi chú nhẹ</option>
                  <option value="ACCEPTABLE">Khá, dùng được</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Chỉ định ô tủ cất đồ
                </label>
                <input
                  type="text"
                  value={returnLocker}
                  onChange={(e) => setReturnLocker(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="VD: Tủ A-06"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Ghi chú nghiệm thu
              </label>
              <input
                type="text"
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                placeholder="VD: Sách còn nguyên vẹn, gáy sách tốt..."
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#184E38] text-white font-bold rounded-lg hover:bg-[#123b2b] transition-colors"
            >
              Hoàn tất nhận trả & Tái kích hoạt học liệu
            </button>
          </form>
        </div>
      )}

      {/* Adjusting Entry Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                Lập bút toán điều chỉnh sổ cái (Adjusting Entry)
              </h3>
              <button
                onClick={() => setShowAdjustModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdjustingEntry} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Mã thẻ Alpha Pass thành viên
                </label>
                <select
                  value={adjustPassCode}
                  onChange={(e) => setAdjustPassCode(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                >
                  {allMembers.map((m) => (
                    <option key={m.passCode} value={m.passCode}>
                      {m.passCode} – {m.aliasName} ({m.coinBalance} Coin)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Giá trị điều chỉnh Coin (Dương hoặc Âm)
                </label>
                <input
                  type="number"
                  value={adjustChange}
                  onChange={(e) => setAdjustChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Lý do lập bút toán điều chỉnh
                </label>
                <textarea
                  rows={3}
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700"
                >
                  Ghi vào sổ cái bất biến
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Request Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm">
              Từ chối yêu cầu gửi đồ [{rejectTarget.itemCode}]
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Ghi rõ lý do phản hồi cho bạn {rejectTarget.studentAlias}
            </p>

            <div className="mt-3">
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                className="px-3 py-2 text-xs text-stone-600 hover:text-stone-800"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  onRejectRequest(rejectTarget.id, rejectReason);
                  setRejectTarget(null);
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
