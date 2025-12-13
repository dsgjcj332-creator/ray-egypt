const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Merchant {
  _id?: string;
  userId: string;
  businessType: string;
  businessInfo: {
    name: string;
    description: string;
    category: string;
    phone: string;
    email: string;
    website?: string;
    logo?: string;
    coverImage?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  };
  rating?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

// جلب جميع المتاجر
export async function fetchMerchants(
  page: number = 1,
  limit: number = 20,
  filters?: { category?: string; businessType?: string }
): Promise<{ data: Merchant[]; total: number }> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.businessType && { businessType: filters.businessType })
    });

    const response = await fetch(`${API_URL}/api/merchants?${params}`);
    if (!response.ok) throw new Error('فشل جلب المتاجر');
    const result = await response.json();
    return { data: result.data || [], total: result.count || 0 };
  } catch (error) {
    console.error('خطأ في جلب المتاجر:', error);
    return { data: [], total: 0 };
  }
}

// جلب متجر واحد
export async function getMerchantById(id: string): Promise<Merchant | null> {
  try {
    const response = await fetch(`${API_URL}/api/merchants/${id}`);
    if (!response.ok) throw new Error('فشل جلب المتجر');
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('خطأ في جلب المتجر:', error);
    return null;
  }
}

// جلب المتاجر حسب الفئة
export async function getMerchantsByCategory(category: string): Promise<Merchant[]> {
  try {
    const response = await fetch(`${API_URL}/api/merchants/category/${category}`);
    if (!response.ok) throw new Error('فشل جلب المتاجر');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('خطأ في جلب المتاجر:', error);
    return [];
  }
}

// إنشاء متجر جديد
export async function createMerchant(merchant: Omit<Merchant, '_id' | 'createdAt' | 'updatedAt'>): Promise<Merchant> {
  try {
    const response = await fetch(`${API_URL}/api/merchants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merchant)
    });
    if (!response.ok) throw new Error('فشل إنشاء المتجر');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في إنشاء المتجر:', error);
    throw error;
  }
}

// تحديث متجر
export async function updateMerchant(id: string, merchant: Partial<Merchant>): Promise<Merchant> {
  try {
    const response = await fetch(`${API_URL}/api/merchants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merchant)
    });
    if (!response.ok) throw new Error('فشل تحديث المتجر');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في تحديث المتجر:', error);
    throw error;
  }
}

// حذف متجر
export async function deleteMerchant(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/merchants/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف المتجر');
  } catch (error) {
    console.error('خطأ في حذف المتجر:', error);
    throw error;
  }
}
