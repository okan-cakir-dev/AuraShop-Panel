import React, { useState } from 'react';
import { Lock, User, LogIn, Eye, EyeOff, AlertTriangle } from 'lucide-react'; 
import { toast } from 'sonner';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleKeyUp = (e) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const savedSettings = JSON.parse(localStorage.getItem('nova_settings')) || {};
    let currentSystemPassword = savedSettings.password || '220325';
    if (currentSystemPassword === '123456') currentSystemPassword = '220325';

    if (username === 'admin' && password === currentSystemPassword) {
      toast.success('Giriş başarılı! Panele yönlendiriliyorsunuz...');
      setTimeout(() => {
        sessionStorage.setItem('isAuth', 'true');
        onLoginSuccess(); // App.jsx'e "Giriş başarılı, kapıları aç" mesajı gönderir
      }, 1000);
    } else {
      toast.error('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans antialiased text-gray-900">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-[#a80038] mb-2">AURASTORE</h1>
          <p className="text-gray-500 text-sm">Yönetim Paneline Giriş Yapın</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Kullanıcı Adı</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a80038] focus:border-[#a80038] transition-colors text-sm" 
                placeholder="Kullanıcı adınızı girin" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Şifre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              
              <input 
                type={showPassword ? "text" : "password"} 
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a80038] focus:border-[#a80038] transition-colors text-sm" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onKeyUp={handleKeyUp}     
                onKeyDown={handleKeyUp}   
              />
              
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#a80038] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className={`absolute -bottom-6 left-1 flex items-center gap-1.5 text-[11px] font-bold text-amber-500 transition-all duration-300 ${capsLockOn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <AlertTriangle size={12} /> Caps Lock açık!
            </div>
          </div>

          <button type="submit" className="w-full bg-[#a80038] hover:bg-[#80002a] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-8 shadow-lg shadow-red-900/20 active:scale-[0.98]">
            <LogIn className="w-5 h-5" /> Sisteme Giriş Yap
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p className="mb-1 font-medium text-gray-500">Giriş Bilgileri:</p>
          <p>Kullanıcı Adı: <b className="text-gray-700">admin</b> &nbsp;|&nbsp; Şifre: <b className="text-gray-700">220325</b></p>
        </div>
      </div>
    </div>
  );
}