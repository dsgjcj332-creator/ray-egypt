
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4">
      <div className="w-16 h-16 bg-ray-gold rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
        <span className="text-3xl font-black text-ray-black">R</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 font-bold text-sm animate-pulse">
        <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-ray-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        جاري التحميل...
      </div>
    </div>
  );
}
