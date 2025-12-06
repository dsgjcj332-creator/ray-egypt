
import React, { useState, useEffect } from 'react';
import { Menu, Bell, LayoutGrid, Search, Sun, Moon } from 'lucide-react';
import { DashboardConfig, BusinessType, colorClasses } from '../../config';
import CommandPalette from './CommandPalette';
import { useTheme } from '../../../common/ThemeContext';

interface HeaderProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  setCurrentBusinessType: (type: BusinessType) => void;
  theme: any;
  onNavigate?: (view: string) => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  config, 
  currentBusinessType, 
  setCurrentBusinessType, 
  theme, 
  onNavigate,
  onMenuClick 
}) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  // Listen for Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm p-3 md:p-4 flex justify-between items-center sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-3 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 active:scale-95 transition"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white truncate max-w-[150px] md:max-w-none">{config.title}</h2>
            <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${theme.btn}`}></span>
              متصل الآن
            </p>
          </div>
        </div>

        {/* Search Trigger (Desktop) */}
        <div 
          onClick={() => setIsPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 cursor-pointer transition text-gray-400 w-64"
        >
           <Search className="w-4 h-4" />
           <span className="text-sm flex-1">بحث سريع...</span>
           <span className="text-[10px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded shadow-sm">Ctrl+K</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition active:scale-95"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => setIsPaletteOpen(true)}
            className="md:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 active:scale-95"
          >
             <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('notifications')}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group active:scale-95"
          >
             <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-ray-blue dark:group-hover:text-white" />
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
          </button>
          <div 
            onClick={() => onNavigate && onNavigate('profile')}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-ray-gold cursor-pointer hover:shadow-md transition active:scale-95"
          >
             <img src={`https://ui-avatars.com/api/?name=${config.title}&background=random`} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>
      
      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Header;
