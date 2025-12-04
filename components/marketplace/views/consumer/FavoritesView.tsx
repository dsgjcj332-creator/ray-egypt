
import React from 'react';
import { Heart, Trash2, Utensils, Car, Home, Package, MapPin, ShoppingBag } from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

const FavoritesView: React.FC = () => {
  const { favorites, toggleFavorite } = useMarketplace();

  if (favorites.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-400">
            <Heart className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-ray-black mb-2">المفضلة فارغة</h2>
            <p className="text-gray-500 mb-8 font-medium">اضغط على القلب لإضافة منتجاتك المفضلة هنا.</p>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-3xl font-black text-ray-black mb-8 flex items-center gap-2">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        المفضلة <span className="text-sm font-medium text-gray-500">({favorites.length})</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="h-48 relative shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <button 
                onClick={() => toggleFavorite(item)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1 font-bold">
                {item.type === 'food' ? <Utensils className="w-3 h-3" /> : item.type === 'car' ? <Car className="w-3 h-3" /> : item.type === 'realestate' ? <Home className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                {item.type || 'منتج'}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-ray-black mb-1 text-lg line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3 font-medium">
                <MapPin className="w-3 h-3" /> {item.location}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="font-black text-ray-blue">{item.price} ج.م</span>
                  <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-ray-blue hover:text-white transition">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesView;
