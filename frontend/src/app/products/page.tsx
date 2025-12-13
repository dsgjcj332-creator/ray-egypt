'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, Search } from 'lucide-react';

const mockProducts = [
  {
    id: 1,
    name: 'لابتوب HP',
    price: 5000,
    category: 'إلكترونيات',
    rating: 4.5,
    image: '📱',
    inStock: true
  },
  {
    id: 2,
    name: 'تيشيرت قطن',
    price: 150,
    category: 'ملابس',
    rating: 4.2,
    image: '👕',
    inStock: true
  },
  {
    id: 3,
    name: 'حذاء رياضي',
    price: 800,
    category: 'أحذية',
    rating: 4.8,
    image: '👟',
    inStock: true
  },
  {
    id: 4,
    name: 'ساعة ذكية',
    price: 2000,
    category: 'إلكترونيات',
    rating: 4.6,
    image: '⌚',
    inStock: false
  },
  {
    id: 5,
    name: 'حقيبة جلد',
    price: 1200,
    category: 'إكسسوارات',
    rating: 4.4,
    image: '👜',
    inStock: true
  },
  {
    id: 6,
    name: 'نظارة شمسية',
    price: 600,
    category: 'إكسسوارات',
    rating: 4.3,
    image: '😎',
    inStock: true
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState<number[]>([]);

  const categories = ['إلكترونيات', 'ملابس', 'أحذية', 'إكسسوارات'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.includes(searchTerm) || product.category.includes(searchTerm);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    alert('تم إضافة المنتج للسلة!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">المنتجات</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="relative">
              <ShoppingCart className="absolute right-3 top-3 text-gray-400" size={20} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.length}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
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
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-100 h-48 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.category}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">{product.price} ج.م</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'متاح' : 'غير متاح'}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-lg font-bold transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'إضافة للسلة' : 'غير متاح'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">لم يتم العثور على منتجات</p>
          </div>
        )}
      </div>
    </div>
  );
}
