import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users as UsersIcon, Settings as SettingsIcon, 
  Search, Bell, X, AlertTriangle, LogOut, CheckCircle2, AlertCircle, MapPin, 
  Truck, Menu, Warehouse, ChevronDown, User, CalendarDays, Edit, Clock 
} from 'lucide-react';
import { toast } from 'sonner';

// --- ALT BİLEŞENLERİN (COMPONENTS) İÇERİ AKTARILMASI ---
import DashboardStats from '../Components/DashboardStats';
import Products from '../Components/Products';
import Orders from '../Components/Orders';
import Users from '../Components/Users';
import Warehouses from '../Components/Warehouses';
import SettingsTab from '../Components/Settings'; 

// MİGRATİON (VERİ GÖÇÜ) İÇİN VARSAYILAN DEVASA VERİ SETLERİ
const defaultProducts = [
  { id: 1, name: 'Apple iPhone 15 Pro 256GB', category: 'Akıllı Telefon', stock: 3200, price: '68999.00' },
  { id: 2, name: 'MacBook Air M3 16GB 512GB', category: 'Bilgisayar', stock: 1450, price: '45499.00' },
  { id: 3, name: 'Sony PlayStation 5 Slim', category: 'Oyun Konsolu', stock: 2100, price: '21999.00' },
  { id: 4, name: 'AirPods Pro (2. Nesil)', category: 'Aksesuar', stock: 5400, price: '8499.00' },
  { id: 5, name: 'Samsung 55" 4K Smart TV', category: 'Televizyon', stock: 850, price: '24500.00' },
  { id: 6, name: 'Apple iPad Pro 13" M4', category: 'Tablet', stock: 1800, price: '34999.00' },
  { id: 7, name: 'Apple Watch Ultra 2', category: 'Aksesuar', stock: 4200, price: '29999.00' },
  { id: 8, name: 'Dyson V15 Detect Absolute', category: 'Ev Aletleri', stock: 950, price: '22999.00' },
  { id: 9, name: 'DJI Air 3 Fly More Combo', category: 'Kamera & Drone', stock: 450, price: '45999.00' },
  { id: 10, name: 'Samsung Odyssey Neo G9', category: 'Monitör', stock: 600, price: '48500.00' },
];

const initialOrders = [ 
  { id: '#ORD-004', customer: 'Ozan Teknoloji', date: '10 Mart 2026', status: 'Hazırlanıyor', items: [{name: 'MacBook Air M3 16GB 512GB', count: 12}, {name: 'Apple iPhone 15 Pro 256GB', count: 5}], total: '890483.00' },
  { id: '#ORD-001', customer: 'Ahmet Yılmaz', date: '09 Mart 2026', status: 'Kargoda', items: [{name: 'Apple iPhone 15 Pro 256GB', count: 2}, {name: 'Apple Watch Ultra 2', count: 1}], total: '167997.00' }, 
  { id: '#ORD-002', customer: 'Tasarımlook Ajans', date: '08 Mart 2026', status: 'Tamamlandı', items: [{name: 'Sony PlayStation 5 Slim', count: 8}], total: '175992.00' }, 
  { id: '#ORD-003', customer: 'Netnucleus A.Ş.', date: '08 Mart 2026', status: 'Kargoda', items: [{name: 'AirPods Pro (2. Nesil)', count: 25}, {name: 'Apple iPad Pro 13" M4', count: 5}], total: '387470.00' },
  { id: '#ORD-005', customer: 'Mehmet Demir', date: '07 Mart 2026', status: 'Tamamlandı', items: [{name: 'Samsung 55" 4K Smart TV', count: 4}, {name: 'Dyson V15 Detect Absolute', count: 2}], total: '143998.00' }
];

const initialWarehouses = [
  { id: 'WH-01', name: 'Londra Merkez Depo', country: 'İngiltere', maxCapacity: 10000, inventory: { 1: 1400, 2: 600, 3: 900, 4: 2000, 5: 300, 6: 700, 7: 1500, 8: 400, 9: 200, 10: 250 } },
  { id: 'WH-02', name: 'İstanbul Hub', country: 'Türkiye', maxCapacity: 8000, inventory: { 1: 800, 2: 400, 3: 600, 4: 1500, 5: 250, 6: 500, 7: 1200, 8: 250, 9: 100, 10: 150 } },
  { id: 'WH-03', name: 'Berlin Lojistik Merkezi', country: 'Almanya', maxCapacity: 6000, inventory: { 1: 600, 2: 300, 3: 400, 4: 1100, 5: 200, 6: 400, 7: 900, 8: 200, 9: 100, 10: 150 } },
  { id: 'WH-04', name: 'New York Dağıtım', country: 'ABD', maxCapacity: 5000, inventory: { 1: 400, 2: 150, 3: 200, 4: 800, 5: 100, 6: 200, 7: 600, 8: 100, 9: 50, 10: 50 } }
];

