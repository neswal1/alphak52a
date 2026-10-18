import React, { useMemo, useState } from 'react';
import { X, QrCode, ShieldCheck, Copy, Check, Lock } from 'lucide-react';
import { ExchangeItem } from '../types';
import { generateQrMatrix } from '../utils/qrGenerator';

interface QrModalProps {
  item: ExchangeItem;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);
  const payload = item.code; // Strictly item ID only

  const qrMatrix = useMemo(() => {
    return generateQrMatrix(payload);
  }, [payload]);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const moduleSize = 8;
  const qrPixelSize = qrMatrix.size * moduleSize;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-emerald-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Mã QR Định Danh Vật Phẩm</h3>
            <p className="text-xs font-semibold text-emerald-700">{item.code}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 font-medium text-center">
          {item.name}
        </p>

        {/* QR Code SVG */}
        <div className="flex justify-center my-2">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <svg
              width={200}
              height={200}
              viewBox={`0 0 ${qrPixelSize} ${qrPixelSize}`}
              className="shape-rendering-crispEdges block"
            >
              <rect width={qrPixelSize} height={qrPixelSize} fill="#ffffff" />
              {qrMatrix.modules.map((row, y) =>
                row.map((isDark, x) =>
                  isDark ? (
                    <rect
                      key={`${x}-${y}`}
                      x={x * moduleSize}
                      y={y * moduleSize}
                      width={moduleSize}
                      height={moduleSize}
                      fill="#132218"
                    />
                  ) : null
                )
              )}
            </svg>
          </div>
        </div>

        {/* Raw payload */}
        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
          <span className="text-[11px] text-slate-500 block">Dữ liệu mã hóa:</span>
          <span className="font-mono font-bold text-slate-800 text-sm tracking-wide">
            {payload}
          </span>
        </div>

        {/* Privacy Note */}
        <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-start gap-2">
          <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-emerald-900 leading-tight">
            <strong>Cam kết bảo mật:</strong> Mã QR này chỉ chứa mã vật phẩm để dán lên gáy sách / ô tủ K52, hoàn toàn không chứa số điện thoại hay họ tên học sinh.
          </p>
        </div>

        <p className="text-[11px] text-slate-500 text-center mt-2">
          Vị trí trạm: <span className="font-semibold text-slate-700">{item.stationLocker}</span>
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép mã</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
