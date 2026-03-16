import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Products({ selectedCategory, setSelectedCategory, uniqueCategories, showAddForm, setShowAddForm, editingProduct, setEditingProduct, newProduct, setNewProduct, handleAddProduct, handleUpdateProduct, filteredProducts, handleEditClick, handleDeleteProduct, searchQuery }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4"> 
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"> 
        <div> <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1> </div> 
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 sm:flex-none bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2.5 outline-none focus:border-[#a80038] cursor-pointer shadow-sm transition-all"
          >
            {uniqueCategories.map(c => (
              <option key={c} value={c}>{c === 'Tümü' ? 'Tüm Kategoriler' : c}</option>
            ))}
          </select>
          <button onClick={() => {setShowAddForm(!showAddForm); setEditingProduct(null);}} className="bg-[#a80038] hover:bg-[#80002a] text-white px-4 md:px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/20 font-medium transition-all flex items-center justify-center gap-2 text-sm flex-1 sm:flex-none"> <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Yeni Kayıt</span> </button> 
        </div>
      </div> 

      {showAddForm && !editingProduct && ( <form onSubmit={handleAddProduct} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative"> <input type="text" placeholder="Ürün Adı" className="md:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} /> <input type="text" placeholder="Kategori" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} /> <input type="number" placeholder="Stok" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} /> <input type="number" placeholder="Fiyat" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} /> <div className="sm:col-span-2 md:col-span-5 flex justify-end"> <button type="submit" className="w-full sm:w-auto bg-[#a80038] text-white px-8 py-2.5 rounded-xl text-sm font-bold">Kaydet</button> </div> </form> )} 
      {editingProduct && ( <form onSubmit={handleUpdateProduct} className="bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative"> <input type="text" className="md:col-span-2 border border-blue-200 rounded-xl px-4 py-2.5 text-sm" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} /> <input type="text" className="border border-blue-200 rounded-xl px-4 py-2.5 text-sm" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} /> <input type="number" className="border border-blue-200 rounded-xl px-4 py-2.5 text-sm" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} /> <input type="number" className="border border-blue-200 rounded-xl px-4 py-2.5 text-sm" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} /> <div className="sm:col-span-2 md:col-span-5 flex flex-col sm:flex-row justify-end gap-3"> <button type="button" onClick={() => setEditingProduct(null)} className="w-full sm:w-auto bg-white border text-gray-700 px-6 py-2.5 rounded-xl text-sm font-bold">İptal</button> <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold">Güncelle</button> </div> </form> )} 
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto"> 
        <table className="w-full text-left border-collapse min-w-[600px]"> 
          <thead> 
            <tr className="bg-slate-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold"> <th className="px-6 py-5">Ürün Adı</th> <th className="px-6 py-5">Kategori</th> <th className="px-6 py-5 text-center">Stok</th> <th className="px-6 py-5 text-right">Fiyat</th> <th className="px-6 py-5 text-center">İşlemler</th> </tr> 
          </thead> 
          <tbody className="divide-y divide-gray-100 text-sm"> 
            {filteredProducts.length > 0 ? filteredProducts.map((product) => ( 
              <tr key={product.id} className="hover:bg-slate-50 transition-colors"> 
                <td className="px-6 py-4 font-bold text-slate-800">{product.name}</td> 
                <td className="px-6 py-4 text-slate-500"><span className="bg-white border border-slate-200 px-2 py-1 rounded-lg text-[10px] whitespace-nowrap">{product.category}</span></td> 
                <td className="px-6 py-4 text-center"><span className={`font-bold ${product.stock === 0 ? 'text-red-500' : 'text-slate-700'}`}>{product.stock} Adet</span></td> 
                <td className="px-6 py-4 text-right font-black">₺{product.price}</td> 
                <td className="px-6 py-4 text-center"> 
                  <div className="flex justify-center gap-2"> 
                    <button onClick={() => handleEditClick(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button> 
                    <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button> 
                  </div> 
                </td> 
              </tr> 
            )) : ( <tr> <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-medium"> {searchQuery ? `Aramanızla eşleşen ürün bulunamadı.` : 'Seçili kategoride ürün bulunmuyor.'} </td> </tr> )} 
          </tbody> 
        </table> 
      </div> 
    </div> 
  );
}