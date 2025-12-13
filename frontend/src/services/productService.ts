export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
  barcode: string;
  status: 'active' | 'inactive' | 'discontinued';
  image: string;
  model3d?: string;
  dailySales?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchProducts(page: number = 1, limit: number = 20): Promise<{ data: Product[], total: number }> {
  try {
    const response = await fetch(`${API_URL}/api/products?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('فشل جلب المنتجات');
    const result = await response.json();
    return { data: result.data || [], total: result.total || 0 };
  } catch (error) {
    console.error('خطأ في جلب المنتجات:', error);
    return { data: [], total: 0 };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('فشل جلب المنتج');
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('خطأ في جلب المنتج:', error);
    return null;
  }
}

export async function saveProduct(product: Omit<Product, 'id'>): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل حفظ المنتج');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في حفظ المنتج:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('فشل تحديث المنتج');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في تحديث المنتج:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف المنتج');
  } catch (error) {
    console.error('خطأ في حذف المنتج:', error);
    throw error;
  }
}
