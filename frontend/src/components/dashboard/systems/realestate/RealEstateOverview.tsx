
import React, { useState, useEffect } from 'react';
import { 
  BadgeDollarSign, Home, Users, Calendar, Plus, 
  Calculator, FileText, Camera, Settings2, Loader
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
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

interface RealEstateOverviewProps {
  setActiveTab: (tab: string) => void;
}

const RealEstateOverview: React.FC<RealEstateOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsResponse = await axios.get('/api/dashboard/realestate/stats');
        const actionsResponse = await axios.get('/api/dashboard/realestate/actions');
        setStats(statsResponse.data as DashboardStat[]);
        setActions(actionsResponse.data as DashboardAction[]);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل بيانات العقارات');
        setLoading(false);
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-green-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-green-600 transition"
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
         {/* Pipeline Visualization */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">مسار المبيعات (Pipeline)</h3>
            <div className="flex flex-col md:flex-row gap-2 items-center">
               <PipelineStage label="جديد" count={12} color="bg-blue-100 text-blue-700" />
               <div className="w-full md:w-8 h-1 md:h-auto border-t md:border-t-0 md:border-r border-gray-300"></div>
               <PipelineStage label="تم التواصل" count={8} color="bg-purple-100 text-purple-700" />
               <div className="w-full md:w-8 h-1 md:h-auto border-t md:border-t-0 md:border-r border-gray-300"></div>
               <PipelineStage label="معاينة" count={5} color="bg-orange-100 text-orange-700" />
               <div className="w-full md:w-8 h-1 md:h-auto border-t md:border-t-0 md:border-r border-gray-300"></div>
               <PipelineStage label="تفاوض" count={3} color="bg-yellow-100 text-yellow-700" />
               <div className="w-full md:w-8 h-1 md:h-auto border-t md:border-t-0 md:border-r border-gray-300"></div>
               <PipelineStage label="إغلاق" count={2} color="bg-green-100 text-green-700" />
            </div>
         </div>

         {/* Recent Inquiries */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">أحدث الاستفسارات</h3>
            <div className="space-y-4">
               {/* Inquiries will be loaded from API */}
            </div>
            <button 
              onClick={() => setActiveTab('leads')}
              className="w-full mt-4 py-2 text-sm font-bold text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              عرض كل العملاء
            </button>
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

const PipelineStage = ({ label, count, color }: any) => (
  <div className={`flex-1 w-full p-4 rounded-xl text-center ${color}`}>
    <h4 className="text-2xl font-black mb-1">{count}</h4>
    <span className="text-xs font-bold opacity-80">{label}</span>
  </div>
);

const InquiryCard = ({ name, type, time }: any) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 font-bold border border-gray-200">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-sm text-gray-800">{name}</h4>
        <p className="text-xs text-gray-500">{type}</p>
      </div>
    </div>
    <span className="text-[10px] text-gray-400">{time}</span>
  </div>
);

export default RealEstateOverview;
