import React from 'react';
import { Wallet, ShoppingCart, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData2026 = [ { name: 'Oca', satis: 3250000 }, { name: 'Şub', satis: 4850000 }, { name: 'Mar', satis: 6450000 } ];
const chartData2025 = [ { name: 'Oca', satis: 1850000 }, { name: 'Şub', satis: 2100000 }, { name: 'Mar', satis: 1950000 }, { name: 'Nis', satis: 2450000 }, { name: 'May', satis: 2800000 }, { name: 'Haz', satis: 3600000 }, { name: 'Tem', satis: 4100000 }, { name: 'Ağu', satis: 5600000 }, { name: 'Eyl', satis: 4350000 }, { name: 'Eki', satis: 6100000 }, { name: 'Kas', satis: 7800000 }, { name: 'Ara', satis: 9250000 } ];

export default function DashboardStats({ totalOrderVolume, pendingOrdersCount, shippedOrdersCount, salesYear, setSalesYear }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4"> 
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <div>
              <h1 className="text-2xl font-bold text-gray-900">Finans ve Operasyon</h1>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">Platformun global finansal hareketleri ve sipariş özetleri.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6"> 
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group"> 
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Wallet className="w-4 h-4 text-gray-400"/> Toplam Ciro</p>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">₺{totalOrderVolume}</h3> 
          <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">↑ %18.2 geçen aya göre</p>
        </div> 
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group"> 
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><ShoppingCart className="w-4 h-4 text-gray-400"/> Aktif Sipariş Operasyonu</p>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">{pendingOrdersCount + shippedOrdersCount} <span className="text-sm text-gray-400 font-medium">İşlem</span></h3> 
          <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">↑ %5.4 bu haftaki yoğunluk</p>
        </div> 
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group sm:col-span-2 md:col-span-1"> 
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Globe className="w-4 h-4 text-gray-400"/> Global Sistem Ziyareti</p>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">4.2M</h3> 
          <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">↑ %22.4 global artış</p>
        </div> 
      </div> 

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm"> 
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-gray-800">Aylık Global Satış ve Ciro Analizi</h2>
            <select 
              value={salesYear} 
              onChange={(e) => setSalesYear(e.target.value)} 
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-4 py-2 outline-none focus:border-[#a80038] cursor-pointer w-full sm:w-auto"
            >
                <option value="2026">2026 Yılı</option>
                <option value="2025">2025 Yılı</option>
            </select>
        </div>
        <div className="h-[250px] sm:h-[300px] md:h-[350px] w-full"> 
          <ResponsiveContainer width="100%" height="100%"> 
            <AreaChart data={salesYear === '2026' ? chartData2026 : chartData2025} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}> 
              <defs>
                <linearGradient id="colorSatis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a80038" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a80038" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /> 
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} /> 
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${value / 1000}k` : value} 
              /> 
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }} 
                formatter={(value) => [`₺${new Intl.NumberFormat('tr-TR').format(value)}`, 'Toplam Ciro']}
                labelStyle={{ color: '#64748b', fontWeight: 'bold', marginBottom: '4px' }}
              /> 
              <Area type="monotone" dataKey="satis" stroke="#a80038" strokeWidth={4} fill="url(#colorSatis)" activeDot={{ r: 6, fill: '#a80038', stroke: '#fff', strokeWidth: 3 }} /> 
            </AreaChart> 
          </ResponsiveContainer> 
        </div> 
      </div> 
    </div> 
  );
}