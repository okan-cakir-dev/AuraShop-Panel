import React from 'react';
import { Eye, Truck, CheckCircle2 } from 'lucide-react';

export default function Orders({ filteredOrders, handleViewOrderDetails, handleShipOrder, getOrderStatusBadge, searchQuery }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4"> 
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Operasyonları</h1> 
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto"> 
        <table className="w-full text-left border-collapse min-w-[700px]"> 
          <thead> 
            <tr className="bg-slate-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-bold"> <th className="px-6 py-5">Sipariş No</th> <th className="px-6 py-5">Müşteri</th> <th className="px-6 py-5">Durum</th> <th className="px-6 py-5 text-right">Tutar</th> <th className="px-6 py-5 text-center">İşlem</th> </tr> 
          </thead> 
          <tbody className="divide-y divide-gray-100 text-sm"> 
            {filteredOrders.length > 0 ? filteredOrders.map((order, idx) => ( 
              <tr key={idx} className="hover:bg-slate-50 transition-colors"> 
                <td className="px-6 py-4 font-black text-[#a80038]">{order.id}</td> 
                <td className="px-6 py-4"><p className="font-bold text-slate-800">{order.customer}</p><p className="text-xs text-slate-400 mt-0.5">{order.date}</p></td> 
                <td className="px-6 py-4">{getOrderStatusBadge(order.status)}</td> 
                <td className="px-6 py-4 text-right font-black text-slate-800 text-base">₺{order.total}</td> 
                <td className="px-6 py-4 text-center"> 
                  <div className="flex items-center justify-center gap-2"> 
                    <button onClick={() => handleViewOrderDetails(order)} title="Detayları Gör" className="p-2 text-slate-400 hover:text-[#a80038] hover:bg-red-50 rounded-lg transition-colors"> <Eye size={18} /> </button> 
                    {order.status === 'Hazırlanıyor' && ( <button onClick={() => handleShipOrder(order.id, order.status)} title="Kargoya Ver" className="p-2 rounded-lg transition-colors text-slate-400 hover:text-blue-600 hover:bg-blue-50"> <Truck size={18} /> </button> )} 
                    {order.status === 'Kargoda' && ( <button onClick={() => handleShipOrder(order.id, order.status)} title="Tamamlandı Yap" className="p-2 rounded-lg transition-colors text-blue-500 hover:text-emerald-600 hover:bg-emerald-50"> <CheckCircle2 size={18} /> </button> )} 
                  </div> 
                </td> 
              </tr> 
            )) : ( <tr> <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-medium"> {searchQuery ? `"${searchQuery}" aramasıyla eşleşen sipariş bulunamadı.` : 'Henüz sipariş bulunmuyor.'} </td> </tr> )} 
          </tbody> 
        </table> 
      </div> 
    </div> 
  );
}