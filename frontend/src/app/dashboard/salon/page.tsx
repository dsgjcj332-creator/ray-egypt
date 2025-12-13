'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Calendar, Users, Star } from 'lucide-react';

const mockServices = [
  { id: 1, name: 'قص شعر', price: 50, duration: '30 دقيقة' },
  { id: 2, name: 'صبغة شعر', price: 150, duration: '60 دقيقة' },
  { id: 3, name: 'تسريح شعر', price: 80, duration: '45 دقيقة' }
];

const mockBookings = [
  { id: 1, client: 'أحمد محمد', service: 'قص شعر', time: '10:00', date: '2025-12-13', status: 'confirmed' },
  { id: 2, client: 'فاطمة علي', service: 'صبغة شعر', time: '14:00', date: '2025-12-13', status: 'pending' }
];

export default function SalonPage() {
  const router = useRouter();
  const [services, setServices] = useState(mockServices);
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState('bookings');

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const updateBookingStatus = (id: number, status: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">لوحة تحكم الصالون</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">الحجوزات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">الخدمات</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <Star size={24} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">التقييم</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الحجوزات
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'services'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الخدمات
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'bookings' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    حجز جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{booking.client}</h3>
                          <p className="text-gray-600 text-sm">{booking.service}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{booking.time}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="completed">مكتمل</option>
                        </select>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status === 'pending' ? 'قيد الانتظار' :
                           booking.status === 'confirmed' ? 'مؤكد' : 'مكتمل'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
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

            {activeTab === 'services' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    خدمة جديدة
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.duration}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-blue-600">{service.price} ج.م</span>
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 size={16} />
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
