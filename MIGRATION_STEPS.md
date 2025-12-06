# خطوات ترحيل المسارات

## ✅ تم إنجازه
- نقل المكونات المشتركة إلى `shared/`
- نقل الأنظمة إلى `systems/`

## الخطوات المتبقية

### 1. تحديث مسارات الاستيراد في `systems/restaurants/RestaurantDashboard.tsx`

**من:**
```typescript
import Header from '../layout/Header';
import MobileSidebar from '../layout/MobileSidebar';
import RestaurantPOS from '../restaurant/RestaurantPOS';
import LoyaltyManager from '../loyalty/LoyaltyManager';
import SettingsView from '../views/SettingsView';
import ReviewsManager from '../feedback/ReviewsManager';
```

**إلى:**
```typescript
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import RestaurantPOS from './RestaurantPOS';
import LoyaltyManager from '../../shared/loyalty/LoyaltyManager';
import SettingsView from '../../shared/views/SettingsView';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
```

### 2. تحديث مسارات الاستيراد في `systems/retail/RetailDashboard.tsx`

**من:**
```typescript
import Header from '../layout/Header';
import UnifiedPOS from './UnifiedPOS';
import ProductManager from '../inventory/ProductManager';
import CustomerManager from '../crm/CustomerManager';
import FinancialReports from '../reports/FinancialReports';
import LoyaltyManager from '../loyalty/LoyaltyManager';
import MessagesCenter from '../communication/MessagesCenter';
import ReviewsManager from '../feedback/ReviewsManager';
import SettingsView from '../views/SettingsView';
```

**إلى:**
```typescript
import Header from '../../shared/layout/Header';
import UnifiedPOS from './UnifiedPOS';
import ProductManager from '../../shared/inventory/ProductManager';
import CustomerManager from '../../shared/crm/CustomerManager';
import FinancialReports from '../../shared/reports/FinancialReports';
import LoyaltyManager from '../../shared/loyalty/LoyaltyManager';
import MessagesCenter from '../../shared/communication/MessagesCenter';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
import SettingsView from '../../shared/views/SettingsView';
```

### 3. تحديث مسارات الاستيراد في `systems/clothing/ClothingDashboard.tsx`

**من:**
```typescript
import Header from '../layout/Header';
import MobileSidebar from '../layout/MobileSidebar';
import ProductManager from '../inventory/ProductManager';
import UniversalDataView from '../views/UniversalDataView';
import SettingsView from '../views/SettingsView';
```

**إلى:**
```typescript
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import ProductManager from '../../shared/inventory/ProductManager';
import UniversalDataView from '../../shared/views/UniversalDataView';
import SettingsView from '../../shared/views/SettingsView';
```

### 4. تحديث مسارات الاستيراد في صفحات `app/dashboard/*/page.tsx`

**من:**
```typescript
import RestaurantDashboard from '@/components/dashboard/restaurants/RestaurantDashboard';
```

**إلى:**
```typescript
import RestaurantDashboard from '@/components/dashboard/systems/restaurants/RestaurantDashboard';
```

## ملاحظات مهمة

- تحديث جميع المسارات النسبية
- البحث عن جميع استيرادات من المجلدات المشتركة
- التأكد من أن جميع المكونات تستورد من المسارات الجديدة

## الأولويات

1. ✅ `RestaurantDashboard` - الأهم
2. ✅ `RetailDashboard` - مهم
3. ✅ `ClothingDashboard` - مهم
4. باقي الأنظمة
