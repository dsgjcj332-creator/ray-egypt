'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, ShoppingCart, Package, TrendingUp, DollarSign, 
  Activity, Shield, Settings, BarChart3, PieChart, 
  Clock, AlertCircle, CheckCircle, XCircle, Eye,
  Download, RefreshCw, Filter, Search, Calendar,
  Server, Database, Wifi, Globe, Mail, Phone,
  Star, Heart, MessageSquare, FileText, Image,
  Video, Music, MapPin, Building, Store, Truck,
  CreditCard, Bell, Bookmark, HelpCircle,
  LogOut, Settings2, Zap, Target, Award, Globe2,
  Briefcase, UserCheck, FileCheck, GraduationCap,
  Building2, Handshake, BadgeCheck, ClipboardList,
  Receipt, PiggyBank, Wallet, TrendingDown, ArrowUpRight,
  ArrowDownRight, Calculator, Banknote, Coins, CreditCardIcon,
  Crown, Gem, Gift, Percent, Tag, Package2, Box, Archive,
  Trophy, Medal, Palette, ToggleRight,
  Layout, Home, Settings as SettingsIcon, Image as ImageIcon,
  Type, Monitor, Smartphone, Menu, Link as LinkIcon, Command
} from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  totalProducts: number;
  activeProducts: number;
  systemHealth: 'excellent' | 'good' | 'warning';
  serverUptime: string;
  storageUsed: number;
  storageTotal: number;
}

interface FinancialStats {
  totalRevenue: number;
  monthlyRevenue: number;
  todayRevenue: number;
  totalExpenses: number;
  profit: number;
  profitMargin: number;
  pendingPayments: number;
  completedPayments: number;
  failedPayments: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  subscriptionRevenue: number;
  oneTimeRevenue: number;
}

interface BusinessActivity {
  id: string;
  name: string;
  type: 'store' | 'service' | 'subscription' | 'marketplace';
  revenue: number;
  expenses: number;
  profit: number;
  orders: number;
  customers: number;
  growth: number;
  status: 'active' | 'inactive' | 'pending';
}

interface Package {
  id: string;
  name: string;
  type: 'basic' | 'premium' | 'vip' | 'enterprise';
  price: number;
  originalPrice: number;
  discount: number;
  duration: string;
  features: string[];
  users: number;
  activeSubscriptions: number;
  revenue: number;
  activity: string;
 mostPopular: boolean;
  status: 'active' | 'inactive' | 'limited';
  description: string;
  color: string;
}

interface PackageStats {
  totalPackages: number;
  activePackages: number;
  totalSubscriptions: number;
  monthlyRevenue: number;
  averagePrice: number;
  mostPopular: string;
  highestRevenue: string;
  totalDiscounts: number;
  conversionRate: number;
}

interface AppearanceSettings {
  siteName: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headerVisible: boolean;
  footerVisible: boolean;
  sidebarVisible: boolean;
  theme: 'light' | 'dark' | 'auto';
  layout: 'default' | 'modern' | 'minimal';
  responsive: boolean;
}

