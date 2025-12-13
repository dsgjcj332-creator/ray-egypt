# 🧪 دليل اختبار الـ Endpoints والـ Services

## 1️⃣ اختبار Backend Endpoints باستخدام cURL

### تثبيت cURL (إذا لم يكن مثبتاً)
```bash
# Windows
choco install curl

# macOS
brew install curl

# Linux
sudo apt-get install curl
```

### اختبار المنتجات

#### جلب جميع المنتجات
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Content-Type: application/json"
```

#### جلب منتج واحد
```bash
curl -X GET http://localhost:5000/api/products/{productId} \
  -H "Content-Type: application/json"
```

#### إنشاء منتج جديد
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 5000,
    "category": "Electronics",
    "description": "High-performance laptop",
    "stock": 10,
    "sku": "LAP-001",
    "barcode": "123456789"
  }'
```

#### تحديث منتج
```bash
curl -X PUT http://localhost:5000/api/products/{productId} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 4500,
    "stock": 8
  }'
```

#### حذف منتج
```bash
curl -X DELETE http://localhost:5000/api/products/{productId}
```

---

### اختبار الوظائف

#### جلب جميع الوظائف
```bash
curl -X GET "http://localhost:5000/api/jobs?page=1&limit=20" \
  -H "Content-Type: application/json"
```

#### جلب الوظائف المميزة
```bash
curl -X GET http://localhost:5000/api/jobs/featured \
  -H "Content-Type: application/json"
```

#### إنشاء وظيفة جديدة
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer",
    "company": "Tech Company",
    "location": "Cairo, Egypt",
    "type": "full-time",
    "category": "Technology",
    "description": "We are looking for a senior developer",
    "requirements": ["JavaScript", "React", "5+ years"],
    "benefits": ["Health insurance", "Remote work"],
    "responsibilities": ["Lead team", "Code review"],
    "postedBy": "{userId}"
  }'
```

#### التقديم على وظيفة
```bash
curl -X POST http://localhost:5000/api/jobs/{jobId}/apply \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{userId}"
  }'
```

---

### اختبار المتاجر

#### جلب جميع المتاجر
```bash
curl -X GET "http://localhost:5000/api/merchants?page=1&limit=20" \
  -H "Content-Type: application/json"
```

#### جلب المتاجر حسب الفئة
```bash
curl -X GET "http://localhost:5000/api/merchants/category/restaurant" \
  -H "Content-Type: application/json"
```

#### إنشاء متجر جديد
```bash
curl -X POST http://localhost:5000/api/merchants \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{userId}",
    "businessType": "restaurant",
    "businessInfo": {
      "name": "My Restaurant",
      "description": "Best restaurant in town",
      "category": "Food",
      "phone": "+201234567890",
      "email": "restaurant@example.com",
      "address": {
        "street": "123 Main St",
        "city": "Cairo",
        "state": "Cairo",
        "zipCode": "11111",
        "country": "Egypt"
      }
    }
  }'
```

---

### اختبار الطلبات

#### جلب طلبات المستخدم
```bash
curl -X GET "http://localhost:5000/api/orders/user/{userId}?page=1&limit=20" \
  -H "Content-Type: application/json"
```

#### إنشاء طلب جديد
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "{userId}",
    "merchantId": "{merchantId}",
    "type": "product",
    "items": [
      {
        "type": "product",
        "itemId": "{productId}",
        "name": "Laptop",
        "price": 5000,
        "quantity": 1
      }
    ],
    "totalAmount": 5000
  }'
```

#### تحديث حالة الطلب
```bash
curl -X PUT http://localhost:5000/api/orders/{orderId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

---

### اختبار الإدارة

#### جلب ملخص الإدارة
```bash
curl -X GET http://localhost:5000/api/admin/summary \
  -H "Content-Type: application/json"
```

#### جلب التحليلات المالية
```bash
curl -X GET "http://localhost:5000/api/admin/financial-analysis?period=monthly" \
  -H "Content-Type: application/json"
```

#### جلب الأرباح
```bash
curl -X GET http://localhost:5000/api/admin/profit \
  -H "Content-Type: application/json"
```

---

## 2️⃣ اختبار Frontend Services

### استخدام Browser Console

```javascript
// اختبار productService
import { fetchProducts, getProductById } from '@/services/productService';

