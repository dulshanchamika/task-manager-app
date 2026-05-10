import React from 'react';
import { Edit2, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const priorityColors = {
    LOW: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    MEDIUM: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    HIGH: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusIcons = {
    PENDING: <Clock className="w-4 h-4" />,
    COMPLETED: <CheckCircle2 className="w-4 h-4" />,
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group ${task.status === 'COMPLETED' ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className={`text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 ${task.status === 'COMPLETED' ? 'line-through decoration-2 decoration-blue-500/50' : ''}`}>
        {task.title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700/50">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <AlertCircle className="w-4 h-4" />
          <span>{format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>
        </div>
        
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            task.status === 'COMPLETED'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
          }`}
        >
          {statusIcons[task.status]}
          <span>{task.status === 'COMPLETED' ? 'Done' : 'Complete'}</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
