
import React, { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Droplets, Battery, Calendar, Users, 
  Settings2, AlertTriangle, CheckCircle, Navigation, Fuel, Gauge, Plus, Layers, Loader
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

interface CarWashOverviewProps {
  setActiveTab: (tab: string) => void;
}

const CarWashOverview: React.FC<CarWashOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [fleet, setFleet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsResponse = await axios.get('/api/dashboard/carwash/stats');
        const actionsResponse = await axios.get('/api/dashboard/carwash/actions');
        const fleetResponse = await axios.get('/api/dashboard/carwash/fleet');
        setStats(statsResponse.data as DashboardStat[]);
        setActions(actionsResponse.data as DashboardAction[]);
        setFleet(fleetResponse.data as any[]);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل بيانات غسيل السيارات');
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

  // Load saved config
  useEffect(() => {
    const savedConfig = localStorage.getItem('ray_dashboard_config_carwash');
    if (savedConfig) {
      try {
        setVisibleIds(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error parsing dashboard config', e);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => {
      const newState = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('ray_dashboard_config_carwash', JSON.stringify(newState));
      return newState;
    });
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-cyan-500 transition"
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
         {/* Fleet Status */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-600" />
                    حالة الوحدات المتنقلة (Vans)
                </h3>
                <button 
                  onClick={() => setActiveTab('fleet')}
                  className="text-sm text-cyan-600 font-bold hover:bg-cyan-50 px-3 py-1 rounded transition"
                >
                  عرض الخريطة
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fleet.map(van => (
                   <div key={van.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition group">
                      <div className="flex justify-between items-start mb-3">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${van.status === 'active' ? 'bg-green-500' : van.status === 'busy' ? 'bg-orange-500' : 'bg-red-500'}`}>
                               {van.id}
                            </div>
                            <div>
                               <h4 className="font-bold text-sm text-gray-900">{van.driver}</h4>
                               <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {van.location}
                               </p>
                            </div>
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${van.status === 'active' ? 'bg-green-100 text-green-700' : van.status === 'busy' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {van.status === 'active' ? 'متاح' : van.status === 'busy' ? 'في مهمة' : 'صيانة'}
                         </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <Fuel className="w-3 h-3 mx-auto text-gray-400 mb-1" />
                            <span className="font-bold">{van.fuel}%</span>
                         </div>
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <Droplets className={`w-3 h-3 mx-auto mb-1 ${van.water < 30 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`} />
                            <span className="font-bold">{van.water}%</span>
                         </div>
                         <div className="bg-gray-50 p-2 rounded-lg">
                            <CheckCircle className="w-3 h-3 mx-auto text-green-500 mb-1" />
                            <span className="font-bold">{van.jobs} مهام</span>
                         </div>
                      </div>
                   </div>
                ))}
            </div>
         </div>

         {/* Active Jobs */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">الطلبات الحالية</h3>
            <div className="space-y-4">
               <div className="flex gap-3 items-start pb-4 border-b border-gray-50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <div>
                     <h4 className="font-bold text-sm">غسيل كيماوي كامل</h4>
                     <p className="text-xs text-gray-500">أحمد محمد • Kia Sportage</p>
                     <p className="text-[10px] text-gray-400 mt-1">التجمع الخامس (جاري التنفيذ)</p>
                  </div>
               </div>
               <div className="flex gap-3 items-start pb-4 border-b border-gray-50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                     <h4 className="font-bold text-sm">غسيل وتشميع</h4>
                     <p className="text-xs text-gray-500">سارة علي • Toyota Corolla</p>
                     <p className="text-[10px] text-gray-400 mt-1">المعادي (في الطريق)</p>
                  </div>
               </div>
               <button className="w-full py-2 text-sm text-cyan-600 font-bold bg-cyan-50 rounded-lg hover:bg-cyan-100 transition">
                  عرض كل الطلبات
               </button>
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

export default CarWashOverview;
