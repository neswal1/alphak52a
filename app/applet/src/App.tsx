import React, { useState } from 'react';
import {
  ExchangeItem,
  ItemCategory,
  ItemCondition,
  RegistrationRequest,
  TransactionLog,
  UserRole,
  AlphaPassMember,
  WishlistDemand,
  HeritageDocument,
  EcoProduct,
  DiscoveryCombo,
  StationLockerUnit,
  CoinLedgerRecord,
} from './types';
import {
  INITIAL_ITEMS,
  INITIAL_REQUESTS,
  INITIAL_LOGS,
  INITIAL_MEMBERS,
  INITIAL_WISHLIST,
  INITIAL_HERITAGE_DOCS,
  INITIAL_ECO_PRODUCTS,
  INITIAL_DISCOVERY_COMBOS,
  INITIAL_LOCKERS,
  INITIAL_COIN_LEDGER,
} from './data/mockData';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { WarehouseScreen } from './components/WarehouseScreen';
import { AlphaMatchView } from './components/AlphaMatchView';
import { EcoDiscoveryView } from './components/EcoDiscoveryView';
import { HeritageShareView } from './components/HeritageShareView';
import { ProposalPitchScreen } from './components/ProposalPitchScreen';
import { AdminManagementScreen } from './components/AdminManagementScreen';
import { AlphaPassModal } from './components/AlphaPassModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { QrModal } from './components/QrModal';
import { AddItemModal } from './components/AddItemModal';

