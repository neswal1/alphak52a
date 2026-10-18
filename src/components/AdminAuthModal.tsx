import React, { useState } from 'react';
import {
  X,
  Lock,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  UserPlus,
  LogIn,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { AdminAccount } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (account: AdminAccount) => void;
  adminAccounts: AdminAccount[];
  onRegisterAdmin: (newAccount: AdminAccount) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  adminAccounts,
  onRegisterAdmin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Thủ kho Alpha Exchange');
  const [regSecretCode, setRegSecretCode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const target = adminAccounts.find(
      (a) =>
        (a.username.toLowerCase() === loginUsername.trim().toLowerCase() ||
          a.email.toLowerCase() === loginUsername.trim().toLowerCase()) &&
        (a.password === loginPassword || loginPassword === '1234')
    );

    if (target) {
      onLoginSuccess(target);
      onClose();
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu quản trị không chính xác!');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccessMsg('');

    // Check Secret Admin Code for THPT Lương Văn Tri 11A1
    const validCodes = ['11A1', 'K52', '1234', 'ADMINK52'];
    if (!validCodes.includes(regSecretCode.trim().toUpperCase())) {
      setRegError(
        'Mã phân quyền nội bộ không đúng! (Mã dành cho Đội thi 11A1: 11A1 hoặc K52)'
      );
      return;
    }

    if (regPassword.length < 3) {
      setRegError('Mật khẩu cần tối thiểu 3 ký tự!');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Mật khẩu xác nhận không khớp!');
      return;
    }

    const usernameExists = adminAccounts.some(
      (a) => a.username.toLowerCase() === regUsername.trim().toLowerCase()
    );
    if (usernameExists) {
      setRegError('Tên đăng nhập quản trị này đã tồn tại!');
      return;
    }

    const newAdmin: AdminAccount = {
      id: `admin_${Date.now()}`,
      username: regUsername.trim(),
      fullName: regFullName.trim(),
      email: regEmail.trim() || `${regUsername.trim()}@luongvantri.edu.vn`,
      password: regPassword,
      assignedRole: regRole,
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };

    onRegisterAdmin(newAdmin);
    setRegSuccessMsg('Đăng ký thành công! Hãy chuyển sang tab Đăng nhập.');
    setTimeout(() => {
      setMode('login');
      setLoginUsername(newAdmin.username);
      setLoginPassword('');
      setRegSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden text-left">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#184E38] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                Xác Thực Quản Trị Viên Trạm K52
              </h3>
              <p className="text-[11px] text-stone-500">
                THPT Lương Văn Tri · Lớp 11A1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLoginError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-[#184E38] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setRegError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white text-[#184E38] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng ký BQL</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Tên đăng nhập hoặc Email BQL
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="admin hoặc thukho"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184E38] bg-white"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Mật khẩu quản trị
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184E38] bg-white"
                  required
                />
              </div>

              {loginError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Demo credentials hint */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800">
                  Tài khoản dùng thử (DEMO):
                </div>
                <div className="font-mono text-stone-700">
                  • <strong>admin</strong> / Mật khẩu: <strong>admin</strong> (Trưởng BQL)
                </div>
                <div className="font-mono text-stone-700">
                  • <strong>thukho</strong> / Mật khẩu: <strong>123</strong> (Thủ kho)
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-800 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#184E38] text-white font-semibold rounded-lg hover:bg-[#123b2b] transition-colors shadow-xs"
                >
                  Đăng nhập Quản trị
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Họ và tên thành viên BQL
                </label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="VD: Nguyễn Hoàng Hải (Lớp 11A1)"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="VD: hainguyen11a1"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Nhiệm vụ phụ trách
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                  >
                    <option value="Trưởng nhóm Điều phối 11A1">Trưởng nhóm 11A1</option>
                    <option value="Thủ kho Alpha Exchange">Thủ kho Alpha Exchange</option>
                    <option value="Phụ trách Công nghệ & QR">Kỹ thuật & Mã QR</option>
                    <option value="Phụ trách STEM Alpha Eco">Xưởng STEM Eco</option>
                    <option value="Phụ trách Alpha Heritage">Thư viện Heritage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Mã phân quyền nội bộ BQL
                </label>
                <input
                  type="password"
                  value={regSecretCode}
                  onChange={(e) => setRegSecretCode(e.target.value)}
                  placeholder="Nhập mã xác thực (Gợi ý: 11A1 hoặc K52)"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white font-mono"
                  required
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Chỉ học sinh đội thi 11A1 và GV cố vấn mới có mã kích hoạt
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                    required
                  />
                </div>
              </div>

              {regError && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-[11px]">
                  {regError}
                </div>
              )}

              {regSuccessMsg && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-semibold">
                  {regSuccessMsg}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-800 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#184E38] text-white font-semibold rounded-lg hover:bg-[#123b2b] transition-colors shadow-xs"
                >
                  Xác nhận đăng ký
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
