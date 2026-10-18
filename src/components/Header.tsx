import React from 'react';
import {
  GraduationCap,
  Shield,
  ShieldCheck,
  Lock,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';
import { UserRole, AdminAccount } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  currentAdmin: AdminAccount | null;
  onLogoutAdmin: () => void;
  onOpenAdminAuth: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingRequestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentAdmin,
  onLogoutAdmin,
  onOpenAdminAuth,
  activeTab,
  onSelectTab,
  pendingRequestsCount,
}) => {
  // Chỉ hiển thị tab 'Quản trị trạm' khi ĐÃ ĐĂNG NHẬP bằng tài khoản quản trị
  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'warehouse', label: 'Kho đồ' },
    { id: 'register', label: 'Đăng ký gửi đồ' },
    { id: 'stats', label: 'Thống kê & Lịch sử' },
    { id: 'about', label: 'Giới thiệu' },
    ...(currentRole === 'ADMIN'
      ? [{ id: 'admin', label: 'Quản trị trạm (BQL)', badge: pendingRequestsCount }]
      : []),
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
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  THPT LƯƠNG VĂN TRI
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
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Admin Auth & Role Section */}
          <div className="flex items-center gap-2">
            {currentRole === 'ADMIN' ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 py-1 px-2.5 rounded-xl">
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] font-bold text-emerald-900 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Quản trị viên</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">
                    {currentAdmin?.fullName || currentAdmin?.username || 'Ban Quản Lý'}
                  </div>
                </div>

                <button
                  onClick={onLogoutAdmin}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100/70 rounded-lg transition-colors"
                  title="Đăng xuất khỏi quyền Quản trị trạm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-800 hover:border-emerald-300 transition shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Đăng nhập Quản trị</span>
              </button>
            )}
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
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1 ${
                  isActive
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
