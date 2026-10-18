export type ItemCategory =
  | 'TEXTBOOK'
  | 'REFERENCE_BOOK'
  | 'EXAM_DOCUMENT'
  | 'STUDY_TOOL'
  | 'TECH_DEVICE'
  | 'UNIFORM_ACCESSORY'
  | 'OTHER';

export type GradeLevel = 'ALL' | 'GRADE_10' | 'GRADE_11' | 'GRADE_12';

export type TransactionType =
  | 'GIFT'
  | 'RENT'
  | 'SALE'
  | 'EXCHANGE'
  | 'CONSIGNMENT'
  | 'WANTED';

export type ItemCondition =
  | 'LIKE_NEW' // 95-99% như mới
  | 'VERY_GOOD' // 85-94% rất tốt
  | 'GOOD_WITH_NOTES' // 75-84% tốt, có ghi chú nhẹ
  | 'ACCEPTABLE'; // 60-74% dùng tốt

export type ItemStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'RENTED'
  | 'HANDED_OVER'
  | 'PENDING_APPROVAL';

export interface ExchangeItem {
  id: string;
  code: string; // VD: K52-SGK-1001
  name: string;
  category: ItemCategory;
  gradeLevel: GradeLevel;
  subject: string;
  bookSeries?: string; // Kết nối tri thức / Cánh Diều / Chân trời sáng tạo
  condition: ItemCondition;
  ownerAlias: string; // Tên bí danh học sinh bảo mật
  price: number; // VNĐ (0 nếu tặng)
  coinValue: number; // Điểm quy đổi Alpha Coin (VD: 15 Coin)
  rentPricePerWeek: number; // VNĐ / tuần (nếu thuê)
  quantity: number;
  status: ItemStatus;
  transactionType: TransactionType;
  notes: string;
  stationLocker: string; // Ô tủ trạm (VD: Tủ A-03)
  reuseCount: number; // Số lần đã tuần hoàn
  createdAt: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RegistrationRequest {
  id: string;
  itemCode: string;
  transactionType: TransactionType;
  itemName: string;
  category: ItemCategory;
  gradeLevel: GradeLevel;
  subject: string;
  bookSeries?: string;
  condition: ItemCondition;
  proposedPrice: number;
  proposedRentPrice: number;
  quantity: number;
  notes: string;
  studentAlias: string;
  internalContactNotice: string;
  status: RequestStatus;
  submittedAt: string;
  rejectionReason?: string;
}

export type ActionLogType =
  | 'STOCK_IN'
  | 'STOCK_OUT'
  | 'HANDOVER'
  | 'RETURN_ITEM'
  | 'APPROVE_REQUEST'
  | 'REJECT_REQUEST'
  | 'ADJUSTING_ENTRY'
  | 'MATCH_FULFILLED';

export interface TransactionLog {
  id: string;
  timestamp: string;
  actionType: ActionLogType;
  itemCode: string;
  itemName: string;
  actor: string;
  notes: string;
  isAdjustingEntry?: boolean;
}

export interface CoinLedgerRecord {
  id: string;
  timestamp: string;
  studentPassCode: string;
  studentAlias: string;
  change: number; // +15 hoặc -10
  balanceAfter: number;
  reason: string;
  approvedBy: string;
  relatedItemCode?: string;
}

export interface WishlistDemand {
  id: string;
  studentPassCode: string;
  studentAlias: string;
  subject: string;
  gradeLevel: GradeLevel;
  titleOrKeyword: string;
  bookSeries?: string;
  expectedCondition: ItemCondition | 'ANY';
  preferredType: TransactionType;
  urgency: 'HIGH' | 'NORMAL';
  status: 'PENDING' | 'MATCHED' | 'FULFILLED';
  matchedItemCode?: string;
  createdAt: string;
}

export interface AlphaPassMember {
  id: string;
  passCode: string; // VD: PASS-K52-9481
  aliasName: string;
  realClass: string; // VD: 11A1, 10A2
  coinBalance: number;
  badgeTitle: string; // VD: Đại sứ Tuần hoàn K52, Học sinh Tích cực
  contributedCount: number;
  receivedCount: number;
  savedMoneyEst: number; // Số tiền tiết kiệm ước tính (VNĐ)
  joinDate: string;
}

export interface HeritageDocument {
  id: string;
  code: string;
  title: string;
  subject: string;
  gradeLevel: GradeLevel;
  authorAlias: string;
  authorClass: string;
  description: string;
  pagesCount: number;
  downloadCount: number;
  hasPermissionAgreement: boolean;
  tags: string[];
}

export interface EcoProduct {
  id: string;
  code: string;
  name: string;
  type: 'SEED_PAPER_BOOKMARK' | 'PLANTABLE_CARD' | 'RECYCLED_NOTEBOOK';
  seedType: string; // Cải ngọt, Hoa cúc, Hạt cỏ may...
  price: number; // VNĐ
  cost: number; // Giá vốn
  inStock: number;
  soldCount: number;
  description: string;
}

export interface DiscoveryCombo {
  id: string;
  code: string;
  name: string;
  itemsIncluded: string[];
  price: number; // 25.000đ
  cost: number; // 17.000đ
  inStock: number;
  soldCount: number;
  description: string;
}

export interface StationLockerUnit {
  code: string; // A-01, A-02, ... E-06
  tier: string; // Tầng A, B, C, D, E
  status: 'EMPTY' | 'OCCUPIED' | 'RESERVED';
  itemCode?: string;
  itemName?: string;
}

export type UserRole = 'STUDENT' | 'ADMIN';
