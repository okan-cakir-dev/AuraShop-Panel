import React from 'react';
import { User, Lock, Bell, Save } from 'lucide-react';

export default function Settings({ hasUnsavedChanges, localSettings, handleLocalSettingChange, handlePhoneChange, passwordForm, handlePasswordChange, handleSaveSettings }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 relative"> 
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"> 
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Sistem Ayarları 
            {hasUnsavedChanges && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded border border-amber-200 animate-pulse">Kaydedilmedi</span>}
          </h1> 
          <p className="text-sm text-gray-500 mt-1">Hesap bilgilerinizi ve bildirim tercihlerinizi yönetin.</p> 
        </div>
      </div> 
      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"> 
        <div className="lg:col-span-2 space-y-6"> 
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6"> 
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><User className="w-5 h-5 text-[#a80038]" /> Profil Bilgileri</h2> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"> 
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label><input type="text" value={localSettings.name} onChange={(e) => handleLocalSettingChange('name', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#a80038] transition-colors" /></div> 
              <div><label className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label><input type="email" value={localSettings.email} onChange={(e) => handleLocalSettingChange('email', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#a80038] transition-colors" /></div> 
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Şirket / Rol</label><input type="text" defaultValue="Kurucu & Admin" disabled className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed" /></div> 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                <input 
                  type="tel" 
                  value={localSettings.phone} 
                  onChange={handlePhoneChange} 
                  placeholder="+90 555 123 4567"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#a80038] transition-colors" 
                />
              </div> 
            </div> 
          </div> 
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6"> 
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Lock className="w-5 h-5 text-[#a80038]" /> Güvenlik & Şifre</h2> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"> 
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label><input type="password" placeholder="••••••••" value={passwordForm.current} onChange={(e) => handlePasswordChange('current', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#a80038]" /></div> 
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label><input type="password" placeholder="Yeni şifrenizi girin" value={passwordForm.new} onChange={(e) => handlePasswordChange('new', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#a80038]" /></div> 
            </div> 
          </div> 
        </div> 
        <div className="space-y-6"> 
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6"> 
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Bell className="w-5 h-5 text-[#a80038]" /> Bildirimler</h2> 
            <div className="space-y-4"> 
              <label className="flex items-center justify-between cursor-pointer group"><span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Yeni Sipariş E-postaları</span><input type="checkbox" checked={localSettings.notifyEmails} onChange={(e) => handleLocalSettingChange('notifyEmails', e.target.checked)} className="w-4 h-4 text-[#a80038] rounded border-gray-300 focus:ring-[#a80038] cursor-pointer" /></label> 
              <label className="flex items-center justify-between cursor-pointer group"><span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Sistem Güncelleme SMS'leri</span><input type="checkbox" checked={localSettings.notifySms} onChange={(e) => handleLocalSettingChange('notifySms', e.target.checked)} className="w-4 h-4 text-[#a80038] rounded border-gray-300 focus:ring-[#a80038] cursor-pointer" /></label> 
              <label className="flex items-center justify-between cursor-pointer group"><span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Kritik Stok Uyarıları</span><input type="checkbox" checked={localSettings.notifyStock} onChange={(e) => handleLocalSettingChange('notifyStock', e.target.checked)} className="w-4 h-4 text-[#a80038] rounded border-gray-300 focus:ring-[#a80038] cursor-pointer" /></label> 
            </div> 
          </div> 
          <div className={`rounded-2xl border shadow-sm p-4 md:p-6 text-center transition-all duration-300 ${hasUnsavedChanges ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}> <p className={`text-xs mb-4 font-bold ${hasUnsavedChanges ? 'text-amber-700' : 'text-slate-400'}`}>{hasUnsavedChanges ? 'Kaydedilmemiş değişiklikleriniz var!' : 'Sistem ayarlarınız güncel.'}</p> <button type="submit" disabled={!hasUnsavedChanges} className={`w-full text-white px-4 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${hasUnsavedChanges ? 'bg-[#a80038] hover:bg-[#80002a] shadow-lg shadow-red-900/20 active:scale-[0.98]' : 'bg-slate-300 cursor-not-allowed'}`}><Save className="w-5 h-5" /> Değişiklikleri Kaydet</button> </div> 
        </div> 
      </form> 
    </div> 
  );
}