// جلب المنتجات
const products = await fetchProducts(1, 20);
console.log(products);

// جلب منتج واحد
const product = await getProductById('productId');
console.log(product);
```

```javascript
// اختبار jobService
import { fetchJobs, getJobById, applyForJob } from '@/services/jobService';

// جلب الوظائف
const jobs = await fetchJobs(1, 20, { featured: true });
console.log(jobs);

// التقديم على وظيفة
await applyForJob('jobId', 'userId');
```

```javascript
// اختبار merchantService
import { fetchMerchants, getMerchantById } from '@/services/merchantService';

// جلب المتاجر
const merchants = await fetchMerchants(1, 20);
console.log(merchants);

// جلب متجر واحد
const merchant = await getMerchantById('merchantId');
console.log(merchant);
```

---

## 3️⃣ استخدام Postman

### استيراد Collection

1. افتح Postman
2. اضغط على "Import"
3. اختر "Raw text"
4. انسخ الـ JSON التالي:

```json
{
  "info": {
    "name": "RAY Egypt API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Products",
      "item": [
        {
          "name": "Get All Products",
          "request": {
            "method": "GET",
            "url": "http://localhost:5000/api/products"
          }
        },
        {
          "name": "Create Product",
          "request": {
            "method": "POST",
            "url": "http://localhost:5000/api/products",
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"Test\", \"price\": 100}"
            }
          }
        }
      ]
    },
    {
      "name": "Jobs",
      "item": [
        {
          "name": "Get All Jobs",
          "request": {
            "method": "GET",
            "url": "http://localhost:5000/api/jobs"
          }
        }
      ]
    }
  ]
}
```

---

## 4️⃣ اختبار Error Handling

### اختبار Error Boundary

```typescript
// في Component
'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function TestError() {
  const [showError, setShowError] = useState(false);

  if (showError) {
    throw new Error('Test error');
  }

  return (
    <ErrorBoundary>
      <button onClick={() => setShowError(true)}>
        إظهار خطأ
      </button>
    </ErrorBoundary>
  );
}
```

### اختبار Async Error Boundary

```typescript
'use client';

import { AsyncErrorBoundary } from '@/components/AsyncErrorBoundary';

export default function TestAsyncError() {
  const handleError = async () => {
    throw new Error('Async error');
  };

  return (
    <AsyncErrorBoundary onError={(error) => console.error(error)}>
      <button onClick={handleError}>
        إظهار خطأ غير متزامن
      </button>
    </AsyncErrorBoundary>
  );
}
```

---

## 5️⃣ اختبار Pagination

```typescript
import { usePaginatedApi } from '@/hooks/useApi';
import { fetchProducts } from '@/services/productService';

export default function TestPagination() {
  const {
    data,
    page,
    pages,
    goToPage,
    nextPage,
    prevPage
  } = usePaginatedApi(
    (page, limit) => fetchProducts(page, limit),
    1,
    10
  );

  return (
    <div>
      <p>الصفحة {page} من {pages}</p>
      <button onClick={prevPage}>السابق</button>
      <button onClick={nextPage}>التالي</button>
    </div>
  );
}
```

---

## ✅ قائمة التحقق من الاختبارات

- [ ] جميع endpoints تستجيب بنجاح
- [ ] البيانات تُرجع بالصيغة الصحيحة
- [ ] Pagination يعمل بشكل صحيح
- [ ] Error handling يعمل بشكل صحيح
- [ ] Caching يعمل بشكل صحيح
- [ ] Error Boundaries تعمل بشكل صحيح
- [ ] Services تحمل البيانات بنجاح
- [ ] لا توجد أخطاء في console

---

## 🐛 استكشاف الأخطاء الشائعة

### خطأ: "Cannot read property 'data' of undefined"
**الحل:** تأكد من أن الـ API يرجع `{ success: true, data: [...] }`

### خطأ: "CORS error"
**الحل:** تحقق من CORS_ORIGIN في `.env.local` في Backend

### خطأ: "404 Not Found"
**الحل:** تأكد من أن الـ endpoint موجود وصحيح الكتابة

### خطأ: "Timeout"
**الحل:** تأكد من أن Backend يعمل على المنفذ الصحيح

---

**الآن أنت جاهز للاختبار الشامل!** 🎉
