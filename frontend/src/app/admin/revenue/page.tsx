'use client';

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminRevenue() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueData = [
    { source: 'المتجر الإلكتروني', amount: 1234567, percentage: 45, trend: 12.5 },
    { source: 'الخدمات', amount: 890123, percentage: 32, trend: 8.3 },
    { source: 'الاشتراكات', amount: 567890, percentage: 20, trend: 23.7 },
    { source: 'الإعلانات', amount: 123456, percentage: 3, trend: -5.2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الإيرادات</h1>
                <p className="text-sm text-gray-600">تحليل مصادر الإيرادات</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              تصدير تقرير
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
            <p className="text-3xl font-bold text-gray-900">2,816,036 ج.م</p>
            <p className="text-sm text-green-600 mt-2">↑ 12.5% من الشهر الماضي</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط الإيرادات اليومية</p>
            <p className="text-3xl font-bold text-gray-900">93,868 ج.م</p>
            <p className="text-sm text-gray-600 mt-2">خلال هذا الشهر</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">مصادر الإيرادات</h2>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.source}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900">{item.amount.toLocaleString()} ج.م</p>
                  <p className={`text-sm ${item.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
