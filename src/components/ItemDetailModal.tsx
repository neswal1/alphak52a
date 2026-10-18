import React, { useState } from 'react';
import { X, QrCode, Shield, RefreshCw, MapPin, Calendar, User, Package, CheckCircle2 } from 'lucide-react';
import { ExchangeItem, ItemCondition, UserRole } from '../types';
import {
  formatVnd,
  formatRentPrice,
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
  STATUS_LABELS,
} from '../utils/formatters';

interface ItemDetailModalProps {
  item: ExchangeItem;
  currentRole: UserRole;
  onClose: () => void;
  onShowQr: (item: ExchangeItem) => void;
  onReserve: (code: string, alias: string) => void;
  onHandover: (code: string, recipient: string, notes: string) => void;
  onReturn: (code: string, cond: ItemCondition, locker: string, notes: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  currentRole,
  onClose,
  onShowQr,
  onReserve,
  onHandover,
  onReturn,
}) => {
  const [showReserveInput, setShowReserveInput] = useState(false);
  const [reserveAlias, setReserveAlias] = useState('');

  const [showHandoverInput, setShowHandoverInput] = useState(false);
  const [handoverRecipient, setHandoverRecipient] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');

  const typeConfig = TRANSACTION_TYPE_LABELS[item.transactionType];
  const statusConfig = STATUS_LABELS[item.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white text-slate-700 rounded border border-slate-200">
              {item.code}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {CATEGORY_LABELS[item.category]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${typeConfig.bg} ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {item.name}
            </h3>
          </div>

          {/* Details Table */}
          <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs sm:text-sm border border-slate-200">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Môn học & Khối:</span>
              <span className="font-semibold text-slate-800">{item.subject} • {GRADE_LABELS[item.gradeLevel]}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Tình trạng thực tế:</span>
              <span className="font-semibold text-slate-800">{CONDITION_LABELS[item.condition]}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Số lượng có sẵn:</span>
              <span className="font-semibold text-emerald-800">{item.quantity} bộ/chiếc</span>
            </div>
            {item.transactionType === 'RENT' ? (
              <>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Giá thuê:</span>
                  <span className="font-bold text-blue-700">{formatRentPrice(item.rentPricePerWeek)}</span>
                </div>
                {item.price > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Giá mua đứt:</span>
                    <span className="font-semibold text-slate-800">{formatVnd(item.price)}</span>
                  </div>
                )}
              </>
            ) : item.transactionType === 'GIFT' ? (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Hình thức tặng:</span>
                <span className="font-bold text-emerald-700">Miễn phí 0 ₫</span>
              </div>
            ) : (
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Giá bán đề xuất:</span>
                <span className="font-bold text-emerald-800">{formatVnd(item.price)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Vị trí tủ đồ K52:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {item.stationLocker}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Chủ sở hữu (Mã ẩn danh):</span>
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {item.ownerAlias}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Ngày tiếp nhận:</span>
              <span className="text-slate-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {item.createdAt}
              </span>
            </div>
          </div>

          {/* Reuse Counter */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5">
            <RefreshCw className="w-5 h-5 text-emerald-700 shrink-0" />
            <p className="text-xs text-emerald-900 leading-snug">
              Vật phẩm này đã trải qua <strong>{item.reuseCount} chu kỳ</strong> tiếp sức tri thức giữa các khóa học sinh!
            </p>
          </div>

          {/* Notes */}
          {item.notes && (
            <div>
              <p className="text-xs font-bold text-slate-700 mb-1">Ghi chú & Mô tả:</p>
              <p className="text-xs text-slate-600 bg-white border border-slate-200 p-2.5 rounded-lg leading-relaxed">
                {item.notes}
              </p>
            </div>
          )}

          {/* Strict Privacy Notice */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2">
            <Shield className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-rose-900 leading-tight">
              <strong>Bảo mật danh tính:</strong> Số điện thoại hay thông tin cá nhân của người đăng không bao giờ hiển thị công khai. Trạm K52 điều phối bàn giao an toàn tại tủ trường.
            </p>
          </div>

          {/* Student Reservation Form */}
          {showReserveInput && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 space-y-2 animate-in fade-in">
              <p className="text-xs font-bold text-emerald-900">
                Đăng ký giữ chỗ nhận đồ tại trạm:
              </p>
              <input
                type="text"
                placeholder="Nhập mã bí danh của bạn (VD: HS K52-Toán)"
                value={reserveAlias}
                onChange={(e) => setReserveAlias(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (reserveAlias.trim()) {
                    onReserve(item.code, reserveAlias);
                    onClose();
                  }
                }}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition"
              >
                Xác nhận giữ chỗ (Hẹn 24h)
              </button>
            </div>
          )}

          {/* Admin Handover Form */}
          {showHandoverInput && currentRole === 'ADMIN' && (
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-300 space-y-2 animate-in fade-in">
              <p className="text-xs font-bold text-blue-900">
                Xuất kho & Bàn giao cho người nhận:
              </p>
              <input
                type="text"
                placeholder="Bí danh người nhận (VD: HS 10A1)"
                value={handoverRecipient}
                onChange={(e) => setHandoverRecipient(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-blue-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Ghi chú biên bản bàn giao (tùy chọn)"
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-blue-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  if (handoverRecipient.trim()) {
                    onHandover(item.code, handoverRecipient, handoverNotes);
                    onClose();
                  }
                }}
                className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition"
              >
                Xác nhận Bàn giao & Ghi sổ
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
          <button
            onClick={() => onShowQr(item)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Mã QR</span>
          </button>

          {currentRole === 'STUDENT' && item.status === 'AVAILABLE' && !showReserveInput && (
            <button
              onClick={() => setShowReserveInput(true)}
              className="flex-1 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
            >
              Giữ chỗ nhận đồ
            </button>
          )}

          {currentRole === 'ADMIN' && (
            <>
              {item.status === 'AVAILABLE' && !showHandoverInput && (
                <button
                  onClick={() => setShowHandoverInput(true)}
                  className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                >
                  Xuất / Bàn giao
                </button>
              )}
              {item.status === 'RENTED' && (
                <button
                  onClick={() => {
                    onReturn(item.code, item.condition, item.stationLocker, 'Đã nhận trả nguyên vẹn');
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition"
                >
                  Nhận trả đồ
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
