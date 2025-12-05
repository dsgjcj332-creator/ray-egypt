'use client';

import React, { useState } from 'react';
import { TrendingDown, DollarSign, Download } from 'lucide-react';
import Link from 'next/link';

export default function AdminExpenses() {
  const expensesData = [
    { category: 'الرواتب والأجور', amount: 450000, percentage: 40, trend: 2.5 },
    { category: 'البنية التحتية', amount: 225000, percentage: 20, trend: -1.2 },
    { category: 'التسويق والإعلانات', amount: 180000, percentage: 16, trend: 8.3 },
    { category: 'العمليات والصيانة', amount: 135000, percentage: 12, trend: 3.1 },
    { category: 'البحث والتطوير', amount: 90000, percentage: 8, trend: 5.7 },
    { category: 'أخرى', amount: 45000, percentage: 4, trend: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <TrendingDown className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المصروفات</h1>
                <p className="text-sm text-gray-600">إدارة وتحليل المصروفات</p>
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
            <p className="text-sm text-gray-600">إجمالي المصروفات</p>
            <p className="text-3xl font-bold text-gray-900">1,125,000 ج.م</p>
            <p className="text-sm text-orange-600 mt-2">↑ 2.3% من الشهر الماضي</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط المصروفات اليومية</p>
            <p className="text-3xl font-bold text-gray-900">37,500 ج.م</p>
            <p className="text-sm text-gray-600 mt-2">خلال هذا الشهر</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">فئات المصروفات</h2>
          <div className="space-y-4">
            {expensesData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.category}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900">{item.amount.toLocaleString()} ج.م</p>
                  <p className={`text-sm ${item.trend > 0 ? 'text-orange-600' : 'text-green-600'}`}>
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
