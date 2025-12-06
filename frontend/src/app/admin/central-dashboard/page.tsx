'use client';

import React, { useState } from 'react';
import { Command, BarChart3, Users, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminCentralDashboard() {
  const stats = {
    totalUsers: 1234,
    activeUsers: 567,
    totalRevenue: 2456789,
    totalOrders: 5678,
    conversionRate: 3.45,
    avgOrderValue: 432
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Command className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">اللوحة المركزية الموحدة</h1>
                <p className="text-sm text-gray-600">نظرة عامة شاملة على النظام</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المستخدمون النشطون</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-purple-600">{(stats.totalRevenue/1000000).toFixed(2)}M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">إجمالي الطلبات</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">↑ 12.5% من الشهر الماضي</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">معدل التحويل</p>
            <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
            <p className="text-xs text-gray-500 mt-2">↑ 0.8% من الشهر الماضي</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600">متوسط قيمة الطلب</p>
            <p className="text-3xl font-bold text-gray-900">{stats.avgOrderValue} ج.م</p>
            <p className="text-xs text-gray-500 mt-2">↑ 5.2% من الشهر الماضي</p>
          </div>
        </div>
      </div>
    </div>
  );
}
