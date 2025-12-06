
import React, { useState } from 'react';
import { 
  Pill, FileText, AlertCircle, DollarSign, Plus, 
  ShoppingBag, Truck, Search, Tag, Settings2, Clock, CheckCircle, MapPin, Phone
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../DashboardCustomizer';

interface PharmacyOverviewProps {
  setActiveTab: (tab: string) => void;
}

const PharmacyOverview: React.FC<PharmacyOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_pending', title: "طلبات معلقة", value: "12", sub: "تحتاج توصيل", icon: Clock, color: "orange" as const },
    { id: 'stat_completed', title: "طلبات مكتملة", value: "48", sub: "اليوم", icon: CheckCircle, color: "green" as const },
    { id: 'stat_earnings', title: "أرباحك اليوم", value: "1,200 ج", sub: "من التوصيلات", icon: DollarSign, color: "teal" as const },
    { id: 'stat_rating', title: "تقييمك", value: "4.8", sub: "من 5 نجوم", icon: Pill, color: "blue" as const },
  ];

  const defaultActions = [
    { id: 'act_pending', label: "الطلبات المعلقة", icon: Clock, color: "bg-orange-600 text-white", onClick: () => setActiveTab('prescriptions') },
    { id: 'act_messages', label: "الرسائل", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('messages') },
    { id: 'act_location', label: "الخريطة", icon: MapPin, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('overview') },
    { id: 'act_earnings', label: "أرباحك", icon: DollarSign, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('payments') },
    { id: 'act_contact', label: "تواصل الدعم", icon: Phone, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('messages') },
    { id: 'act_profile', label: "ملفك الشخصي", icon: Plus, color: "bg-white text-gray-700 border border-gray-200 hover:border-teal-600", onClick: () => setActiveTab('settings') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...defaultStats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...defaultActions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-teal-600 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {defaultStats.filter(s => visibleIds.includes(s.id)).map(stat => (
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

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {defaultActions.filter(a => visibleIds.includes(a.id)).map(action => (
          <ActionButton 
            key={action.id}
            icon={action.icon} 
            label={action.label} 
            color={action.color} 
            onClick={action.onClick} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Pending Orders */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    الطلبات المعلقة
                </h3>
                <span className="text-xs bg-orange-50 text-orange-800 px-2 py-1 rounded font-bold">12 طلب</span>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">طلب #1024</h4>
                         <p className="text-xs text-orange-600">العنوان: شارع النيل، القاهرة</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('messages')}
                     className="text-xs font-bold text-orange-700 border border-orange-200 px-3 py-1 rounded bg-white hover:bg-orange-50 transition"
                   >
                     تفاصيل
                   </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                         <Phone className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">طلب #1023</h4>
                         <p className="text-xs text-blue-700">العميل: أحمد محمد - 01012345678</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('messages')}
                     className="text-xs font-bold text-blue-700 border border-blue-200 px-3 py-1 rounded bg-white hover:bg-blue-50 transition"
                   >
                     اتصل
                   </button>
                </div>
            </div>
         </div>

         {/* Earnings Summary */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">ملخص أرباحك</h3>
            <div className="space-y-4">
               <ItemRow name="اليوم" count="1,200 ج" />
               <ItemRow name="هذا الأسبوع" count="7,500 ج" />
               <ItemRow name="هذا الشهر" count="28,000 ج" />
               <ItemRow name="الإجمالي" count="145,000 ج" />
            </div>
         </div>
      </div>

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={customizerItems}
        visibleIds={visibleIds}
        onToggle={handleToggle}
      />
    </div>
  );
};

const ItemRow = ({ name, count }: any) => (
    <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{count}</span>
    </div>
);

export default PharmacyOverview;
