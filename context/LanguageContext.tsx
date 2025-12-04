"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.offers': 'العروض والخصومات',
    'nav.cart': 'السلة',
    'nav.favorites': 'المفضلة',
    'nav.profile': 'حسابي',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    'nav.search': 'بحث...',
    'nav.categories': 'الأقسام',
    'nav.register_business': 'سجّل نشاطك (تجار)',
    
    // Categories
    'cat.restaurants': 'مطاعم',
    'cat.shopping': 'تسوق',
    'cat.services': 'خدمات',
    'cat.health': 'صحة',
    'cat.education': 'تعليم',
    'cat.entertainment': 'ترفيه',
    'cat.automotive': 'سيارات',
    'cat.real_estate': 'عقارات',
    'cat.beauty': 'جمال',
    'cat.sports': 'رياضة',
    'cat.technology': 'تقنية',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'تم بنجاح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.add': 'إضافة',
    'common.view': 'عرض',
    'common.more': 'المزيد',
    'common.less': 'أقل',
    'common.close': 'إغلاق',
    'common.open': 'فتح',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.reset': 'إعادة تعيين',
    'common.clear': 'مسح',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.search': 'بحث',
    'common.all': 'الكل',
    'common.none': 'لا شيء',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.ok': 'موافق',
    'common.back': 'رجوع',
    'common.continue': 'متابعة',
    'common.finish': 'إنهاء',
    'common.start': 'بدء',
    'common.stop': 'إيقاف',
    'common.pause': 'إيقاف مؤقت',
    'common.play': 'تشغيل',
    
    // Messages
    'msg.no_results': 'لا توجد نتائج',
    'msg.network_error': 'خطأ في الاتصال بالشبكة',
    'msg.server_error': 'خطأ في الخادم',
    'msg.validation_error': 'خطأ في التحقق من البيانات',
    'msg.auth_required': 'يجب تسجيل الدخول أولاً',
    'msg.permission_denied': 'ليس لديك صلاحية للقيام بهذا',
    'msg.session_expired': 'انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى',
    'msg.confirm_delete': 'هل أنت متأكد من الحذف؟',
    'msg.confirm_logout': 'هل أنت متأكد من تسجيل الخروج؟',
    'msg.saved_successfully': 'تم الحفظ بنجاح',
    'msg.updated_successfully': 'تم التحديث بنجاح',
    'msg.deleted_successfully': 'تم الحذف بنجاح',
    'msg.added_successfully': 'تمت الإضافة بنجاح',
    'msg.login_successfully': 'تم تسجيل الدخول بنجاح',
    'msg.logout_successfully': 'تم تسجيل الخروج بنجاح',
    
    // Forms
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.password': 'كلمة المرور',
    'form.confirm_password': 'تأكيد كلمة المرور',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.country': 'الدولة',
    'form.postal_code': 'الرمز البريدي',
    'form.description': 'الوصف',
    'form.price': 'السعر',
    'form.quantity': 'الكمية',
    'form.category': 'الفئة',
    'form.subcategory': 'الفئة الفرعية',
    'form.image': 'الصورة',
    'form.images': 'الصور',
    'form.website': 'الموقع الإلكتروني',
    'form.social_media': 'وسائل التواصل الاجتماعي',
    'form.working_hours': 'ساعات العمل',
    'form.contact_info': 'معلومات الاتصال',
    
    // Validation
    'validation.required': 'هذا الحقل مطلوب',
    'validation.email': 'البريد الإلكتروني غير صحيح',
    'validation.phone': 'رقم الهاتف غير صحيح',
    'validation.password_min': 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    'validation.password_match': 'كلمات المرور غير متطابقة',
    'validation.min_length': 'يجب أن يكون {field} على الأقل {min} أحرف',
    'validation.max_length': 'يجب أن يكون {field} على الأكثر {max} أحرف',
    'validation.number': 'يجب أن يكون رقماً',
    'validation.positive': 'يجب أن يكون رقماً موجباً',
    'validation.url': 'الرابط غير صحيح',
    'validation.image': 'يجب أن يكون صورة',
    'validation.file_size': 'حجم الملف كبير جداً',
    'validation.file_type': 'نوع الملف غير مدعوم',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.analytics': 'التحليلات',
    'dashboard.reports': 'التقارير',
    'dashboard.settings': 'الإعدادات',
    'dashboard.profile': 'الملف الشخصي',
    'dashboard.notifications': 'الإشعارات',
    'dashboard.messages': 'الرسائل',
    'dashboard.orders': 'الطلبات',
    'dashboard.products': 'المنتجات',
    'dashboard.customers': 'العملاء',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.sales': 'المبيعات',
    'dashboard.visitors': 'الزوار',
    'dashboard.conversion': 'معدل التحويل',
    
    // Marketplace
    'marketplace.title': 'السوق',
    'marketplace.all_products': 'جميع المنتجات',
    'marketplace.featured': 'المميزة',
    'marketplace.new_arrivals': 'الوافدون الجدد',
    'marketplace.best_sellers': 'الأكثر مبيعاً',
    'marketplace.offers': 'العروض',
    'marketplace.categories': 'الفئات',
    'marketplace.filters': 'الفلاتر',
    'marketplace.sort_by': 'ترتيب حسب',
    'marketplace.price_low_high': 'السعر: من الأقل للأعلى',
    'marketplace.price_high_low': 'السعر: من الأعلى للأقل',
    'marketplace.newest': 'الأحدث',
    'marketplace.popular': 'الأكثر شعبية',
    'marketplace.rating': 'التقييم',
    'marketplace.free_shipping': 'شحن مجاني',
    'marketplace.in_stock': 'متوفر',
    'marketplace.out_of_stock': 'نفد المخزون',
    'marketplace.add_to_cart': 'أضف للسلة',
    'marketplace.buy_now': 'اشتر الآن',
    'marketplace.product_details': 'تفاصيل المنتج',
    'marketplace.product_description': 'وصف المنتج',
    'marketplace.product_specifications': 'مواصفات المنتج',
    'marketplace.product_reviews': 'مراجعات المنتج',
    'marketplace.write_review': 'كتابة مراجعة',
    
    // Currency
    'currency.egp': 'ج.م',
    'currency.usd': '$',
    'currency.eur': '€',
    'currency.gbp': '£',
    
    // Time
    'time.now': 'الآن',
    'time.minute_ago': 'منذ دقيقة',
    'time.minutes_ago': 'منذ {count} دقائق',
    'time.hour_ago': 'منذ ساعة',
    'time.hours_ago': 'منذ {count} ساعات',
    'time.day_ago': 'منذ يوم',
    'time.days_ago': 'منذ {count} أيام',
    'time.week_ago': 'منذ أسبوع',
    'time.weeks_ago': 'منذ {count} أسابيع',
    'time.month_ago': 'منذ شهر',
    'time.months_ago': 'منذ {count} أشهر',
    'time.year_ago': 'منذ عام',
    'time.years_ago': 'منذ {count} أعوام',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.offers': 'Offers & Discounts',
    'nav.cart': 'Cart',
    'nav.favorites': 'Favorites',
    'nav.profile': 'My Account',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.search': 'Search...',
    'nav.categories': 'Categories',
    'nav.register_business': 'Register Your Business (Merchants)',
    
    // Categories
    'cat.restaurants': 'Restaurants',
    'cat.shopping': 'Shopping',
    'cat.services': 'Services',
    'cat.health': 'Health',
    'cat.education': 'Education',
    'cat.entertainment': 'Entertainment',
    'cat.automotive': 'Automotive',
    'cat.real_estate': 'Real Estate',
    'cat.beauty': 'Beauty',
    'cat.sports': 'Sports',
    'cat.technology': 'Technology',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.view': 'View',
    'common.more': 'More',
    'common.less': 'Less',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.search': 'Search',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.back': 'Back',
    'common.continue': 'Continue',
    'common.finish': 'Finish',
    'common.start': 'Start',
    'common.stop': 'Stop',
    'common.pause': 'Pause',
    'common.play': 'Play',
    
    // Messages
    'msg.no_results': 'No results found',
    'msg.network_error': 'Network error',
    'msg.server_error': 'Server error',
    'msg.validation_error': 'Validation error',
    'msg.auth_required': 'Authentication required',
    'msg.permission_denied': 'Permission denied',
    'msg.session_expired': 'Session expired, please login again',
    'msg.confirm_delete': 'Are you sure you want to delete?',
    'msg.confirm_logout': 'Are you sure you want to logout?',
    'msg.saved_successfully': 'Saved successfully',
    'msg.updated_successfully': 'Updated successfully',
    'msg.deleted_successfully': 'Deleted successfully',
    'msg.added_successfully': 'Added successfully',
    'msg.login_successfully': 'Logged in successfully',
    'msg.logout_successfully': 'Logged out successfully',
    
    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.password': 'Password',
    'form.confirm_password': 'Confirm Password',
    'form.address': 'Address',
    'form.city': 'City',
    'form.country': 'Country',
    'form.postal_code': 'Postal Code',
    'form.description': 'Description',
    'form.price': 'Price',
    'form.quantity': 'Quantity',
    'form.category': 'Category',
    'form.subcategory': 'Subcategory',
    'form.image': 'Image',
    'form.images': 'Images',
    'form.website': 'Website',
    'form.social_media': 'Social Media',
    'form.working_hours': 'Working Hours',
    'form.contact_info': 'Contact Information',
    
    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Invalid email address',
    'validation.phone': 'Invalid phone number',
    'validation.password_min': 'Password must be at least 8 characters',
    'validation.password_match': 'Passwords do not match',
    'validation.min_length': '{field} must be at least {min} characters',
    'validation.max_length': '{field} must be at most {max} characters',
    'validation.number': 'Must be a number',
    'validation.positive': 'Must be a positive number',
    'validation.url': 'Invalid URL',
    'validation.image': 'Must be an image',
    'validation.file_size': 'File size too large',
    'validation.file_type': 'File type not supported',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.analytics': 'Analytics',
    'dashboard.reports': 'Reports',
    'dashboard.settings': 'Settings',
    'dashboard.profile': 'Profile',
    'dashboard.notifications': 'Notifications',
    'dashboard.messages': 'Messages',
    'dashboard.orders': 'Orders',
    'dashboard.products': 'Products',
    'dashboard.customers': 'Customers',
    'dashboard.revenue': 'Revenue',
    'dashboard.sales': 'Sales',
    'dashboard.visitors': 'Visitors',
    'dashboard.conversion': 'Conversion Rate',
    
    // Marketplace
    'marketplace.title': 'Marketplace',
    'marketplace.all_products': 'All Products',
    'marketplace.featured': 'Featured',
    'marketplace.new_arrivals': 'New Arrivals',
    'marketplace.best_sellers': 'Best Sellers',
    'marketplace.offers': 'Offers',
    'marketplace.categories': 'Categories',
    'marketplace.filters': 'Filters',
    'marketplace.sort_by': 'Sort by',
    'marketplace.price_low_high': 'Price: Low to High',
    'marketplace.price_high_low': 'Price: High to Low',
    'marketplace.newest': 'Newest',
    'marketplace.popular': 'Most Popular',
    'marketplace.rating': 'Rating',
    'marketplace.free_shipping': 'Free Shipping',
    'marketplace.in_stock': 'In Stock',
    'marketplace.out_of_stock': 'Out of Stock',
    'marketplace.add_to_cart': 'Add to Cart',
    'marketplace.buy_now': 'Buy Now',
    'marketplace.product_details': 'Product Details',
    'marketplace.product_description': 'Product Description',
    'marketplace.product_specifications': 'Product Specifications',
    'marketplace.product_reviews': 'Product Reviews',
    'marketplace.write_review': 'Write Review',
    
    // Currency
    'currency.egp': 'EGP',
    'currency.usd': '$',
    'currency.eur': '€',
    'currency.gbp': '£',
    
    // Time
    'time.now': 'Now',
    'time.minute_ago': 'A minute ago',
    'time.minutes_ago': '{count} minutes ago',
    'time.hour_ago': 'An hour ago',
    'time.hours_ago': '{count} hours ago',
    'time.day_ago': 'A day ago',
    'time.days_ago': '{count} days ago',
    'time.week_ago': 'A week ago',
    'time.weeks_ago': '{count} weeks ago',
    'time.month_ago': 'A month ago',
    'time.months_ago': '{count} months ago',
    'time.year_ago': 'A year ago',
    'time.years_ago': '{count} years ago',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check local storage or browser language on mount
    const savedLanguage = localStorage.getItem('ray_language') as Language;
    const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    
    const initialLang = savedLanguage || browserLang;
    setLanguage(initialLang);
    localStorage.setItem('ray_language', initialLang);
    
    // Update document direction and lang
    document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = initialLang;
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('ray_language', newLang);
    
    // Update document direction and lang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const setLanguageHandler = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ray_language', lang);
    
    // Update document direction and lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations['ar']];
    return translation || key;
  };

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      direction, 
      toggleLanguage, 
      setLanguage: setLanguageHandler,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
 