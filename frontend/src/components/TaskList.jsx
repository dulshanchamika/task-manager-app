import React from 'react';
import { Loader2, ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading, onEdit, onDelete, onToggleStatus }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p className="text-sm font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-4">
          <ClipboardList className="w-10 h-10 text-gray-300 dark:text-gray-600" />
        </div>
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No tasks found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
