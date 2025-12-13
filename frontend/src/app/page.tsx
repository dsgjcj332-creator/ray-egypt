'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            مرحباً بك في RAY Egypt
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            منصة متعددة الأنظمة للتجار والمستهلكين في مصر
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">🛍️ المنتجات</h2>
              <p className="text-gray-600 mb-6">تصفح آلاف المنتجات من أفضل المتاجر</p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تصفح المنتجات
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-green-600 mb-4">💼 الوظائف</h2>
              <p className="text-gray-600 mb-6">ابحث عن فرص عمل مناسبة لك</p>
              <button
                onClick={() => router.push('/jobs')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                اكتشف الوظائف
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🏪 المتاجر</h2>
              <p className="text-gray-600 mb-6">استكشف أفضل المتاجر والخدمات</p>
              <button
                onClick={() => router.push('/merchants')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                تصفح المتاجر
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الأنظمة المدعومة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['المطاعم', 'الصيدليات', 'العيادات', 'الأندية', 'الصالونات', 'المغاسل', 'العقارات', 'السيارات'].map((system) => (
                <div key={system} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-700 font-medium">{system}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
