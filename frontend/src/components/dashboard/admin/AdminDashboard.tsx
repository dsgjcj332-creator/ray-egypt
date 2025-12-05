
"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, DollarSign, Users, ShoppingBag, 
  Activity, Store, Wallet, ArrowLeft,
  Plus, FileText, Settings, Globe, Shield, Settings2,
  Database, Server, Monitor, Lock, AlertTriangle, TrendingUp,
  UserCheck, CreditCard, BarChart3, PieChart, Download, Upload,
  RefreshCw, Eye, Edit, Trash2, Search, Filter, Calendar, Clock,
  MapPin, Mail, Phone, Zap, Power, Wifi, WifiOff, Battery,
  HardDrive, Cloud, CloudRain, Sun, Moon, Bell, BellRing,
  ChevronRight, ChevronDown, ChevronLeft, MoreVertical, Maximize, Minimize,
  Copy, Share2, Link, ExternalLink, Printer, Save, Send
} from 'lucide-react';
import { BusinessType, dashboardConfigs } from '../config';
import StatCard from '../../../frontend/src/components/common/cards/StatCard';
import SmartInsightsWidget from '../widgets/SmartInsightsWidget';
import QuickActions from '../widgets/QuickActions';
import BusinessHealthWidget from '../widgets/BusinessHealthWidget';
import DashboardCustomizer from '../DashboardCustomizer';

interface GeneralOverviewProps {
  onSwitchType: (type: BusinessType) => void;
}

