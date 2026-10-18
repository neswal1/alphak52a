import React from 'react';
import {
  BarChart3,
  TrendingUp,
  RefreshCw,
  Gift,
  PiggyBank,
  CheckCircle2,
  PackageCheck,
  History,
} from 'lucide-react';
import { ExchangeItem, TransactionLog, TransactionType } from '../types';
import { DemoBanner } from './DemoBanner';
import {
  formatVnd,
  ACTION_LOG_LABELS,
  TRANSACTION_TYPE_LABELS,
} from '../utils/formatters';

interface StatisticsScreenProps {
  items: ExchangeItem[];
  logs: TransactionLog[];
}

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ items, logs }) => {
  const totalItems = items.length;
  const totalReuses = items.reduce((acc, curr) => acc + curr.reuseCount, 0);
  const giftCount = items.filter((i) => i.transactionType === 'GIFT').length;
  const rentCount = items.filter((i) => i.transactionType === 'RENT').length;
  const saleCount = items.filter((i) => i.transactionType === 'SALE').length;
  const exchangeCount = items.filter((i) => i.transactionType === 'EXCHANGE').length;
  const consignmentCount = items.filter((i) => i.transactionType === 'CONSIGNMENT').length;

  const estimatedSavings = items.reduce(
    (acc, curr) => acc + Math.max(35000, curr.price) * curr.reuseCount,
    0
  );

  const breakdown: { type: TransactionType; count: number; color: string; bg: string }[] = [
    { type: 'GIFT', count: giftCount, color: 'bg-emerald-600', bg: 'bg-emerald-100' },
    { type: 'RENT', count: rentCount, color: 'bg-blue-600', bg: 'bg-blue-100' },
    { type: 'SALE', count: saleCount, color: 'bg-amber-600', bg: 'bg-amber-100' },
    { type: 'EXCHANGE', count: exchangeCount, color: 'bg-purple-600', bg: 'bg-purple-100' },
    { type: 'CONSIGNMENT', count: consignmentCount, color: 'bg-teal-600', bg: 'bg-teal-100' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DemoBanner />

      {/* Header */}
      <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Bảng Theo Dõi Giao Dịch & Thống Kê
          </h1>
          <p className="text-xs text-slate-500">
            Chỉ số tái sử dụng tri thức và lịch sử giao dịch toàn trạm Alpha-K52
          </p>
        </div>
      </div>

      {/* Top Banner KPI */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300 block mb-1">
            Chỉ số học đường xanh K52
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            {totalReuses} lượt tiếp sức tri thức
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            Sách vở và dụng cụ học tập được tái sinh vòng đời thay vì bị lãng phí.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-right">
          <span className="text-xs text-emerald-200 block">Ước tính học sinh tiết kiệm</span>
          <span className="text-xl sm:text-2xl font-black text-amber-300">
            {formatVnd(estimatedSavings)}
          </span>
        </div>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">Vật phẩm trong trạm</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">
            {totalItems}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">Lưu hành nội bộ</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">Quà tặng 0 ₫</span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
            {giftCount}
          </span>
          <span className="text-[11px] text-slate-400">Trao gửi yêu thương</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">Lượt thuê & mượn</span>
          <span className="text-2xl font-extrabold text-blue-700 mt-1 block">
            {rentCount}
          </span>
          <span className="text-[11px] text-slate-400">Hỗ trợ kỳ thi</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block">Nhật ký giao dịch</span>
          <span className="text-2xl font-extrabold text-purple-700 mt-1 block">
            {logs.length}
          </span>
          <span className="text-[11px] text-slate-400">Được ghi nhận</span>
        </div>
      </div>

      {/* Breakdown Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          Cơ cấu hình thức giao dịch trên trạm
        </h3>

        <div className="space-y-3">
          {breakdown.map((item) => {
            const percent = totalItems > 0 ? Math.round((item.count / totalItems) * 100) : 0;
            return (
              <div key={item.type} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">
                    {TRANSACTION_TYPE_LABELS[item.type].label}
                  </span>
                  <span className="text-slate-500">
                    {item.count} món ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-700" />
            <span>Nhật ký giao dịch gần nhất (Audit Trail)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Toàn hệ thống</span>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.map((log) => {
            const config = ACTION_LOG_LABELS[log.actionType];
            return (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
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
                  Ghi nhận: <strong className="text-slate-600">{log.actor}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