export default function App() {
  // Core Entities State
  const [items, setItems] = useState<ExchangeItem[]>(INITIAL_ITEMS);
  const [requests, setRequests] = useState<RegistrationRequest[]>(INITIAL_REQUESTS);
  const [logs, setLogs] = useState<TransactionLog[]>(INITIAL_LOGS);
  const [members, setMembers] = useState<AlphaPassMember[]>(INITIAL_MEMBERS);
  const [activeMember, setActiveMember] = useState<AlphaPassMember>(INITIAL_MEMBERS[0]);
  const [wishlist, setWishlist] = useState<WishlistDemand[]>(INITIAL_WISHLIST);
  const [heritageDocs, setHeritageDocs] = useState<HeritageDocument[]>(INITIAL_HERITAGE_DOCS);
  const [ecoProducts, setEcoProducts] = useState<EcoProduct[]>(INITIAL_ECO_PRODUCTS);
  const [discoveryCombos, setDiscoveryCombos] = useState<DiscoveryCombo[]>(INITIAL_DISCOVERY_COMBOS);
  const [lockers, setLockers] = useState<StationLockerUnit[]>(INITIAL_LOCKERS);
  const [coinLedger, setCoinLedger] = useState<CoinLedgerRecord[]>(INITIAL_COIN_LEDGER);

  // App Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ItemCategory | null>(null);

  // Modals State
  const [showAlphaPassModal, setShowAlphaPassModal] = useState(false);
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
      showToast('Đã xác thực thành công quyền Ban Quản Lý K52 (Lớp 11A1)!');
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

    // Update locker status
    setLockers((prev) =>
      prev.map((l) =>
        l.itemCode === code ? { ...l, status: 'RESERVED' } : l
      )
    );

    const newLog: TransactionLog = {
      id: `log_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'HANDOVER',
      itemCode: target.code,
      itemName: target.name,
      actor: alias || activeMember.aliasName,
      notes: `Học sinh ${alias || activeMember.aliasName} đã hẹn giữ chỗ nhận tại ${target.stationLocker}.`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã đặt chỗ thành công món đồ [${target.code}]! Hãy đến ${target.stationLocker} để nhận.`);
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

    // Free up or update locker
    setLockers((prev) =>
      prev.map((l) =>
        l.itemCode === code ? { ...l, status: 'EMPTY', itemCode: undefined, itemName: undefined } : l
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

    // Update locker unit
    setLockers((prev) =>
      prev.map((l) =>
        l.code === locker.replace('Tủ ', '')
          ? { ...l, status: 'OCCUPIED', itemCode: target.code, itemName: target.name }
          : l
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

  // Admin Approve Request
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
      bookSeries: req.bookSeries,
      condition: req.condition,
      ownerAlias: req.studentAlias,
      price: req.proposedPrice,
      coinValue: 15,
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

    // Update target locker
    setLockers((prev) =>
      prev.map((l) =>
        l.code === targetLocker.replace('Tủ ', '')
          ? { ...l, status: 'OCCUPIED', itemCode: req.itemCode, itemName: req.itemName }
          : l
      )
    );

    // Credit coins to contributor
    const member = members.find((m) => m.aliasName === req.studentAlias);
    if (member) {
      const newBalance = member.coinBalance + 15;
      setMembers((prev) =>
        prev.map((m) =>
          m.id === member.id
            ? { ...m, coinBalance: newBalance, contributedCount: m.contributedCount + 1 }
            : m
        )
      );
      if (activeMember.id === member.id) {
        setActiveMember((curr) => ({
          ...curr,
          coinBalance: newBalance,
          contributedCount: curr.contributedCount + 1,
        }));
      }

      // Add to Coin Ledger
      const newCoinEntry: CoinLedgerRecord = {
        id: `coin_${Date.now()}`,
        timestamp: getCurrentTimeString(),
        studentPassCode: member.passCode,
        studentAlias: member.aliasName,
        change: +15,
        balanceAfter: newBalance,
        reason: `Duyệt đơn đóng góp [${req.itemCode}] vào ${targetLocker}`,
        approvedBy: 'BQL Trạm K52',
        relatedItemCode: req.itemCode,
      };
      setCoinLedger((prev) => [newCoinEntry, ...prev]);
    }

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

  // Admin Reject Request
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
      notes: `Từ chối yêu cầu từ ${req.studentAlias}. Lý do: ${reason}`,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã từ chối yêu cầu [${req.itemCode}].`);
  };

  // Add Adjusting Entry (Audit Ledger rule)
  const handleAddAdjustingEntry = (
    studentPassCode: string,
    change: number,
    reason: string,
    relatedItemCode?: string
  ) => {
    const targetMember = members.find((m) => m.passCode === studentPassCode);
    if (!targetMember) return;

    const newBalance = Math.max(0, targetMember.coinBalance + change);

    setMembers((prev) =>
      prev.map((m) =>
        m.passCode === studentPassCode ? { ...m, coinBalance: newBalance } : m
      )
    );

    if (activeMember.passCode === studentPassCode) {
      setActiveMember((curr) => ({ ...curr, coinBalance: newBalance }));
    }

    const newCoinRecord: CoinLedgerRecord = {
      id: `adj_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      studentPassCode: targetMember.passCode,
      studentAlias: targetMember.aliasName,
      change,
      balanceAfter: newBalance,
      reason: `[Bút toán điều chỉnh] ${reason}`,
      approvedBy: 'BQL Trạm K52 (Thủ kho)',
      relatedItemCode,
    };

    setCoinLedger((prev) => [newCoinRecord, ...prev]);

    const newLog: TransactionLog = {
      id: `log_adj_${Date.now()}`,
      timestamp: getCurrentTimeString(),
      actionType: 'ADJUSTING_ENTRY',
      itemCode: relatedItemCode || 'N/A',
      itemName: 'Bút toán điều chỉnh sổ cái',
      actor: 'BQL Trạm K52',
      notes: `Điều chỉnh ${change > 0 ? `+${change}` : change} Coin cho ${targetMember.aliasName}. Lý do: ${reason}`,
      isAdjustingEntry: true,
    };

    setLogs((prev) => [newLog, ...prev]);
    showToast(`Đã lập bút toán điều chỉnh sổ cái thành công!`);
  };

  // Add Wishlist Demand
  const handleAddWishlist = (demand: Omit<WishlistDemand, 'id' | 'createdAt' | 'status'>) => {
    const newWish: WishlistDemand = {
      ...demand,
      id: `wish_${Date.now()}`,
      status: 'PENDING',
      createdAt: getCurrentTimeString(),
    };
    setWishlist((prev) => [newWish, ...prev]);
    showToast(`Đã đăng ký nhu cầu [${demand.titleOrKeyword}] vào Alpha Match!`);
  };

  // Fulfill Alpha Match
  const handleFulfillMatch = (wishlistId: string, itemCode: string) => {
    setWishlist((prev) =>
      prev.map((w) =>
        w.id === wishlistId ? { ...w, status: 'MATCHED', matchedItemCode: itemCode } : w
      )
    );
  };

  // Add Heritage Document
  const handleContributeDoc = (doc: Omit<HeritageDocument, 'id' | 'code' | 'downloadCount'>) => {
    const newDoc: HeritageDocument = {
      ...doc,
      id: `her_${Date.now()}`,
      code: `DOC-${doc.subject.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      downloadCount: 0,
    };
    setHeritageDocs((prev) => [newDoc, ...prev]);
    showToast(`Đã gửi học liệu [${doc.title}] vào thư viện Alpha Heritage!`);
  };

  // Order Eco / Discovery
  const handleOrderProduct = (name: string, price: number) => {
    showToast(`Đã ghi nhận đặt [${name}] (${price.toLocaleString('vi-VN')} đ). Hãy đến quầy STEM trạm K52 nhận hàng.`);
  };

  // Book Cover Request
  const handleRequestBookCover = (count: number, total: number) => {
    showToast(`Đã tiếp nhận yêu cầu bọc ${count} quyển sách (${total.toLocaleString('vi-VN')} đ). Mang sách đến Tủ E-02 nhé!`);
  };

  // Direct Add Item from Admin
  const handleDirectAddItem = (item: ExchangeItem) => {
    setItems((prev) => [item, ...prev]);
    showToast(`Đã thêm thành công học liệu [${item.code}] vào kho.`);
  };

  const pendingRequestsCount = requests.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FBF8] text-[#132218] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification Bar */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-top-2 border border-stone-800">
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-stone-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header adhering to Top Bar Contract */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingRequestsCount={pendingRequestsCount}
        activeMember={activeMember}
        allMembers={members}
        onSelectMember={setActiveMember}
        onOpenAlphaPassModal={() => setShowAlphaPassModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeScreen
            items={items}
            onNavigateToWarehouse={() => setActiveTab('warehouse')}
            onNavigateToRegister={() => setActiveTab('warehouse')}
            onNavigateToMatch={() => setActiveTab('match')}
            onNavigateToEco={() => setActiveTab('heritage_eco')}
            onNavigateToProposal={() => setActiveTab('proposal')}
            onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
            onViewDetail={(item) => setSelectedItemForDetail(item)}
            onShowQr={(item) => setSelectedItemForQr(item)}
          />
        )}

        {activeTab === 'match' && (
          <AlphaMatchView
            items={items}
            wishlist={wishlist}
            activeMember={activeMember}
            onReserveItem={handleReserveItem}
            onAddWishlist={handleAddWishlist}
            onFulfillMatch={handleFulfillMatch}
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

        {activeTab === 'heritage_eco' && (
          <div className="space-y-8">
            <EcoDiscoveryView
              ecoProducts={ecoProducts}
              discoveryCombos={discoveryCombos}
              activeMember={activeMember}
              onOrderProduct={handleOrderProduct}
              onRequestBookCover={handleRequestBookCover}
            />

            <div className="pt-8 border-t border-stone-200">
              <HeritageShareView
                heritageDocs={heritageDocs}
                items={items}
                activeMember={activeMember}
                onContributeDoc={handleContributeDoc}
                onReserveShareItem={(code, alias) => handleReserveItem(code, alias)}
              />
            </div>
          </div>
        )}

        {activeTab === 'proposal' && <ProposalPitchScreen />}

        {activeTab === 'admin' && (
          <AdminManagementScreen
            currentRole={currentRole}
            items={items}
            requests={requests}
            logs={logs}
            lockers={lockers}
            coinLedger={coinLedger}
            allMembers={members}
            onAuthenticateAdmin={handleAuthenticateAdmin}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
            onHandoverItem={handleHandoverItem}
            onReturnItem={handleReturnItem}
            onOpenAddModal={() => setShowAddModal(true)}
            onShowQr={(item) => setSelectedItemForQr(item)}
            onAddAdjustingEntry={handleAddAdjustingEntry}
          />
        )}
      </main>

      {/* Modals */}
      <AlphaPassModal
        isOpen={showAlphaPassModal}
        onClose={() => setShowAlphaPassModal(false)}
        activeMember={activeMember}
        allMembers={members}
        onSelectMember={setActiveMember}
        wishlist={wishlist}
        onAddWishlist={handleAddWishlist}
        coinLedger={coinLedger}
      />

      {selectedItemForDetail && (
        <ItemDetailModal
          item={selectedItemForDetail}
          currentRole={currentRole}
          onClose={() => setSelectedItemForDetail(null)}
          onShowQr={(item) => {
            setSelectedItemForDetail(null);
            setSelectedItemForQr(item);
          }}
          onReserve={(code, alias) => {
            handleReserveItem(code, alias);
            setSelectedItemForDetail(null);
          }}
          onHandover={(code, recipient, notes) => {
            handleHandoverItem(code, recipient, notes);
            setSelectedItemForDetail(null);
          }}
          onReturn={(code, cond, locker, notes) => {
            handleReturnItem(code, cond, locker, notes);
            setSelectedItemForDetail(null);
          }}
        />
      )}

      {selectedItemForQr && (
        <QrModal
          item={selectedItemForQr}
          onClose={() => setSelectedItemForQr(null)}
        />
      )}

      {showAddModal && (
        <AddItemModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddItem={handleDirectAddItem}
        />
      )}

      {/* Quiet Minimal Footer (Anti-slop rule) */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-stone-800">
              Dự án Khởi nghiệp Học sinh – Sinh viên Cấp tỉnh 2026: Alpha-K52
            </div>
            <div className="text-[11px] text-stone-500">
              Trường THPT Lương Văn Tri (Văn Quan, Lạng Sơn) · Lớp 11A1 (Khóa 52)
            </div>
          </div>
          <div className="text-[11px] text-stone-400">
            Giáo viên hướng dẫn: Cô Hứa Thị Thanh Thương · Bảo tồn tri thức & Tuần hoàn học liệu
          </div>
        </div>
      </footer>
    </div>
  );
}