const GeneralOverview: React.FC<GeneralOverviewProps> = ({ onSwitchType }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  // Aggregate stats with IDs
  const globalStats = [
    { id: 'stat_income', title: 'إجمالي الدخل', value: '1.25M', sub: 'هذا الشهر', icon: Wallet, color: 'blue' as const },
    { id: 'stat_orders', title: 'الطلبات النشطة', value: '342', sub: 'عبر كل الفروع', icon: ShoppingBag, color: 'orange' as const },
    { id: 'stat_clients', title: 'العملاء الجدد', value: '1,205', sub: '+12% نمو', icon: Users, color: 'green' as const },
    { id: 'stat_uptime', title: 'أداء النظام', value: '99.9%', sub: 'وقت التشغيل', icon: Activity, color: 'purple' as const },
  ];

  // Enhanced Admin Actions with IDs
  const globalActions = [
    { id: 'act_new_branch', label: 'إضافة فرع/نشاط', icon: Plus, action: 'new_branch', category: 'management' },
    { id: 'act_users', label: 'إدارة المستخدمين', icon: Users, action: 'users', category: 'management' },
    { id: 'act_reports', label: 'التقارير المجمعة', icon: FileText, action: 'reports', category: 'reports' },
    { id: 'act_settings', label: 'إعدادات المنصة', icon: Settings, action: 'settings', category: 'system' },
    { id: 'act_audit', label: 'سجل النشاطات', icon: Globe, action: 'audit_log', category: 'system' },
    { id: 'act_perms', label: 'الصلاحيات', icon: Shield, action: 'permissions', category: 'security' },
    { id: 'act_database', label: 'قاعدة البيانات', icon: Database, action: 'database', category: 'system' },
    { id: 'act_server', label: 'إدارة الخادم', icon: Server, action: 'server', category: 'system' },
    { id: 'act_monitor', label: 'مراقبة النظام', icon: Monitor, action: 'monitor', category: 'system' },
    { id: 'act_security', label: 'الأمان والحماية', icon: Lock, action: 'security', category: 'security' },
    { id: 'act_alerts', label: 'التنبيهات', icon: AlertTriangle, action: 'alerts', category: 'monitoring' },
    { id: 'act_analytics', label: 'التحليلات المتقدمة', icon: BarChart3, action: 'analytics', category: 'reports' },
    { id: 'act_backup', label: 'النسخ الاحتياطي', icon: Cloud, action: 'backup', category: 'system' },
    { id: 'act_payments', label: 'إدارة المدفوعات', icon: CreditCard, action: 'payments', category: 'finance' },
    { id: 'act_notifications', label: 'الإشعارات', icon: Bell, action: 'notifications', category: 'communication' },
    { id: 'act_logs', label: 'سجلات النظام', icon: FileText, action: 'logs', category: 'system' },
    { id: 'act_performance', label: 'أداء النظام', icon: TrendingUp, action: 'performance', category: 'monitoring' },
    { id: 'act_maintenance', label: 'الصيانة والدعم', icon: Settings2, action: 'maintenance', category: 'system' },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...globalStats.map(s => s.id),
    ...globalActions.map(a => a.id)
  ]);

  const handleSaveCustomization = (newOrderedIds: string[]) => {
    setVisibleIds(newOrderedIds);
  };

  const customizerItems = [
    ...globalStats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...globalActions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  // Context string for AI
  const statsContext = "الدخل: 1.25 مليون (ممتاز)، الطلبات: 342 (نشط)، العملاء الجدد: 1205 (نمو 12%)، النظام مستقر.";

  // Exclude 'general' from apps list
  const apps = Object.entries(dashboardConfigs).filter(([key]) => key !== 'general');

  const handleGlobalAction = (action: string) => {
    console.log("Global Action Triggered:", action);
  };

  // Map visibleIds to actual objects to preserve order
  const displayedStats = visibleIds
    .map(id => globalStats.find(s => s.id === id))
    .filter((s): s is typeof globalStats[0] => !!s);
    
  const displayedActions = visibleIds
    .map(id => globalActions.find(a => a.id === id))
    .filter((a): a is typeof globalActions[0] => !!a);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-8 pb-24 max-w-[1600px] mx-auto relative">
      
      {/* Top Section: Welcome & Intelligence */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Enhanced Admin Welcome Banner */}
        <div className="xl:col-span-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[280px] group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 group-hover:opacity-10 transition-opacity duration-700"></div>
          <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute left-[-20px] top-[-20px] w-48 h-48 bg-ray-gold/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-ray-gold mb-6 border border-white/10 shadow-sm">
              <Shield className="w-4 h-4" />
              لوحة تحكم المشرف العام
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              مركز القيادة الموحد
              <span className="block text-2xl md:text-3xl text-ray-gold mt-2">RAY Admin Hub</span>
            </h1>
            <p className="text-slate-300 max-w-xl text-base leading-relaxed mb-6">
              مرحباً بك في لوحة التحكم الرئيسية. إدارة شاملة للنظام، مراقبة الأداء، التحكم في المستخدمين، والصيانة الكاملة للمنصة.
            </p>
            
            {/* Quick Status Indicators */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">النظام يعمل</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30">
                <Database className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium">قاعدة بيانات متصلة</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1.5 rounded-full border border-yellow-500/30">
                <Users className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-medium">5 مستخدمين نشطين</span>
              </div>
            </div>
          </div>
        </div>

        {/* Widgets */}
        <div className="xl:col-span-1">
           <SmartInsightsWidget dataContext={statsContext} />
        </div>
        <div className="xl:col-span-1">
           <BusinessHealthWidget score={88} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Actions & Stats */}
        <div className="lg:col-span-2 space-y-8">
           
           <div className="flex justify-end mb-[-20px] relative z-10">
             <button 
               onClick={() => setIsCustomizerOpen(true)}
               className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-200 dark:border-gray-700 hover:border-slate-400 transition"
             >
               <Settings2 className="w-3 h-3" />
               ترتيب وتخصيص
             </button>
           </div>

           {/* Global Stats */}
           {displayedStats.length > 0 && (
             <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-500" />
                  نظرة عامة على الأداء
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayedStats.map((stat) => (
                  <StatCard 
                    key={stat.id}
                    title={stat.title} 
                    value={stat.value} 
                    sub={stat.sub} 
                    icon={stat.icon} 
                    color={stat.color} 
                  />
                ))}
              </div>
            </div>
           )}

          {/* Enhanced Admin Actions */}
          {displayedActions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  لوحة التحكم الإدارية
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>صلاحيات كاملة</span>
                </div>
              </div>
              
              {/* Categorized Actions */}
              <div className="space-y-6">
                {/* System Management */}
                <div>
                  <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    إدارة النظام
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {displayedActions.filter(a => a.category === 'system').map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleGlobalAction(action.action)}
                        className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-2xl border border-slate-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-right"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <action.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.label}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Security & Monitoring */}
                <div>
                  <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    الأمان والمراقبة
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {displayedActions.filter(a => a.category === 'security' || a.category === 'monitoring').map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleGlobalAction(action.action)}
                        className="group bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-2xl border border-red-200 dark:border-red-800 hover:border-red-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-right"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <action.icon className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {action.label}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Management & Reports */}
                <div>
                  <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    الإدارة والتقارير
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {displayedActions.filter(a => a.category === 'management' || a.category === 'reports').map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleGlobalAction(action.action)}
                        className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-800 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-right"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <action.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-green-600 transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {action.label}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Apps Grid (Launchpad) */}
        <div className="lg:col-span-1">
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-slate-500" />
            تطبيقات الأعمال
           </h2>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {apps.map(([key, config]) => {
              const themeColor = config.themeColor || 'blue';
              return (
                <div 
                  key={key}
                  className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex items-center p-4 gap-4 relative overflow-hidden cursor-pointer"
                  onClick={() => onSwitchType(key as BusinessType)}
                >
                  {/* Hover Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-${themeColor}-50 to-transparent dark:from-${themeColor}-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className={`p-3 rounded-2xl bg-${themeColor}-50 dark:bg-${themeColor}-900/30 text-${themeColor}-600 dark:text-${themeColor}-400 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10`}>
                    <Store className="w-6 h-6" /> 
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-ray-blue dark:group-hover:text-ray-gold transition-colors">{config.title}</h3>
                      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-ray-blue dark:group-hover:text-ray-gold transform group-hover:-translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      نظام متكامل لإدارة {key === 'restaurant' ? 'المطاعم' : key === 'retail' ? 'المحلات' : 'النشاط'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={customizerItems}
        visibleIds={visibleIds}
        onSave={handleSaveCustomization}
      />
    </div>
  );
};

export default GeneralOverview;
