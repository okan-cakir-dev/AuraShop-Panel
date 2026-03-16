import React, { useState } from 'react';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login'; // YENİ: Login sayfamızı çağırdık
import { Toaster, toast } from 'sonner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuth') === 'true';
  });

  const handleLogout = () => {
    sessionStorage.removeItem('isAuth'); 
    setIsAuthenticated(false);
    toast.info('Sistemden güvenli bir şekilde çıkış yapıldı.');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-gray-900 animate-in fade-in duration-500">
      {/* TRAFİK POLİSİ: Giriş yapıldıysa Dashboard'u, yapılmadıysa Login'i göster */}
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
      
      {/* Tüm sistemdeki bildirimleri (toast) buradan yönetiyoruz */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        toastOptions={{ style: { background: '#fff', border: '1px solid #e2e8f0', color: '#1f2937' } }} 
      />
    </div>
  );
}

export default App;