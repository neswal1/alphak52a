import React from 'react';
import { QrCode, RefreshCw, Eye, BookmarkCheck } from 'lucide-react';
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
  const isAvailable = item.status === 'AVAILABLE';

  return (
    <div className="bg-white rounded-xl border border-stone-200 hover:border-[#184E38] shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden text-left">
      <div className="p-4 sm:p-5 space-y-2.5">
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
          <span className="font-bold text-[#184E38]">{item.code}</span>
          <span className="font-sans font-medium text-stone-600">
            {item.stationLocker}
          </span>
        </div>

        {/* Item Title */}
        <h4
          onClick={() => onViewDetail(item)}
          className="font-bold text-stone-900 text-sm line-clamp-2 hover:text-[#184E38] cursor-pointer transition leading-snug"
        >
          {item.name}
        </h4>

        {/* Subject, Grade & Series */}
        <div className="text-xs text-stone-600 flex flex-wrap items-center gap-1.5">
          <span>{item.subject}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{GRADE_LABELS[item.gradeLevel]}</span>
          {item.bookSeries && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500 line-clamp-1">{item.bookSeries}</span>
            </>
          )}
        </div>

        {/* Condition & Reuse Count */}
        <div className="text-[11px] text-stone-500 flex items-center justify-between">
          <span>{CONDITION_LABELS[item.condition]}</span>
          {item.reuseCount > 1 && (
            <span className="font-medium text-emerald-800">
              Đã tuần hoàn {item.reuseCount} lần
            </span>
          )}
        </div>

        {/* Price & Coin Section */}
        <div className="pt-2.5 border-t border-stone-100 flex items-end justify-between font-mono">
          <div>
            {item.transactionType === 'RENT' ? (
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">Giá thuê / tuần</span>
                <span className="text-xs font-bold text-blue-700">
                  {formatRentPrice(item.rentPricePerWeek)}
                </span>
              </div>
            ) : item.transactionType === 'GIFT' ? (
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">Quỹ Alpha Share</span>
                <span className="text-xs font-bold text-emerald-700">Tặng miễn phí 0đ</span>
              </div>
            ) : item.transactionType === 'EXCHANGE' ? (
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">Hình thức</span>
                <span className="text-xs font-bold text-purple-700">Đổi học liệu</span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-stone-400 block font-sans">Giá chia sẻ</span>
                <span className="text-xs font-bold text-[#184E38]">
                  {formatVnd(item.price)}
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 block font-sans">Quy đổi</span>
            <span className="text-xs font-bold text-amber-700">
              {item.coinValue} Coin
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-100 flex items-center gap-2">
        <button
          onClick={() => onShowQr(item)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold transition"
          title="Xem mã QR tem học liệu"
        >
          <QrCode className="w-3.5 h-3.5 text-stone-600" />
          <span>Mã QR</span>
        </button>

        <button
          onClick={() => onViewDetail(item)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#184E38] hover:bg-[#123b2b] text-white text-xs font-semibold transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem chi tiết</span>
        </button>
      </div>
    </div>
  );
};
