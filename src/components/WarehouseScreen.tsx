import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  Plus,
  SlidersHorizontal,
  PackageOpen,
} from 'lucide-react';
import { ExchangeItem, GradeLevel, ItemCategory, TransactionType, UserRole } from '../types';
import { DemoBanner } from './DemoBanner';
import { ItemCard } from './ItemCard';
import {
  CATEGORY_LABELS,
  GRADE_LABELS,
  TRANSACTION_TYPE_LABELS,
} from '../utils/formatters';

interface WarehouseScreenProps {
  items: ExchangeItem[];
  currentRole: UserRole;
  selectedCategory: ItemCategory | null;
  onSelectCategory: (cat: ItemCategory | null) => void;
  onViewDetail: (item: ExchangeItem) => void;
  onShowQr: (item: ExchangeItem) => void;
  onOpenAddModal: () => void;
}

export const WarehouseScreen: React.FC<WarehouseScreenProps> = ({
  items,
  currentRole,
  selectedCategory,
  onSelectCategory,
  onViewDetail,
  onShowQr,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('ALL');
  const [selectedType, setSelectedType] = useState<TransactionType | null>(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      // Search
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q);

      // Category
      const matchesCategory = !selectedCategory || item.category === selectedCategory;

      // Grade
      const matchesGrade =
        selectedGrade === 'ALL' ||
        item.gradeLevel === 'ALL' ||
        item.gradeLevel === selectedGrade;

      // Type
      const matchesType = !selectedType || item.transactionType === selectedType;

      // Available
      const matchesAvailable = !onlyAvailable || item.status === 'AVAILABLE';

      // Free / Gift
      const matchesFree = !onlyFree || item.transactionType === 'GIFT' || (item.price === 0 && item.rentPricePerWeek === 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGrade &&
        matchesType &&
        matchesAvailable &&
        matchesFree
      );
    });
  }, [items, searchQuery, selectedCategory, selectedGrade, selectedType, onlyAvailable, onlyFree]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGrade('ALL');
    setSelectedType(null);
    onSelectCategory(null);
    setOnlyAvailable(false);
    setOnlyFree(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <DemoBanner />

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Kho Vật Phẩm Học Tập Alpha-K52
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tìm kiếm & lọc sách giáo khoa, máy tính và đồ dùng học sinh
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>{currentRole === 'ADMIN' ? '+ Nhập kho mới' : '+ Đăng đồ lên kho'}</span>
        </button>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tìm theo tên sách, môn học (Toán, Lý, Văn...), mã vật phẩm (K52-SGK-01)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grade Chips */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Khối lớp:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(['ALL', 'GRADE_10', 'GRADE_11', 'GRADE_12'] as GradeLevel[]).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  selectedGrade === g
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {GRADE_LABELS[g]}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Type Chips */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Hình thức giao dịch:
            </span>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{showAdvanced ? 'Thu gọn bộ lọc' : 'Thêm bộ lọc nhóm'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedType === null
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            {Object.entries(TRANSACTION_TYPE_LABELS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedType(selectedType === key ? null : (key as TransactionType))}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                  selectedType === key
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Category & Toggles */}
        {showAdvanced && (
          <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Lọc theo nhóm hàng:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onSelectCategory(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    selectedCategory === null
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Tất cả nhóm
                </button>
                {Object.entries(CATEGORY_LABELS).map(([catKey, catLabel]) => (
                  <button
                    key={catKey}
                    onClick={() =>
                      onSelectCategory(selectedCategory === catKey ? null : (catKey as ItemCategory))
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      selectedCategory === catKey
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {catLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyFree}
                  onChange={(e) => setOnlyFree(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500"
                />
                <span>Chỉ đồ Miễn phí / Tặng 0 ₫</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500"
                />
                <span>Chỉ đồ Sẵn sàng trong kho</span>
              </label>

              <button
                onClick={handleResetFilters}
                className="ml-auto text-xs text-red-600 hover:underline font-medium"
              >
                Đặt lại tất cả bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Hiển thị <strong>{filteredItems.length}</strong> vật phẩm phù hợp
        </span>
      </div>

      {/* Items Grid or Empty */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <PackageOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">Không tìm thấy vật phẩm</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Không có kết quả nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Hãy thử đổi từ khóa hoặc bấm đặt lại bộ lọc.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
          >
            Xem toàn bộ kho
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onViewDetail={onViewDetail}
              onShowQr={onShowQr}
            />
          ))}
        </div>
      )}
    </div>
  );
};
