
import React, { useState, useEffect } from 'react';
import { 
  Shirt, Waves, CheckCircle, Clock, Plus, Tag, 
  Ticket, Truck, ShoppingBag, Wind, Settings2, Loader
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import LoyaltyWidget from '../../shared/widgets/LoyaltyWidget';
import axios from 'axios';

interface DashboardStat {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any; // LucideIcon
  color: any; // StatColor
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any; // LucideIcon
  color: string;
  onClick: () => void;
}

interface LaundryOverviewProps {
  setActiveTab: (tab: string) => void;
}

const LaundryOverview: React.FC<LaundryOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsResponse = await axios.get('/api/dashboard/laundry/stats');
        const actionsResponse = await axios.get('/api/dashboard/laundry/actions');
        setStats(statsResponse.data as DashboardStat[]);
        setActions(actionsResponse.data as DashboardAction[]);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل بيانات المغسلة');
        setLoading(false);
        // Use fallback data
        setStats([
          { id: 'stat_received', title: "قطع مستلمة", value: "150", sub: "اليوم", icon: Shirt, color: "blue" as const },
          { id: 'stat_processing', title: "في التشغيل", value: "45", sub: "غسيل وكي", icon: Waves, color: "cyan" as const },
          { id: 'stat_ready', title: "جاهز للتسليم", value: "32", sub: "انتظار عميل", icon: CheckCircle, color: "green" as const },
          { id: 'stat_urgent', title: "طلبات مستعجلة", value: "5", sub: "أولوية قصوى", icon: Clock, color: "red" as const },
        ]);
        setActions([
          { id: 'act_receive', label: "استلام ملابس", icon: Plus, color: "bg-cyan-600 text-white", onClick: () => setActiveTab('received') },
          { id: 'act_deliver', label: "تسليم عميل", icon: CheckCircle, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('ready') },
          { id: 'act_urgent', label: "طلب مستعجل", icon: Clock, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('received') },
          { id: 'act_tag', label: "طباعة تاج", icon: Tag, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('received') },
          { id: 'act_sub', label: "اشتراك جديد", icon: Ticket, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('subscriptions') },
          { id: 'act_delivery', label: "طلب توصيل", icon: Truck, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('delivery') },
        ]);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex items-center justify-center p-8"><Loader className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...stats.map(s => s.id),
    ...actions.map(a => a.id)
  ]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...stats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...actions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-cyan-600 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {stats.filter(s => visibleIds.includes(s.id)).map(stat => (
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
        {actions.filter(a => visibleIds.includes(a.id)).map(action => (
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
         {/* Kanban Stages */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-600" />
                    مراحل التشغيل
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stages will be loaded from API */}
            </div>
         </div>

         {/* Loyalty Widget Column */}
         <div className="space-y-6">
            <LoyaltyWidget 
                type="points" 
                title="نقاط الولاء" 
                current={450} 
                total={1000} 
                reward="غسيل بدلة مجاناً" 
                color="bg-cyan-600"
            />
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">اشتراكات نشطة</h3>
                <div className="space-y-3">
                    {/* Subscriptions will be loaded from API */}
                </div>
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

const StageColumn = ({ title, count, children, color, icon: Icon }: any) => (
    <div className={`rounded-xl border p-3 flex flex-col h-full ${color}`}>
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-black/5">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-700">
                <Icon className="w-4 h-4" />
                {title}
            </div>
            <span className="bg-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">{count}</span>
        </div>
        <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px]">
            {children}
        </div>
    </div>
);

const OrderCard = ({ id, items, customer, status, onClick }: any) => (
    <div 
      onClick={onClick}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group"
    >
        <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-xs text-gray-800">{id}</span>
            {status === 'urgent' && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold animate-pulse">مستعجل</span>}
        </div>
        <h4 className="font-bold text-sm text-gray-900 mb-1">{customer}</h4>
        <p className="text-xs text-gray-500 flex items-center gap-1">
            <Shirt className="w-3 h-3" /> {items}
        </p>
    </div>
);

export default LaundryOverview;
