import express from 'express';

const router = express.Router();

// Helper function to get mock dashboard data
const getDashboardData = (system, businessType = null) => {
  const dashboards = {
    pharmacy: {
      stats: [
        { id: 'stat_pending', title: "وصفات معلقة", value: "12", sub: "بانتظار التحضير", icon: 'Clock', color: "orange" },
        { id: 'stat_completed', title: "وصفات مكتملة", value: "156", sub: "اليوم", icon: 'CheckCircle', color: "green" },
        { id: 'stat_earnings', title: "الإيرادات", value: "8,500 ج", sub: "اليوم", icon: 'DollarSign', color: "teal" },
        { id: 'stat_rating', title: "التقييم", value: "4.8", sub: "من 5 نجوم", icon: 'Pill', color: "blue" }
      ],
      actions: [
        { id: 'act_new_order', label: "وصفة جديدة", icon: 'Plus', color: "bg-orange-600 text-white" },
        { id: 'act_inventory', label: "المخزون", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_suppliers', label: "الموردين", icon: 'Truck', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_search', label: "بحث", icon: 'Search', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_offers', label: "العروض", icon: 'Tag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_reports', label: "التقارير", icon: 'FileText', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    gym: {
      stats: [
        { id: 'stat_attendance', title: "الحضور اليوم", value: "45", sub: "عضو", icon: 'Users', color: "yellow" },
        { id: 'stat_new', title: "أعضاء جدد", value: "3", sub: "هذا الأسبوع", icon: 'CreditCard', color: "green" },
        { id: 'stat_expiring', title: "اشتراكات تنتهي", value: "8", sub: "قريباً", icon: 'Clock', color: "red" },
        { id: 'stat_sales', title: "مبيعات", value: "2,400 ج", sub: "اليوم", icon: 'ShoppingBag', color: "blue" }
      ],
      actions: [
        { id: 'act_new_member', label: "عضو جديد", icon: 'Plus', color: "bg-yellow-600 text-white" },
        { id: 'act_renew', label: "تجديد", icon: 'CreditCard', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_checkin', label: "تسجيل دخول", icon: 'QrCode', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_sell', label: "بيع منتج", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_inbody', label: "قياس", icon: 'Activity', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_class', label: "حصة", icon: 'Dumbbell', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    salon: {
      stats: [
        { id: 'stat_appts', title: "المواعيد اليوم", value: "18", sub: "موعد", icon: 'Calendar', color: "pink" },
        { id: 'stat_sales', title: "المبيعات", value: "3,200 ج", sub: "اليوم", icon: 'Scissors', color: "purple" },
        { id: 'stat_new_clients', title: "عملاء جدد", value: "5", sub: "هذا الأسبوع", icon: 'Users', color: "teal" },
        { id: 'stat_products', title: "المنتجات", value: "45", sub: "متوفرة", icon: 'ShoppingBag', color: "blue" }
      ],
      actions: [
        { id: 'act_book', label: "حجز موعد", icon: 'Plus', color: "bg-pink-600 text-white" },
        { id: 'act_pos', label: "دفع", icon: 'DollarSign', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_new_client', label: "عميل جديد", icon: 'Users', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_sell_prod', label: "بيع منتج", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_add_service', label: "خدمة جديدة", icon: 'Sparkles', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_attendance', label: "الموظفين", icon: 'Clock', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    restaurant: {
      stats: [
        { id: 'stat_sales', title: "المبيعات", value: "12,500 ج", sub: "اليوم", icon: 'DollarSign', color: "orange" },
        { id: 'stat_kitchen', title: "الطلبات النشطة", value: "8", sub: "في المطبخ", icon: 'ChefHat', color: "yellow" },
        { id: 'stat_tables', title: "الطاولات المشغولة", value: "12", sub: "من 20", icon: 'Utensils', color: "blue" },
        { id: 'stat_delivery', title: "طلبات التوصيل", value: "5", sub: "قيد التنفيذ", icon: 'Truck', color: "green" }
      ],
      actions: [
        { id: 'act_new_order', label: "طلب جديد", icon: 'Plus', color: "bg-orange-600 text-white" },
        { id: 'act_book_table', label: "حجز طاولة", icon: 'Calendar', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_shift', label: "الموظفين", icon: 'Clock', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_expense', label: "مصروف", icon: 'DollarSign', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_stock', label: "المخزون", icon: 'Package', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_report', label: "تقرير", icon: 'Printer', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    retail: {
      stats: [
        { id: 'stat_sales', title: "المبيعات", value: "8,900 ج", sub: "اليوم", icon: 'DollarSign', color: "green" },
        { id: 'stat_orders', title: "الطلبات", value: "24", sub: "اليوم", icon: 'ShoppingCart', color: "orange" },
        { id: 'stat_customers', title: "العملاء", value: "156", sub: "هذا الشهر", icon: 'Users', color: "blue" },
        { id: 'stat_stock', title: "المخزون", value: "450", sub: "منتج", icon: 'Package', color: "yellow" }
      ],
      actions: [
        { id: 'act_new_sale', label: "بيع جديد", icon: 'Plus', color: "bg-green-700 text-white" },
        { id: 'act_inventory', label: "المخزون", icon: 'Package', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_customers', label: "العملاء", icon: 'Users', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_orders', label: "الطلبات", icon: 'ShoppingCart', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_suppliers', label: "الموردين", icon: 'Store', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_reports', label: "التقارير", icon: 'TrendingUp', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    bookings: {
      stats: [
        { id: 'stat_today', title: "حجوزات اليوم", value: "18", sub: "حجز مؤكد", icon: 'Calendar', color: "blue" },
        { id: 'stat_pending', title: "حجوزات معلقة", value: "5", sub: "بانتظار التأكيد", icon: 'Clock', color: "orange" },
        { id: 'stat_completed', title: "مكتملة", value: "42", sub: "هذا الأسبوع", icon: 'CheckCircle', color: "green" },
        { id: 'stat_revenue', title: "الإيرادات", value: "12,500 ج", sub: "من الحجوزات", icon: 'DollarSign', color: "teal" }
      ],
      actions: [
        { id: 'act_new', label: "حجز جديد", icon: 'Calendar', color: "bg-blue-600 text-white" },
        { id: 'act_today', label: "حجوزات اليوم", icon: 'Clock', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_pending', label: "المعلقة", icon: 'AlertCircle', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_clients', label: "العملاء", icon: 'Users', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_messages', label: "الرسائل", icon: 'MessageSquare', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_reports', label: "التقارير", icon: 'Zap', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    cars: {
      stats: [
        { id: 'stat_sales', title: "سيارات مباعة", value: "12", sub: "+2 هذا الشهر", icon: 'Car', color: "red" },
        { id: 'stat_inventory', title: "متاح في المعرض", value: "58", sub: "سيارة", icon: 'Key', color: "blue" },
        { id: 'stat_drives', title: "طلبات تجربة", value: "6", sub: "اليوم", icon: 'UserCheck', color: "yellow" },
        { id: 'stat_finance', title: "أقساط مستحقة", value: "150k", sub: "خلال 7 أيام", icon: 'DollarSign', color: "green" }
      ],
      actions: [
        { id: 'act_add_car', label: "إضافة سيارة", icon: 'Plus', color: "bg-red-700 text-white" },
        { id: 'act_test_drive', label: "حجز تجربة", icon: 'Key', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_calc', label: "حاسبة أقساط", icon: 'Calculator', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_contract', label: "عقد بيع", icon: 'FileText', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_service', label: "أمر صيانة", icon: 'Wrench', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_report', label: "تقرير المخزون", icon: 'Printer', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    carwash: {
      stats: [
        { id: 'stat_fleet', title: "الأسطول النشط", value: "5/6", sub: "سيارات", icon: 'Truck', color: "blue" },
        { id: 'stat_water', title: "مخزون المياه", value: "450L", sub: "الإجمالي", icon: 'Droplets', color: "cyan" },
        { id: 'stat_jobs', title: "طلبات اليوم", value: "24", sub: "8 جاري التنفيذ", icon: 'Calendar', color: "green" },
        { id: 'stat_rev', title: "الإيرادات", value: "6,200", sub: "جنيه", icon: 'Gauge', color: "yellow" }
      ],
      actions: [
        { id: 'act_new_order', label: "طلب جديد", icon: 'Plus', color: "bg-blue-600 text-white" },
        { id: 'act_schedule', label: "الجدول", icon: 'Calendar', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_fleet', label: "الأسطول", icon: 'Truck', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_inventory', label: "المخزون", icon: 'Layers', color: "bg-white text-gray-700 border border-gray-200" }
      ],
      fleet: [
        { id: 1, name: "سيارة 1", status: "متاحة", location: "المقر الرئيسي" },
        { id: 2, name: "سيارة 2", status: "في الخدمة", location: "الفرع الثاني" },
        { id: 3, name: "سيارة 3", status: "متاحة", location: "المقر الرئيسي" },
        { id: 4, name: "سيارة 4", status: "صيانة", location: "الورشة" },
        { id: 5, name: "سيارة 5", status: "متاحة", location: "الفرع الثاني" }
      ]
    },
    contracting: {
      stats: [
        { id: 'stat_projects', title: "مشاريع نشطة", value: "5", sub: "2 تسليم قريب", icon: 'HardHat', color: "orange" },
        { id: 'stat_progress', title: "نسبة الإنجاز", value: "68%", sub: "متوسط عام", icon: 'Activity', color: "blue" },
        { id: 'stat_billing', title: "مستخلصات", value: "2.4M", sub: "تحت التحصيل", icon: 'DollarSign', color: "green" },
        { id: 'stat_stock', title: "مواد بالموقع", value: "450k", sub: "مواسير وأسمنت", icon: 'Package', color: "purple" }
      ],
      actions: [
        { id: 'act_new_project', label: "مشروع جديد", icon: 'Plus', color: "bg-orange-600 text-white" },
        { id: 'act_projects', label: "المشاريع", icon: 'Warehouse', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_materials', label: "المواد", icon: 'Package', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_invoices', label: "الفواتير", icon: 'FileText', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    clothing: {
      stats: [
        { id: 'stat_sales', title: "مبيعات اليوم", value: "12,400 ج", sub: "45 قطعة", icon: 'TrendingUp', color: "pink" },
        { id: 'stat_items', title: "قطع مباعة", value: "45", sub: "+10 عن أمس", icon: 'Shirt', color: "blue" },
        { id: 'stat_collections', title: "الكولكشن النشط", value: "3", sub: "مجموعات", icon: 'Grid', color: "purple" },
        { id: 'stat_returns', title: "المرتجعات", value: "3", sub: "قطع", icon: 'RotateCcw', color: "orange" }
      ],
      actions: [
        { id: 'act_add_item', label: "إضافة قطعة", icon: 'Plus', color: "bg-pink-600 text-white" },
        { id: 'act_inventory', label: "المخزون", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_collections', label: "الكولكشن", icon: 'Grid', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_orders', label: "الطلبات", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" }
      ],
      chart: [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 }
      ]
    },
    realestate: {
      stats: [
        { id: 'stat_sales', title: "إجمالي المبيعات (YTD)", value: "12.5M", sub: "+2.3M هذا الشهر", icon: 'BadgeDollarSign', color: "green" },
        { id: 'stat_units', title: "وحدات متاحة", value: "45", sub: "12 بيع | 33 إيجار", icon: 'Home', color: "blue" },
        { id: 'stat_leads', title: "عملاء جدد (Leads)", value: "28", sub: "هذا الأسبوع", icon: 'Users', color: "purple" },
        { id: 'stat_showings', title: "معاينات قادمة", value: "8", sub: "اليوم وغداً", icon: 'Calendar', color: "orange" }
      ],
      actions: [
        { id: 'act_add_property', label: "إضافة عقار", icon: 'Plus', color: "bg-blue-600 text-white" },
        { id: 'act_properties', label: "العقارات", icon: 'Home', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_leads', label: "العملاء", icon: 'Users', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_calculator', label: "حاسبة", icon: 'Calculator', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    laundry: {
      stats: [
        { id: 'stat_received', title: "قطع مستلمة", value: "150", sub: "اليوم", icon: 'Shirt', color: "blue" },
        { id: 'stat_processing', title: "في التشغيل", value: "45", sub: "غسيل وكي", icon: 'Waves', color: "cyan" },
        { id: 'stat_ready', title: "جاهز للتسليم", value: "32", sub: "انتظار عميل", icon: 'CheckCircle', color: "green" },
        { id: 'stat_urgent', title: "طلبات مستعجلة", value: "5", sub: "أولوية قصوى", icon: 'Clock', color: "red" }
      ],
      actions: [
        { id: 'act_new_order', label: "طلب جديد", icon: 'Plus', color: "bg-blue-600 text-white" },
        { id: 'act_orders', label: "الطلبات", icon: 'ShoppingBag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_pricing', label: "التسعير", icon: 'Tag', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_delivery', label: "التسليم", icon: 'Truck', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    },
    nursery: {
      stats: [
        { id: 'stat_children', title: "الأطفال الحاليين", value: "24", sub: "طفل", icon: 'Baby', color: "blue" },
        { id: 'stat_staff', title: "الموظفين", value: "8", sub: "معلمين وموظفين", icon: 'Users', color: "green" },
        { id: 'stat_revenue', title: "الإيرادات الشهرية", value: "45,000 ج", sub: "هذا الشهر", icon: 'DollarSign', color: "purple" },
        { id: 'stat_attendance', title: "معدل الحضور", value: "92%", sub: "هذا الأسبوع", icon: 'Activity', color: "orange" }
      ],
      actions: [
        { id: 'act_add_child', label: "إضافة طفل", icon: 'Plus', color: "bg-blue-600 text-white" },
        { id: 'act_children', label: "الأطفال", icon: 'Baby', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_staff', label: "الموظفين", icon: 'Users', color: "bg-white text-gray-700 border border-gray-200" },
        { id: 'act_activities', label: "الأنشطة", icon: 'Activity', color: "bg-white text-gray-700 border border-gray-200" }
      ]
    }
  };

  return dashboards[system] || null;
};

// Generic dashboard stats endpoint
router.get('/:system/stats', (req, res) => {
  const { system } = req.params;
  const { businessType } = req.query;
  
  const data = getDashboardData(system, businessType);
  
  if (!data) {
    return res.status(404).json({ error: `Dashboard for ${system} not found` });
  }
  
  res.json(data.stats || []);
});

// Generic dashboard actions endpoint
router.get('/:system/actions', (req, res) => {
  const { system } = req.params;
  const { businessType } = req.query;
  
  const data = getDashboardData(system, businessType);
  
  if (!data) {
    return res.status(404).json({ error: `Dashboard for ${system} not found` });
  }
  
  res.json(data.actions || []);
});

// Fleet endpoint (for carwash)
router.get('/:system/fleet', (req, res) => {
  const { system } = req.params;
  
  const data = getDashboardData(system);
  
  if (!data || !data.fleet) {
    return res.status(404).json({ error: `Fleet data for ${system} not found` });
  }
  
  res.json(data.fleet);
});

// Chart data endpoint (for clothing)
router.get('/:system/chart', (req, res) => {
  const { system } = req.params;
  
  const data = getDashboardData(system);
  
  if (!data || !data.chart) {
    return res.status(404).json({ error: `Chart data for ${system} not found` });
  }
  
  res.json(data.chart);
});

export default router;
