import React, { useState, useEffect } from 'react';
import { Menu, Search, Moon, Sun, Bell, User, CheckCircle2 } from 'lucide-react';

const Header = ({ setIsSidebarOpen, onSearch, profile, onOpenProfile }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-64 sm:w-80 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </button>
          
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">Notifications</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700/50">
                    <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Welcome to Task Manager!</p>
                      <p className="text-xs text-gray-500 mt-1">Start organizing your life today.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Just now</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="mt-0.5"><User className="w-5 h-5 text-blue-500" /></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Profile ready</p>
                      <p className="text-xs text-gray-500 mt-1">You can now customize your profile details.</p>
                      <p className="text-[10px] text-gray-400 mt-1">5m ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        {/* Profile Area */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-3 pl-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1.5 rounded-xl transition-colors"
        >
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {profile ? profile.name : 'Loading...'}
            </p>
            <p className="text-xs text-gray-500">
              {profile ? profile.position : '...'}
            </p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 overflow-hidden">
            {profile?.photo ? (
              <img src={profile.photo} alt="User" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
