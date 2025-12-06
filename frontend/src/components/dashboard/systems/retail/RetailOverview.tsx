import React, { useState } from 'react';
import { 
  Store, DollarSign, ShoppingCart, Users, TrendingUp, 
  Package, AlertCircle, Settings2, Plus 
} from 'lucide-react';
import StatCard from '../../../common/cards/StatCard';
import ActionButton from '../../../common/buttons/ActionButton';
import DashboardCustomizer from '../../DashboardCustomizer';

interface RetailOverviewProps {
  setActiveTab: (tab: string) => void;
}

const RetailOverview: React.FC<RetailOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "المبيعات اليومية", value: "12,450 ج", sub: "85 عملية بيع", icon: DollarSign, color: "green" as const },
    { id: 'stat_orders', title: "الطلبات المعلقة", value: "12", sub: "جاهزة للتسليم", icon: ShoppingCart, color: "orange" as const },
    { id: 'stat_customers', title: "العملاء النشطين", value: "245", sub: "هذا الشهر", icon: Users, color: "blue" as const },
    { id: 'stat_stock', title: "المنتجات المنخفضة", value: "8", sub: "تحتاج إعادة ترتيب", icon: Package, color: "yellow" as const },
    { id: 'stat_revenue', title: "الإيرادات الشهرية", value: "185,000 ج", sub: "حتى الآن", icon: TrendingUp, color: "green" as const },
    { id: 'stat_growth', title: "معدل النمو", value: "+15%", sub: "مقارنة بالشهر الماضي", icon: TrendingUp, color: "blue" as const },
  ];

  const defaultActions = [
    { id: 'act_new_sale', label: "عملية بيع جديدة", icon: Plus, color: "bg-green-600 text-white", onClick: () => setActiveTab('pos') },
    { id: 'act_inventory', label: "إدارة المخزون", icon: Package, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_customers', label: "إدارة العملاء", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-500", onClick: () => setActiveTab('crm') },
    { id: 'act_orders', label: "الطلبات المعلقة", icon: ShoppingCart, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-500", onClick: () => setActiveTab('orders') },
    { id: 'act_suppliers', label: "إدارة الموردين", icon: Store, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_reports', label: "التقارير", icon: TrendingUp, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-500", onClick: () => setActiveTab('reports') },
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
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Store className="w-6 h-6 text-green-600" />
            نظرة عامة على المبيعات
          </h2>
          <p className="text-sm text-gray-500">ملخص الأداء اليومي والشهري</p>
        </div>
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Settings2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultStats.map(stat => 
          visibleIds.includes(stat.id) && (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              sub={stat.sub}
              icon={stat.icon}
              color={stat.color}
            />
          )
        )}
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {defaultActions.map(action =>
          visibleIds.includes(action.id) && (
            <ActionButton
              key={action.id}
              label={action.label}
              icon={action.icon}
              className={action.color}
              onClick={action.onClick}
            />
          )
        )}
      </div>

      {/* Customizer */}
      {isCustomizerOpen && (
        <DashboardCustomizer
          isOpen={isCustomizerOpen}
          items={customizerItems}
          visibleIds={visibleIds}
          onToggle={handleToggle}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}
    </div>
  );
};

export default RetailOverview;
