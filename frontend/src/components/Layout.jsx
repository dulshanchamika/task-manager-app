import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, onSearch, onFilter, profile, onOpenProfile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onFilter={onFilter} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          setIsSidebarOpen={setIsSidebarOpen} 
          onSearch={onSearch}
          profile={profile}
          onOpenProfile={onOpenProfile}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
