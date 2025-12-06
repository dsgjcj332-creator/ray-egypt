/**
 * Context لإدارة التوجيه والملاحة
 * يوفر معلومات التوجيه والأنشطة المتاحة
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserActivity, ACTIVITY_ROUTES, buildNavigationPath } from '../services/registrationService';

interface NavigationContextType {
  userProfile: UserProfile | null;
  currentActivity: UserActivity | null;
  activities: UserActivity[];
  isLoading: boolean;
  setCurrentActivity: (activity: UserActivity) => void;
  getActivityRoute: (activityType: string) => string;
  navigateToActivity: (activity: UserActivity) => void;
  addActivity: (activity: UserActivity) => void;
  removeActivity: (activityId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// بيانات تجريبية
const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+201001234567',
  role: 'merchant',
  activities: [
    {
      id: 'activity-001',
      activityType: 'restaurant',
      name: 'مطعم الذوق الشرقي',
      description: 'مطعم متخصص في الأكلات الشرقية',
      status: 'active',
      subscriptionId: 'sub-user-001',
      createdAt: '2024-01-15',
      role: 'owner'
    },
    {
      id: 'activity-002',
      activityType: 'retail',
      name: 'متجر الملابس الحديثة',
      description: 'متجر ملابس عصري',
      status: 'active',
      subscriptionId: 'sub-user-001',
      createdAt: '2024-03-20',
      role: 'owner'
    },
    {
      id: 'activity-003',
      activityType: 'clinic',
      name: 'عيادة الدكتور أحمد',
      description: 'عيادة طب عام',
      status: 'pending',
      subscriptionId: 'sub-user-001',
      createdAt: '2024-11-01',
      role: 'owner'
    }
  ],
  createdAt: '2024-01-01',
  updatedAt: '2024-11-01'
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentActivity, setCurrentActivityState] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب بيانات المستخدم والأنشطة
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        // في الواقع، سيتم جلب البيانات من API
        // const response = await fetch('/api/users/profile');
        // const data = await response.json();
        // setUserProfile(data);

        // للآن، نستخدم البيانات التجريبية
        setUserProfile(MOCK_USER_PROFILE);
        if (MOCK_USER_PROFILE.activities.length > 0) {
          setCurrentActivityState(MOCK_USER_PROFILE.activities[0]);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات المستخدم:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const setCurrentActivity = (activity: UserActivity) => {
    setCurrentActivityState(activity);
  };

  const getActivityRoute = (activityType: string): string => {
    return ACTIVITY_ROUTES[activityType] || '/dashboard';
  };

  const navigateToActivity = (activity: UserActivity) => {
    setCurrentActivityState(activity);
    // في الواقع، سيتم التوجيه باستخدام Next.js router
    // router.push(getActivityRoute(activity.activityType));
  };

  const addActivity = (activity: UserActivity) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        activities: [...userProfile.activities, activity],
        updatedAt: new Date().toISOString()
      });
    }
  };

  const removeActivity = (activityId: string) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        activities: userProfile.activities.filter(a => a.id !== activityId),
        updatedAt: new Date().toISOString()
      });
    }
  };

  const value: NavigationContextType = {
    userProfile,
    currentActivity,
    activities: userProfile?.activities || [],
    isLoading,
    setCurrentActivity,
    getActivityRoute,
    navigateToActivity,
    addActivity,
    removeActivity
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation يجب أن يكون داخل NavigationProvider');
  }
  return context;
};
