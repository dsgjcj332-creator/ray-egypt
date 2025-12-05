
import React, { useState } from 'react';
import { Tag, Search, Utensils, Stethoscope, ShoppingBag, Home, Gift, Percent } from 'lucide-react';
import ProductCard from '../../cards/ProductCard';

const offers = [
  { id: 1, title: 'خصم 50% على البرجر', merchant: 'مطعم النور', type: 'food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', price: 80, oldPrice: 160, discount: '50%', date: 'ينتهي غداً', rating: 4.8 },
  { id: 2, title: 'جلسة تنظيف بشرة', merchant: 'عيادات الشفاء', type: 'clinic', image: 'https://images.unsplash.com/photo-1579684385183-1b60fe9e8e7d?w=500', price: 300, oldPrice: 500, discount: '40%', date: 'متاح لنهاية الأسبوع', rating: 4.9 },
  { id: 3, title: 'غسيل كيماوي للسيارة', merchant: 'سبيد واش', type: 'service', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500', price: 250, oldPrice: 400, discount: '35%', date: 'عرض محدود', rating: 4.5 },
  { id: 4, title: 'بدلة رجالي كلاسيك', merchant: 'ZARA', type: 'retail', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500', price: 2500, oldPrice: 3500, discount: '1000 ج', date: 'تصفية شتاء', rating: 4.7 },
  { id: 5, title: 'شقة 180م - مقدم 10%', merchant: 'إعمار مصر', type: 'realestate', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500', price: 350000, oldPrice: 400000, discount: 'تسهيلات', date: 'وحدات محدودة', rating: 5.0 },
  { id: 6, title: 'اشتراك جيم سنوي', merchant: 'Gold\'s Gym', type: 'gym', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500', price: 4000, oldPrice: 6000, discount: '30%', date: 'عرض السنة الجديدة', rating: 4.6 },
];

interface Props {
  onNavigate: (view: string, params?: any) => void;
  onProductClick?: (id: string) => void;
}

const OffersView: React.FC<Props> = ({ onNavigate, onProductClick }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'الكل', icon: Tag },
    { id: 'food', label: 'مطاعم', icon: Utensils },
    { id: 'clinic', label: 'صحة وجمال', icon: Stethoscope },
    { id: 'retail', label: 'تسوق', icon: ShoppingBag },
    { id: 'realestate', label: 'عقارات', icon: Home },
  ];

  const filteredOffers = offers.filter(o => 
    (filter === 'all' || o.type === filter) &&
    o.title.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 text-white text-center mb-12 relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         
         <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg animate-bounce">
                <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">عروض وتخفيضات حصرية</h1>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto font-medium">
                استمتع بأقوى الخصومات من مئات المتاجر والمطاعم والخدمات في مكان واحد. وفر أكثر مع راي!
            </p>
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center sticky top-20 z-20 bg-gray-50/90 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0">
         <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
               <button
                 key={cat.id}
                 onClick={() => setFilter(cat.id)}
                 className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition whitespace-nowrap shadow-sm
                   ${filter === cat.id 
                     ? 'bg-gray-900 text-white transform scale-105' 
                     : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'}
                 `}
               >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
               </button>
            ))}
         </div>
         
         <div className="relative w-full md:w-72">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث عن عرض..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filteredOffers.map((offer) => (
            <div key={offer.id} className="h-full">
                <ProductCard 
                    onClick={onProductClick}
                    product={{
                        id: offer.id,
                        name: offer.title,
                        price: offer.price,
                        oldPrice: offer.oldPrice,
                        image: offer.image,
                        rating: offer.rating,
                        merchant: offer.merchant,
                        discount: offer.discount,
                        category: offer.type
                    }}
                />
            </div>
         ))}
      </div>
    </div>
  );
};

export default OffersView;
 
