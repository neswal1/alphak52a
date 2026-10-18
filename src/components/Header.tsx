import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  User,
  ShieldAlert,
  ArrowRightLeft,
  X,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (newRole: UserRole) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onSelectTab,
  pendingRequestsCount,
}) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const handleSwitchRoleClick = () => {
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
    { id: 'warehouse', label: 'Kho đồ' },
    { id: 'register', label: 'Đăng ký gửi đồ' },
    { id: 'admin', label: 'Quản trị trạm', badge: pendingRequestsCount },
    { id: 'stats', label: 'Thống kê & Lịch sử' },
    { id: 'about', label: 'Giới thiệu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  ALPHA - K52
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  DEMO
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium hidden sm:block">
                Trạm Giao Dịch Tri Thức & Vật Phẩm Học Tập
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {item.label}
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Role Switcher Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitchRoleClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                currentRole === 'ADMIN'
                  ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {currentRole === 'ADMIN' ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                  <span>Quản trị Kho</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Học sinh</span>
                </>
              )}
              <ArrowRightLeft className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1.5 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition ${
                  isActive
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.label}
                {item.badge && item.badge > 0 ? (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin PIN Dialog */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowPinModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Xác thực Quản trị viên</h3>
                <p className="text-xs text-slate-500">Trạm giao dịch K52</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              Vui lòng nhập mã bảo mật quản trị để duyệt yêu cầu, xuất nhập kho và bàn giao vật phẩm.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs text-emerald-800 font-semibold mb-3">
              Mã PIN thử nghiệm DEMO: <span className="font-mono text-emerald-950 font-bold">1234</span>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <input
                type="password"
                placeholder="Nhập mã PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full text-center tracking-widest text-lg font-mono p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {pinError && (
                <p className="text-xs text-red-600 font-medium text-center">{pinError}</p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  Mở quyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
