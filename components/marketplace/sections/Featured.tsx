
import React from 'react';
import { featuredOffers } from '../data';
import ProductCard from '../cards/ProductCard';

interface FeaturedProps {
  onProductClick?: (id: string) => void;
}

const Featured: React.FC<FeaturedProps> = ({ onProductClick }) => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 border-y border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">🔥 عروض مميزة وحصرية</h2>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">←</button>
             <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition">→</button>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredOffers.map((offer) => (
            <div key={offer.id} className="h-full">
                <ProductCard 
                    onClick={onProductClick}
                    product={{
                        ...offer,
                        // Normalizing data structure for ProductCard
                        name: offer.title,
                        price: parseInt(offer.price.replace(/\D/g, '')),
                        oldPrice: offer.oldPrice ? parseInt(offer.oldPrice.replace(/\D/g, '')) : undefined,
                        merchant: offer.shop,
                        rating: offer.rating,
                        discount: offer.tag
                    }} 
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
