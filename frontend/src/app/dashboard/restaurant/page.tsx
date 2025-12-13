'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Eye, TrendingUp, Users, ShoppingCart, Clock } from 'lucide-react';

const mockOrders = [
  { id: 1, table: 'الطاولة 1', items: 'دجاج مشوي + أرز', status: 'pending', total: 250 },
  { id: 2, table: 'الطاولة 3', items: 'سمك + سلطة', status: 'preparing', total: 320 },
  { id: 3, table: 'الطاولة 5', items: 'لحم مشوي', status: 'ready', total: 450 }
];

const mockMenu = [
  { id: 1, name: 'دجاج مشوي', price: 150, category: 'الأطباق الرئيسية' },
  { id: 2, name: 'سمك مشوي', price: 200, category: 'الأطباق الرئيسية' },
  { id: 3, name: 'سلطة خضراء', price: 50, category: 'السلطات' }
];

export default function RestaurantPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [menuItems, setMenuItems] = useState(mockMenu);
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddForm, setShowAddForm] = useState(false);

  const updateOrderStatus = (id: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const stats = [
    { label: 'الطلبات اليوم', value: orders.length, icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { label: 'الإيرادات', value: '1,020 ج.م', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { label: 'الزبائن', value: '45', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'وقت الانتظار', value: '15 دقيقة', icon: Clock, color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">لوحة تحكم المطعم</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الطلبات الحالية
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'menu'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              قائمة الطعام
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                    طلب جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{order.table}</h3>
                          <p className="text-gray-600 text-sm">{order.items}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{order.total} ج.م</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="preparing">قيد التحضير</option>
                          <option value="ready">جاهز</option>
                          <option value="completed">مكتمل</option>
                        </select>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'ready' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'pending' ? 'قيد الانتظار' :
                           order.status === 'preparing' ? 'قيد التحضير' :
                           order.status === 'ready' ? 'جاهز' : 'مكتمل'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Eye size={16} />
                          عرض
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 size={16} />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    إضافة طبق جديد
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.category}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{item.price} ج.م</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm flex-1">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm flex-1"
                        >
                          <Trash2 size={16} />
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
