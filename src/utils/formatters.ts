import { ItemCategory, GradeLevel, TransactionType, ItemCondition, ItemStatus, ActionLogType } from '../types';

export function formatVnd(amount: number): string {
  if (amount <= 0) return '0 ₫ (Miễn phí / Tặng)';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

export function formatRentPrice(amount: number): string {
  if (amount <= 0) return 'Miễn phí';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫ / tuần';
}

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  TEXTBOOK: 'Sách giáo khoa',
  REFERENCE_BOOK: 'Sách tham khảo',
  EXAM_DOCUMENT: 'Tài liệu ôn thi',
  STUDY_TOOL: 'Dụng cụ học tập',
  TECH_DEVICE: 'Máy tính & Thiết bị',
  UNIFORM_ACCESSORY: 'Đồng phục & Phụ kiện',
  OTHER: 'Vật phẩm khác',
};

export const GRADE_LABELS: Record<GradeLevel, string> = {
  ALL: 'Đa khối / Chung',
  GRADE_10: 'Khối 10',
  GRADE_11: 'Khối 11',
  GRADE_12: 'Khối 12',
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, { label: string; color: string; bg: string }> = {
  GIFT: { label: 'Tặng 0đ', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  RENT: { label: 'Cho thuê', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  SALE: { label: 'Bán lại', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  EXCHANGE: { label: 'Trao đổi', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  CONSIGNMENT: { label: 'Ký gửi trạm', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
  WANTED: { label: 'Cần tìm/mua', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

export const CONDITION_LABELS: Record<ItemCondition, string> = {
  LIKE_NEW: 'Mới 99% (Nguyên bản)',
  VERY_GOOD: 'Rất tốt (90-95%)',
  GOOD_WITH_NOTES: 'Tốt 80% (Có ghi chú hay)',
  ACCEPTABLE: 'Khá 70% (Còn dùng tốt)',
};

export const STATUS_LABELS: Record<ItemStatus, { label: string; color: string; bg: string }> = {
  AVAILABLE: { label: 'Sẵn sàng trong kho', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  RESERVED: { label: 'Đã hẹn lấy', color: 'text-amber-700', bg: 'bg-amber-50' },
  RENTED: { label: 'Đang cho thuê', color: 'text-blue-700', bg: 'bg-blue-50' },
  HANDED_OVER: { label: 'Đã bàn giao', color: 'text-slate-600', bg: 'bg-slate-100' },
  PENDING_APPROVAL: { label: 'Chờ duyệt', color: 'text-purple-700', bg: 'bg-purple-50' },
};

export const ACTION_LOG_LABELS: Record<ActionLogType, { label: string; bg: string; color: string }> = {
  STOCK_IN: { label: 'Nhập kho', bg: 'bg-emerald-50', color: 'text-emerald-700' },
  STOCK_OUT: { label: 'Xuất kho', bg: 'bg-orange-50', color: 'text-orange-700' },
  HANDOVER: { label: 'Bàn giao', bg: 'bg-blue-50', color: 'text-blue-700' },
  RETURN_ITEM: { label: 'Trả đồ', bg: 'bg-teal-50', color: 'text-teal-700' },
  APPROVE_REQUEST: { label: 'Duyệt đơn', bg: 'bg-purple-50', color: 'text-purple-700' },
  REJECT_REQUEST: { label: 'Từ chối', bg: 'bg-red-50', color: 'text-red-700' },
};
