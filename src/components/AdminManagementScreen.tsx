import React, { useState } from 'react';
import {
  ShieldAlert,
  Check,
  X,
  Package,
  ArrowUpRight,
  RefreshCw,
  QrCode,
  Lock,
  Plus,
  History,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import {
  ExchangeItem,
  ItemCondition,
  RegistrationRequest,
  TransactionLog,
  UserRole,
} from '../types';
import { DemoBanner } from './DemoBanner';
import {
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
  STATUS_LABELS,
  ACTION_LOG_LABELS,
  formatVnd,
} from '../utils/formatters';

interface AdminManagementScreenProps {
  currentRole: UserRole;
  items: ExchangeItem[];
  requests: RegistrationRequest[];
  logs: TransactionLog[];
  onAuthenticateAdmin: (pin: string) => boolean;
  onApproveRequest: (requestId: string, targetLocker: string) => void;
  onRejectRequest: (requestId: string, reason: string) => void;
  onHandoverItem: (code: string, recipient: string, notes: string) => void;
  onReturnItem: (code: string, cond: ItemCondition, locker: string, notes: string) => void;
  onOpenAddModal: () => void;
  onShowQr: (item: ExchangeItem) => void;
}

export const AdminManagementScreen: React.FC<AdminManagementScreenProps> = ({
  currentRole,
  items,
  requests,
  logs,
  onAuthenticateAdmin,
  onApproveRequest,
  onRejectRequest,
  onHandoverItem,
  onReturnItem,
  onOpenAddModal,
  onShowQr,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'requests' | 'handover' | 'return' | 'logs'>('requests');

  // Modal Handover state
  const [handoverTarget, setHandoverTarget] = useState<ExchangeItem | null>(null);
  const [handoverRecipient, setHandoverRecipient] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');

  // Modal Return state
  const [returnTarget, setReturnTarget] = useState<ExchangeItem | null>(null);
  const [returnCondition, setReturnCondition] = useState<ItemCondition>('VERY_GOOD');
  const [returnLocker, setReturnLocker] = useState('Tủ K52 - Ô số 12');
  const [returnNotes, setReturnNotes] = useState('');

  // Reject state
  const [rejectTarget, setRejectTarget] = useState<RegistrationRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('Vật phẩm không đạt tiêu chuẩn kỹ thuật hoặc đã đủ số lượng trong kho.');

  // If NOT ADMIN, show authentication challenge
  if (currentRole !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto space-y-4 py-8 animate-in fade-in duration-200">
        <DemoBanner />
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Khu Vực Quản Trị Trạm K52
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Chức năng duyệt yêu cầu, xuất nhập kho, bàn giao và nhận trả đồ yêu cầu quyền Quản trị viên trạm.
          </p>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
            Mã PIN thử nghiệm DEMO: <span className="font-mono font-bold text-emerald-950">1234</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const success = onAuthenticateAdmin(pinInput);
              if (!success) {
                setPinError('Mã PIN không đúng! Hãy nhập 1234.');
              }
            }}
            className="space-y-3"
          >
            <input
              type="password"
              placeholder="Nhập mã PIN"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              className="w-full text-center tracking-widest text-lg font-mono p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {pinError && (
              <p className="text-xs text-red-600 font-semibold">{pinError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition"
            >
              Xác thực quyền Quản trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) => r.status === 'PENDING');
  const availableItems = items.filter((i) => i.status === 'AVAILABLE' || i.status === 'RESERVED');
  const rentedItems = items.filter((i) => i.status === 'RENTED');

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <DemoBanner />

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Bảng Điều Phối & Quản Trị Trạm K52
            </h1>
            <p className="text-xs text-slate-500">
              Duyệt đơn, xuất nhập kho, bàn giao và nhận trả đồ dùng học tập
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nhập kho trực tiếp</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white rounded-xl px-2 gap-2 shadow-xs">
        <button
          onClick={() => setActiveAdminTab('requests')}
          className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'requests'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Duyệt yêu cầu đăng ký</span>
          {pendingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('handover')}
          className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'handover'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Xuất kho & Bàn giao đồ ({availableItems.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('return')}
          className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'return'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Nhận trả đồ ({rentedItems.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'logs'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Lịch sử giao dịch ({logs.length})</span>
        </button>
      </div>

      {/* Tab 1: Requests */}
      {activeAdminTab === 'requests' && (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              Chưa có phiếu đăng ký nào.
            </div>
          ) : (
            requests.map((req) => {
              const isPending = req.status === 'PENDING';
              return (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {req.itemCode}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          req.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800'
                            : req.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {req.status === 'PENDING'
                          ? 'Chờ duyệt'
                          : req.status === 'APPROVED'
                          ? 'Đã duyệt nhập kho'
                          : 'Đã từ chối'}
                      </span>
                      <span className="text-xs text-slate-400">• {req.submittedAt}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {req.itemName}
                    </h4>

                    <div className="text-xs text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Hình thức: <strong>{TRANSACTION_TYPE_LABELS[req.transactionType].label}</strong></span>
                      <span>Nhóm: {CATEGORY_LABELS[req.category]}</span>
                      <span>Khối: {GRADE_LABELS[req.gradeLevel]}</span>
                      <span>Tình trạng: {CONDITION_LABELS[req.condition]}</span>
                      <span>Số lượng: {req.quantity}</span>
                      {req.proposedPrice > 0 && (
                        <span>Giá: {formatVnd(req.proposedPrice)}</span>
                      )}
                    </div>

                    <p className="text-xs text-emerald-800 font-medium">
                      Người gửi: {req.studentAlias} ({req.internalContactNotice})
                    </p>

                    {req.notes && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-200">
                        Ghi chú: {req.notes}
                      </p>
                    )}

                    {req.rejectionReason && (
                      <p className="text-xs text-red-600">
                        Lý do từ chối: {req.rejectionReason}
                      </p>
                    )}
                  </div>

                  {isPending && (
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const targetLocker = `Tủ K52 - Ô số ${Math.floor(10 + Math.random() * 20)}`;
                          onApproveRequest(req.id, targetLocker);
                        }}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
                      >
                        <Check className="w-4 h-4" />
                        <span>Duyệt & Nhập kho</span>
                      </button>

                      <button
                        onClick={() => setRejectTarget(req)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Stock Out & Handover */}
      {activeAdminTab === 'handover' && (
        <div className="space-y-3">
          {availableItems.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              Không có vật phẩm nào đang sẵn sàng bàn giao.
            </div>
          ) : (
            availableItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.code}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800">
                      {STATUS_LABELS[item.status].label}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">
                    Vị trí: <strong>{item.stationLocker}</strong> • Chủ: {item.ownerAlias} • SL: {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowQr(item)}
                    className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-600"
                    title="Xem mã QR"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setHandoverTarget(item);
                      setHandoverRecipient('');
                      setHandoverNotes('');
                    }}
                    className="py-2 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition"
                  >
                    Bàn giao đồ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Return Items */}
      {activeAdminTab === 'return' && (
        <div className="space-y-3">
          {rentedItems.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              Không có món đồ nào đang cho thuê/mượn cần trả lại kho.
            </div>
          ) : (
            rentedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.code}
                    </span>
                    <span className="text-xs font-semibold text-blue-700">
                      Đang cho thuê / mượn
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-500">
                    Ô tủ cất trước đó: {item.stationLocker}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setReturnTarget(item);
                    setReturnCondition(item.condition);
                    setReturnLocker(item.stationLocker);
                    setReturnNotes('');
                  }}
                  className="py-2 px-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition"
                >
                  Nhận trả đồ vào kho
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Logs */}
      {activeAdminTab === 'logs' && (
        <div className="space-y-2.5">
          {logs.map((log) => {
            const config = ACTION_LOG_LABELS[log.actionType];
            return (
              <div
                key={log.id}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.bg} ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800">
                      {log.itemCode}
                    </span>
                    <span className="text-xs text-slate-400">• {log.timestamp}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{log.itemName}</p>
                  <p className="text-xs text-slate-600">{log.notes}</p>
                </div>
                <div className="text-[11px] text-slate-400 sm:text-right shrink-0">
                  Thực hiện bởi: <strong className="text-slate-600">{log.actor}</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Handover */}
      {handoverTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">
              Bàn giao: {handoverTarget.code}
            </h3>
            <p className="text-xs text-slate-600">{handoverTarget.name}</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bí danh người nhận (VD: HS 10A2) *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập bí danh học sinh"
                value={handoverRecipient}
                onChange={(e) => setHandoverRecipient(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi chú bàn giao
              </label>
              <input
                type="text"
                placeholder="Kiểm tra đầy đủ phụ kiện..."
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setHandoverTarget(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  if (handoverRecipient.trim()) {
                    onHandoverItem(handoverTarget.code, handoverRecipient, handoverNotes);
                    setHandoverTarget(null);
                  }
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-blue-700 text-white hover:bg-blue-800"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Return */}
      {returnTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">
              Nhận trả đồ vào kho: {returnTarget.code}
            </h3>
            <p className="text-xs text-slate-600">{returnTarget.name}</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tình trạng sau khi trả:
              </label>
              <select
                value={returnCondition}
                onChange={(e) => setReturnCondition(e.target.value as ItemCondition)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                {Object.entries(CONDITION_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ô tủ xếp vào trạm:
              </label>
              <input
                type="text"
                value={returnLocker}
                onChange={(e) => setReturnLocker(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi chú kiểm định:
              </label>
              <input
                type="text"
                placeholder="Kiểm tra nguyên vẹn..."
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReturnTarget(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  onReturnItem(returnTarget.code, returnCondition, returnLocker, returnNotes);
                  setReturnTarget(null);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-teal-700 text-white hover:bg-teal-800"
              >
                Nhập kho lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reject */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-red-700 text-base">
              Từ chối yêu cầu: {rejectTarget.itemCode}
            </h3>
            <p className="text-xs text-slate-600">{rejectTarget.itemName}</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lý do từ chối:
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectTarget(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  onRejectRequest(rejectTarget.id, rejectReason);
                  setRejectTarget(null);
                }}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700"
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
