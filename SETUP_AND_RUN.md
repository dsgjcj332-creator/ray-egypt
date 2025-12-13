# 🚀 دليل التشغيل والاختبار الكامل

## المتطلبات الأساسية
- Node.js 16+ و npm 8+
- MongoDB Atlas account أو MongoDB محلي
- متصفح حديث

---

## 1️⃣ تشغيل Backend

### الخطوة 1: الانتقال إلى مجلد Backend
```bash
cd backend
```

### الخطوة 2: تثبيت المكتبات
```bash
npm install
```

### الخطوة 3: إعداد متغيرات البيئة
أنشئ ملف `.env.local` في مجلد `backend`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ray-egypt
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### الخطوة 4: تشغيل Backend
```bash
npm run dev
```

✅ يجب أن ترى الرسالة:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

---

## 2️⃣ تشغيل Frontend

### الخطوة 1: فتح Terminal جديد والانتقال إلى مجلد Frontend
```bash
cd frontend
```

### الخطوة 2: تثبيت المكتبات
```bash
npm install
```

### الخطوة 3: إعداد متغيرات البيئة
أنشئ ملف `.env.local` في مجلد `frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### الخطوة 4: تشغيل Frontend
```bash
npm run dev
```

✅ يجب أن ترى الرسالة:
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000
```

---

## 3️⃣ اختبار الـ Endpoints

### استخدام Postman أو cURL

#### اختبار جلب المنتجات
```bash
curl http://localhost:5000/api/products
```

#### اختبار إنشاء منتج
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 100,
    "category": "Electronics",
    "description": "Test product",
    "stock": 50
  }'
```

#### اختبار جلب الوظائف
```bash
curl http://localhost:5000/api/jobs
```

#### اختبار جلب المتاجر
```bash
curl http://localhost:5000/api/merchants
```

---

## 4️⃣ ربط الـ Services في الـ Components

### مثال: استخدام productService في Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const result = await fetchProducts(1, 20);
        setProducts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div>
      <h1>المنتجات</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <h2>{product.name}</h2>
            <p>السعر: {product.price}</p>
            <p>المخزون: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### مثال: استخدام jobService في Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { fetchJobs, Job } from '@/services/jobService';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const result = await fetchJobs(1, 20, { featured: true });
        setJobs(result.data);
      } catch (error) {
        console.error('خطأ في تحميل الوظائف:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h1>الوظائف المتاحة</h1>
      {jobs.map(job => (
        <div key={job._id} className="border p-4 mb-4">
          <h2>{job.title}</h2>
          <p>الشركة: {job.company}</p>
          <p>الموقع: {job.location}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 5️⃣ إضافة Error Boundaries

### إنشاء Error Boundary Component

```typescript
// frontend/src/components/ErrorBoundary.tsx
'use client';

import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h2 className="font-bold">حدث خطأ</h2>
            <p>{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              إعادة محاولة
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### استخدام Error Boundary في Layout

```typescript
// frontend/src/app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

## 6️⃣ اختبار التطبيق الكامل

### الخطوة 1: التحقق من Backend
```bash
curl http://localhost:5000/api/products
# يجب أن ترى JSON response
```

### الخطوة 2: فتح Frontend
```
http://localhost:3000
```

### الخطوة 3: اختبار الميزات
- ✅ تحميل المنتجات
- ✅ تحميل الوظائف
- ✅ تحميل المتاجر
- ✅ إنشاء طلب جديد
- ✅ معالجة الأخطاء

---

## 🐛 استكشاف الأخطاء

### خطأ: "Cannot connect to MongoDB"
- تأكد من صحة MongoDB URI
- تحقق من اتصال الإنترنت
- تأكد من أن IP الخاص بك مسموح في MongoDB Atlas

### خطأ: "CORS error"
- تحقق من CORS_ORIGIN في `.env.local`
- تأكد من أن Frontend يعمل على المنفذ الصحيح

### خطأ: "API not responding"
- تأكد من تشغيل Backend على المنفذ 5000
- تحقق من console للأخطاء

---

## ✅ قائمة التحقق النهائية

- [ ] Backend يعمل على http://localhost:5000
- [ ] Frontend يعمل على http://localhost:3000
- [ ] MongoDB متصل بنجاح
- [ ] جميع الـ endpoints تستجيب
- [ ] الـ Services تحمل البيانات بنجاح
- [ ] Error Boundaries تعمل
- [ ] لا توجد أخطاء في console

---

## 🎉 تم! المشروع جاهز للاستخدام

الآن يمكنك البدء في تطوير الميزات الإضافية والتحسينات!
