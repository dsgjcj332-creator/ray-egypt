'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Users, TrendingUp, Dumbbell } from 'lucide-react';

const mockMembers = [
  { id: 1, name: 'أحمد محمد', membership: 'سنوي', status: 'active', joinDate: '2025-01-15' },
  { id: 2, name: 'فاطمة علي', membership: 'شهري', status: 'active', joinDate: '2025-11-01' },
  { id: 3, name: 'محمود حسن', membership: 'سنوي', status: 'inactive', joinDate: '2024-06-20' }
];

const mockClasses = [
  { id: 1, name: 'اليوجا', trainer: 'د. أحمد', time: '08:00', capacity: 20, enrolled: 15 },
  { id: 2, name: 'الزومبا', trainer: 'د. فاطمة', time: '18:00', capacity: 25, enrolled: 22 },
  { id: 3, name: 'تمارين القوة', trainer: 'د. محمود', time: '19:00', capacity: 30, enrolled: 28 }
];

export default function GymPage() {
  const router = useRouter();
  const [members, setMembers] = useState(mockMembers);
  const [classes, setClasses] = useState(mockClasses);
  const [activeTab, setActiveTab] = useState('members');

  const toggleMemberStatus = (id: number) => {
    setMembers(members.map(m =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ));
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const deleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const stats = [
    { label: 'الأعضاء النشطين', value: members.filter(m => m.status === 'active').length, icon: Users },
    { label: 'الفصول', value: classes.length, icon: Dumbbell },
    { label: 'معدل الحضور', value: '85%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">لوحة تحكم النادي الرياضي</h1>
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
              onClick={() => setActiveTab('members')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'members'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الأعضاء
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-6 py-4 font-bold transition-colors ${
                activeTab === 'classes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الفصول
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'members' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    عضو جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {members.map(member => (
                    <div key={member.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <p className="text-gray-600 text-sm">{member.membership} - منذ {member.joinDate}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleMemberStatus(member.id)}
                          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                            member.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {member.status === 'active' ? 'نشط' : 'غير نشط'}
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteMember(member.id)}
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

            {activeTab === 'classes' && (
              <div>
                <div className="mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    فصل جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {classes.map(cls => (
                    <div key={cls.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{cls.name}</h3>
                          <p className="text-gray-600 text-sm">المدرب: {cls.trainer}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{cls.time}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2" style={{ width: '200px' }}>
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{cls.enrolled}/{cls.capacity}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm">
                          <Edit2 size={16} />
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteClass(cls.id)}
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
