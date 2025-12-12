/**
 * نظرة عامة على الحضانة
 * إحصائيات وإدارة الحضانة
 */

import React, { useState, useEffect } from 'react';
import {
  Baby, Users, Calendar, DollarSign, Heart, AlertCircle,
  Plus, Settings2, TrendingUp, Clock, Activity, Smile, Loader
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

interface NurseryOverviewProps {
  setActiveTab: (tab: string) => void;
}

const NurseryOverview: React.FC<NurseryOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsResponse = await axios.get('/api/dashboard/nursery/stats');
        const actionsResponse = await axios.get('/api/dashboard/nursery/actions');
        setStats(statsResponse.data as DashboardStat[]);
        setActions(actionsResponse.data as DashboardAction[]);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل بيانات الحضانة');
        setLoading(false);
        // Use fallback data
        setStats([
          { id: 'stat_children', title: "الأطفال الحاليين", value: "24", sub: "طفل", icon: Baby, color: "blue" as const },
          { id: 'stat_staff', title: "الموظفين", value: "8", sub: "معلمين وموظفين", icon: Users, color: "green" as const },
          { id: 'stat_revenue', title: "الإيرادات الشهرية", value: "45,000 ج", sub: "هذا الشهر", icon: DollarSign, color: "purple" as const },
          { id: 'stat_attendance', title: "معدل الحضور", value: "92%", sub: "هذا الأسبوع", icon: Activity, color: "orange" as const },
        ]);
        setActions([
          { id: 'act_enroll', label: "تسجيل طفل", icon: Plus, color: "bg-blue-600 text-white", onClick: () => setActiveTab('children') },
          { id: 'act_schedule', label: "الجدول الزمني", icon: Calendar, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('schedule') },
          { id: 'act_staff', label: "إدارة الموظفين", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('staff') },
          { id: 'act_activities', label: "الأنشطة", icon: Activity, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('activities') },
          { id: 'act_meals', label: "الوجبات", icon: Heart, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('meals') },
          { id: 'act_reports', label: "التقارير", icon: TrendingUp, color: "bg-white text-gray-700 border border-gray-200 hover:border-blue-600", onClick: () => setActiveTab('reports') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-blue-600 transition"
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

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            أنشطة اليوم
          </h3>
          <div className="space-y-3">
            {/* Activities will be loaded from API */}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            الأحداث القادمة
          </h3>
          <div className="space-y-3">
            {/* Events will be loaded from API */}
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

export default NurseryOverview;
