const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  category: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  responsibilities: string[];
  logo?: string;
  rating?: number;
  reviews?: number;
  urgent?: boolean;
  featured?: boolean;
  contactInfo?: {
    phone: string;
    email: string;
    website: string;
  };
  companyInfo?: {
    size: string;
    founded: string;
    industry: string;
  };
  status?: 'active' | 'closed' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

// جلب جميع الوظائف
export async function fetchJobs(
  page: number = 1,
  limit: number = 20,
  filters?: { category?: string; type?: string; featured?: boolean; search?: string }
): Promise<{ data: Job[]; total: number }> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.featured && { featured: 'true' }),
      ...(filters?.search && { search: filters.search })
    });

    const response = await fetch(`${API_URL}/api/jobs?${params}`);
    if (!response.ok) throw new Error('فشل جلب الوظائف');
    const result = await response.json();
    return { data: result.data || [], total: result.count || 0 };
  } catch (error) {
    console.error('خطأ في جلب الوظائف:', error);
    return { data: [], total: 0 };
  }
}

// جلب وظائف مميزة
export async function fetchFeaturedJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/featured`);
    if (!response.ok) throw new Error('فشل جلب الوظائف المميزة');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('خطأ في جلب الوظائف المميزة:', error);
    return [];
  }
}

// جلب وظيفة واحدة
export async function getJobById(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/${id}`);
    if (!response.ok) throw new Error('فشل جلب الوظيفة');
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('خطأ في جلب الوظيفة:', error);
    return null;
  }
}

// إنشاء وظيفة جديدة
export async function createJob(job: Omit<Job, '_id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  try {
    const response = await fetch(`${API_URL}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (!response.ok) throw new Error('فشل إنشاء الوظيفة');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في إنشاء الوظيفة:', error);
    throw error;
  }
}

// تحديث وظيفة
export async function updateJob(id: string, job: Partial<Job>): Promise<Job> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    if (!response.ok) throw new Error('فشل تحديث الوظيفة');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في تحديث الوظيفة:', error);
    throw error;
  }
}

// حذف وظيفة
export async function deleteJob(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف الوظيفة');
  } catch (error) {
    console.error('خطأ في حذف الوظيفة:', error);
    throw error;
  }
}

// التقديم على وظيفة
export async function applyForJob(jobId: string, userId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    if (!response.ok) throw new Error('فشل التقديم على الوظيفة');
  } catch (error) {
    console.error('خطأ في التقديم على الوظيفة:', error);
    throw error;
  }
}

// جلب وظائف المستخدم المنشورة
export async function getUserJobs(userId: string): Promise<Job[]> {
  try {
    const response = await fetch(`${API_URL}/api/jobs/user/${userId}`);
    if (!response.ok) throw new Error('فشل جلب وظائف المستخدم');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('خطأ في جلب وظائف المستخدم:', error);
    return [];
  }
}
