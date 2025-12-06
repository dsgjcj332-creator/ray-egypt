# هيكل لوحات التحكم - البنية المنظمة

## المبدأ الأساسي
كل نظام (system) له مجلد خاص به يحتوي على:
1. Dashboard الرئيسي
2. المكونات الخاصة به
3. الصفحات الفرعية

## البنية المقترحة

```
components/dashboard/
├── shared/                    # مكونات مشتركة بين جميع اللوحات
│   ├── layout/               # Header, Sidebar, MobileSidebar
│   ├── views/                # SettingsView, NotificationsView, ProfileView
│   ├── inventory/            # ProductManager (مشترك)
│   ├── crm/                  # CustomerManager (مشترك)
│   ├── reports/              # FinancialReports (مشترك)
│   ├── marketing/            # MarketingManager (مشترك)
│   ├── loyalty/              # LoyaltyManager (مشترك)
│   ├── communication/        # MessagesCenter (مشترك)
│   ├── feedback/             # ReviewsManager (مشترك)
│   ├── pos/                  # مكونات POS المشتركة
│   ├── config.ts             # إعدادات جميع اللوحات
│   └── widgets/              # Widgets مشتركة
│
├── systems/                  # الأنظمة الرئيسية
│   ├── restaurants/          # نظام المطاعم والمقاهي
│   │   ├── RestaurantDashboard.tsx
│   │   ├── RestaurantPOS.tsx
│   │   ├── KitchenDisplay.tsx
│   │   ├── RestaurantOverview.tsx
│   │   ├── MenuManager.tsx
│   │   ├── DeliveryManager.tsx
│   │   ├── RestaurantReservations.tsx
│   │   ├── TableMap.tsx
│   │   ├── TableLayoutEditor.tsx
│   │   └── RestaurantInventory.tsx
│   │
│   ├── retail/               # نظام البيع بالتجزئة
│   │   ├── RetailDashboard.tsx
│   │   ├── UnifiedPOS.tsx
│   │   ├── RetailOverview.tsx
│   │   └── SupplierManager.tsx
│   │
│   ├── bookings/             # نظام الحجوزات
│   │   ├── BookingsDashboard.tsx
│   │   ├── BookingsOverview.tsx
│   │   └── ...
│   │
│   ├── health/               # نظام الصحة
│   │   ├── ClinicDashboard.tsx
│   │   ├── PharmacyDashboard.tsx
│   │   └── ...
│   │
│   └── ... (أنظمة أخرى)
│
└── activities/               # الأنشطة الفردية (اختياري للتفاصيل)
    ├── clothing/
    ├── gym/
    ├── salon/
    └── ...
```

## القواعد الأساسية

### 1. مكونات مشتركة (shared/)
- تُستخدم من قبل جميع الأنظمة
- لا تحتوي على منطق خاص بنظام معين
- أمثلة: Header, Sidebar, ProductManager, CustomerManager

### 2. أنظمة (systems/)
- كل نظام له مجلد خاص
- يحتوي على Dashboard الرئيسي والمكونات الخاصة به
- يستورد المكونات المشتركة من shared/

### 3. أنشطة (activities/)
- للأنشطة الفردية التي لها واجهات خاصة جداً
- مثل: ClothingDashboard, GymDashboard, SalonDashboard

## مثال الاستيراد

```typescript
// في RestaurantDashboard.tsx
import Header from '../shared/layout/Header';
import MobileSidebar from '../shared/layout/MobileSidebar';
import SettingsView from '../shared/views/SettingsView';
import RestaurantPOS from './RestaurantPOS';
import KitchenDisplay from './KitchenDisplay';
```

## الخطوات المقبلة

1. ✅ نقل مكونات shared إلى مجلد shared/
2. ✅ تنظيم أنظمة في مجلد systems/
3. ✅ حذف المجلدات المكررة
4. ✅ تحديث جميع المسارات