const initialNotifications = [ 
  { id: 1, text: "Berlin lojistik merkezi %90 kapasiteye ulaştı!", time: "5 dk önce", read: false, type: 'warning', targetTab: 'warehouses' }, 
  { id: 2, text: "Yeni küresel satış rekoru kırıldı!", time: "1 saat önce", read: false, type: 'success', targetTab: 'dashboard' }, 
  { id: 3, text: "Yıllık mali rapor hazır.", time: "2 saat önce", read: true, type: 'info', targetTab: 'dashboard' } 
];

const defaultSettings = { name: 'Okan Çakır', email: 'okan@novastore.com', phone: '+90 555 123 4567', notifyEmails: true, notifySms: false, notifyStock: true, password: '220325' };

function Dashboard({ onLogout }) {
  // --- ARAYÜZ (UI) STATE'LERİ ---
  const [activeTab, setActiveTab] = useState('orders'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- ÖZEL MODÜL STATE'LERİ ---
  const [salesYear, setSalesYear] = useState('2026');
  const [trafficPeriod, setTrafficPeriod] = useState('Bu Hafta');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  
  const [notifications, setNotifications] = useState(initialNotifications);

  // --- VERİTABANI (LOCAL STORAGE) STATE'LERİ ---
  const [products, setProducts] = useState(() => { 
    const savedProducts = localStorage.getItem('nova_products'); 
    if (savedProducts) {
      let parsed = JSON.parse(savedProducts);
      if (parsed.length < 10) return defaultProducts; 
      return parsed;
    } 
    return defaultProducts; 
  });
  
  const [orders, setOrders] = useState(() => { 
    const savedOrders = localStorage.getItem('nova_orders'); 
    if (savedOrders) { 
      const parsed = JSON.parse(savedOrders); 
      if (parsed.length > 0 && !Array.isArray(parsed[0].items)) return initialOrders; 
      return parsed; 
    } 
    return initialOrders; 
  });
  
  const [settings, setSettings] = useState(() => { try { const savedSettings = localStorage.getItem('nova_settings'); if (savedSettings) { let parsed = JSON.parse(savedSettings); if (!parsed.password || parsed.password === '123456') { parsed.password = '220325'; localStorage.setItem('nova_settings', JSON.stringify(parsed)); } return parsed; } } catch(e) {} return defaultSettings; });
  
  const [warehouses, setWarehouses] = useState(() => { 
    const savedWH = localStorage.getItem('nova_warehouses'); 
    if (savedWH) {
      let parsed = JSON.parse(savedWH);
      if (parsed[0].maxCapacity !== 10000) return initialWarehouses; 
      return parsed;
    }
    return initialWarehouses; 
  });

  // --- FORM & MODAL STATE'LERİ ---
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingTabNavigation, setPendingTabNavigation] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', stock: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [editingWHStock, setEditingWHStock] = useState(null);
  const [whStockInput, setWhStockInput] = useState('');

  // --- LOCAL STORAGE KAYIT (EFFECTS) ---
  useEffect(() => { localStorage.setItem('nova_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('nova_orders', JSON.stringify(orders)); }, [orders]); 
  useEffect(() => { localStorage.setItem('nova_settings', JSON.stringify(settings)); }, [settings]); 
  useEffect(() => { localStorage.setItem('nova_warehouses', JSON.stringify(warehouses)); }, [warehouses]); 
  useEffect(() => { setLocalSettings(settings); }, [settings]);

  // --- ORTAK FONKSİYONLAR ---
  const getWarehouseStats = (wh) => {
    let totalItems = 0;
    products.forEach(p => { totalItems += wh.inventory?.[p.id] || 0; });
    let capacityPct = Math.min(100, Math.round((totalItems / (wh.maxCapacity || 1000)) * 100));
    let status = 'Normal'; let alert = 'Operasyon sorunsuz devam ediyor.';
    
    if (totalItems === 0) { status = 'Boş'; alert = 'Depoda hiç ürün bulunmuyor.'; } 
    else if (capacityPct >= 90) { status = 'Kritik'; alert = 'Maksimum doluluk! Yeni sevkiyat durduruldu.'; } 
    else if (capacityPct >= 75) { status = 'Yoğun'; alert = 'Kapasite sınırına yaklaşılıyor.'; }
    return { totalItems, capacityPct, status, alert };
  };

  const handleAddProduct = (e) => { 
    e.preventDefault(); 
    if (!newProduct.name || !newProduct.price) return toast.error('Boş alan bırakmayın!'); 
    
    const newId = Date.now();
    const pStock = parseInt(newProduct.stock) || 0;
    const productToAdd = { id: newId, name: newProduct.name, category: newProduct.category || 'Genel', stock: pStock, price: parseFloat(newProduct.price).toFixed(2) }; 
    
    setProducts([productToAdd, ...products]); 
    
    if (pStock > 0) { 
      let remainingStock = pStock;
      let whData = warehouses.map(wh => {
          let total = 0; Object.values(wh.inventory || {}).forEach(v => total += v);
          let avail = Math.max(0, (wh.maxCapacity || 1000) - total);
          let oldCapPct = Math.min(100, Math.round((total / (wh.maxCapacity || 1000)) * 100));
          return { ...wh, total, avail, oldCapPct, added: 0 };
      });

      whData.sort((a, b) => b.avail - a.avail);
      let totalAvail = whData.reduce((sum, wh) => sum + wh.avail, 0);

      if (totalAvail === 0) { whData[0].added = remainingStock; } 
      else {
          whData.forEach(wh => {
              if (remainingStock <= 0) return;
              let proportion = Math.floor(pStock * (wh.avail / totalAvail));
              let toAdd = Math.min(proportion, wh.avail, remainingStock);
              wh.added = toAdd; remainingStock -= toAdd;
          });
          let i = 0;
          while(remainingStock > 0) { whData[i % whData.length].added += 1; remainingStock -= 1; i++; }
      }

      let newNotifs = [];
      const updatedWarehouses = warehouses.map(origWh => {
          let modWh = whData.find(w => w.id === origWh.id);
          if (modWh.added > 0) {
              const newInv = { ...(origWh.inventory || {}), [newId]: modWh.added };
              let newTotal = modWh.total + modWh.added;
              let newCapPct = Math.min(100, Math.round((newTotal / (origWh.maxCapacity || 1000)) * 100));
              if (newCapPct >= 90 && modWh.oldCapPct < 90) {
                  newNotifs.push({ id: Date.now() + Math.random(), text: `${origWh.name} kapasitesi %${newCapPct} seviyesine ulaştı!`, time: "Şimdi", read: false, type: 'warning', targetTab: 'warehouses' });
              }
              return { ...origWh, inventory: newInv };
          }
          return origWh;
      });

      setWarehouses(updatedWarehouses);
      if (newNotifs.length > 0) { setNotifications(prev => [...newNotifs, ...prev]); newNotifs.forEach(n => toast.error(n.text)); }
    }
    setShowAddForm(false); setNewProduct({ name: '', category: '', stock: '', price: '' });
    toast.success('Ürün başarıyla eklendi ve depolara akıllıca paylaştırıldı!'); 
  };

  const handleDeleteProduct = (id) => { setProducts(products.filter(p => p.id !== id)); toast.info('Ürün silindi.'); };
  const handleEditClick = (product) => { setEditingProduct(product); setShowAddForm(false); };
  
  const handleUpdateProduct = (e) => { 
    e.preventDefault(); 
    const newStock = parseInt(editingProduct.stock) || 0;
    const oldProduct = products.find(p => p.id === editingProduct.id);
    const diff = newStock - (oldProduct ? oldProduct.stock : 0);

    const updatedProducts = products.map(p => p.id === editingProduct.id ? { ...p, name: editingProduct.name, category: editingProduct.category, stock: newStock, price: parseFloat(editingProduct.price).toFixed(2) } : p); 
    setProducts(updatedProducts); 

    if (diff !== 0) {
       let notifToAdd = null;
       setWarehouses(warehouses.map(wh => {
           if(wh.id === 'WH-01') {
               const curr = wh.inventory?.[editingProduct.id] || 0;
               const finalStock = Math.max(0, curr + diff);
               const newInv = { ...wh.inventory, [editingProduct.id]: finalStock };
               let oldTotal = 0; Object.values(wh.inventory || {}).forEach(v => oldTotal += v);
               let oldCap = Math.min(100, Math.round((oldTotal / (wh.maxCapacity || 1000)) * 100));
               let newTotal = 0; Object.values(newInv).forEach(v => newTotal += v);
               let newCap = Math.min(100, Math.round((newTotal / (wh.maxCapacity || 1000)) * 100));

               if (newCap >= 90 && oldCap < 90) notifToAdd = { id: Date.now(), text: `${wh.name} kapasitesi %${newCap} seviyesine ulaştı!`, time: "Şimdi", read: false, type: 'warning', targetTab: 'warehouses' };
               else if (newTotal === 0 && oldTotal > 0) notifToAdd = { id: Date.now(), text: `${wh.name} tamamen boşaldı!`, time: "Şimdi", read: false, type: 'warning', targetTab: 'warehouses' };
               return { ...wh, inventory: newInv };
           }
           return wh;
       }));
       if (notifToAdd) { setNotifications(prev => [notifToAdd, ...prev]); toast.error(notifToAdd.text); }
    }
    setEditingProduct(null); toast.success('Ürün ve global envanter güncellendi!'); 
  };

  const handleShipOrder = (orderId, currentStatus) => { let newStatus = ''; let message = ''; if (currentStatus === 'Hazırlanıyor') { newStatus = 'Kargoda'; message = `${orderId} kargoya verildi!`; setNotifications([{ id: Date.now(), text: message, time: "Şimdi", read: false, type: 'info', targetTab: 'orders' }, ...notifications]); } else if (currentStatus === 'Kargoda') { newStatus = 'Tamamlandı'; message = `${orderId} tamamlandı!`; setNotifications([{ id: Date.now(), text: message, time: "Şimdi", read: false, type: 'success', targetTab: 'orders' }, ...notifications]); } const updatedOrders = orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order); setOrders(updatedOrders); toast.success(message); if (selectedOrder && selectedOrder.id === orderId) { setSelectedOrder({ ...selectedOrder, status: newStatus }); } };
  const handleViewOrderDetails = (order) => { setSelectedOrder(order); };
  const handleLocalSettingChange = (key, value) => { setLocalSettings(prev => ({ ...prev, [key]: value })); setHasUnsavedChanges(true); };
  const handlePasswordChange = (key, value) => { setPasswordForm(prev => ({ ...prev, [key]: value })); setHasUnsavedChanges(true); };

  const startEditingWHStock = (productId, currentStock) => {
    setEditingWHStock(productId); setWhStockInput(currentStock);
  };

  const saveWHStock = (warehouseId, productId) => {
    const newStock = parseInt(whStockInput) || 0;
    let newTotalStockForProduct = 0; 
    let notifToAdd = null;

    const updatedWarehouses = warehouses.map(wh => {
      let currentInv = wh.inventory || {};
      let localItemStock = currentInv[productId] || 0;
      let oldTotalItems = 0; Object.values(currentInv).forEach(v => oldTotalItems += v);
      let oldCapacityPct = Math.min(100, Math.round((oldTotalItems / (wh.maxCapacity || 1000)) * 100));

      if (wh.id === warehouseId) { localItemStock = newStock; }
      newTotalStockForProduct += localItemStock; 
      
      const newInventory = { ...currentInv, [productId]: localItemStock };
      let newTotalItems = 0; Object.values(newInventory).forEach(v => newTotalItems += v);
      let newCapacityPct = Math.min(100, Math.round((newTotalItems / (wh.maxCapacity || 1000)) * 100));

      if (wh.id === warehouseId) {
        if (newCapacityPct >= 90 && oldCapacityPct < 90) {
          notifToAdd = { id: Date.now(), text: `${wh.name} kapasitesi %${newCapacityPct} ile KRİTİK seviyede!`, time: "Şimdi", read: false, type: 'warning', targetTab: 'warehouses' };
        } else if (newTotalItems === 0 && oldTotalItems > 0) {
          notifToAdd = { id: Date.now(), text: `${wh.name} depoları tamamen SIFIRLANDI!`, time: "Şimdi", read: false, type: 'warning', targetTab: 'warehouses' };
        }
      }
      return { ...wh, inventory: newInventory };
    });
    
    setWarehouses(updatedWarehouses);
    if (selectedWarehouse && selectedWarehouse.id === warehouseId) { setSelectedWarehouse(updatedWarehouses.find(w => w.id === warehouseId)); }
    setProducts(products.map(p => p.id === productId ? { ...p, stock: newTotalStockForProduct } : p));
    setEditingWHStock(null); toast.success('Lokal stok güncellendi!');
    if (notifToAdd) { setNotifications(prev => [notifToAdd, ...prev]); toast.error(notifToAdd.text); }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value; const digits = val.replace(/[^\d]/g, ''); const limited = digits.substring(0, 12);
    let formatted = '';
    if (limited.length > 0) formatted += '+' + limited.substring(0, 2);
    if (limited.length > 2) formatted += ' ' + limited.substring(2, 5);
    if (limited.length > 5) formatted += ' ' + limited.substring(5, 8);
    if (limited.length > 8) formatted += ' ' + limited.substring(8, 12);
    handleLocalSettingChange('phone', formatted);
  };

  const handleSaveSettings = (e) => { e.preventDefault(); if (passwordForm.current || passwordForm.new) { if (!passwordForm.current) return toast.error('Mevcut şifrenizi girin!'); if (passwordForm.current.trim() !== settings.password.trim()) return toast.error('Mevcut şifrenizi yanlış girdiniz!'); if (!passwordForm.new) return toast.error('Yeni şifreyi girin!'); if (passwordForm.new.length < 6) return toast.error('Yeni şifre en az 6 karakter olmalıdır!'); localSettings.password = passwordForm.new.trim(); } setSettings(localSettings); setHasUnsavedChanges(false); setPasswordForm({ current: '', new: '' }); toast.success('Sistem ayarları kaydedildi!'); };
  
  const handleTabChange = (targetTab) => { setSearchQuery(''); setIsSidebarOpen(false); if (activeTab === 'settings' && hasUnsavedChanges && targetTab !== 'settings') { setPendingTabNavigation(targetTab); } else { setActiveTab(targetTab); } };
  
  const confirmUnsavedChanges = (action) => { if (action === 'save') { if (passwordForm.current || passwordForm.new) { if (!passwordForm.current) { toast.error('Mevcut şifrenizi girin!'); setPendingTabNavigation(null); return; } if (passwordForm.current.trim() !== settings.password.trim()) { toast.error('Mevcut şifrenizi yanlış girdiniz!'); setPendingTabNavigation(null); return; } if (!passwordForm.new) { toast.error('Yeni şifreyi girmelisiniz!'); setPendingTabNavigation(null); return; } if (passwordForm.new.length < 6) { toast.error('Yeni şifre en az 6 karakter olmalıdır!'); setPendingTabNavigation(null); return; } localSettings.password = passwordForm.new.trim(); } setSettings(localSettings); setPasswordForm({ current: '', new: '' }); toast.success('Değişiklikler kaydedildi.'); } else if (action === 'discard') { setLocalSettings(settings); setPasswordForm({ current: '', new: '' }); toast.info('İptal edildi.'); } setHasUnsavedChanges(false); setActiveTab(pendingTabNavigation); setPendingTabNavigation(null); };

  const markAllAsRead = () => { const updated = notifications.map(n => ({ ...n, read: true })); setNotifications(updated); setIsNotificationOpen(false); toast.success("Tüm bildirimler okundu!"); };
  const handleNotificationClick = (notif) => { const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n); setNotifications(updated); setIsNotificationOpen(false); if(notif.targetTab) { handleTabChange(notif.targetTab); } };

  // --- HESAPLAMALAR VE DEĞİŞKENLER ---
  const totalStockCount = products.reduce((total, item) => total + item.stock, 0);
  const criticalProducts = products.filter(item => item.stock < 10);
  const pendingOrdersCount = orders.filter(o => o.status === 'Hazırlanıyor').length;
  const shippedOrdersCount = orders.filter(o => o.status === 'Kargoda').length;
  const totalOrderVolume = orders.reduce((sum, o) => sum + parseFloat(o.total), 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  const getTotalItemsCount = (items) => { if (Array.isArray(items)) return items.reduce((acc, item) => acc + item.count, 0); return items; };
  const getAvatarLetter = () => settings.name ? settings.name.charAt(0).toUpperCase() : 'A';
  const getHeaderName = () => { if (!settings.name) return 'Admin'; const parts = settings.name.trim().split(' '); return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1].charAt(0)}.` : parts[0]; };

  const getOrderStatusBadge = (status) => {
    switch(status) {
      case 'Tamamlandı': return <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-max"><CheckCircle2 className="w-3.5 h-3.5"/> Tamamlandı</span>;
      case 'Hazırlanıyor': return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-max"><Clock className="w-3.5 h-3.5"/> Hazırlanıyor</span>;
      case 'Kargoda': return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-max"><Truck className="w-3.5 h-3.5"/> Kargoda</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-bold w-max">{status}</span>;
    }
  };

  const uniqueCategories = ['Tümü', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) || order.customer.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredWarehouses = warehouses.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.country.toLowerCase().includes(searchQuery.toLowerCase()));

  // --- SOL MENÜ BİLEŞENLERİ ---
  const NavButton = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button onClick={() => handleTabChange(id)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-300 ${ isActive ? 'bg-gradient-to-r from-[#a80038] to-red-700 text-white shadow-lg shadow-red-900/20 translate-x-1' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 hover:translate-x-1' }`}>
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} /> {label}
      </button>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="h-20 flex items-center px-8 border-b border-slate-100 bg-white shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-[#a80038] to-red-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <span className="text-white font-black text-lg">A</span>
        </div>
        <span className="text-xl font-black tracking-tight text-slate-800">AURASTORE</span>
      </div>
      <nav className="flex-1 py-8 px-5 space-y-2 overflow-y-auto">
        <NavButton id="dashboard" icon={LayoutDashboard} label="Ana Panel" />
        <NavButton id="products" icon={Package} label="Ürün Yönetimi" />
        <NavButton id="orders" icon={ShoppingCart} label="Sipariş Operasyonları" />
        <NavButton id="warehouses" icon={Warehouse} label="Depolar" />
        <NavButton id="users" icon={UsersIcon} label="Kullanıcı Analitiği" />
        <div className="mt-10 pt-8 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Package className="w-3.5 h-3.5"/> Stok Özeti</h4>
            <p className="text-3xl font-black text-slate-800 mb-1">{totalStockCount} <span className="text-xs font-bold text-slate-400 uppercase">Adet</span></p>
            {criticalProducts.length > 0 ? (
              <div className="mt-4 bg-white border border-red-100 rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-2"><AlertTriangle className="w-4 h-4 text-red-500" /><span className="text-xs font-bold text-red-600">Kritik Stok ({criticalProducts.length})</span></div>
                <ul className="space-y-2">{criticalProducts.map(p => (<li key={p.id} className="text-[11px] flex justify-between items-center text-slate-600 font-medium"><span className="truncate pr-2">{p.name}</span><span className="shrink-0 font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded">{p.stock}</span></li>))}</ul>
              </div>
            ) : (<div className="mt-4 flex items-center gap-2 text-emerald-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50"><CheckCircle2 className="w-4 h-4" /> <span className="text-xs font-bold">Tüm stoklar yeterli</span></div>)}
          </div>
        </div>
      </nav>
      <div className="p-5 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <NavButton id="settings" icon={SettingsIcon} label="Sistem Ayarları" />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      {/* MASAÜSTÜ SOL MENÜ */}
      <aside className="w-72 bg-white border-r border-slate-200/60 hidden lg:flex flex-col z-20 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <SidebarContent />
      </aside>

      {/* MOBİL SOL MENÜ (DRAWER) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white animate-in slide-in-from-left duration-300 shadow-2xl flex flex-col">
            <SidebarContent />
            <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-6 p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"><X size={20}/></button>
          </div>
        </div>
      )}

      {/* ANA İÇERİK ALANI */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* ÜST BAR (HEADER) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 md:px-8 z-30 relative shrink-0">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"><Menu size={24}/></button>
            <div className="flex items-center bg-slate-100/80 hover:bg-slate-100 border border-transparent focus-within:border-slate-300 focus-within:bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex-1 sm:w-[300px] lg:w-[400px] transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 sm:mr-3 shrink-0" />
              <input type="text" placeholder={`${activeTab === 'products' ? 'Ürün ara...' : activeTab === 'orders' ? 'Sipariş ara...' : activeTab === 'warehouses' ? 'Depo ara...' : 'Sistemde hızlı ara...'}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-xs sm:text-sm w-full text-slate-700 placeholder:text-slate-400 font-medium" />
              {searchQuery && ( <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-red-500 shrink-0"><X className="w-4 h-4" /></button> )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5 ml-3 shrink-0">
            {/* BİLDİRİMLER */}
            <div className="relative">
              <button onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileMenuOpen(false); }} className="relative p-2 sm:p-2.5 text-slate-400 hover:text-[#a80038] hover:bg-red-50 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                {notifications.filter(n=>!n.read).length > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#a80038] rounded-full border-2 border-white"></span>}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-4 w-[280px] sm:w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <span className="font-bold text-xs sm:text-sm text-slate-800">Sistem Bildirimleri</span>
                    <button onClick={markAllAsRead} className="text-[10px] sm:text-xs text-[#a80038] font-bold hover:underline">Okundu İşaretle</button>
                  </div>
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div key={notif.id} onClick={() => handleNotificationClick(notif)} className={`px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 cursor-pointer ${!notif.read ? 'bg-red-50/30' : ''}`}>
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {notif.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                          {notif.type === 'info' && <Bell className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div>
                          <p className={`text-xs sm:text-sm ${!notif.read ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>{notif.text}</p>
                          <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1 block font-semibold">{notif.time}</span>
                        </div>
                      </div>
                    )) : ( <div className="px-5 py-8 text-center text-sm font-medium text-slate-500">Tüm bildirimleri okudunuz.</div> )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            
            {/* PROFİL MENÜSÜ */}
            <div className="relative">
              <div onClick={() => { setIsProfileMenuOpen(!isProfileMenuOpen); setIsNotificationOpen(false); }} className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1 sm:p-1.5 sm:pr-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#a80038] to-red-700 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-md shrink-0">{getAvatarLetter()}</div>
                <div className="flex-col hidden md:flex"><span className="text-sm font-bold text-slate-700 leading-none">{getHeaderName()}</span><span className="text-[10px] font-bold text-slate-400 mt-1">Yönetici</span></div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </div>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-5 py-3 border-b border-slate-50 mb-1 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-800 truncate">{settings.name}</p>
                    <p className="text-xs text-slate-500 font-medium truncate">{settings.email}</p>
                  </div>
                  <button onClick={() => { handleTabChange('settings'); setIsProfileMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#a80038] flex items-center gap-3 transition-colors"> <User className="w-4 h-4" /> Profilim </button>
                  <button onClick={() => { handleTabChange('settings'); setIsProfileMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#a80038] flex items-center gap-3 transition-colors"> <SettingsIcon className="w-4 h-4" /> Hesap Ayarları </button>
                  <div className="h-px bg-slate-100 my-1 mx-3"></div>
                  <button onClick={() => { setShowLogoutConfirm(true); setIsProfileMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"> <LogOut className="w-4 h-4" /> Çıkış Yap </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MODÜLLERİN DİNAMİK OLARAK ÇAĞRILDIĞI ALAN */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative z-0">
          {activeTab === 'dashboard' && <DashboardStats totalOrderVolume={totalOrderVolume} pendingOrdersCount={pendingOrdersCount} shippedOrdersCount={shippedOrdersCount} salesYear={salesYear} setSalesYear={setSalesYear} />}
          
          {activeTab === 'products' && <Products selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} uniqueCategories={uniqueCategories} showAddForm={showAddForm} setShowAddForm={setShowAddForm} editingProduct={editingProduct} setEditingProduct={setEditingProduct} newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} handleUpdateProduct={handleUpdateProduct} filteredProducts={filteredProducts} handleEditClick={handleEditClick} handleDeleteProduct={handleDeleteProduct} searchQuery={searchQuery} />}
          
          {activeTab === 'orders' && <Orders filteredOrders={filteredOrders} handleViewOrderDetails={handleViewOrderDetails} handleShipOrder={handleShipOrder} getOrderStatusBadge={getOrderStatusBadge} searchQuery={searchQuery} />}
          
          {activeTab === 'users' && <Users trafficPeriod={trafficPeriod} setTrafficPeriod={setTrafficPeriod} />}
          
          {activeTab === 'warehouses' && <Warehouses filteredWarehouses={filteredWarehouses} getWarehouseStats={getWarehouseStats} setSelectedWarehouse={setSelectedWarehouse} searchQuery={searchQuery} />}
          
          {activeTab === 'settings' && <SettingsTab hasUnsavedChanges={hasUnsavedChanges} localSettings={localSettings} handleLocalSettingChange={handleLocalSettingChange} handlePhoneChange={handlePhoneChange} passwordForm={passwordForm} handlePasswordChange={handlePasswordChange} handleSaveSettings={handleSaveSettings} />}
        </main>
      </div>

      {/* SİPARİŞ DETAY MODALI */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] md:max-h-[95vh]">
            <div className="bg-gradient-to-r from-[#a80038] to-red-700 px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute -right-6 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 relative z-10"><Package className="w-4 h-4 sm:w-5 sm:h-5 text-red-200" /> Sipariş: <span className="opacity-80 font-medium ml-1">{selectedOrder.id}</span></h3>
              <button onClick={() => setSelectedOrder(null)} className="relative z-10 text-white/70 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-lg transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5"/></button>
            </div>
            <div className="p-4 sm:p-6 bg-slate-50/50 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1"><span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5"><User className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Müşteri</span><span className="font-black text-slate-800 text-xs sm:text-sm truncate">{selectedOrder.customer}</span></div>
                <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1"><span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5"><CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Tarih</span><span className="font-bold text-slate-700 text-xs sm:text-sm">{selectedOrder.date}</span></div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                 <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4"/> Durum</span>{getOrderStatusBadge(selectedOrder.status)}
              </div>
              <div className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-100 flex justify-between items-center"><span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-wider">Paket İçeriği</span><span className="bg-slate-200/70 text-slate-700 text-[9px] sm:text-[10px] font-black px-2 py-1 rounded-md">{getTotalItemsCount(selectedOrder.items)} Adet</span></div>
                {Array.isArray(selectedOrder.items) && (
                  <div className="p-2 sm:p-3 max-h-32 sm:max-h-40 overflow-y-auto space-y-1">
                    {selectedOrder.items.map((item, idx) => ( <div key={idx} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg sm:rounded-xl transition-colors"><span className="text-slate-700 text-[11px] sm:text-xs font-bold flex items-center gap-2 sm:gap-2.5 truncate pr-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200"><Package className="w-3 h-3 text-slate-400"/></div><span className="truncate" title={item.name}>{item.name}</span></span><span className="text-slate-800 text-[11px] sm:text-xs font-black bg-white border border-slate-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-sm shrink-0">x{item.count}</span></div> ))}
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex justify-between items-center text-white shadow-lg shadow-slate-900/20 border border-slate-700"><span className="font-bold text-slate-300 text-xs sm:text-sm">Genel Toplam</span><span className="font-black text-xl sm:text-2xl tracking-tight">₺{selectedOrder.total}</span></div>
            </div>
            
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col gap-2.5 sm:gap-3 shrink-0">
              {selectedOrder.status === 'Hazırlanıyor' && ( <button onClick={() => { handleShipOrder(selectedOrder.id, selectedOrder.status); setSelectedOrder(null); }} className="w-full bg-blue-600 text-white px-6 py-3 sm:py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 text-sm"> <Truck className="w-4 h-4" /> Kargoya Ver </button> )}
              {selectedOrder.status === 'Kargoda' && ( <button onClick={() => { handleShipOrder(selectedOrder.id, selectedOrder.status); setSelectedOrder(null); }} className="w-full bg-emerald-600 text-white px-6 py-3 sm:py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"> <CheckCircle2 className="w-4 h-4" /> Tamamlandı Yap </button> )}
              <button onClick={() => setSelectedOrder(null)} className="w-full bg-white border border-slate-200 text-slate-600 px-6 py-3 sm:py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors text-sm shadow-sm"> Kapat </button>
            </div>
          </div>
        </div>
      )}

      {/* DEPO LOKAL STOK MODALI */}
      {selectedWarehouse && (() => {
        const activeWH = warehouses.find(w => w.id === selectedWarehouse.id) || selectedWarehouse;
        const stats = getWarehouseStats(activeWH);
        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl max-w-2xl w-full overflow-hidden border border-white/50 flex flex-col max-h-[90vh]">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 md:p-8 flex justify-between items-center text-white shrink-0 relative overflow-hidden">
                <div className="absolute -left-6 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black tracking-tight">{activeWH.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lokal Envanter Yönetimi - {activeWH.country}</p>
                </div>
                <button onClick={() => setSelectedWarehouse(null)} className="relative z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20}/></button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto bg-slate-50/50 flex-1">
                <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-lg">Kapasite Sınırı: {activeWH.maxCapacity || 1000}</span>
                     <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">İçerideki: {stats.totalItems} Ürün</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                    <div className={`h-full rounded-full transition-all duration-1000 ${stats.capacityPct >= 90 ? 'bg-red-500' : stats.capacityPct >= 60 ? 'bg-amber-400' : 'bg-emerald-500'}`} style={{ width: `${stats.capacityPct}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className={`uppercase tracking-wide ${stats.status === 'Kritik' ? 'text-red-500' : stats.status === 'Yoğun' ? 'text-amber-500' : stats.status === 'Boş' ? 'text-slate-500' : 'text-emerald-500'}`}>{stats.alert}</span>
                    <span className={stats.capacityPct >= 90 ? 'text-red-500' : stats.capacityPct >= 60 ? 'text-amber-500' : 'text-emerald-500'}>% {stats.capacityPct} Dolu</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="w-full text-left min-w-[500px]">
                       <thead className="bg-slate-50/50 border-b border-slate-100">
                         <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest">
                           <th className="px-6 py-4">Ürün</th>
                           <th className="px-6 py-4 text-center">Lokal Stok</th>
                           <th className="px-6 py-4 text-center">Durum</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                         {products.map((p, idx) => {
                           const localStock = activeWH.inventory?.[p.id] || 0;
                           return (
                             <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                               <td className="px-6 py-4 font-bold text-slate-700 text-sm flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-slate-300"></div> {p.name}
                               </td>
                               <td className="px-6 py-4 text-center font-black text-slate-800">
                                 {editingWHStock === p.id ? (
                                   <div className="flex items-center justify-center gap-2">
                                     <input type="number" className="w-16 p-1.5 text-center border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#a80038] outline-none" value={whStockInput} onChange={e=>setWhStockInput(e.target.value)} />
                                     <button onClick={() => saveWHStock(activeWH.id, p.id)} className="text-white bg-emerald-500 hover:bg-emerald-600 p-1.5 rounded-md transition-colors"><CheckCircle2 size={14}/></button>
                                     <button onClick={() => setEditingWHStock(null)} className="text-slate-500 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-md transition-colors"><X size={14}/></button>
                                   </div>
                                 ) : (
                                   <div className="flex items-center justify-center gap-2 group/edit">
                                     <span>{localStock}</span>
                                     <button onClick={() => startEditingWHStock(p.id, localStock)} className="opacity-100 md:opacity-0 group-hover/edit:opacity-100 text-blue-500 p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-all"><Edit size={12}/></button>
                                   </div>
                                 )}
                               </td>
                               <td className="px-6 py-4 text-center">
                                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${localStock === 0 ? 'bg-slate-100 text-slate-500' : localStock < 10 ? 'bg-red-100 text-red-600' : localStock < 50 ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                   {localStock === 0 ? 'Stok Yok' : localStock < 10 ? 'Kritik' : localStock < 50 ? 'Azalıyor' : 'Yeterli'}
                                 </span>
                               </td>
                             </tr>
                           )
                         })}
                       </tbody>
                     </table>
                   </div>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white border-t border-slate-50 shrink-0">
                 <button onClick={() => setSelectedWarehouse(null)} className="w-full bg-slate-100 text-slate-600 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-colors">Kapat</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ÇIKIŞ ONAY MODALI */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8 text-center border border-slate-100">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 border border-red-100">
              <LogOut className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-2">Çıkış Yap</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8 font-medium"> 
              Sistemden güvenli bir şekilde çıkış yapmak istediğinize emin misiniz? 
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <button onClick={onLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-600/20"> 
                Evet, Çıkış Yap 
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all"> 
                İptal 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KAYDEDİLMEMİŞ DEĞİŞİKLİKLER MODALI */}
      {pendingTabNavigation && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8 text-center border border-slate-100">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 border border-amber-100"><AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8" /></div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-2">Kaydedilmemiş Değişiklikler</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6 sm:mb-8 font-medium"> Ayarlar sayfasında yaptığınız değişiklikleri henüz kaydetmediniz. </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <button onClick={() => confirmUnsavedChanges('save')} className="w-full bg-[#a80038] hover:bg-red-800 text-white py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-900/20"> Kaydet ve Geç </button>
              <button onClick={() => confirmUnsavedChanges('discard')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all"> Sil ve Geç </button>
              <button onClick={() => setPendingTabNavigation(null)} className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all"> İptal, Sayfada Kal </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;