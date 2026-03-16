import React from 'react';
import { Users as UsersIcon, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activeUsersDataThisWeek = [ { gun: 'Pzt', aktif: 245000 }, { gun: 'Sal', aktif: 382000 }, { gun: 'Çar', aktif: 425000 }, { gun: 'Per', aktif: 398000 }, { gun: 'Cum', aktif: 575000 }, { gun: 'Cmt', aktif: 689000 }, { gun: 'Paz', aktif: 852000 } ];
const activeUsersDataLastWeek = [ { gun: 'Pzt', aktif: 220000 }, { gun: 'Sal', aktif: 340000 }, { gun: 'Çar', aktif: 355000 }, { gun: 'Per', aktif: 130000 }, { gun: 'Cum', aktif: 495000 }, { gun: 'Cmt', aktif: 580000 }, { gun: 'Paz', aktif: 610000 } ];
const activeUsersDataLastMonth = [ { gun: '1. Hafta', aktif: 1850000 }, { gun: '2. Hafta', aktif: 2020000 }, { gun: '3. Hafta', aktif: 2150000 }, { gun: '4. Hafta', aktif: 2452000 } ];

export default function Users({ trafficPeriod, setTrafficPeriod }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4"> 
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Analitiği</h1>
              <p className="text-sm text-gray-500 mt-1">Platformun global trafik ve aktif kullanıcı verileri.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><UsersIcon className="w-4 h-4 text-gray-400"/> Toplam Kayıtlı Kullanıcı</p>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">2.4M+</h3>
              <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">↑ %12.4 geçen aya göre</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
              <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><Activity className="w-4 h-4 text-gray-400"/> Şu An Aktif (Canlı)</p>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">42,580</h3>
              <p className="text-gray-400 text-[11px] font-medium">Son 5 dakika verisi</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group sm:col-span-2 md:col-span-1">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-gray-400"/> Haftalık Trafik Hacmi</p>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">1.8M</h3>
              <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">↑ %8.2 geçen haftaya göre</p>
          </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6"> 
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-gray-800">Haftalık Aktif Kullanıcı Trafiği</h2>
            <select 
              value={trafficPeriod}
              onChange={(e) => setTrafficPeriod(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-4 py-2 outline-none focus:border-[#a80038] cursor-pointer w-full sm:w-auto"
            >
                <option value="Bu Hafta">Bu Hafta</option>
                <option value="Geçen Hafta">Geçen Hafta</option>
                <option value="Son 30 Gün">Son 30 Gün</option>
            </select>
        </div>
        <div className="h-[250px] sm:h-[300px] md:h-[350px] w-full"> 
          <ResponsiveContainer width="100%" height="100%"> 
            <AreaChart 
              data={trafficPeriod === 'Bu Hafta' ? activeUsersDataThisWeek : trafficPeriod === 'Geçen Hafta' ? activeUsersDataLastWeek : activeUsersDataLastMonth} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            > 
              <defs> 
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1"> 
                  <stop offset="5%" stopColor="#a80038" stopOpacity={0.2}/> 
                  <stop offset="95%" stopColor="#a80038" stopOpacity={0}/> 
                </linearGradient> 
              </defs> 
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /> 
              <XAxis dataKey="gun" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} /> 
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v} /> 
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }} formatter={(value) => [new Intl.NumberFormat('tr-TR').format(value), 'Aktif Kullanıcı']} labelStyle={{ color: '#64748b', fontWeight: 'bold', marginBottom: '4px' }} /> 
              <Area type="monotone" dataKey="aktif" stroke="#a80038" strokeWidth={4} fill="url(#colorUsers)" activeDot={{ r: 6, fill: '#a80038', stroke: '#fff', strokeWidth: 3 }} /> 
            </AreaChart> 
          </ResponsiveContainer> 
        </div> 
      </div> 
    </div> 
  );
}