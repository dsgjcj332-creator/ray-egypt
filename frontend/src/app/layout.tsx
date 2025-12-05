
import type { Metadata } from "next";
import { Cairo, Dancing_Script } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from '@/components/common/ThemeContext';
import { ToastProvider } from '@/components/common/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GeminiAssistant from '@/components/common/GeminiAssistant';

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: '--font-cairo' });
const dancing = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing' });

export const metadata: Metadata = {
  title: "RAY - راي | نور طريق نجاحك",
  description: "المنصة الرقمية المتكاملة للتجار والمستهلكين في مصر. نظام إدارة (ERP/POS) ومتجر إلكتروني.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${cairo.variable} ${dancing.variable} font-sans bg-gray-50 text-ray-black dark:bg-gray-950 dark:text-gray-100`}>
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <ToastProvider>
                {children}
                <GeminiAssistant context="customer" />
              </ToastProvider>
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
