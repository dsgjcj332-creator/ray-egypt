'use client';

import React, { useState } from 'react';
import {
  Store, Utensils, Home, Car, Stethoscope, Dumbbell,
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase,
  Baby, Gavel, Users, Sun, ArrowLeft, Search, Filter,
  LayoutGrid, ChevronRight, CheckCircle, AlertCircle,
  Calendar, Package, Shirt as ShirtIcon
} from 'lucide-react';
import Link from 'next/link';

interface System {
  id: string;
  title: string;
  icon: any;
  desc: string;
  color: string;
  href: string;
  category: string;
  status: 'ready' | 'pending';
}

export default function SystemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const systems: System[] = [
    // قطاع التجارة والمطاعم - معمولة بالفعل
    { id: 'restaurant', title: 'نظام إدارة المطاعم', icon: Utensils, desc: 'حجوزات، كاشير، ومطبخ', color: 'bg-orange-100 text-orange-600', href: '/dashboard/restaurant', category: 'commerce', status: 'ready' },
    { id: 'retail', title: 'نظام إدارة التجزئة', icon: Store, desc: 'مبيعات ومخزون', color: 'bg-blue-100 text-blue-600', href: '/dashboard/retail', category: 'commerce', status: 'ready' },
    { id: 'clothing', title: 'نظام محلات الملابس', icon: Shirt, desc: 'مقاسات وألوان', color: 'bg-pink-100 text-pink-600', href: '/dashboard/clothing', category: 'commerce', status: 'ready' },
    { id: 'supermarket', title: 'نظام السوبر ماركت', icon: ShoppingBag, desc: 'باركود سريع', color: 'bg-green-100 text-green-600', href: '/dashboard/supermarket', category: 'commerce', status: 'pending' },

    // قطاع الصحة واللياقة - معمولة بالفعل
    { id: 'clinic', title: 'نظام المجمعات الطبية', icon: Stethoscope, desc: 'حجوزات وملفات مرضى', color: 'bg-teal-100 text-teal-600', href: '/dashboard/clinic', category: 'health', status: 'ready' },
    { id: 'pharmacy', title: 'نظام الصيدليات', icon: Pill, desc: 'أدوية ونواقص', color: 'bg-emerald-100 text-emerald-600', href: '/dashboard/pharmacy', category: 'health', status: 'ready' },
    { id: 'gym', title: 'نظام الأندية الرياضية', icon: Dumbbell, desc: 'اشتراكات ودخول', color: 'bg-yellow-100 text-yellow-600', href: '/dashboard/gym', category: 'health', status: 'ready' },
    { id: 'salon', title: 'نظام صوالين التجميل', icon: Scissors, desc: 'مواعيد وخدمات', color: 'bg-purple-100 text-purple-600', href: '/dashboard/salon', category: 'health', status: 'pending' },

    // قطاع الخدمات والتشغيل - معمولة بالفعل
    { id: 'nursery', title: 'نظام إدارة الحضانات', icon: Baby, desc: 'متابعة الأطفال والرسوم', color: 'bg-rose-100 text-rose-600', href: '/dashboard/nursery', category: 'services', status: 'pending' },
    { id: 'carwash', title: 'نظام مغاسل السيارات', icon: Car, desc: 'حجوزات وخدمات', color: 'bg-cyan-100 text-cyan-600', href: '/dashboard/carwash', category: 'services', status: 'ready' },
    { id: 'cleaning', title: 'نظام خدمات التنظيف', icon: Wrench, desc: 'أوامر شغل وفنيين', color: 'bg-indigo-100 text-indigo-600', href: '/dashboard/cleaning', category: 'services', status: 'pending' },
    { id: 'laundry', title: 'نظام إدارة المغاسل', icon: ShirtIcon, desc: 'استلام وتسليم', color: 'bg-sky-100 text-sky-600', href: '/dashboard/laundry', category: 'services', status: 'ready' },

    // قطاع الأعمال والأصول - معمولة بالفعل
    { id: 'realestate', title: 'نظام إدارة العقارات', icon: Home, desc: 'بيع وإيجار', color: 'bg-green-100 text-green-700', href: '/dashboard/realestate', category: 'business', status: 'ready' },
    { id: 'contracting', title: 'نظام المقاولات', icon: Wrench, desc: 'مشاريع وعقود', color: 'bg-slate-100 text-slate-600', href: '/dashboard/contracting', category: 'business', status: 'ready' },
    { id: 'cars', title: 'نظام إدارة السيارات', icon: Car, desc: 'أسطول وصيانة', color: 'bg-blue-100 text-blue-800', href: '/dashboard/cars', category: 'business', status: 'ready' },
    { id: 'services', title: 'نظام الخدمات العامة', icon: Users, desc: 'إدارة الخدمات', color: 'bg-amber-100 text-amber-600', href: '/dashboard/services', category: 'business', status: 'ready' },

    // أنظمة إضافية - لوحة التحكم
    { id: 'bookings', title: 'لوحة الحجوزات المركزية', icon: Calendar, desc: 'إدارة جميع الحجوزات', color: 'bg-indigo-100 text-indigo-600', href: '/dashboard/bookings', category: 'admin', status: 'ready' },
    { id: 'supplier', title: 'لوحة تحكم الموردين', icon: Package, desc: 'إدارة الموردين والطلبات', color: 'bg-orange-100 text-orange-600', href: '/supplier/dashboard', category: 'admin', status: 'ready' },
  ];

  const categories = [
    { id: 'all', label: 'جميع الأنظمة', count: systems.length },
    { id: 'commerce', label: 'التجارة والمطاعم', count: 4 },
    { id: 'health', label: 'الصحة واللياقة', count: 4 },
    { id: 'services', label: 'الخدمات والتشغيل', count: 4 },
    { id: 'business', label: 'الأعمال والأصول', count: 4 },
    { id: 'admin', label: 'لوحة التحكم', count: 2 },
  ];

  const filteredSystems = systems.filter(sys => {
    const matchesSearch = sys.title.includes(searchTerm) || sys.desc.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || sys.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">جميع الأنظمة</h1>
                <p className="text-sm text-gray-600 mt-1">16 نظام متخصص لجميع القطاعات</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-600">{filteredSystems.length} نظام</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن نظام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">تصفية حسب القطاع</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 font-bold text-center ${
                  selectedCategory === cat.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="text-sm">{cat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{cat.count} نظام</div>
              </button>
            ))}
          </div>
        </div>

        {/* Systems Grid */}
        {filteredSystems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSystems.map((system) => (
              <Link
                key={system.id}
                href={system.href}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header with Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${system.color} group-hover:scale-110 transition-transform duration-300`}>
                      <system.icon className="w-7 h-7 text-white" />
                    </div>
                    {system.status === 'ready' ? (
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-green-600">جاهز</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-600">قريباً</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {system.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">{system.desc}</p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-bold text-blue-600">الدخول</span>
                    <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم نجد نتائج</h3>
            <p className="text-gray-600">حاول البحث عن نظام آخر أو اختر قطاع مختلف</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black mb-2">18+</div>
              <p className="text-blue-100">نظام متخصص</p>
            </div>
            <div>
              <div className="text-3xl font-black mb-2">5</div>
              <p className="text-blue-100">قطاعات رئيسية</p>
            </div>
            <div>
              <div className="text-3xl font-black mb-2">5000+</div>
              <p className="text-blue-100">عميل نشط</p>
            </div>
            <div>
              <div className="text-3xl font-black mb-2">99.9%</div>
              <p className="text-blue-100">توفر الخدمة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
