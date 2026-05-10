import React from 'react';
import { LayoutDashboard, CheckCircle2, Clock, ListTodo, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, onFilter }) => {
  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo },
    { id: 'COMPLETED', label: 'Completed', icon: CheckCircle2 },
    { id: 'PENDING', label: 'Pending', icon: Clock },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">TaskManager</span>
          </div>
          <button 
            className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onFilter(item.id);
                setIsOpen(false);
              }}
              className="flex items-center w-full gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              Task Pro
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your tasks efficiently with our modern UI.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
