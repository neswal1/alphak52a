import React, { useState } from 'react';
import {
  ExchangeItem,
  ItemCategory,
  ItemCondition,
  RegistrationRequest,
  TransactionLog,
  UserRole,
} from './types';
import { INITIAL_ITEMS, INITIAL_REQUESTS, INITIAL_LOGS } from './data/mockData';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { WarehouseScreen } from './components/WarehouseScreen';
import { RegisterFormScreen } from './components/RegisterFormScreen';
import { AdminManagementScreen } from './components/AdminManagementScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { AboutScreen } from './components/AboutScreen';
import { QrModal } from './components/QrModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AddItemModal } from './components/AddItemModal';

export default function App() {
  const [items, setItems] = useState<ExchangeItem[]>(INITIAL_ITEMS);
  const [requests, setRequests] = useState<RegistrationRequest[]>(INITIAL_REQUESTS);
  const [logs, setLogs] = useState<TransactionLog[]>(INITIAL_LOGS);
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ItemCategory | null>(null);

  // Modals
  const [selectedItemForQr, setSelectedItemForQr] = useState<ExchangeItem | null>(null);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<ExchangeItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Role verification (Admin PIN)
  const handleAuthenticateAdmin = (pin: string): boolean => {
    if (pin.trim() === '1234' || pin.trim() === 'admin') {
      setCurrentRole('ADMIN');
      showToast('Đã xác thực thành công quyền Quản trị viên Kho K52!');
      return true;
    }
    return false;
  };

  // Student Reserve Item
  const handleReserveItem = (code: string, alias: string) => {
    const target = items.find((i) => i.code === code);
    if (!target) return;

    setItems((prev) =>
      prev.map((i) => (i.code === code ? { ...i, status: 'RESERVED' } : i))
    );

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'HANDOVER',
      itemCode: target.code,
      itemName: target.name,
      actor: alias || 'Học sinh',
      notes: `Học sinh ${alias} đã hẹn giữ chỗ nhận đồ tại ${target.stationLocker}.`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã đặt chỗ thành công món đồ [${target.code}]! Hãy đến ${target.stationLocker} nhận đồ.`);
  };

  // Admin Handover Item
  const handleHandoverItem = (code: string, recipient: string, notes: string) => {
    const target = items.find((i) => i.code === code);
    if (!target) return;

    const newStatus = target.transactionType === 'RENT' ? 'RENTED' : 'HANDED_OVER';

    setItems((prev) =>
      prev.map((i) =>
        i.code === code
          ? { ...i, status: newStatus, reuseCount: i.reuseCount + 1 }
          : i
      )
    );

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: target.transactionType === 'RENT' ? 'HANDOVER' : 'STOCK_OUT',
      itemCode: target.code,
      itemName: target.name,
      actor: 'BQL Trạm K52 (Admin)',
      notes: `Đã bàn giao cho ${recipient}. Ghi chú: ${notes || 'Bàn giao hoàn tất tại tủ trạm.'}`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã bàn giao vật phẩm [${target.code}] cho ${recipient}.`);
  };

  // Admin Return Item
  const handleReturnItem = (
    code: string,
    cond: ItemCondition,
    locker: string,
    notes: string
  ) => {
    const target = items.find((i) => i.code === code);
    if (!target) return;

    setItems((prev) =>
      prev.map((i) =>
        i.code === code
          ? {
              ...i,
              status: 'AVAILABLE',
              condition: cond,
              stationLocker: locker || i.stationLocker,
            }
          : i
      )
    );

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'RETURN_ITEM',
      itemCode: target.code,
      itemName: target.name,
      actor: 'BQL Trạm K52 (Thủ kho)',
      notes: `Đã nhận trả đồ vào ${locker}. Tình trạng: ${cond}. ${notes || 'Kiểm định nguyên vẹn.'}`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã hoàn tất nhận trả đồ [${target.code}]. Vật phẩm sẵn sàng phục vụ tiếp!`);
  };

  // Admin Approve Registration Request
  const handleApproveRequest = (requestId: string, targetLocker: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'APPROVED' } : r))
    );

    const newItem: ExchangeItem = {
      id: `item_${Date.now()}`,
      code: req.itemCode,
      name: req.itemName,
      category: req.category,
      gradeLevel: req.gradeLevel,
      subject: req.subject,
      condition: req.condition,
      ownerAlias: req.studentAlias,
      price: req.proposedPrice,
      rentPricePerWeek: req.proposedRentPrice,
      quantity: req.quantity,
      status: 'AVAILABLE',
      transactionType: req.transactionType,
      notes: req.notes,
      stationLocker: targetLocker,
      reuseCount: 1,
      createdAt: getCurrentTimeString().split(' ')[0],
    };

    setItems((prev) => [newItem, ...prev]);

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'APPROVE_REQUEST',
      itemCode: req.itemCode,
      itemName: req.itemName,
      actor: 'BQL Trạm K52 (Admin)',
      notes: `Phê duyệt yêu cầu từ ${req.studentAlias} và nhập kho vào ô ${targetLocker}.`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã duyệt đơn và nhập kho thành công [${req.itemCode}]!`);
  };

  // Admin Reject Registration Request
  const handleRejectRequest = (requestId: string, reason: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: 'REJECTED', rejectionReason: reason } : r
      )
    );

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'REJECT_REQUEST',
      itemCode: req.itemCode,
      itemName: req.itemName,
      actor: 'BQL Trạm K52 (Admin)',
      notes: `Từ chối đơn: ${reason}`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã từ chối đơn [${req.itemCode}].`);
  };

  // Student Submits Registration Request
  const handleSubmitRequest = (
    reqData: Omit<RegistrationRequest, 'id' | 'itemCode' | 'status' | 'submittedAt'>
  ) => {
    const prefix = reqData.category.substring(0, 3).toUpperCase();
    const count = requests.length + items.length + 1;
    const generatedCode = `K52-${prefix}-${count}`;

    const newReq: RegistrationRequest = {
      ...reqData,
      id: `req_${Date.now()}`,
      itemCode: generatedCode,
      status: 'PENDING',
      submittedAt: getCurrentTimeString(),
    };

    setRequests((prev) => [newReq, ...prev]);
    showToast(`Đã gửi phiếu đăng ký [${generatedCode}]! Ban quản trị trạm sẽ kiểm duyệt sớm.`);
  };

  // Direct Inventory Addition
  const handleAddItemDirectly = (
    itemData: Omit<ExchangeItem, 'id' | 'createdAt' | 'reuseCount'>
  ) => {
    const newItem: ExchangeItem = {
      ...itemData,
      id: `item_${Date.now()}`,
      createdAt: getCurrentTimeString().split(' ')[0],
      reuseCount: 1,
    };

    setItems((prev) => [newItem, ...prev]);

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'STOCK_IN',
      itemCode: newItem.code,
      itemName: newItem.name,
      actor: currentRole === 'ADMIN' ? 'BQL Trạm K52 (Thủ kho)' : 'Học sinh nhập kho',
      notes: `Nhập kho mới vào ${newItem.stationLocker}. Số lượng: ${newItem.quantity}.`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã thêm vật phẩm [${newItem.code}] vào kho trạm thành công!`);
  };

  const pendingRequestsCount = requests.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F7FBF8] flex flex-col text-[#132218] antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomeScreen
            items={items}
            onNavigateToWarehouse={() => setActiveTab('warehouse')}
            onNavigateToRegister={() => setActiveTab('register')}
            onSelectCategory={(cat) => {
              setSelectedCategoryFilter(cat);
              setActiveTab('warehouse');
            }}
            onViewDetail={(item) => setSelectedItemForDetail(item)}
            onShowQr={(item) => setSelectedItemForQr(item)}
          />
        )}

        {activeTab === 'warehouse' && (
          <WarehouseScreen
            items={items}
            currentRole={currentRole}
            selectedCategory={selectedCategoryFilter}
            onSelectCategory={setSelectedCategoryFilter}
            onViewDetail={(item) => setSelectedItemForDetail(item)}
            onShowQr={(item) => setSelectedItemForQr(item)}
            onOpenAddModal={() => setShowAddModal(true)}
          />
        )}

        {activeTab === 'register' && (
          <RegisterFormScreen onSubmitRequest={handleSubmitRequest} />
        )}

        {activeTab === 'admin' && (
          <AdminManagementScreen
            currentRole={currentRole}
            items={items}
            requests={requests}
            logs={logs}
            onAuthenticateAdmin={handleAuthenticateAdmin}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
            onHandoverItem={handleHandoverItem}
            onReturnItem={handleReturnItem}
            onOpenAddModal={() => setShowAddModal(true)}
            onShowQr={(item) => setSelectedItemForQr(item)}
          />
        )}

        {activeTab === 'stats' && (
          <StatisticsScreen items={items} logs={logs} />
        )}

        {activeTab === 'about' && <AboutScreen />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Alpha-K52 – Trạm giao dịch tri thức và vật phẩm học tập
          </p>
          <p>
            Màu xanh lá và trắng • Tối ưu trên điện thoại và máy tính • Phiên bản thử nghiệm DEMO
          </p>
        </div>
      </footer>

      {/* QR Modal */}
      {selectedItemForQr && (
        <QrModal
          item={selectedItemForQr}
          onClose={() => setSelectedItemForQr(null)}
        />
      )}

      {/* Item Detail Modal */}
      {selectedItemForDetail && (
        <ItemDetailModal
          item={selectedItemForDetail}
          currentRole={currentRole}
          onClose={() => setSelectedItemForDetail(null)}
          onShowQr={(item) => setSelectedItemForQr(item)}
          onReserve={handleReserveItem}
          onHandover={handleHandoverItem}
          onReturn={handleReturnItem}
        />
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAddItem={handleAddItemDirectly}
        />
      )}
    </div>
  );
}
