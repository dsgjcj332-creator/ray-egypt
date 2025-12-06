"use client";

import React, { useState } from 'react';
import { useTheme } from '../../common/ThemeContext';
import { 
  Search, Plus, Minus, Trash2, CreditCard, Banknote, 
  ShoppingCart, Package, BarChart3, Store, Globe, Eye, EyeOff,
  Users, DollarSign, Box, Truck, Settings, RefreshCw, Check, X,
  Edit, Copy, Share2, ArrowUp, ArrowDown, MoreVertical, Bell,
  Calendar, Clock, TrendingUp, TrendingDown, AlertCircle, User,
  Tag, ShoppingBag, Loader2, CheckCircle, ChevronUp
} from 'lucide-react';
import { BusinessType } from '../config';

interface Item {
  id: number;
  name: string;
  price: number;
  type: 'service' | 'product';
  category: string;
  image?: string;
  stock?: number;
  sku?: string;
  online?: boolean;
  description?: string;
}

interface Transaction {
  id: string;
  customer: string;
  items: Item[];
  total: number;
  type: 'store' | 'online' | 'delivery';
  status: 'completed' | 'pending' | 'cancelled';
  payment: 'cash' | 'card' | 'digital';
  time: string;
}

// بيانات المنتجات المتكاملة للمحلات
const getRetailProducts = (language: string): Item[] => [
  { 
    id: 1, 
    name: language === 'ar' ? 'جينز رجالي' : "Men's Jeans", 
    price: 450, 
    type: 'product', 
    category: language === 'ar' ? 'ملابس' : 'Clothing',
    stock: 25,
    sku: 'JN-001',
    online: true,
    description: language === 'ar' ? 'جينز عالي الجودة' : 'High quality jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200'
  },
  { 
    id: 2, 
    name: language === 'ar' ? 'تي شيرت' : 'T-Shirt', 
    price: 120, 
    type: 'product', 
    category: language === 'ar' ? 'ملابس' : 'Clothing',
    stock: 50,
    sku: 'TS-002',
    online: true,
    description: language === 'ar' ? 'تي شيرت قطني' : 'Cotton t-shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6844ae817a24?w=200'
  },
  { 
    id: 3, 
    name: language === 'ar' ? 'حذاء رياضي' : 'Sports Shoes', 
    price: 380, 
    type: 'product', 
    category: language === 'ar' ? 'أحذية' : 'Shoes',
    stock: 15,
    sku: 'SH-003',
    online: false,
    description: language === 'ar' ? 'أحذية رياضية مريحة' : 'Comfortable sports shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200'
  },
  { 
    id: 4, 
    name: language === 'ar' ? 'ساعة يد' : 'Wrist Watch', 
    price: 850, 
    type: 'product', 
    category: language === 'ar' ? 'إكسسوارات' : 'Accessories',
    stock: 8,
    sku: 'WT-004',
    online: true,
    description: language === 'ar' ? 'ساعة أنيقة' : 'Elegant watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'
  },
  { 
    id: 5, 
    name: language === 'ar' ? 'حقيبة ظهر' : 'Backpack', 
    price: 320, 
    type: 'product', 
    category: language === 'ar' ? 'حقائب' : 'Bags',
    stock: 20,
    sku: 'BP-005',
    online: true,
    description: language === 'ar' ? 'حقيبة عملية' : 'Practical backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200'
  }
];

const getRecentTransactions = (language: string, products: Item[]): Transaction[] => [
  {
    id: '#INV-2451',
    customer: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
    items: [products[0], products[1]],
    total: 570,
    type: 'store',
    status: 'completed',
    payment: 'cash',
    time: '10:30 ص'
  },
  {
    id: '#INV-2452',
    customer: language === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
    items: [products[2]],
    total: 380,
    type: 'online',
    status: 'completed',
    payment: 'card',
    time: '10:15 ص'
  },
  {
    id: '#INV-2453',
    customer: language === 'ar' ? 'محمد علي' : 'Mohamed Ali',
    items: [products[3], products[4]],
    total: 1170,
    type: 'store',
    status: 'completed',
    payment: 'card',
    time: '9:45 ص'
  }
];

interface IntegratedPOSProps {
  type: BusinessType;
}

