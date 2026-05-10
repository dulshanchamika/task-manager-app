import React from 'react';
import { ListTodo, CheckCircle2, Clock, BarChart3 } from 'lucide-react';

const Stats = ({ tasks }) => {
  const stats = [
    { 
      label: 'Total Tasks', 
      value: tasks.length, 
      icon: ListTodo, 
      color: 'blue',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400'
    },
    { 
      label: 'Completed', 
      value: tasks.filter(t => t.status === 'COMPLETED').length, 
      icon: CheckCircle2, 
      color: 'green',
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400'
    },
    { 
      label: 'Pending', 
      value: tasks.filter(t => t.status === 'PENDING').length, 
      icon: Clock, 
      color: 'yellow',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-600 dark:text-yellow-400'
    },
    { 
      label: 'Success Rate', 
      value: tasks.length > 0 ? `${Math.round((tasks.filter(t => t.status === 'COMPLETED').length / tasks.length) * 100)}%` : '0%', 
      icon: BarChart3, 
      color: 'purple',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${stat.bg} ${stat.text} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
