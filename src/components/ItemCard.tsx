import React from 'react';
import { QrCode, RefreshCw, Eye } from 'lucide-react';
import { ExchangeItem } from '../types';
import {
  formatVnd,
  formatRentPrice,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
  STATUS_LABELS,
} from '../utils/formatters';

interface ItemCardProps {
  item: ExchangeItem;
  onViewDetail: (item: ExchangeItem) => void;
  onShowQr: (item: ExchangeItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onViewDetail,
  onShowQr,
}) => {
  const typeConfig = TRANSACTION_TYPE_LABELS[item.transactionType];
  const statusConfig = STATUS_LABELS[item.status];

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-4 sm:p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
            {item.code}
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${typeConfig.bg} ${typeConfig.color}`}
          >
            {typeConfig.label}
          </span>
        </div>

        {/* Item Name */}
        <h4
          onClick={() => onViewDetail(item)}
          className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 hover:text-emerald-700 cursor-pointer transition leading-snug"
        >
          {item.name}
        </h4>

        {/* Subject & Grade */}
        <div className="flex items-center justify-between text-xs text-slate-600 mt-2">
          <span>
            {item.subject} • {GRADE_LABELS[item.gradeLevel]}
          </span>
          <span className="font-medium text-emerald-800">
            SL: {item.quantity}
          </span>
        </div>

        {/* Condition & Reuse tag */}
        <div className="flex items-center justify-between gap-1 text-[11px] mt-2">
          <span className="text-slate-500 truncate">
            {CONDITION_LABELS[item.condition]}
          </span>
          {item.reuseCount > 1 && (
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] shrink-0">
              <RefreshCw className="w-2.5 h-2.5" />
              Tái dùng {item.reuseCount} lần
            </span>
          )}
        </div>

        {/* Price & Status */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            {item.transactionType === 'RENT' ? (
              <div>
                <p className="text-xs text-slate-500">Giá thuê</p>
                <p className="text-sm font-bold text-blue-700">
                  {formatRentPrice(item.rentPricePerWeek)}
                </p>
                {item.price > 0 && (
                  <p className="text-[10px] text-slate-500">
                    Mua đứt: {formatVnd(item.price)}
                  </p>
                )}
              </div>
            ) : item.transactionType === 'GIFT' ? (
              <p className="text-sm font-bold text-emerald-700">Tặng miễn phí 0 ₫</p>
            ) : item.transactionType === 'EXCHANGE' ? (
              <p className="text-xs font-bold text-purple-700">Trao đổi vật phẩm</p>
            ) : (
              <div>
                <p className="text-xs text-slate-500">Giá bán</p>
                <p className="text-sm font-bold text-emerald-800">
                  {formatVnd(item.price)}
                </p>
              </div>
            )}
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.color}`}
          >
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onShowQr(item)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition"
          title="Tạo mã QR chỉ chứa ID vật phẩm"
        >
          <QrCode className="w-3.5 h-3.5 text-slate-600" />
          <span>Mã QR</span>
        </button>

        <button
          onClick={() => onViewDetail(item)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Chi tiết</span>
        </button>
      </div>
    </div>
  );
};
