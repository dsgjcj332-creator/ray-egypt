import React from 'react';
import { CreditCard, Truck, Shield } from 'lucide-react';

interface CheckoutViewProps {
  onBack?: () => void;
  onComplete?: (orderId: string) => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ onBack, onComplete }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">الدفع</h2>
      </div>
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">صفحة الدفع تحت التطوير</p>
      </div>
    </div>
  );
};

export default CheckoutView;
