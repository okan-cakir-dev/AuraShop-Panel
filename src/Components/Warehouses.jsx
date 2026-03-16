import React from 'react';
import { MapPin, Warehouse, AlertCircle, AlertTriangle, Package, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Warehouses({ filteredWarehouses, getWarehouseStats, setSelectedWarehouse, searchQuery }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Küresel Depo Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Holding'in dünya çapındaki lojistik hub'larının doluluk ve operasyon durumları.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredWarehouses.length > 0 ? filteredWarehouses.map((wh) => {
          const stats = getWarehouseStats(wh);
          return (
            <div 
              key={wh.id} 
              onClick={() => setSelectedWarehouse(wh)}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-xl hover:border-slate-200 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-[#a80038] transition-colors">{wh.name}</h3>
                  <p className="text-xs text-slate-400 font-bold flex items-center gap-1 mt-1"><MapPin size={12}/> {wh.country}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-[#a80038] group-hover:bg-red-50 transition-colors">
                  <Warehouse size={20} />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-slate-600">Doluluk Oranı</span>
                  <span className={stats.capacityPct >= 90 ? 'text-red-500' : stats.capacityPct >= 75 ? 'text-amber-500' : 'text-emerald-500'}>%{stats.capacityPct}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${stats.capacityPct >= 90 ? 'bg-red-500' : stats.capacityPct >= 75 ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                    style={{ width: `${stats.capacityPct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] font-bold">
                   <span className="text-slate-500">Mevcut: {stats.totalItems} Adet</span>
                   <span className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded">Sınır: {wh.maxCapacity || 1000} Adet</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Durum Bildirimi</p>
                <div className="flex items-center gap-2">
                  {stats.status === 'Kritik' ? <AlertCircle size={14} className="text-red-500"/> : stats.status === 'Yoğun' ? <AlertTriangle size={14} className="text-amber-500"/> : stats.status === 'Boş' ? <Package size={14} className="text-slate-400"/> : <CheckCircle2 size={14} className="text-emerald-500"/>}
                  <span className={`text-xs font-bold ${stats.status === 'Kritik' ? 'text-red-600' : stats.status === 'Yoğun' ? 'text-amber-600' : stats.status === 'Boş' ? 'text-slate-500' : 'text-emerald-600'}`}>{stats.alert}</span>
                </div>
              </div>
              
              <div className="absolute right-6 bottom-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">İncele <ChevronDown size={10} className="-rotate-90"/></span>
              </div>
            </div>
          )
        }) : (
          <div className="col-span-1 md:col-span-2 xl:col-span-4 text-center py-12 bg-white rounded-2xl border border-slate-100">
             <p className="text-slate-500 font-medium">{searchQuery ? `"${searchQuery}" lokasyonunda depo bulunamadı.` : 'Kayıtlı depo bulunmuyor.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}