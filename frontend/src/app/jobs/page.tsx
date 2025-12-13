'use client';

import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Search } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    location: 'القاهرة (Hybrid)',
    type: 'دوام كامل',
    salary: '15,000 - 25,000 ج.م',
    category: 'تكنولوجيا',
    description: 'نبحث عن مطور واجهات أمامية متقدم'
  },
  {
    id: 2,
    title: 'Sales Representative',
    company: 'Sales Corp',
    location: 'الجيزة',
    type: 'دوام كامل',
    salary: '8,000 + عمولة',
    category: 'مبيعات',
    description: 'ممثل مبيعات للعمل مع العملاء الكبار'
  },
  {
    id: 3,
    title: 'Customer Support Agent',
    company: 'Support Hub',
    location: 'عن بُعد',
    type: 'دوام جزئي',
    salary: '5,000 - 7,000 ج.م',
    category: 'خدمات العملاء',
    description: 'وكيل دعم عملاء للعمل عن بُعد'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Marketing Pro',
    location: 'القاهرة',
    type: 'دوام كامل',
    salary: '12,000 - 18,000 ج.م',
    category: 'تسويق',
    description: 'مدير تسويق لقيادة فريق التسويق'
  },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'Data Solutions',
    location: 'عن بُعد',
    type: 'دوام كامل',
    salary: '10,000 - 16,000 ج.م',
    category: 'تكنولوجيا',
    description: 'محلل بيانات للعمل على مشاريع ضخمة'
  },
  {
    id: 6,
    title: 'HR Specialist',
    company: 'HR Solutions',
    location: 'المعادي',
    type: 'دوام كامل',
    salary: '8,000 - 12,000 ج.م',
    category: 'موارد بشرية',
    description: 'متخصص موارد بشرية للتوظيف والتطوير'
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const categories = ['تكنولوجيا', 'مبيعات', 'خدمات العملاء', 'تسويق', 'موارد بشرية'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.includes(searchTerm) || job.company.includes(searchTerm);
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const applyForJob = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert('تم التقديم على الوظيفة بنجاح!');
    } else {
      alert('لقد قدمت على هذه الوظيفة بالفعل');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">الوظائف المتاحة</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن وظيفة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              الكل
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.company}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {job.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <DollarSign size={18} />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span>وظيفة</span>
                </div>
              </div>

              <button
                onClick={() => applyForJob(job.id)}
                className={`w-full py-2 rounded-lg font-bold transition-colors ${
                  appliedJobs.includes(job.id)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={appliedJobs.includes(job.id)}
              >
                {appliedJobs.includes(job.id) ? '✓ تم التقديم' : 'تقديم الآن'}
              </button>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">لم يتم العثور على وظائف</p>
          </div>
        )}
      </div>
    </div>
  );
}
