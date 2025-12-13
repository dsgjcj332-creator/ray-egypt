'use client';

import React, { useState } from 'react';
import { MapPin, Star, Search, Phone, Globe } from 'lucide-react';

const mockMerchants = [
  {
    id: 1,
    name: 'سوبر ماركت الخير',
    category: 'سوبر ماركت',
    location: 'القاهرة، المعادي',
    rating: 4.8,
    reviews: 245,
    phone: '+201234567890',
    website: 'www.alkheir.com',
    image: '🏪'
  },
  {
    id: 2,
    name: 'مطعم المزة',
    category: 'مطاعم',
    location: 'القاهرة، الزمالك',
    rating: 4.6,
    reviews: 189,
    phone: '+201234567891',
    website: 'www.almazza.com',
    image: '🍽️'
  },
  {
    id: 3,
    name: 'صالون التجميل الأنيق',
    category: 'صالونات',
    location: 'القاهرة، مصر الجديدة',
    rating: 4.7,
    reviews: 156,
    phone: '+201234567892',
    website: 'www.elegant-salon.com',
    image: '💇'
  },
  {
    id: 4,
    name: 'عيادة الدكتور أحمد',
    category: 'عيادات',
    location: 'الجيزة، الهرم',
    rating: 4.9,
    reviews: 312,
    phone: '+201234567893',
    website: 'www.dr-ahmed.com',
    image: '⚕️'
  },
  {
    id: 5,
    name: 'نادي اللياقة البدنية',
    category: 'أندية رياضية',
    location: 'القاهرة، نصر سيتي',
    rating: 4.5,
    reviews: 128,
    phone: '+201234567894',
    website: 'www.fitness-club.com',
    image: '💪'
  },
  {
    id: 6,
    name: 'محل الملابس العصرية',
    category: 'ملابس',
    location: 'القاهرة، التجمع',
    rating: 4.4,
    reviews: 98,
    phone: '+201234567895',
    website: 'www.modern-clothes.com',
    image: '👗'
  }
];

export default function MerchantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ['سوبر ماركت', 'مطاعم', 'صالونات', 'عيادات', 'أندية رياضية', 'ملابس'];

  const filteredMerchants = mockMerchants.filter(merchant => {
    const matchesSearch = merchant.name.includes(searchTerm) || merchant.location.includes(searchTerm);
    const matchesCategory = !selectedCategory || merchant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (merchantId: number) => {
    if (favorites.includes(merchantId)) {
      setFavorites(favorites.filter(id => id !== merchantId));
    } else {
      setFavorites([...favorites, merchantId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">المتاجر والخدمات</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن متجر أو خدمة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              الكل
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMerchants.map(merchant => (
            <div key={merchant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-purple-100 to-purple-50 h-32 flex items-center justify-center text-6xl">
                {merchant.image}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{merchant.name}</h3>
                  <button
                    onClick={() => toggleFavorite(merchant.id)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {favorites.includes(merchant.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4">{merchant.category}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(merchant.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({merchant.reviews} تقييم)</span>
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{merchant.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span dir="ltr">{merchant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{merchant.website}</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                  زيارة المتجر
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">لم يتم العثور على متاجر</p>
          </div>
        )}
      </div>
    </div>
  );
}
