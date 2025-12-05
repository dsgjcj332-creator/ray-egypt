"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Phone, Mail, MapPin, Star, Building2, Package, 
  Truck, Clock, Send, ArrowLeft, CheckCircle, MessageSquare,
  ShoppingCart, BarChart3, TrendingUp, DollarSign, Search,
  Bell, Settings, Plus, Edit, Trash2, CreditCard, Receipt,
  UserCheck, Wifi, Bluetooth, Smartphone, Store, Box,
  ArrowUp, ArrowDown, Filter, MoreVertical, Eye, Printer
} from 'lucide-react';

export default function SupplierDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // POS State
  interface CartItem {
    id: number;
    name: string;
    price: string;
    stock: string;
    orders: number;
    status: string;
    quantity: number;
  }
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerName, setCustomerName] = useState('');
  
  // Additional States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobilePOS, setIsMobilePOS] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const products = [
    { id: 1, name: 'دقيق القمح', price: '25 ج/كجم', stock: '500 كجم', orders: 45, status: 'active' },
    { id: 2, name: 'سكر', price: '18 ج/كجم', stock: '1000 كجم', orders: 38, status: 'active' },
    { id: 3, name: 'زيوت طعام', price: '45 ج/لتر', stock: '200 لتر', orders: 28, status: 'active' },
    { id: 4, name: 'أرز', price: '22 ج/كجم', stock: '300 كجم', orders: 22, status: 'low-stock' },
    { id: 5, name: 'مكرونة', price: '15 ج/كجم', stock: '50 كجم', orders: 18, status: 'low-stock' },
    { id: 6, name: 'معلبات', price: '8 ج/علبة', stock: '2000 علبة', orders: 5, status: 'active' }
  ];

  // بيانات وهمية للمورد
  const supplierData = {
    name: 'شركة النور للمواد الغذائية',
    rating: 4.8,
    totalOrders: 156,
    totalRevenue: '45,230 ج',
    activeProducts: 12,
    pendingOrders: 8,
    messages: 3
  };

  // State for editable products
  const [editableProducts, setEditableProducts] = useState(products.map(p => ({
    ...p,
    stockValue: parseInt(p.stock.replace(' كجم', '').replace(' لتر', '').replace(' علبة', ''))
  })));

  // Functions for inventory management
  const updateProductStock = (productId: number, change: number) => {
    setEditableProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const newStockValue = Math.max(0, product.stockValue + change);
        const unit = product.stock.includes('كجم') ? 'كجم' : 
                     product.stock.includes('لتر') ? 'لتر' : 'علبة';
        return {
          ...product,
          stockValue: newStockValue,
          stock: `${newStockValue} ${unit}`
        };
      }
      return product;
    }));
  };

  // Order type definition
  interface Order {
    id: number;
    customer: string;
    product?: string;
    quantity: string;
    total: string;
    status: 'pending' | 'confirmed' | 'delivered';
    date: string;
    products?: any;
    contactInfo?: {
      phone: string;
      email: string;
    };
    notes?: string;
    supplier?: string;
  }

  // Load orders from localStorage (from customer orders)
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('supplierOrders');
      if (savedOrders) {
        return JSON.parse(savedOrders);
      }
    }
    // Default orders
    return [
      { id: 1, customer: 'مطعم الأصالة', product: 'دقيق القمح', quantity: '50 كجم', total: '1250 ج', status: 'pending', date: '2025-12-05' },
      { id: 2, customer: 'فندق النيل', product: 'زيوت طعام', quantity: '20 لتر', total: '900 ج', status: 'confirmed', date: '2025-12-05' },
      { id: 3, customer: 'مخبز الحياة', product: 'سكر', quantity: '100 كجم', total: '1800 ج', status: 'delivered', date: '2025-12-04' },
      { id: 4, customer: 'مطعم الشام', product: 'أرز', quantity: '25 كجم', total: '550 ج', status: 'pending', date: '2025-12-05' },
      { id: 5, customer: 'كافتيريا الزهور', product: 'مكرونة', quantity: '30 كجم', total: '450 ج', status: 'confirmed', date: '2025-12-04' }
    ];
  });

  const messages = [
    { id: 1, sender: 'مطعم الأصالة', subject: 'استفسار عن الأسعار', message: 'هل يوجد خصم على الكميات الكبيرة؟', time: '2 ساعة', unread: true },
    { id: 2, sender: 'فندق النيل', subject: 'طلب عاجل', message: 'نحتاج 100 كجم دقيق خلال 24 ساعة', time: '4 ساعات', unread: true },
    { id: 3, sender: 'مخبز الحياة', subject: 'شكر وتقدير', message: 'جودة المنتجات ممتازة، شكراً لكم', time: 'يوم واحد', unread: false }
  ];

  const stats = [
    { label: 'إجمالي الطلبات', value: supplierData.totalOrders, icon: ShoppingCart, color: 'bg-blue-600' },
    { label: 'إجمالي الإيرادات', value: supplierData.totalRevenue, icon: DollarSign, color: 'bg-green-600' },
    { label: 'المنتجات النشطة', value: supplierData.activeProducts, icon: Package, color: 'bg-purple-600' },
    { label: 'الطلبات المعلقة', value: supplierData.pendingOrders, icon: Clock, color: 'bg-orange-600' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-xs lg:text-sm text-gray-500">هذا الشهر</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-xs lg:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">الطلبات الأخيرة</h3>
          <button 
            onClick={() => setActiveTab('orders')}
            className="text-blue-600 hover:text-blue-700 font-bold text-sm"
          >
            عرض الكل
          </button>
        </div>
        
        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-3">
          {orders.slice(0, 5).map((order: Order) => (
            <div key={order.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {order.status === 'delivered' ? 'تم التسليم' :
                   order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>{order.product || 'منتجات متعددة'}</p>
                <p>{order.quantity} - {order.total}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right pb-3 text-sm font-bold text-gray-700">العميل</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">المنتج</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الكمية</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الإجمالي</th>
                <th className="text-right pb-3 text-sm font-bold text-gray-700">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm">{order.customer}</td>
                  <td className="py-3 text-sm">{order.product || 'منتجات متعددة'}</td>
                  <td className="py-3 text-sm">{order.quantity}</td>
                  <td className="py-3 text-sm font-bold">{order.total}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status === 'delivered' ? 'تم التسليم' :
                       order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <button 
          onClick={() => setActiveTab('products')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 lg:p-6 rounded-xl hover:shadow-lg transition"
        >
          <Package className="w-6 h-6 lg:w-8 lg:h-8 mb-2" />
          <h4 className="font-bold text-sm lg:text-base">إدارة المنتجات</h4>
          <p className="text-xs lg:text-sm opacity-90">إضافة وتعديل المنتجات</p>
        </button>
        
        <button 
          onClick={() => setActiveTab('orders')}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 lg:p-6 rounded-xl hover:shadow-lg transition"
        >
          <ShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 mb-2" />
          <h4 className="font-bold text-sm lg:text-base">الطلبات</h4>
          <p className="text-xs lg:text-sm opacity-90">متابعة الطلبات الواردة</p>
        </button>
        
        <button 
          onClick={() => setActiveTab('messages')}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 lg:p-6 rounded-xl hover:shadow-lg transition"
        >
          <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 mb-2" />
          <h4 className="font-bold text-sm lg:text-base">الرسائل</h4>
          <p className="text-xs lg:text-sm opacity-90">التواصل مع العملاء</p>
        </button>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">المنتجات</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowInventoryModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Box className="w-4 h-4" />
            المخزون
          </button>
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right p-4 text-sm font-bold text-gray-700">المنتج</th>
                <th className="text-right p-4 text-sm font-bold text-gray-700">السعر</th>
                <th className="text-right p-4 text-sm font-bold text-gray-700">المخزون</th>
                <th className="text-right p-4 text-sm font-bold text-gray-700">الطلبات</th>
                <th className="text-right p-4 text-sm font-bold text-gray-700">الحالة</th>
                <th className="text-right p-4 text-sm font-bold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold">{product.price}</td>
                  <td className="p-4">
                    <span className={`${
                      parseInt(product.stock) < 100 ? 'text-red-600 font-bold' : 'text-gray-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">{product.orders} طلب</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'نشط' : 'مخزون منخفض'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">الطلبات</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto">
            <option>جميع الحالات</option>
            <option>معلق</option>
            <option>مؤكد</option>
            <option>تم التسليم</option>
          </select>
        </div>
      </div>

      {/* Mobile View - List */}
      <div className="lg:hidden space-y-4">
        {orders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status === 'delivered' ? 'تم التسليم' :
                 order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.product && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المنتج:</span>
                  <span className="font-medium">{order.product}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الكمية:</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="font-bold text-lg">{order.total}</span>
              </div>
            </div>
            
            <div className="flex gap-2 flex-col sm:flex-row">
              {order.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700">
                    تأكيد
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700">
                    رفض
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                  تحديث التوصيل
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                تفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {orders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{order.customer}</h4>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {order.status === 'delivered' ? 'تم التسليم' :
                 order.status === 'confirmed' ? 'مؤكد' : 'معلق'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.product && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المنتج:</span>
                  <span className="font-medium">{order.product}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الكمية:</span>
                <span className="font-medium">{order.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="font-bold text-lg">{order.total}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700">
                    تأكيد
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700">
                    رفض
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                  تحديث التوصيل
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                تفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">الرسائل</h3>
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {messages.filter(m => m.unread).length} غير مقروءة
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {messages.map(message => (
          <div key={message.id} className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
            message.unread ? 'border-blue-500' : 'border-transparent'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{message.sender}</h4>
                <p className="text-sm text-gray-600">{message.time}</p>
              </div>
              {message.unread && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
            
            <h5 className="font-bold text-gray-800 mb-2">{message.subject}</h5>
            <p className="text-gray-600 text-sm mb-4">{message.message}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700">
                رد
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                أرشفة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPOS = () => {
    const addToCart = (product: typeof products[0]) => {
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        setCartItems(cartItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      updateCartTotal();
    };

    const removeFromCart = (productId: number) => {
      setCartItems(cartItems.filter(item => item.id !== productId));
      updateCartTotal();
    };

    const updateQuantity = (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setCartItems(cartItems.map(item => 
          item.id === productId 
            ? { ...item, quantity }
            : item
        ));
        updateCartTotal();
      }
    };

    const updateCartTotal = () => {
      const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(' ج/كجم', '').replace(' ج/لتر', '').replace(' ج/علبة', ''));
        return sum + (price * item.quantity);
      }, 0);
      setCartTotal(total);
    };

    const processPayment = () => {
      alert(`تمت معالجة الدفع بنجاح! المبلغ: ${cartTotal} ج`);
      setCartItems([]);
      setCartTotal(0);
      setCustomerName('');
    };

    return (
      <div className="space-y-6">
        {/* Mobile View - Single Column */}
        <div className="lg:hidden space-y-6">
          {/* Cart First on Mobile */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">السلة</h3>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="اسم العميل"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">{item.price} × {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-gray-500 text-center py-4">السلة فارغة</p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-lg border-2 transition ${
                    paymentMethod === 'cash' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">نقداً</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 transition ${
                    paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">بطاقة</span>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">الإجمالي:</span>
                <span className="text-2xl font-bold text-blue-600">{cartTotal} ج</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={processPayment}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                إتمام الدفع
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition flex items-center justify-center gap-2">
                <Receipt className="w-5 h-5" />
                طباعة فاتورة
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">المنتجات</h3>
            <div className="grid grid-cols-2 gap-3">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="border rounded-lg p-3 hover:bg-blue-50 transition text-right"
                >
                  <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-600">{product.price}</p>
                  <p className="text-xs text-gray-500">المخزون: {product.stock}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View - Two Columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">المنتجات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="border rounded-lg p-4 hover:bg-blue-50 transition text-right"
                  >
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.price}</p>
                    <p className="text-xs text-gray-500">المخزون: {product.stock}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">السلة</h3>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="اسم العميل"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <p className="text-gray-500 text-center py-4">السلة فارغة</p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">الإجمالي:</span>
                  <span className="text-2xl font-bold text-blue-600">{cartTotal} ج</span>
                </div>

                <div className="space-y-3">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="cash">نقداً</option>
                    <option value="card">بطاقة</option>
                    <option value="transfer">تحويل بنكي</option>
                  </select>

                  <button
                    onClick={processPayment}
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    معالجة الدفع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">التحليلات والتقارير</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">مبيعات الشهور الـ 6</h4>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">مخطط المبيعات</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">أكثر المنتجات مبيعاً</h4>
          <div className="space-y-3">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <span className="text-sm text-gray-600">{product.orders} طلب</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => router.push('/suppliers')}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 truncate">{supplierData.name}</h1>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{supplierData.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Bell className="w-4 h-4" />
                  {supplierData.messages > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {supplierData.messages}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Mobile Search Bar */}
            <div className="pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/suppliers')}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← العودة
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{supplierData.name}</h1>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">{supplierData.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                {supplierData.messages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {supplierData.messages}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 font-medium"
            >
              <option value="overview">نظرة عامة</option>
              <option value="products">المنتجات</option>
              <option value="orders">الطلبات</option>
              <option value="pos">نقطة البيع</option>
              <option value="messages">الرسائل</option>
              <option value="analytics">التحليلات</option>
            </select>
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden lg:flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
              { id: 'products', label: 'المنتجات', icon: Package },
              { id: 'orders', label: 'الطلبات', icon: ShoppingCart },
              { id: 'pos', label: 'نقطة البيع', icon: CreditCard },
              { id: 'messages', label: 'الرسائل', icon: MessageSquare },
              { id: 'analytics', label: 'التحليلات', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                {tab.id === 'messages' && supplierData.messages > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {supplierData.messages}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'pos' && renderPOS()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'analytics' && renderAnalytics()}
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إضافة منتج جديد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="اسم المنتج" className="border rounded-lg p-3" />
              <input type="text" placeholder="السعر" className="border rounded-lg p-3" />
              <input type="text" placeholder="المخزون" className="border rounded-lg p-3" />
              <select className="border rounded-lg p-3">
                <option>نشط</option>
                <option>غير نشط</option>
              </select>
            </div>
            <textarea placeholder="وصف المنتج" className="w-full border rounded-lg p-3 mt-4" rows={3}></textarea>
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold"
              >
                حفظ
              </button>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">إدارة المخزون</h3>
            <div className="space-y-4">
              {editableProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-600">المخزون الحالي: {product.stock}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateProductStock(product.id, -10)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold">{product.stock}</span>
                    <button 
                      onClick={() => updateProductStock(product.id, 10)}
                      className="w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowInventoryModal(false)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-bold mt-6"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">الإعدادات</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">الأجهزة المتصلة</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Printer className="w-5 h-5 text-blue-600" />
                      <span>طابعة حرارية</span>
                    </div>
                    <span className="text-green-600 text-sm">متصل</span>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bluetooth className="w-5 h-5 text-blue-600" />
                      <span>جهاز المندوب</span>
                    </div>
                    <span className="text-green-600 text-sm">متصل</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">نقطة البيع المحمولة</h4>
                <button 
                  onClick={() => setIsMobilePOS(!isMobilePOS)}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    isMobilePOS 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isMobilePOS ? 'تفعيل وضع المندوب' : 'إيقاف وضع المندوب'}
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowSettingsModal(false)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-bold mt-6"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 left-4 w-80 bg-white rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-900">الإشعارات</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-bold text-blue-900">طلب جديد</h4>
              <p className="text-sm text-blue-700">مطعم الأصالة طلب 50 كجم دقيق</p>
              <span className="text-xs text-blue-600">منذ 5 دقائق</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-bold text-green-900">تم التسليم</h4>
              <p className="text-sm text-green-700">فندق النيل تم تسليم الطلب</p>
              <span className="text-xs text-green-600">منذ ساعة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
