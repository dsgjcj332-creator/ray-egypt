'use client';

import { useState } from 'react';
import { usePaginatedApi } from '@/hooks/useApi';
import { fetchJobs, applyForJob } from '@/services/jobService';

export default function JobsList() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data: jobs,
    loading,
    error,
    page,
    pages,
    goToPage,
    nextPage,
    prevPage,
    refetch
  } = usePaginatedApi(
    (page, limit) =>
      fetchJobs(page, limit, {
        category: selectedCategory || undefined,
        type: selectedType as any || undefined,
        search: searchQuery || undefined
      }),
    1,
    10
  );

  const handleSearch = () => {
    goToPage(1);
  };

  const handleApply = async (jobId: string) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('يرجى تسجيل الدخول أولاً');
        return;
      }
      await applyForJob(jobId, userId);
      alert('تم التقديم بنجاح!');
    } catch (error) {
      alert('حدث خطأ في التقديم');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">الوظائف المتاحة</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="ابحث عن وظيفة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">جميع الفئات</option>
            <option value="Technology">تكنولوجيا</option>
            <option value="Sales">مبيعات</option>
            <option value="Marketing">تسويق</option>
            <option value="HR">موارد بشرية</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">جميع الأنواع</option>
            <option value="full-time">دوام كامل</option>
            <option value="part-time">دوام جزئي</option>
            <option value="contract">عقد</option>
            <option value="freelance">عمل حر</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          بحث
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">خطأ في تحميل الوظائف</h3>
          <p className="text-red-700">{error.message}</p>
        </div>
      )}

      {/* Jobs List */}
      {loading && jobs.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {jobs.map(job => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{job.company}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      📍 {job.location}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {job.type}
                      </span>
                      {job.urgent && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          عاجل
                        </span>
                      )}
                      {job.featured && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          مميز
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                      {job.salary && (
                        <span>💰 {job.salary.min} - {job.salary.max} ج.م</span>
                      )}
                      {job.rating && (
                        <span>⭐ {job.rating} ({job.reviews} تقييم)</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => job._id && handleApply(job._id)}
                    className="ml-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    تقديم
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                السابق
              </button>

              <span className="text-gray-600">
                الصفحة {page} من {pages}
              </span>

              <button
                onClick={nextPage}
                disabled={page === pages}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
