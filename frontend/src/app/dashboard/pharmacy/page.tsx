'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const mockMedicines = [
  { id: 1, name: 'الأسبرين', stock: 150, price: 5, expiry: '2026-12-31', status: 'ok' },
  { id: 2, name: 'الباراسيتامول', stock: 8, price: 3, expiry: '2025-06-30', status: 'low' },
  { id: 3, name: 'الأموكسيسيلين', stock: 0, price: 25, expiry: '2025-03-15', status: 'out' }
];

const mockPrescriptions = [
  { id: 1, patient: 'أحمد محمد', medicine: 'الأسبرين', quantity: 2, date: '2025-12-13', status: 'completed' },
  { id: 2, patient: 'فاطمة علي', medicine: 'الباراسيتامول', quantity: 1, date: '2025-12-13', status: 'pending' }
];

export default function PharmacyPage() {
  const router = useRouter();
  const [medicines, setMedicines] = useState(mockMedicines);
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [activeTab, setActiveTab] = useState('medicines');

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const deletePrescription = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const updatePrescriptionStatus = (id: number, status: string) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status } : p));
  };

  const lowStockCount = medicines.filter(m => m.stock < 10).length;

  const stats = [
    { label: 'الأدوية', value: medicines.length, icon: Package },
    { label: 'الأدوية الناقصة', value: lowStockCount, icon: AlertTriangle },
    { label: 'الوصفات اليوم', value: prescriptions.length, icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">لوحة تحكم الصيدلية</h1>
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
                  <div className={`w-12 h-12 rounded-lg ${
                    index === 1 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  } flex items-center justify-center`}>
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
              onClick={() => setActiveTab('medicines')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'medicines'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الأدوية
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'prescriptions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الوصفات
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'medicines' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    دواء جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {medicines.map(medicine => (
                    <div key={medicine.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                          <p className="text-gray-600 text-sm">ينتهي في: {medicine.expiry}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-blue-600">{medicine.price} ج.م</span>
                          <span className={`block text-sm font-medium mt-1 ${
                            medicine.status === 'ok' ? 'text-green-600' :
                            medicine.status === 'low' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            المخزون: {medicine.stock}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteMedicine(medicine.id)}
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

            {activeTab === 'prescriptions' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    وصفة جديدة
                  </button>
                </div>

                <div className="space-y-4">
                  {prescriptions.map(prescription => (
                    <div key={prescription.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{prescription.patient}</h3>
                          <p className="text-gray-600 text-sm">{prescription.medicine} × {prescription.quantity}</p>
                        </div>
                        <span className="text-sm text-gray-600">{prescription.date}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <select
                          value={prescription.status}
                          onChange={(e) => updatePrescriptionStatus(prescription.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="completed">مكتملة</option>
                          <option value="cancelled">ملغاة</option>
                        </select>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          prescription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          prescription.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {prescription.status === 'pending' ? 'قيد الانتظار' :
                           prescription.status === 'completed' ? 'مكتملة' : 'ملغاة'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deletePrescription(prescription.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
