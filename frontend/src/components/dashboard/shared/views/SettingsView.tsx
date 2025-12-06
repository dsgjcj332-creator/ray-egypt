
import React, { useState } from 'react';
import { 
  Save, Store, Bell, Shield, CreditCard, Users, Mail, Lock, 
  Smartphone, CheckCircle, Plus, Trash2, FileText, AlertCircle, Printer,
  Palette, Globe, Layout
} from 'lucide-react';
import DocumentTemplateView from '../../systems/settings/DocumentTemplateView';
import StorefrontBuilder from '../../systems/settings/StorefrontBuilder';

const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const sections = [
    { id: 'general', label: 'عام', icon: Store },
    { id: 'storefront', label: 'المتجر الإلكتروني', icon: Palette },
    { id: 'templates', label: 'الفواتير والطباعة', icon: Printer },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'security', label: 'الأمان والصلاحيات', icon: Shield },
    { id: 'billing', label: 'الاشتراك والفواتير', icon: CreditCard },
    { id: 'team', label: 'فريق العمل', icon: Users },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-2 relative">
      
      {/* Success Toast */}
      {saveSuccess && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold">تم حفظ التغييرات بنجاح</span>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 h-fit overflow-y-auto transition-colors">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 px-2 flex items-center gap-2">
           <Layout className="w-5 h-5 text-blue-500" /> إعدادات النظام
        </h3>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-sm
                ${activeSection === section.id 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'}
              `}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 overflow-y-auto transition-colors">
        
        {/* --- General Settings --- */}
        {activeSection === 'general' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">إعدادات النشاط التجاري</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">تحكم في المعلومات الأساسية التي تظهر للعملاء</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اسم النشاط</label>
                <input type="text" defaultValue="متجر النور" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:border-blue-500 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">رقم الهاتف</label>
                <input type="text" defaultValue="01234567890" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:border-blue-500 dark:text-white" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">العنوان</label>
                <input type="text" defaultValue="شارع 9، المعادي، القاهرة" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:border-blue-500 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">العملة الافتراضية</label>
                <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:border-blue-500 dark:text-white">
                  <option>الجنيه المصري (EGP)</option>
                  <option>الدولار الأمريكي (USD)</option>
                  <option>الريال السعودي (SAR)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اللغة</label>
                <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 focus:outline-none focus:border-blue-500 dark:text-white">
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Save className="w-4 h-4" />
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}

        {/* --- Storefront Builder --- */}
        {activeSection === 'storefront' && (
           <StorefrontBuilder />
        )}

        {/* --- Templates Settings --- */}
        {activeSection === 'templates' && (
           <DocumentTemplateView />
        )}

        {/* --- Notification Settings --- */}
        {activeSection === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">إعدادات التنبيهات</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">اختر كيف ومتى تريد تلقي الإشعارات</p>
                </div>
                <div className="space-y-4">
                    {['تنبيه عند طلب جديد', 'تنبيه عند انخفاض المخزون', 'تنبيه عند انتهاء وردية', 'التقرير اليومي عبر البريد', 'إشعارات العملاء'].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                            <span className="font-bold text-gray-700 dark:text-gray-200">{item}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="pt-4 flex justify-end">
                   <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-md">
                      <Save className="w-4 h-4" />
                      حفظ التفضيلات
                   </button>
                </div>
            </div>
        )}

        {/* --- Security Settings --- */}
        {activeSection === 'security' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">الأمان والحماية</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">إدارة كلمة المرور وتأمين الحساب</p>
            </div>

            <div className="bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                تغيير كلمة المرور
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="password" placeholder="كلمة المرور الحالية" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" />
                <div className="hidden md:block"></div>
                <input type="password" placeholder="كلمة المرور الجديدة" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" />
                <input type="password" placeholder="تأكيد كلمة المرور الجديدة" className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-sm focus:border-blue-500 outline-none dark:text-white" />
              </div>
              <button onClick={handleSave} className="bg-gray-800 dark:bg-gray-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-black dark:hover:bg-gray-950 transition">تحديث</button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  المصادقة الثنائية (2FA)
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">تأمين حسابك برمز يرسل لهاتفك عند تسجيل الدخول.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* --- Billing Settings --- */}
        {activeSection === 'billing' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">الاشتراك والفواتير</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">إدارة باقتك الحالية وتفاصيل الدفع</p>
            </div>

            {/* Current Plan */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400">
                     <Store className="w-8 h-8" />
                  </div>
                  <div>
                     <p className="text-gray-400 text-xs font-bold uppercase">الباقة الحالية</p>
                     <h3 className="text-2xl font-black mt-1">RAY Business Pro</h3>
                     <p className="text-sm text-gray-300 mt-1">تنتهي في 25 ديسمبر 2025</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <button className="px-6 py-2 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition">إدارة الباقة</button>
                  <button className="px-6 py-2 bg-yellow-500 text-black rounded-xl font-bold text-sm hover:bg-yellow-400 transition shadow-md">ترقية</button>
               </div>
            </div>

            {/* Invoices */}
            <div>
               <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  سجل الفواتير
               </h3>
               <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <div className="flex items-center gap-4">
                           <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"><FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" /></div>
                           <div>
                              <p className="font-bold text-sm text-gray-800 dark:text-gray-200">تجديد اشتراك شهري</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">25 نوفمبر 2025</p>
                           </div>
                        </div>
                        <div className="text-left">
                           <p className="font-bold text-gray-900 dark:text-white">450.00 ج</p>
                           <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">تحميل PDF</button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* --- Team Settings --- */}
        {activeSection === 'team' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
               <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">فريق العمل</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">إدارة الموظفين وصلاحيات الدخول</p>
               </div>
               <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition flex items-center gap-2 shadow-md">
                  <Plus className="w-4 h-4" />
                  إضافة عضو
               </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {[
                  { name: 'أحمد محمد', role: 'مدير النظام (Admin)', email: 'ahmed@example.com', status: 'active' },
                  { name: 'سارة علي', role: 'كاشير', email: 'sara@example.com', status: 'active' },
                  { name: 'محمود حسن', role: 'مدير مخزن', email: 'mahmoud@example.com', status: 'inactive' },
               ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-sm transition bg-white dark:bg-gray-800/50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                           {member.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="font-bold text-sm text-gray-900 dark:text-white">{member.name}</h4>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${member.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                           {member.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                        <button className="text-gray-400 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800">
               <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
               <div>
                  <h4 className="font-bold text-sm text-blue-900 dark:text-blue-200">صلاحيات الفريق</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">يمكن للمدير فقط إضافة أو حذف أعضاء الفريق وتعديل الإعدادات الحساسة.</p>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SettingsView;
