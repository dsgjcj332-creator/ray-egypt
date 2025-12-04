
import type { Metadata } from "next";
import { Cairo, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '../components/common/ThemeContext';
import { ToastProvider } from '../components/common/ToastContext';
import { AuthProvider } from '../context/AuthContext';
import GeminiAssistant from '../components/common/GeminiAssistant';

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
        {/* Bootstrap 5 CSS (CDN) - Added as requested for modern UI components */}
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cairo.variable} ${dancing.variable} font-sans bg-gray-50 text-ray-black dark:bg-gray-950 dark:text-gray-100`}>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
              <GeminiAssistant context="customer" />
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
        
        {/* Bootstrap JS (Optional for interactive components) */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
          crossOrigin="anonymous"
          async
        ></script>
      </body>
    </html>
  );
}
