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
  | 'LIKE_NEW'
  | 'VERY_GOOD'
  | 'GOOD_WITH_NOTES'
  | 'ACCEPTABLE';

export type ItemStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'RENTED'
  | 'HANDED_OVER'
  | 'PENDING_APPROVAL';

export interface ExchangeItem {
  id: string;
  code: string; // VD: K52-SGK-01
  name: string;
  category: ItemCategory;
  gradeLevel: GradeLevel;
  subject: string;
  condition: ItemCondition;
  ownerAlias: string; // Bí danh ẩn danh bảo mật
  price: number; // VNĐ (0 nếu tặng)
  rentPricePerWeek: number; // VNĐ / tuần
  quantity: number;
  status: ItemStatus;
  transactionType: TransactionType;
  notes: string;
  stationLocker: string;
  reuseCount: number;
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
  | 'REJECT_REQUEST';

export interface TransactionLog {
  id: string;
  timestamp: string;
  actionType: ActionLogType;
  itemCode: string;
  itemName: string;
  actor: string;
  notes: string;
}

export type UserRole = 'STUDENT' | 'ADMIN';

export interface AdminAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password?: string;
  assignedRole: string;
  createdAt: string;
}
