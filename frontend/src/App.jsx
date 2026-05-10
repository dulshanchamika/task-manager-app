import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Layout from './components/Layout';
import Stats from './components/Stats';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import ProfileModal from './components/ProfileModal';
import api from './api/axios';

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'PENDING', label: 'Pending' },
  { id: 'COMPLETED', label: 'Completed' },
  { id: 'LOW', label: 'Low Priority' },
  { id: 'MEDIUM', label: 'Medium Priority' },
  { id: 'HIGH', label: 'High Priority' },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      const res = await api.get('/tasks', { params });
      setAllTasks(res.data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get('/profile');
      setProfile(res.data);
    } catch {
      toast.error('Failed to load profile');
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, [fetchTasks, fetchProfile]);

  // Client-side filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setTasks(allTasks);
    } else if (['PENDING', 'COMPLETED'].includes(activeFilter)) {
      setTasks(allTasks.filter((t) => t.status === activeFilter));
    } else {
      setTasks(allTasks.filter((t) => t.priority === activeFilter));
    }
  }, [activeFilter, allTasks]);

  const handleCreateTask = async (form) => {
    try {
      await api.post('/tasks', form);
      toast.success('Task created successfully!');
      setModalOpen(false);
      fetchTasks();
    } catch {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (form) => {
    try {
      await api.put(`/tasks/${editingTask.id}`, form);
      toast.success('Task updated successfully!');
      setModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    try {
      await api.put(`/tasks/${task.id}`, { ...task, status: newStatus });
      toast.success(`Task marked as ${newStatus.toLowerCase()}`);
      fetchTasks();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateProfile = async (form) => {
    try {
      const res = await api.put('/profile', form);
      setProfile(res.data);
      toast.success('Profile updated successfully!');
      setProfileModalOpen(false);
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#f1f5f9',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#1e293b' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
        }}
      />

      <Layout 
        onSearch={setSearchQuery} 
        onFilter={setActiveFilter}
        profile={profile}
        onOpenProfile={() => setProfileModalOpen(true)}
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Manage and track all your tasks in one place.
            </p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Stats */}
        <Stats tasks={allTasks} />

        {/* Mobile search */}
        <div className="relative md:hidden mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search tasks..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
        />
      </Layout>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
      
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSubmit={handleUpdateProfile}
        profile={profile}
      />
    </>
  );
}
