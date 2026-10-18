import React, { useState } from 'react';
import { X, PlusCircle, Package } from 'lucide-react';
import { ExchangeItem, GradeLevel, ItemCategory, ItemCondition, TransactionType } from '../types';
import {
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
  CONDITION_LABELS,
} from '../utils/formatters';

interface AddItemModalProps {
  onClose: () => void;
  onAddItem: (itemData: Omit<ExchangeItem, 'id' | 'createdAt' | 'reuseCount'>) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onAddItem }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('TEXTBOOK');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('GRADE_10');
  const [subject, setSubject] = useState('');
  const [condition, setCondition] = useState<ItemCondition>('VERY_GOOD');
  const [ownerAlias, setOwnerAlias] = useState('');
  const [price, setPrice] = useState('0');
  const [rentPrice, setRentPrice] = useState('0');
  const [quantity, setQuantity] = useState('1');
  const [transactionType, setTransactionType] = useState<TransactionType>('GIFT');
  const [stationLocker, setStationLocker] = useState('Tủ K52 - Ô số 10');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên sách/vật phẩm!');
      return;
    }

    const uniqueCode = code.trim() || `K52-${category.substring(0, 3)}-${Math.floor(10 + Math.random() * 90)}`;

    onAddItem({
      code: uniqueCode.toUpperCase(),
      name: name.trim(),
      category,
      gradeLevel,
      subject: subject.trim() || 'Chung',
      condition,
      ownerAlias: ownerAlias.trim() || 'Học sinh K52 (Ẩn danh)',
      price: Number(price) || 0,
      rentPricePerWeek: Number(rentPrice) || 0,
      quantity: Math.max(1, Number(quantity) || 1),
      status: 'AVAILABLE',
      transactionType,
      notes: notes.trim(),
      stationLocker: stationLocker.trim() || 'Tủ K52',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Thêm Vật Phẩm Mới Vào Kho</h3>
              <p className="text-xs text-slate-500">Cấp mã duy nhất và nhãn QR cho vật phẩm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
          {error && (
            <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Mã vật phẩm (Bỏ trống để tự sinh mã):
            </label>
            <input
              type="text"
              placeholder="VD: K52-SGK-12"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tên sách / Vật phẩm học tập *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Tuyển tập 30 đề thi chuyên Toán 10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hình thức *</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {Object.entries(TRANSACTION_TYPE_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nhóm hàng *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Khối lớp *</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as GradeLevel)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {Object.entries(GRADE_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Môn học *</label>
              <input
                type="text"
                placeholder="Toán, Văn, Lý..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tình trạng thực tế *</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as ItemCondition)}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
            >
              {Object.entries(CONDITION_LABELS).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Giá bán (₫)</label>
              <input
                type="number"
                min="0"
                placeholder="0 nếu tặng"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Giá thuê/tuần (₫)</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Số lượng</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Vị trí ô tủ K52</label>
              <input
                type="text"
                value={stationLocker}
                onChange={(e) => setStationLocker(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Bí danh người gửi (Bảo mật - không dùng họ tên thật)
            </label>
            <input
              type="text"
              placeholder="VD: HS K52-Toán"
              value={ownerAlias}
              onChange={(e) => setOwnerAlias(e.target.value)}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ghi chú thêm</label>
            <textarea
              rows={2}
              placeholder="Bìa sách có ghi chú, máy tính kèm nắp..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
            >
              Lưu vào kho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
