/**
 * Context لإدارة الدفع والمعاملات المالية
 * يوفر معلومات الدفع والمحفظة والفواتير
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PaymentMethod,
  Transaction,
  Invoice,
  Wallet,
  processSubscriptionPayment,
  processInvoicePayment,
  calculateWalletBalance
} from '../services/paymentService';

interface PaymentContextType {
  paymentMethods: PaymentMethod[];
  wallet: Wallet | null;
  transactions: Transaction[];
  invoices: Invoice[];
  isLoading: boolean;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
  processSubscriptionPayment: (planId: string, methodId: string, amount: number) => Promise<boolean>;
  processInvoicePayment: (invoiceId: string, methodId: string, amount: number) => Promise<boolean>;
  getTransactionHistory: (limit?: number) => Transaction[];
  getPendingInvoices: () => Invoice[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// بيانات تجريبية
const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-001',
    type: 'credit_card',
    name: 'بطاقة الائتمان الشخصية',
    isDefault: true,
    lastFourDigits: '4242',
    expiryDate: '12/25',
    provider: 'Visa'
  },
  {
    id: 'pm-002',
    type: 'mobile_wallet',
    name: 'محفظة Fawry',
    isDefault: false,
    provider: 'Fawry'
  }
];

const MOCK_WALLET: Wallet = {
  id: 'wallet-001',
  userId: 'user-001',
  balance: 5000,
  currency: 'EGP',
  lastUpdated: new Date().toISOString(),
  transactions: []
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-001',
    userId: 'user-001',
    type: 'subscription',
    amount: 299,
    currency: 'EGP',
    status: 'completed',
    paymentMethod: MOCK_PAYMENT_METHODS[0],
    description: 'دفع اشتراك الخطة المتوسطة',
    reference: 'REF-001',
    createdAt: '2024-11-01',
    completedAt: '2024-11-01'
  },
  {
    id: 'txn-002',
    userId: 'user-001',
    type: 'payment',
    amount: 1500,
    currency: 'EGP',
    status: 'completed',
    paymentMethod: MOCK_PAYMENT_METHODS[1],
    description: 'دفع فاتورة المبيعات',
    reference: 'REF-002',
    createdAt: '2024-10-15',
    completedAt: '2024-10-15'
  }
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    userId: 'user-001',
    invoiceNumber: 'INV-001',
    amount: 5000,
    currency: 'EGP',
    status: 'sent',
    items: [
      {
        id: 'item-001',
        description: 'خدمات استشارة',
        quantity: 10,
        unitPrice: 500,
        total: 5000
      }
    ],
    subtotal: 5000,
    tax: 700,
    total: 5700,
    dueDate: '2024-12-15',
    issuedDate: '2024-11-15'
  }
];

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [wallet, setWallet] = useState<Wallet | null>(MOCK_WALLET);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // محاكاة جلب بيانات الدفع من الخادم
    const loadPaymentData = async () => {
      try {
        setIsLoading(true);
        // في الواقع، سيتم جلب البيانات من API
        // const response = await fetch('/api/payments/data');
        // const data = await response.json();
        // setPaymentMethods(data.paymentMethods);
        // setWallet(data.wallet);
        // setTransactions(data.transactions);
        // setInvoices(data.invoices);
      } catch (error) {
        console.error('خطأ في جلب بيانات الدفع:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
  }, []);

  const addPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethods([...paymentMethods, method]);
  };

  const removePaymentMethod = (methodId: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== methodId));
  };

  const setDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map(m => ({
        ...m,
        isDefault: m.id === methodId
      }))
    );
  };

  const processSubscriptionPaymentHandler = async (
    planId: string,
    methodId: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const method = paymentMethods.find(m => m.id === methodId);
      if (!method) throw new Error('طريقة الدفع غير موجودة');

      const result = await processSubscriptionPayment('user-001', planId, method, amount);
      
      if (result.success && result.transactionId) {
        const newTransaction: Transaction = {
          id: result.transactionId,
          userId: 'user-001',
          type: 'subscription',
          amount,
          currency: 'EGP',
          status: 'completed',
          paymentMethod: method,
          description: `دفع اشتراك الخطة ${planId}`,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString()
        };
        
        setTransactions([newTransaction, ...transactions]);
        
        if (wallet) {
          setWallet({
            ...wallet,
            balance: calculateWalletBalance([newTransaction, ...transactions]),
            lastUpdated: new Date().toISOString()
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطأ في معالجة الدفع:', error);
      return false;
    }
  };

  const processInvoicePaymentHandler = async (
    invoiceId: string,
    methodId: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const method = paymentMethods.find(m => m.id === methodId);
      if (!method) throw new Error('طريقة الدفع غير موجودة');

      const result = await processInvoicePayment(invoiceId, method, amount);
      
      if (result.success && result.transactionId) {
        const newTransaction: Transaction = {
          id: result.transactionId,
          userId: 'user-001',
          type: 'payment',
          amount,
          currency: 'EGP',
          status: 'completed',
          paymentMethod: method,
          description: `دفع الفاتورة ${invoiceId}`,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString()
        };
        
        setTransactions([newTransaction, ...transactions]);
        
        // تحديث حالة الفاتورة
        setInvoices(
          invoices.map(inv =>
            inv.id === invoiceId
              ? { ...inv, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
              : inv
          )
        );
        
        if (wallet) {
          setWallet({
            ...wallet,
            balance: calculateWalletBalance([newTransaction, ...transactions]),
            lastUpdated: new Date().toISOString()
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطأ في معالجة الدفع:', error);
      return false;
    }
  };

  const getTransactionHistory = (limit: number = 10): Transaction[] => {
    return transactions.slice(0, limit);
  };

  const getPendingInvoices = (): Invoice[] => {
    return invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue');
  };

  const value: PaymentContextType = {
    paymentMethods,
    wallet,
    transactions,
    invoices,
    isLoading,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    processSubscriptionPayment: processSubscriptionPaymentHandler,
    processInvoicePayment: processInvoicePaymentHandler,
    getTransactionHistory,
    getPendingInvoices
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment يجب أن يكون داخل PaymentProvider');
  }
  return context;
};
