'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Calendar, Users, Clock, Phone } from 'lucide-react';

const mockAppointments = [
  { id: 1, patient: 'أحمد محمد', time: '10:00', date: '2025-12-13', status: 'confirmed', phone: '01234567890' },
  { id: 2, patient: 'فاطمة علي', time: '11:30', date: '2025-12-13', status: 'pending', phone: '01234567891' },
  { id: 3, patient: 'محمود حسن', time: '14:00', date: '2025-12-13', status: 'completed', phone: '01234567892' }
];

const mockDoctors = [
  { id: 1, name: 'د. أحمد محمد', specialty: 'أسنان', available: true },
  { id: 2, name: 'د. فاطمة علي', specialty: 'عام', available: true },
  { id: 3, name: 'د. محمود حسن', specialty: 'عيون', available: false }
];

export default function ClinicPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [activeTab, setActiveTab] = useState('appointments');

  const updateAppointmentStatus = (id: number, newStatus: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const toggleDoctorAvailability = (id: number) => {
    setDoctors(doctors.map(doc =>
      doc.id === id ? { ...doc, available: !doc.available } : doc
    ));
  };

  const stats = [
    { label: 'المواعيد اليوم', value: appointments.length, icon: Calendar },
    { label: 'الأطباء', value: doctors.length, icon: Users },
    { label: 'الأطباء المتاحين', value: doctors.filter(d => d.available).length, icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">لوحة تحكم العيادة</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              المواعيد
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'doctors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الأطباء
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'appointments' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    موعد جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {appointments.map(apt => (
                    <div key={apt.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{apt.patient}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone size={16} />
                              {apt.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <select
                          value={apt.status}
                          onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="completed">مكتمل</option>
                          <option value="cancelled">ملغى</option>
                        </select>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status === 'pending' ? 'قيد الانتظار' :
                           apt.status === 'confirmed' ? 'مؤكد' :
                           apt.status === 'completed' ? 'مكتمل' : 'ملغى'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteAppointment(apt.id)}
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

            {activeTab === 'doctors' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    طبيب جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {doctors.map(doctor => (
                    <div key={doctor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                        <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleDoctorAvailability(doctor.id)}
                          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                            doctor.available
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {doctor.available ? 'متاح' : 'غير متاح'}
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
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
