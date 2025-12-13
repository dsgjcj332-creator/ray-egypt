const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Order {
  _id?: string;
  orderNumber: string;
  customerId: string;
  merchantId: string;
  type: 'product' | 'service' | 'booking' | 'delivery' | 'pickup';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on-the-way' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  type: 'product' | 'service';
  itemId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  variations?: {
    size?: string;
    color?: string;
    customOptions?: string[];
  };
}

// جلب طلبات المستخدم
export async function fetchUserOrders(
  userId: string,
  page: number = 1,
  limit: number = 20
): Promise<{ data: Order[]; total: number }> {
  try {
    const response = await fetch(`${API_URL}/api/orders/user/${userId}?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('فشل جلب الطلبات');
    const result = await response.json();
    return { data: result.data || [], total: result.count || 0 };
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    return { data: [], total: 0 };
  }
}

// جلب طلب واحد
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`);
    if (!response.ok) throw new Error('فشل جلب الطلب');
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('خطأ في جلب الطلب:', error);
    return null;
  }
}

// إنشاء طلب جديد
export async function createOrder(order: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (!response.ok) throw new Error('فشل إنشاء الطلب');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في إنشاء الطلب:', error);
    throw error;
  }
}

// تحديث حالة الطلب
export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('فشل تحديث الطلب');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('خطأ في تحديث الطلب:', error);
    throw error;
  }
}

// حذف طلب
export async function deleteOrder(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('فشل حذف الطلب');
  } catch (error) {
    console.error('خطأ في حذف الطلب:', error);
    throw error;
  }
}
