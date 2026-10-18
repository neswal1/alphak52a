import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  X,
  Lock,
  ArrowRightLeft,
  Sparkles,
} from 'lucide-react';
import { UserRole, AlphaPassMember } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingRequestsCount: number;
  activeMember: AlphaPassMember;
  allMembers: AlphaPassMember[];
  onSelectMember: (member: AlphaPassMember) => void;
  onOpenAlphaPassModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onSelectTab,
  pendingRequestsCount,
  activeMember,
  allMembers,
  onSelectMember,
  onOpenAlphaPassModal,
}) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const handleAdminToggle = () => {
    if (currentRole === 'ADMIN') {
      onRoleChange('STUDENT');
    } else {
      setPinInput('');
      setPinError('');
      setShowPinModal(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      onRoleChange('ADMIN');
      setShowPinModal(false);
    } else {
      setPinError('Mã PIN không đúng! (Mã thử nghiệm DEMO: 1234)');
    }
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'match', label: 'Alpha Match' },
    { id: 'warehouse', label: 'Kho học liệu' },
    { id: 'heritage_eco', label: 'Góc STEM & Eco' },
    { id: 'proposal', label: 'Thuyết minh dự án' },
    { id: 'admin', label: 'Bàn điều hành BQL', badge: pendingRequestsCount },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-16">
            {/* Zone 1: Brand Wordmark (Single element) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onSelectTab('home')}
                className="text-left group flex items-center gap-2.5 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-lg bg-[#184E38] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-[#123b2b] transition-colors">
                  α
                </div>
                <div>
                  <div className="text-base font-bold tracking-tight text-stone-900 group-hover:text-[#184E38] transition-colors flex items-center gap-1.5">
                    Alpha-K52
                    <span className="text-xs font-normal text-stone-600 hidden sm:inline">
                      · THPT Lương Văn Tri
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-600 hidden md:block">
                    Trạm giao dịch tri thức và tuần hoàn học liệu
                  </div>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Single-line unboxed text) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`relative py-1 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#184E38] font-semibold border-b-2 border-[#184E38]'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-mono font-bold bg-amber-100 text-amber-800 rounded">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Alpha Pass status */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Alpha Pass Member Badge / Button */}
              <button
                onClick={onOpenAlphaPassModal}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 hover:border-[#184E38] bg-stone-50 hover:bg-emerald-50/50 transition-colors"
                title="Xem Thẻ số Alpha Pass & Ví Coin"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#184E38]" />
                <span className="font-semibold text-stone-800 hidden sm:inline">
                  {activeMember.aliasName}
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[11px] font-bold">
                  {activeMember.coinBalance} Coin
                </span>
              </button>

              {/* Admin Mode Switch */}
              <button
                onClick={handleAdminToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  currentRole === 'ADMIN'
                    ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {currentRole === 'ADMIN' ? 'Thủ kho (Admin)' : 'Đăng nhập BQL'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation bar */}
          <div className="flex lg:hidden overflow-x-auto py-2 border-t border-stone-100 gap-2 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-[#184E38] text-white'
                      : 'text-stone-600 bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && ` (${item.badge})`}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Admin Authentication Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-stone-900 text-base">
                  Xác thực Ban Quản Lý K52
                </h3>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVerifyPin} className="mt-4 space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Khu vực nghiệp vụ dành cho 05 thành viên Đội thi Lớp 11A1 và Thủ
                kho phụ trách kiểm định, đối soát sổ cái và phân bổ ô tủ.
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mã PIN bảo mật
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Nhập mã PIN (Gợi ý DEMO: 1234)"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184E38]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-1.5">{pinError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#184E38] text-white rounded-lg hover:bg-[#123b2b]"
                >
                  Xác nhận vào bàn BQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
