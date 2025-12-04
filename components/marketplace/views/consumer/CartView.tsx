
import React, { useMemo } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ChevronLeft, ShieldCheck, Store, CalendarClock, Info, Truck, Package } from 'lucide-react';
import { useMarketplace, CartItem } from '@/context/MarketplaceContext';

interface CartViewProps {
  onNavigate?: (view: string) => void;
}

const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const { cart, updateQty, removeFromCart, clearCart } = useMarketplace();

  // Group items by shop
  const groupedCart = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    cart.forEach(item => {
      const shopName = item.shop || 'متجر عام';
      if (!groups[shopName]) {
        groups[shopName] = [];
      }
      groups[shopName].push(item);
    });
    return groups;
  }, [cart]);

  // Calculate Totals
  const shippingPerShop = 25; // Fixed shipping per shop (can be dynamic later)
  const shopKeys = Object.keys(groupedCart);
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalShipping = shopKeys.length * shippingPerShop;
  const grandTotal = cartTotal + totalShipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-ray-black mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8 font-medium">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <button onClick={() => onNavigate && onNavigate('home')} className="bg-ray-gold text-ray-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg shadow-yellow-200">تصفح العروض</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-3xl font-black text-ray-black flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-ray-blue" />
            سلة المشتريات 
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {cart.length} منتجات
            </span>
         </h2>
         <button onClick={clearCart} className="text-sm text-red-500 hover:underline font-bold flex items-center gap-1">
            <Trash2 className="w-4 h-4" />
            إفراغ السلة بالكامل
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List - Grouped by Shop */}
        <div className="lg:col-span-2 space-y-6">
          {shopKeys.map((shopName) => {
             const shopItems = groupedCart[shopName];
             const shopSubtotal = shopItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

             return (
                <div key={shopName} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Shop Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Store className="w-5 h-5 text-ray-blue" />
                            <h3 className="font-bold text-gray-800">{shopName}</h3>
                        </div>
                        <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            توصيل خلال 45 دقيقة
                        </div>
                    </div>

                    {/* Shop Items */}
                    <div className="p-4 space-y-4">
                        {shopItems.map((item) => (
                            <div key={`${item.id}-${item.isReservation}`} className={`flex gap-4 p-3 rounded-xl transition hover:bg-gray-50 ${item.isReservation ? 'bg-purple-50/50 border border-purple-100' : ''}`}>
                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    {item.isReservation && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-purple-600 text-white text-[8px] text-center font-bold py-0.5">
                                            حجز
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-ray-black text-sm line-clamp-2">{item.name}</h4>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {item.isReservation && (
                                            <div className="text-[10px] text-purple-700 flex items-center gap-1 mt-1">
                                                <CalendarClock className="w-3 h-3" /> عربون حجز (باقي المبلغ عند الاستلام)
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex justify-between items-end mt-2">
                                        {!item.isReservation ? (
                                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-0.5">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-ray-blue transition active:scale-95"><Minus className="w-3 h-3" /></button>
                                                <span className="font-bold text-sm w-6 text-center text-ray-black">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-ray-blue transition active:scale-95"><Plus className="w-3 h-3" /></button>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-500">كمية: 1</span>
                                        )}
                                        <div className="text-left">
                                            <span className="font-black text-ray-blue">{item.price * item.qty} ج.م</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Shop Footer Summary */}
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span>مجموع منتجات المتجر</span>
                        <span className="font-bold text-gray-900">{shopSubtotal} ج.م</span>
                    </div>
                </div>
             );
          })}
        </div>

        {/* Grand Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
            <h3 className="font-bold text-lg mb-6 text-ray-black flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                ملخص الطلب
            </h3>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600 font-medium text-sm">
                <span>المجموع الفرعي</span>
                <span>{cartTotal} ج.م</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium text-sm">
                <span>عدد المتاجر</span>
                <span>{shopKeys.length} متاجر</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium text-sm">
                <span>مصاريف التوصيل الكلية</span>
                <span>{totalShipping} ج.م</span>
              </div>
              <div className="flex justify-between text-green-600 text-xs font-bold bg-green-50 p-2 rounded-lg">
                <span>خصم (RAY10)</span>
                <span>-0 ج.م</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                  <p className="text-xs text-gray-500 mb-1">الإجمالي الكلي</p>
                  <span className="font-black text-3xl text-ray-blue">{grandTotal}</span>
                  <span className="text-sm font-bold text-gray-400 mr-1">ج.م</span>
              </div>
            </div>
            
            {cart.some(i => i.isReservation) && (
                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 mb-4 flex gap-2 items-start">
                    <Info className="w-4 h-4 text-purple-600 mt-0.5" />
                    <p className="text-xs text-purple-800 leading-relaxed">
                        تحتوي سلتك على حجوزات (عربون). سيتم دفع العربون فقط الآن، وباقي المبلغ يتم تسويته مع التاجر.
                    </p>
                </div>
            )}

            <button 
              onClick={() => onNavigate && onNavigate('checkout')}
              className="w-full bg-ray-gold text-ray-black py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group"
            >
              إتمام الشراء ({cart.length})
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 p-2 rounded-lg">
                    <Package className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-500 font-bold">تغليف آمن</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                    <Truck className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-500 font-bold">شحن سريع</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                    <ShieldCheck className="w-4 h-4 mx-auto text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-500 font-bold">دفع آمن</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