interface PageControl {
  id: string;
  name: string;
  url: string;
  visible: boolean;
  inHeader: boolean;
  inFooter: boolean;
  inSidebar: boolean;
  order: number;
  icon: string;
  requiresAuth: boolean;
  customClass: string;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  action?: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  status: 'success' | 'warning' | 'error';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 15234,
    activeUsers: 3456,
    totalOrders: 45678,
    pendingOrders: 234,
    totalRevenue: 2456789,
    todayRevenue: 45678,
    totalProducts: 8923,
    activeProducts: 7823,
    systemHealth: 'excellent',
    serverUptime: '15 days 8 hours',
    storageUsed: 67.8,
    storageTotal: 100
  });

  const [financialStats] = useState<FinancialStats>({
    totalRevenue: 2456789,
    monthlyRevenue: 456789,
    todayRevenue: 12345,
    totalExpenses: 1234567,
    profit: 1222222,
    profitMargin: 49.7,
    pendingPayments: 45678,
    completedPayments: 2345678,
    failedPayments: 1234,
    averageOrderValue: 543,
    customerLifetimeValue: 8901,
    subscriptionRevenue: 1234567,
    oneTimeRevenue: 1222222
  });

  const [businessActivities] = useState<BusinessActivity[]>([
    {
      id: '1',
      name: 'متجر الإلكترونيات',
      type: 'store',
      revenue: 456789,
      expenses: 234567,
      profit: 222222,
      orders: 1234,
      customers: 892,
      growth: 12.5,
      status: 'active'
    },
    {
      id: '2',
      name: 'خدمات الاستشارات',
      type: 'service',
      revenue: 345678,
      expenses: 123456,
      profit: 222222,
      orders: 567,
      customers: 234,
      growth: 8.3,
      status: 'active'
    },
    {
      id: '3',
      name: 'اشتراكات البرمجيات',
      type: 'subscription',
      revenue: 567890,
      expenses: 234567,
      profit: 333323,
      orders: 890,
      customers: 1234,
      growth: 23.7,
      status: 'active'
    },
    {
      id: '4',
      name: 'السوق المفتوح',
      type: 'marketplace',
      revenue: 234567,
      expenses: 123456,
      profit: 111111,
      orders: 2345,
      customers: 1567,
      growth: -5.2,
      status: 'active'
    },
    {
      id: '5',
      name: 'متجر الملابس',
      type: 'store',
      revenue: 345678,
      expenses: 234567,
      profit: 111111,
      orders: 789,
      customers: 456,
      growth: 15.6,
      status: 'active'
    }
  ]);

  const [packageStats] = useState<PackageStats>({
    totalPackages: 24,
    activePackages: 18,
    totalSubscriptions: 5678,
    monthlyRevenue: 1234567,
    averagePrice: 234,
    mostPopular: 'الباقة المميزة',
    highestRevenue: 'الباقة الذهبية',
    totalDiscounts: 123456,
    conversionRate: 67.8
  });

  const [packages] = useState<Package[]>([
    {
      id: '1',
      name: 'الباقة الأساسية',
      type: 'basic',
      price: 99,
      originalPrice: 149,
      discount: 34,
      duration: 'شهري',
      features: ['ميزات أساسية', 'دعم عبر البريد', '5 مستخدمين'],
      users: 1234,
      activeSubscriptions: 892,
      revenue: 88208,
      activity: 'متجر الإلكترونيات',
      mostPopular: false,
      status: 'active',
      description: 'باقة مثالية للمبتدئين',
      color: 'bg-gray-500'
    },
    {
      id: '2',
      name: 'الباقة المميزة',
      type: 'premium',
      price: 299,
      originalPrice: 399,
      discount: 25,
      duration: 'شهري',
      features: ['ميزات متقدمة', 'دعم فوري', '20 مستخدمين', 'تحليلات'],
      users: 2345,
      activeSubscriptions: 1567,
      revenue: 468533,
      activity: 'جميع الأنشطة',
      mostPopular: true,
      status: 'active',
      description: 'أكثر الباقات شهرة',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'الباقة الذهبية',
      type: 'vip',
      price: 599,
      originalPrice: 799,
      discount: 25,
      duration: 'شهري',
      features: ['ميزات VIP', 'دعم مخصص', 'مستخدمين غير محدودين', 'تقارير متقدمة'],
      users: 890,
      activeSubscriptions: 678,
      revenue: 405922,
      activity: 'خدمات الاستشارات',
      mostPopular: false,
      status: 'active',
      description: 'للشركات الكبيرة',
      color: 'bg-yellow-500'
    },
    {
      id: '4',
      name: 'الباقة المؤسسية',
      type: 'enterprise',
      price: 999,
      originalPrice: 1499,
      discount: 33,
      duration: 'شهري',
      features: ['جميع الميزات', 'دعم على مدار الساعة', 'تخصيص كامل', 'مدير حساب'],
      users: 234,
      activeSubscriptions: 189,
      revenue: 188811,
      activity: 'اشتراكات البرمجيات',
      mostPopular: false,
      status: 'active',
      description: 'للمؤسسات الكبرى',
      color: 'bg-purple-500'
    },
    {
      id: '5',
      name: 'باقة العروض الخاصة',
      type: 'premium',
      price: 199,
      originalPrice: 399,
      discount: 50,
      duration: 'شهري',
      features: ['ميزات محدودة', 'دعم أساسي', '10 مستخدمين'],
      users: 567,
      activeSubscriptions: 234,
      revenue: 46566,
      activity: 'السوق المفتوح',
      mostPopular: false,
      status: 'limited',
      description: 'عرض لفترة محدودة',
      color: 'bg-red-500'
    }
  ]);

  const [appearanceSettings] = useState<AppearanceSettings>({
    siteName: 'راي للتقنية',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    fontFamily: 'Inter',
    headerVisible: true,
    footerVisible: true,
    sidebarVisible: true,
    theme: 'light',
    layout: 'default',
    responsive: true
  });

  const [pageControls] = useState<PageControl[]>([
    {
      id: '1',
      name: 'الرئيسية',
      url: '/',
      visible: true,
      inHeader: true,
      inFooter: true,
      inSidebar: false,
      order: 1,
      icon: 'Home',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '2',
      name: 'المنتجات',
      url: '/products',
      visible: true,
      inHeader: true,
      inFooter: true,
      inSidebar: true,
      order: 2,
      icon: 'ShoppingCart',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '3',
      name: 'الخدمات',
      url: '/services',
      visible: true,
      inHeader: true,
      inFooter: false,
      inSidebar: false,
      order: 3,
      icon: 'Briefcase',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '4',
      name: 'من نحن',
      url: '/about',
      visible: true,
      inHeader: true,
      inFooter: true,
      inSidebar: false,
      order: 4,
      icon: 'Building',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '5',
      name: 'اتصل بنا',
      url: '/contact',
      visible: true,
      inHeader: true,
      inFooter: true,
      inSidebar: false,
      order: 5,
      icon: 'Phone',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '6',
      name: 'لوحة التحكم',
      url: '/admin',
      visible: true,
      inHeader: false,
      inFooter: false,
      inSidebar: true,
      order: 6,
      icon: 'Settings',
      requiresAuth: true,
      customClass: ''
    },
    {
      id: '7',
      name: 'الوظائف',
      url: '/jobs',
      visible: true,
      inHeader: true,
      inFooter: true,
      inSidebar: true,
      order: 7,
      icon: 'Briefcase',
      requiresAuth: false,
      customClass: ''
    },
    {
      id: '8',
      name: 'المدونة',
      url: '/blog',
      visible: false,
      inHeader: false,
      inFooter: false,
      inSidebar: false,
      order: 8,
      icon: 'FileText',
      requiresAuth: false,
      customClass: ''
    }
  ]);

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'استخدام الذاكرة مرتفع',
      message: 'استخدام الذاكرة وصل إلى 85% من السعة الكاملة',
      timestamp: 'منذ 10 دقائق',
      action: 'تحقق'
    },
    {
      id: '2',
      type: 'success',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح إلى الإصدار 2.4.1',
      timestamp: 'منذ ساعة'
    },
    {
      id: '3',
      type: 'info',
      title: 'نسخة احتياطية',
      message: 'سيتم إنشاء نسخة احتياطية اليومية الساعة 2:00 ص',
      timestamp: 'منذ 3 ساعات'
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: '1',
      title: 'مستخدم جديد',
      description: 'أحمد محمد قام بالتسجيل في المنصة',
      timestamp: 'منذ 5 دقائق',
      user: 'أحمد محمد',
      status: 'success'
    },
    {
      id: '2',
      title: 'طلب جديد',
      description: 'تم استلام طلب جديد #ORD-2024-001',
      timestamp: 'منذ 15 دقيقة',
      user: 'سارة أحمد',
      status: 'success'
    },
    {
      id: '3',
      title: 'تحديث المنتج',
      description: 'تم تحديث معلومات المنتج #PROD-1234',
      timestamp: 'منذ 30 دقيقة',
      user: 'محمد علي',
      status: 'warning'
    }
  ]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  // Quick Actions Grid
  const quickActions = [
    {
      title: 'جميع الأنظمة',
      icon: Command,
      href: '/admin/systems',
      color: 'bg-gradient-to-r from-blue-600 to-purple-600',
      count: null,
      description: '16 نظام متخصص'
    },
    {
      title: 'المستخدمون',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      count: stats.totalUsers,
      description: 'إدارة المستخدمين'
    },
    {
      title: 'الطلبات',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-green-500',
      count: stats.totalOrders,
      description: 'إدارة الطلبات'
    },
    {
      title: 'المنتجات',
      icon: Package,
      href: '/admin/products',
      color: 'bg-purple-500',
      count: stats.totalProducts,
      description: 'إدارة المنتجات'
    },
    {
      title: 'التحليلات',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500',
      count: null,
      description: 'عرض الإحصائيات'
    },
    {
      title: 'المحتوى',
      icon: FileText,
      href: '/admin/content',
      color: 'bg-indigo-500',
      count: null,
      description: 'إدارة المحتوى'
    },
    {
      title: 'النظام',
      icon: Settings,
      href: '/admin/system',
      color: 'bg-gray-500',
      count: null,
      description: 'إعدادات النظام'
    },
    {
      title: 'الأمان',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-red-500',
      count: null,
      description: 'إعدادات الأمان'
    },
    {
      title: 'الوظائف',
      icon: Briefcase,
      href: '/admin/jobs',
      color: 'bg-teal-500',
      count: null,
      description: 'إدارة التوظيف'
    }
  ];

  // Management Actions
  const managementActions = [
    {
      title: 'المدفوعات',
      icon: CreditCard,
      href: '/admin/payments',
      description: 'إدارة المعاملات المالية'
    },
    {
      title: 'الرسائل',
      icon: MessageSquare,
      href: '/admin/messages',
      description: 'التواصل مع المستخدمين'
    },
    {
      title: 'الإشعارات',
      icon: Bell,
      href: '/admin/notifications',
      description: 'إدارة التنبيهات'
    },
    {
      title: 'المساعدة',
      icon: HelpCircle,
      href: '/admin/help',
      description: 'دعم المستخدمين'
    },
    {
      title: 'الأداء',
      icon: Zap,
      href: '/admin/performance',
      description: 'مراقبة الأداء'
    },
    {
      title: 'الأهداف',
      icon: Target,
      href: '/admin/targets',
      description: 'تتبع الأهداف'
    }
  ];

  // Hiring Actions
  const hiringActions = [
    {
      title: 'الطلبات',
      icon: FileCheck,
      href: '/admin/applications',
      description: 'مراجعة الطلبات'
    },
    {
      title: 'المتقدمون',
      icon: UserCheck,
      href: '/admin/candidates',
      description: 'إدارة المتقدمين'
    },
    {
      title: 'المقابلات',
      icon: ClipboardList,
      href: '/admin/interviews',
      description: 'جدولة المقابلات'
    },
    {
      title: 'التوظيف',
      icon: Handshake,
      href: '/admin/hiring',
      description: 'عملية التوظيف'
    },
    {
      title: 'وظائف الأنشطة',
      icon: Building2,
      href: '/admin/business-jobs',
      description: 'وظائف الأنشطة التجارية'
    },
    {
      title: 'وظائف راي',
      icon: BadgeCheck,
      href: '/admin/ray-jobs',
      description: 'وظائف شركة راي'
    },
    {
      title: 'التدريب',
      icon: GraduationCap,
      href: '/admin/training',
      description: 'برامج التدريب'
    }
  ];

  // Financial Actions
  const financialActions = [
    {
      title: 'إجمالي الإيرادات',
      icon: TrendingUp,
      href: '/admin/revenue',
      description: 'عرض جميع الإيرادات',
      value: financialStats.totalRevenue.toLocaleString() + ' ج.م'
    },
    {
      title: 'المصروفات',
      icon: TrendingDown,
      href: '/admin/expenses',
      description: 'إدارة المصروفات',
      value: financialStats.totalExpenses.toLocaleString() + ' ج.م'
    },
    {
      title: 'الأرباح',
      icon: PiggyBank,
      href: '/admin/profit',
      description: 'تحليل الأرباح',
      value: financialStats.profit.toLocaleString() + ' ج.م'
    },
    {
      title: 'المدفوعات',
      icon: CreditCardIcon,
      href: '/admin/payments',
      description: 'إدارة المدفوعات',
      value: financialStats.completedPayments.toLocaleString()
    },
    {
      title: 'المحافظ',
      icon: Wallet,
      href: '/admin/wallets',
      description: 'إدارة المحافظ',
      value: '5 محافظ'
    },
    {
      title: 'الفواتير',
      icon: Receipt,
      href: '/admin/invoices',
      description: 'إدارة الفواتير',
      value: financialStats.pendingPayments.toLocaleString() + ' معلقة'
    },
    {
      title: 'التحليل المالي',
      icon: Calculator,
      href: '/admin/financial-analysis',
      description: 'تقارير مالية مفصلة',
      value: '49.7% هامش ربح'
    },
    {
      title: 'البنوك',
      icon: Banknote,
      href: '/admin/banking',
      description: 'إدارة الحسابات البنكية',
      value: '3 حسابات'
    }
  ];

  // Package Management Actions
  const packageActions = [
    {
      title: 'إجمالي الباقات',
      icon: Package2,
      href: '/admin/packages',
      description: 'إدارة جميع الباقات',
      value: packageStats.totalPackages + ' باقة'
    },
    {
      title: 'الاشتراكات النشطة',
      icon: Crown,
      href: '/admin/subscriptions',
      description: 'إدارة الاشتراكات',
      value: packageStats.totalSubscriptions.toLocaleString()
    },
    {
      title: 'الإيرادات الشهرية',
      icon: TrendingUp,
      href: '/admin/package-revenue',
      description: 'إيرادات الباقات',
      value: (packageStats.monthlyRevenue / 1000).toFixed(0) + 'K ج.م'
    },
    {
      title: 'الخصومات',
      icon: Percent,
      href: '/admin/discounts',
      description: 'إدارة الخصومات',
      value: packageStats.totalDiscounts.toLocaleString() + ' ج.م'
    },
    {
      title: 'الباقات الأكثر شهرة',
      icon: Star,
      href: '/admin/popular-packages',
      description: 'الباقات المفضلة',
      value: packageStats.mostPopular
    },
    {
      title: 'التحويلات',
      icon: Target,
      href: '/admin/conversions',
      description: 'معدل التحويل',
      value: packageStats.conversionRate + '%'
    },
    {
      title: 'إنشاء باقة',
      icon: Gift,
      href: '/admin/create-package',
      description: 'إنشاء باقة جديدة',
      value: '+ باقة'
    },
    {
      title: 'التحكم في الباقات',
      icon: Settings2,
      href: '/admin/package-control',
      description: 'التحكم الكامل',
      value: 'تحكم'
    }
  ];

  // Application Settings Actions
  const appSettingsActions = [
    {
      title: 'اللوحة المركزية',
      icon: Command,
      href: '/admin/central-dashboard',
      description: 'الوحة التحكم الموحدة',
      value: 'مركزية'
    },
    {
      title: 'اسم التطبيق',
      icon: SettingsIcon,
      href: '/admin/app-name',
      description: 'تغيير اسم التطبيق',
      value: appearanceSettings.siteName
    },
    {
      title: 'شعار التطبيق',
      icon: ImageIcon,
      href: '/admin/app-logo',
      description: 'تغيير الشعار',
      value: 'تغيير'
    },
    {
      title: 'الألوان والتصميم',
      icon: Palette,
      href: '/admin/colors',
      description: 'تخصيص الألوان',
      value: '3 ألوان'
    },
    {
      title: 'الخطوط والطباعة',
      icon: Type,
      href: '/admin/typography',
      description: 'تحديد الخطوط',
      value: appearanceSettings.fontFamily
    },
    {
      title: 'الهيدر',
      icon: Layout,
      href: '/admin/header',
      description: 'التحكم في الهيدر',
      value: appearanceSettings.headerVisible ? 'مرئي' : 'مخفي'
    },
    {
      title: 'الفوتر',
      icon: Layout,
      href: '/admin/footer',
      description: 'التحكم في الفوتر',
      value: appearanceSettings.footerVisible ? 'مرئي' : 'مخفي'
    },
    {
      title: 'القائمة الجانبية',
      icon: Layout,
      href: '/admin/sidebar',
      description: 'التحكم في القائمة',
      value: appearanceSettings.sidebarVisible ? 'مرئي' : 'مخفي'
    },
    {
      title: 'الوضع الليلي',
      icon: Eye,
      href: '/admin/theme',
      description: 'تغيير الثيم',
      value: appearanceSettings.theme === 'light' ? 'فاتح' : appearanceSettings.theme === 'dark' ? 'داكن' : 'تلقائي'
    },
    {
      title: 'التخطيط',
      icon: Monitor,
      href: '/admin/layout',
      description: 'شكل التخطيط',
      value: appearanceSettings.layout
    }
  ];

  // Page Control Actions
  const pageControlActions = [
    {
      title: 'الصفحات الرئيسية',
      icon: Home,
      href: '/admin/main-pages',
      description: 'إدارة الصفحات الرئيسية',
      value: '5 صفحات'
    },
    {
      title: 'القوائم',
      icon: Menu,
      href: '/admin/menus',
      description: 'إدارة القوائم',
      value: '3 قوائم'
    },
    {
      title: 'الروابط',
      icon: LinkIcon,
      href: '/admin/links',
      description: 'إدارة الروابط',
      value: '12 رابط'
    },
    {
      title: 'الأزرار',
      icon: ToggleRight,
      href: '/admin/buttons',
      description: 'إظهار/إخفاء الأزرار',
      value: '8 أزرار'
    },
    {
      title: 'الصور والأيقونات',
      icon: ImageIcon,
      href: '/admin/images',
      description: 'إدارة الصور',
      value: '15 صورة'
    },
    {
      title: 'الاستجابة',
      icon: Smartphone,
      href: '/admin/responsive',
      description: 'عرض الموبايل',
      value: appearanceSettings.responsive ? 'نشط' : 'غير نشط'
    },
    {
      title: 'التحكم الكامل',
      icon: Settings2,
      href: '/admin/full-control',
      description: 'تحكم شامل',
      value: 'تحكم'
    },
    {
      title: 'معاينة',
      icon: Eye,
      href: '/admin/preview',
      description: 'معاينة التغييرات',
      value: 'معاينة'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
              <span className="bg-ray-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                راي للتقنية
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
              <button className="bg-ray-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير التقرير
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 transition">
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
            <div className="mt-2 text-xs text-gray-500">
              {stats.activeUsers.toLocaleString()} نشط الآن
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي الطلبات</p>
            <div className="mt-2 text-xs text-orange-600">
              {stats.pendingOrders} في الانتظار
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+23.7%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي الإيرادات (ج.م)</p>
            <div className="mt-2 text-xs text-gray-500">
              اليوم: {stats.todayRevenue.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+5.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">إجمالي المنتجات</p>
            <div className="mt-2 text-xs text-gray-500">
              {stats.activeProducts.toLocaleString()} نشط
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">الوصول السريع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-ray-blue group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  {action.count && (
                    <span className="text-2xl font-bold text-gray-900">{action.count.toLocaleString()}</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Management & Hiring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Management Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">إدارة مركزية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {managementActions.map((action) => (
                <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-500 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <action.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-xs text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Hiring Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">إدارة التوظيف</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hiringActions.map((action) => (
                <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-teal-500 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-teal-100 transition-colors">
                      <action.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-xs text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">الإدارة المالية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialActions.map((action) => (
              <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-green-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{action.value}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Package Management Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">إدارة الباقات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packageActions.map((action) => (
              <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-purple-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{action.value}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Application Settings Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">إعدادات التطبيق</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {appSettingsActions.map((action) => (
              <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-indigo-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{action.value}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Page Control Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">التحكم في الصفحات والأزرار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageControlActions.map((action) => (
              <Link key={action.title} href={action.href} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-pink-500 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-pink-100 rounded-lg group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-gray-900">{action.value}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Packages Details */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">تفاصيل الباقات</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الباقة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الخصم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدمون
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاشتراكات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإيرادات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النشاط
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 ${pkg.color} rounded-lg`}>
                            <Crown className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                            <div className="text-sm text-gray-500">{pkg.duration}</div>
                            {pkg.mostPopular && (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
                                الأكثر شهرة
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{pkg.price} ج.م</div>
                          <div className="text-xs text-gray-500 line-through">{pkg.originalPrice} ج.م</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                          -{pkg.discount}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.users.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.activeSubscriptions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {pkg.revenue.toLocaleString()} ج.م
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          pkg.status === 'active' ? 'bg-green-100 text-green-700' :
                          pkg.status === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {pkg.status === 'active' ? 'نشطة' :
                           pkg.status === 'limited' ? 'محدودة' : 'غير نشطة'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Business Activities */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">الأنشطة التجارية</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النشاط
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإيرادات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المصروفات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأرباح
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الطلبات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العملاء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النمو
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businessActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                          <div className="text-sm text-gray-500">
                            {activity.type === 'store' ? 'متجر' : 
                             activity.type === 'service' ? 'خدمة' :
                             activity.type === 'subscription' ? 'اشتراك' : 'سوق'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.revenue.toLocaleString()} ج.م
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.expenses.toLocaleString()} ج.م
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {activity.profit.toLocaleString()} ج.م
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.orders.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.customers.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-1">
                          {activity.growth > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span className={activity.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                            {Math.abs(activity.growth)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* System Health & Storage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">صحة النظام</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">حالة الخادم</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthColor(stats.systemHealth)}`}>
                  {stats.systemHealth === 'excellent' ? 'ممتاز' : stats.systemHealth === 'good' ? 'جيد' : 'تحذير'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">وقت التشغيل</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats.serverUptime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">قاعدة البيانات</span>
                </div>
                <span className="text-sm font-medium text-green-600">نشطة</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">الإنترنت</span>
                </div>
                <span className="text-sm font-medium text-green-600">متصل</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">مساحة التخزين</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">المستخدم</span>
                  <span className="text-sm font-medium text-gray-900">{stats.storageUsed} GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-ray-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.storageUsed / stats.storageTotal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">من {stats.storageTotal} GB</span>
                  <span className="text-xs text-gray-500">{Math.round((stats.storageUsed / stats.storageTotal) * 100)}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">الصور</span>
                  <span className="text-gray-900 font-medium">23.4 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">المستندات</span>
                  <span className="text-gray-900 font-medium">12.1 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">الفيديو</span>
                  <span className="text-gray-900 font-medium">18.7 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">البيانات</span>
                  <span className="text-gray-900 font-medium">13.6 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">التنبيهات</h3>
              <button className="text-sm text-ray-blue hover:text-blue-600 transition">
                عرض الكل
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      {alert.action && (
                        <button className="text-xs text-ray-blue hover:text-blue-600 transition">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">النشاط الحديث</h3>
              <button className="text-sm text-ray-blue hover:text-blue-600 transition">
                عرض الكل
              </button>
            </div>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      {activity.user && (
                        <span className="text-xs text-gray-600">بواسطة {activity.user}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
