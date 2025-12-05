import React, { useState, useMemo } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Store } from 'lucide-react';

interface CartViewProps {
  onNavigate?: (view: string) => void;
}

const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const [cart, setCart] = useState([
    { id: 1, name: 'تيشيرت قطن', price: 120, qty: 2, shop: 'محمل أزياء' },
    { id: 2, name: 'جينز أزرق', price: 280, qty: 1, shop: 'محمل أزياء' },
  ]);

  const groupedCart = useMemo(() => {
    const groups: Record<string, any[]> = {};
    cart.forEach(item => {
      const shopName = item.shop || 'متجر عام';
      if (!groups[shopName]) groups[shopName] = [];
      groups[shopName].push(item);
    });
    return groups;
  }, [cart]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <button onClick={() => onNavigate && onNavigate('home')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">سلة المشتريات</h2>
      
      {Object.entries(groupedCart).map(([shopName, items]) => (
        <div key={shopName} className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">{shopName}</h3>
          </div>
          
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <p className="text-gray-500">{item.price} ج.م</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-gray-100">-</button>
                <span>{item.qty}</span>
                <button className="w-8 h-8 rounded-lg bg-gray-100">+</button>
              </div>
              <button className="text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ))}
      
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <span>المجموع:</span>
          <span className="font-bold">{cartTotal} ج.م</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          إتمام الشراء
        </button>
      </div>
    </div>
  );
};

export default CartView;
