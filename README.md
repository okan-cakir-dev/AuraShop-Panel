# 🌟 AURASTORE - Enterprise Management Dashboard

Modern, güvenli ve yüksek performanslı kurumsal yönetim paneli. React ve modern web teknolojileri kullanılarak, milyonluk verileri ve global operasyonları yönetecek "Holding Seviyesinde" bir mimari ile inşa edilmiştir.

---

## 💎 Öne Çıkan Özellikler (Neler Başardık?)

### 🔐 Gelişmiş Güvenlik & Oturum Yönetimi
* **Session-Based Auth:** `sessionStorage` mimarisi ile tarayıcı veya sekme kapatıldığında otomatik çıkış yapan, son derece güvenli oturum sistemi.
* **Smart Validation:** Yanlış şifre girişlerini engelleyen, "Mevcut Şifre" doğrulaması olmadan değişim yaptırmayan akıllı güvenlik motoru.
* **Data Guard:** Ayarlar sayfasında kaydedilmemiş değişiklikler varken sayfadan ayrılmaya çalışan kullanıcıyı durduran "Yazılımsal Koruma Kalkanı" ve Akıllı Caps Lock dedektörü.
* **Safe Logout:** Yanlışlıkla çıkış yapılmasını önleyen "Çıkış Onay Modalı".

### 📊 Global Holding Analitiği
* **Enterprise Dashboard:** Milyonluk ciro verilerini ve milyonlarca kullanıcı trafiğini anlık işleyen kurumsal ana panel.
* **Live Traffic Monitor:** Platformdaki canlı aktif kullanıcıları yanıp sönen animasyonlar ve gerçek zamanlı verilerle takip etme imkanı.
* **Smart Charting:** Binlik (k) ve Milyonluk (M) verileri otomatik formatlayan, interaktif Recharts grafik entegrasyonu.

### 🏢 Yapay Zeka Destekli Depo & Dağıtım
* **Auto-Distribution Motoru:** Yeni ürün eklendiğinde kapasiteleri (Londra, İstanbul, Berlin, New York) analiz edip, stoğu en uygun depolara otomatik paylaştıran akıllı algoritma.
* **Lokal Envanter Yönetimi:** Depoların içindeki spesifik ürünleri düzenleme, kritik kapasite (%90) aşımında otomatik sistem uyarıları fırlatma.

### 🚚 Sipariş & Operasyon Merkezi
* **Multi-Step Order Logic:** Siparişleri "Hazırlanıyor" ➔ "Kargoda" ➔ "Tamamlandı" aşamalarından geçiren pürüzsüz ve dinamik iş akışı.
* **Detailed Package View:** Sipariş içindeki ürünlerin adet ve isim bazlı detaylı listelenmesini sağlayan cam efektli (Glassmorphism) modal paneller.
* **Inventory Integration:** Stok seviyesi 10'un altına düşen ürünleri sol menüde kırmızı alarm ile bildiren "Kritik Stok Takipçisi".

### 🔍 Akıllı Arama & Kalıcı Hafıza
* **Live Filtering:** Harfe basıldığı anda ürünlerde (isim/kategori), siparişlerde (numara/müşteri) veya depolarda saniyelik filtreleme yapan zeki arama motoru.
* **Dynamic Category System:** Ürünlerin kategorilerini otomatik tarayıp filtre (Dropdown) seçeneklerine ekleyen sistem.
* **Persistence (Auto-Migration):** Tüm ürün, sipariş ve sistem ayarlarının `localStorage` üzerinde 100% kalıcılıkla saklanması. Sistem güncellendiğinde veri kaybı yaşatmayan "Veri Göçü" algoritması.

---

## 🛠️ Teknoloji Yığını (Modern Tech Stack)

* **Framework:** React 18+ (Hooks & Component Tabanlı Mimari)
* **Styling:** Tailwind CSS v4 (Özelleştirilmiş UI Bileşenleri, Glassmorphism & Animasyonlar)
* **Build Tool:** Vite (Ultra hızlı derleme ve geliştirme ortamı)
* **Data Visualization:** Recharts (Akıcı ve interaktif grafikler)
* **Icons:** Lucide-React (Modern, vektörel ikon seti)
* **Notifications:** Sonner (Gelişmiş Toast & Bildirim Servisi)

---

## 🏗️ Proje Mimarisi (Component Architecture)

Proje, temiz kod (Clean Code) prensiplerine uygun olarak modüler bir yapıda tasarlanmıştır:
```text
src/
├── App.jsx                 # Trafik Polisi (Auth & Yönlendirme)
├── Pages/
│   ├── Login.jsx           # Güvenli Giriş Ekranı
│   └── Dashboard.jsx       # Ana İskelet, Menü ve Modal Yöneticisi
└── Components/
    ├── DashboardStats.jsx  # Finans & Grafik Kartları
    ├── Products.jsx        # Ürün Listesi & Formlar
    ├── Orders.jsx          # Sipariş İş Akışı Tablosu
    ├── Users.jsx           # Kullanıcı Analitiği
    ├── Warehouses.jsx      # Global Depo Kartları
    └── Settings.jsx        # Güvenlik & Profil Ayarları