const IntegratedPOS: React.FC<IntegratedPOSProps> = ({ type }) => {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState<'overview' | 'pos' | 'transactions'>('overview');
  const [cart, setCart] = useState<{item: Item, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'digital'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Local state for theme and language
  const language = 'ar';
  const theme = isDarkMode ? 'dark' : 'light';
  const themeColor = 'blue';

  const items = getRetailProducts(language);
  const recentTransactions = getRecentTransactions(language, items);

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || i.category === selectedCategory;
    const matchesOnline = !showOnlineOnly || i.online;
    return matchesSearch && matchesCategory && matchesOnline;
  });

  const addToCart = (item: Item) => {
    setCart(prev => {
      const existing = prev.find(x => x.item.id === item.id);
      if (existing) return prev.map(x => x.item.id === item.id ? {...x, qty: x.qty + 1} : x);
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(x => {
      if (x.item.id === id) return {...x, qty: Math.max(0, x.qty + delta)};
      return x;
    }).filter(x => x.qty > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(x => x.item.id !== id));
  };

  const handleCheckout = (method: string) => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([]);
      setSelectedCustomer('');
      setIsMobileCartOpen(false);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 1000);
  };

  const total = cart.reduce((sum, x) => sum + (x.item.price * x.qty), 0);
  const itemsCount = cart.reduce((sum, x) => sum + x.qty, 0);

  const CartPanel = () => (
    <div className={`flex flex-col h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-5 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-100 bg-gray-50'} rounded-t-2xl flex items-center justify-between`}>
            <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'} border rounded-xl p-2 flex-1`}>
               <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
               <input 
                 type="text" 
                 placeholder={language === 'ar' ? 'اسم العميل (اختياري)' : 'Customer name (optional)'} 
                 className={`flex-1 text-sm outline-none bg-transparent ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                 value={selectedCustomer}
                 onChange={e => setSelectedCustomer(e.target.value)}
               />
            </div>
            <button onClick={() => setIsMobileCartOpen(false)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-200 rounded-full ml-2">
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {cart.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                  <Tag className="w-12 h-12 mb-3" />
                  <p>{language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}</p>
               </div>
            ) : (
               cart.map(({item, qty}) => (
                  <div key={item.id} className={`flex items-center justify-between p-3 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'} border rounded-xl shadow-sm`}>
                     <div className="flex-1">
                        <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.price} {language === 'ar' ? 'ج' : 'EGP'}</p>
                        {item.stock && (
                          <p className={`text-xs ${item.stock < 10 ? 'text-red-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {language === 'ar' ? 'المخزون:' : 'Stock:'} {item.stock}
                          </p>
                        )}
                     </div>
                     <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-red-500 active:bg-gray-100 active:scale-95 transition"><Minus className="w-4 h-4" /></button>
                        <span className="font-bold text-sm w-6 text-center">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-green-500 active:bg-gray-100 active:scale-95 transition"><Plus className="w-4 h-4" /></button>
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-red-500 active:bg-gray-100 active:scale-95 transition"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
               ))
            )}
        </div>

        <div className={`p-5 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-100 bg-gray-50'} rounded-b-2xl pb-safe`}>
            <div className="flex justify-between items-center mb-4">
               <span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                 {language === 'ar' ? 'الإجمالي' : 'Total'}
               </span>
               <span className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                 {total} <span className="text-sm text-gray-500">{language === 'ar' ? 'ج.م' : 'EGP'}</span>
               </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => handleCheckout('cash')}
                 disabled={cart.length === 0}
                 className="py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
               >
                  <Banknote className="w-5 h-5" /> {language === 'ar' ? 'كاش' : 'Cash'}
               </button>
               <button 
                 onClick={() => handleCheckout('card')}
                 disabled={cart.length === 0}
                 className="py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
               >
                  <CreditCard className="w-5 h-5" /> {language === 'ar' ? 'فيزا' : 'Card'}
               </button>
            </div>
        </div>
    </div>
  );

  const OverviewView = () => (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {language === 'ar' ? 'نظرة عامة على نقطة البيع' : 'POS Overview'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-sm text-green-600 font-semibold">+12.5%</span>
          </div>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? '2,120 ج' : '2,120 EGP'}
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar' ? 'إجمالي المبيعات اليوم' : "Today's Total Sales"}
          </p>
        </div>

        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">+8.2%</span>
          </div>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>18</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar' ? 'عدد المعاملات' : 'Transactions'}
          </p>
        </div>

        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-purple-600 font-semibold">5.2%</span>
          </div>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>156</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar' ? 'المنتجات المباعة' : 'Products Sold'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}
          </h3>
          <div className="space-y-3">
            {recentTransactions.slice(0, 3).map((transaction: Transaction) => (
              <div key={transaction.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{transaction.id}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.customer}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{transaction.total} ج</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {language === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
          </h3>
          <div className="space-y-3">
            {items.slice(0, 3).map((product: Item) => (
              <div key={product.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center gap-3">
                  {product.image && (
                    <img src={product.image} className="w-10 h-10 object-cover rounded-lg" />
                  )}
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{product.category}</p>
                  </div>
                </div>
                <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.price} ج</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TransactionsView = () => (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'رقم الفاتورة' : 'Invoice ID'}
              </th>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'العميل' : 'Customer'}
              </th>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'النوع' : 'Type'}
              </th>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'المبلغ' : 'Amount'}
              </th>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'الحالة' : 'Status'}
              </th>
              <th className={`text-right p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'الوقت' : 'Time'}
              </th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction: Transaction) => (
              <tr key={transaction.id} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className={`p-3 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.id}
                </td>
                <td className={`p-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {transaction.customer}
                </td>
                <td className={`p-3`}>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.type === 'store'
                      ? 'bg-blue-100 text-blue-800'
                      : transaction.type === 'online'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {transaction.type === 'store' 
                      ? (language === 'ar' ? 'محل' : 'Store')
                      : transaction.type === 'online'
                      ? (language === 'ar' ? 'أونلاين' : 'Online')
                      : (language === 'ar' ? 'توصيل' : 'Delivery')
                    }
                  </span>
                </td>
                <td className={`p-3 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.total} ج
                </td>
                <td className={`p-3`}>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {transaction.status === 'completed' 
                      ? (language === 'ar' ? 'مكتمل' : 'Completed')
                      : transaction.status === 'pending'
                      ? (language === 'ar' ? 'معلق' : 'Pending')
                      : (language === 'ar' ? 'ملغي' : 'Cancelled')
                    }
                  </span>
                </td>
                <td className={`p-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {transaction.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'ar' ? 'نقطة البيع المتكاملة' : 'Integrated POS System'}
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'ar' ? 'إدارة المبيعات من المحل والأونلاين' : 'Manage sales from physical and online stores'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex p-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl`}>
              <button 
                onClick={() => setActiveView('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  activeView === 'overview' 
                    ? `${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} shadow-sm` 
                    : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                {language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </button>
              <button 
                onClick={() => setActiveView('pos')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  activeView === 'pos' 
                    ? `${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} shadow-sm` 
                    : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                {language === 'ar' ? 'نقطة بيع' : 'POS'}
              </button>
              <button 
                onClick={() => setActiveView('transactions')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  activeView === 'transactions' 
                    ? `${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} shadow-sm` 
                    : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                {language === 'ar' ? 'المعاملات' : 'Transactions'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeView === 'overview' && <OverviewView />}
        
        {activeView === 'pos' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Catalog */}
            <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-4 lg:p-6 flex flex-col overflow-hidden`}>
              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`px-4 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">{language === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                    {categories.filter(cat => cat !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                    className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                      showOnlineOnly
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-300'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    {language === 'ar' ? 'أونلاين فقط' : 'Online Only'}
                  </button>
                </div>
                
                <div className="relative w-full md:w-64">
                  <Search className={`absolute right-3 top-3 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'بحث...' : 'Search...'} 
                    className={`w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-xl py-2.5 pr-10 pl-4 text-base md:text-sm focus:outline-none focus:border-gray-400 transition`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 overflow-y-auto pr-1 pb-20 lg:pb-4">
                {filteredItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className={`cursor-pointer group p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col items-center text-center active:scale-95 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {item.image ? (
                      <img src={item.image} className="w-24 h-24 object-cover rounded-xl mb-3 shadow-sm group-hover:scale-105 transition" />
                    ) : (
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 text-white font-bold text-xl shadow-sm ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
                      }`}>
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <h4 className={`font-bold text-sm line-clamp-2 mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                    <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        {item.price} {language === 'ar' ? 'ج' : 'EGP'}
                      </span>
                      {item.online && (
                        <Globe className="w-3 h-3 text-green-500" />
                      )}
                    </div>
                    {item.stock && (
                      <p className={`text-xs ${item.stock < 10 ? 'text-red-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {language === 'ar' ? 'مخزون:' : 'Stock:'} {item.stock}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="hidden lg:block w-[400px] bg-white rounded-2xl shadow-xl border border-gray-100 h-full overflow-hidden">
              <CartPanel />
            </div>

            {/* Mobile Cart Button */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
              <button 
                onClick={() => setIsMobileCartOpen(true)}
                className={`w-full py-4 rounded-xl shadow-xl flex items-center justify-between px-6 text-white active:scale-95 transition-transform ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{itemsCount} {language === 'ar' ? 'عناصر' : 'items'}</p>
                    <p className="text-xs opacity-90">{language === 'ar' ? 'عرض الفاتورة' : 'View Cart'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl">{total} {language === 'ar' ? 'ج' : 'EGP'}</span>
                  <ChevronUp className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Mobile Cart Overlay */}
            {isMobileCartOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileCartOpen(false)}>
                <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom-10 flex flex-col" onClick={e => e.stopPropagation()}>
                  <div className="w-full h-6 flex items-center justify-center bg-gray-50 border-b border-gray-100 cursor-pointer shrink-0" onClick={() => setIsMobileCartOpen(false)}>
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>
                  <CartPanel />
                </div>
              </div>
            )}

            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
                <div className="bg-white p-8 rounded-3xl shadow-2xl text-center border border-gray-100">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'ar' ? 'تم تسجيل البيع وإصدار الإيصال.' : 'Sale recorded and receipt issued.'}
                  </p>
                </div>
              </div>
            )}

            {/* Processing Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl animate-in fade-in">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {language === 'ar' ? 'جاري التنفيذ...' : 'Processing...'}
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeView === 'transactions' && <TransactionsView />}
      </div>
    </div>
  );
};

export default IntegratedPOS;
