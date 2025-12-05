import React from 'react';
import { User, ChevronLeft, Bell, ShieldCheck, Settings } from 'lucide-react';

interface ProfileViewProps {
  onNavigate?: (view: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">الملف الشخصي</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">أحمد محمد</h3>
            <p className="text-gray-500">ahmed@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>معلومات الحساب</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>العناوين</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>طرق الدفع</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">الإعدادات</h3>
        <div className="space-y-4">
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>الإشعارات</span>
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>الخصوصية</span>
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button className="w-full text-right p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <span>اللغة</span>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
