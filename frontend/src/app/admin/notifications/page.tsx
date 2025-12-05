'use client';

import React, { useState } from 'react';
import { 
  Bell, Search, Filter, Download, Eye, Edit, Trash2,
  Send, CheckCircle, XCircle, Clock, AlertCircle, Calendar,
  User, Mail, Phone, MessageSquare, Settings, RefreshCw,
  Plus, ChevronDown, MoreVertical, Volume2, VolumeX,
  Zap, Globe, Shield, Users, ShoppingCart, Package,
  CreditCard, FileText, TrendingUp, Activity, CheckCheck
} from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  status: string;
  recipients: string;
  sentAt: string | null;
  scheduledAt: string | null;
  readBy: number;
  totalRecipients: number;
  deliveryRate: number;
  createdBy: string;
}

export default function AdminNotifications() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const notifications = [
    {
      id: 'NOT001',
      title: 'تحديث النظام',
      message: 'سيتم تحديث النظام غداً الساعة 2 صباحاً. يرجى حفظ جميع أعمالك.',
      type: 'system',
      priority: 'high',
      status: 'sent',
      recipients: 'all_users',
      sentAt: '2025-12-05 14:30',
      scheduledAt: null,
      readBy: 12345,
      totalRecipients: 15234,
      deliveryRate: 81.2,
      createdBy: 'Admin'
    },
    {
      id: 'NOT002',
      title: 'عرض خاص على المنتجات',
      message: 'خصم 20% على جميع المنتجات الإلكترونية لمدة 3 أيام فقط!',
      type: 'marketing',
      priority: 'medium',
      status: 'scheduled',
      recipients: 'active_users',
      sentAt: null,
      scheduledAt: '2025-12-06 10:00',
      readBy: 0,
      totalRecipients: 8456,
      deliveryRate: 0,
      createdBy: 'Marketing Team'
    },
    {
      id: 'NOT003',
      title: 'تأكيد الطلب',
      message: 'تم تأكيد طلبك #12345. سيتم شحنه خلال 24 ساعة.',
      type: 'order',
      priority: 'low',
      status: 'sent',
      recipients: 'specific_user',
      sentAt: '2025-12-05 12:15',
      scheduledAt: null,
      readBy: 1,
      totalRecipients: 1,
      deliveryRate: 100,
      createdBy: 'System'
    },
    {
      id: 'NOT004',
      title: 'انتهاء الصلاحية',
      message: 'بعض المنتجات في سلة التسوق ستنتهي صلاحيتها خلال 24 ساعة.',
      type: 'cart',
      priority: 'medium',
      status: 'draft',
      recipients: 'cart_users',
      sentAt: null,
      scheduledAt: null,
      readBy: 0,
      totalRecipients: 234,
      deliveryRate: 0,
      createdBy: 'Sales Team'
    },
    {
      id: 'NOT005',
      title: 'مشكلة في الدفع',
      message: 'فشلت عملية الدفع لطلب #12344. يرجى تحديث معلومات الدفع.',
      type: 'payment',
      priority: 'high',
      status: 'sent',
      recipients: 'specific_user',
      sentAt: '2025-12-05 11:45',
      scheduledAt: null,
      readBy: 1,
      totalRecipients: 1,
      deliveryRate: 100,
      createdBy: 'System'
    }
  ];

  const notificationTypes = [
    { id: 'all', label: 'جميع الأنواع', count: notifications.length },
    { id: 'system', label: 'النظام', count: 1 },
    { id: 'marketing', label: 'التسويق', count: 1 },
    { id: 'order', label: 'الطلبات', count: 1 },
    { id: 'cart', label: 'السلة', count: 1 },
    { id: 'payment', label: 'المدفوعات', count: 1 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'تم الإرسال';
      case 'scheduled':
        return 'مجدول';
      case 'draft':
        return 'مسودة';
      case 'failed':
        return 'فشل';
      default:
        return status;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-purple-100 text-purple-800';
      case 'marketing':
        return 'bg-pink-100 text-pink-800';
      case 'order':
        return 'bg-blue-100 text-blue-800';
      case 'cart':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'system':
        return 'النظام';
      case 'marketing':
        return 'التسويق';
      case 'order':
        return 'الطلبات';
      case 'cart':
        return 'السلة';
      case 'payment':
        return 'المدفوعات';
      default:
        return type;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return priority;
    }
  };

  const getRecipientsText = (recipients: string) => {
    switch (recipients) {
      case 'all_users':
        return 'جميع المستخدمين';
      case 'active_users':
        return 'المستخدمون النشطون';
      case 'specific_user':
        return 'مستخدم محدد';
      case 'cart_users':
        return 'مستخدمو السلة';
      default:
        return recipients;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return Settings;
      case 'marketing':
        return Zap;
      case 'order':
        return ShoppingCart;
      case 'cart':
        return Package;
      case 'payment':
        return CreditCard;
      default:
        return Bell;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.includes(searchTerm) || 
                         notification.message.includes(searchTerm);
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    draft: notifications.filter(n => n.status === 'draft').length,
    failed: notifications.filter(n => n.status === 'failed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">الإشعارات</h1>
                <p className="text-sm text-gray-600">إدارة الإشعارات والتنبيهات</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="w-4 h-4" />
                إشعار جديد
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الإجمالي</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تم الإرسال</p>
                <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مجدول</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مسودة</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">فشل</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="بحث في الإشعارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {notificationTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label} ({type.count})
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="sent">تم الإرسال</option>
                <option value="scheduled">مجدول</option>
                <option value="draft">مسودة</option>
                <option value="failed">فشل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => setSelectedNotification(notification)}
                className={`p-6 cursor-pointer hover:bg-gray-50 transition ${
                  selectedNotification?.id === notification.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getTypeBadge(notification.type)} rounded-lg flex items-center justify-center`}>
                      {React.createElement(getTypeIcon(notification.type), { className: 'w-5 h-5 text-white' })}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(notification.priority)}`}>
                      {getPriorityText(notification.priority)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(notification.status)}`}>
                      {getStatusText(notification.status)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{getRecipientsText(notification.recipients)}</span>
                    <span>{notification.totalRecipients} مستلم</span>
                    {notification.status === 'sent' && (
                      <span>معدل التوصيل: {notification.deliveryRate}%</span>
                    )}
                    <span>{notification.sentAt || notification.scheduledAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {notification.status === 'sent' && (
                      <span className="flex items-center gap-1">
                        <CheckCheck className="w-3 h-3 text-green-600" />
                        {notification.readBy} قراءة
                      </span>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Notification Detail */}
        {selectedNotification && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${getTypeBadge(selectedNotification.type)} rounded-lg flex items-center justify-center`}>
                  {React.createElement(getTypeIcon(selectedNotification.type), { className: 'w-6 h-6 text-white' })}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedNotification.title}</h3>
                  <p className="text-sm text-gray-600">{selectedNotification.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(selectedNotification.priority)}`}>
                  {getPriorityText(selectedNotification.priority)}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedNotification.status)}`}>
                  {getStatusText(selectedNotification.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">معلومات الإشعار</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">النوع</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(selectedNotification.type)}`}>
                      {getTypeText(selectedNotification.type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">المستلمون</span>
                    <span className="text-sm font-medium">{getRecipientsText(selectedNotification.recipients)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">الإجمالي</span>
                    <span className="text-sm font-medium">{selectedNotification.totalRecipients} مستلم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">المنشئ</span>
                    <span className="text-sm font-medium">{selectedNotification.createdBy}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">التوقيت والأداء</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">وقت الإرسال</span>
                    <span className="text-sm font-medium">{selectedNotification.sentAt || 'لم يتم الإرسال'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">وقت الجدولة</span>
                    <span className="text-sm font-medium">{selectedNotification.scheduledAt || 'غير مجدول'}</span>
                  </div>
                  {selectedNotification.status === 'sent' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">معدل التوصيل</span>
                        <span className="text-sm font-medium">{selectedNotification.deliveryRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">تم القراءة</span>
                        <span className="text-sm font-medium">{selectedNotification.readBy} مستخدم</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              {selectedNotification.status === 'draft' && (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <Send className="w-4 h-4" />
                    إرسال الآن
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    <Calendar className="w-4 h-4" />
                    جدولة
                  </button>
                </>
              )}
              {selectedNotification.status === 'sent' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                  <RefreshCw className="w-4 h-4" />
                  إعادة إرسال
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                <Edit className="w-4 h-4" />
                تعديل
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
