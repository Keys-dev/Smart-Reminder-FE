import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

const MOCK_STATS = {
  totalTasks: 12,
  pendingTasks: 7,
  completedTasks: 4,
  overdueTasks: 1,
  completionRate: 0.67,
};

const MOCK_TASKS = [
  { id: '1', title: 'Finish project proposal', description: 'Complete the Q2 project proposal for the design team', deadline: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), priority: 'critical', status: 'pending' },
  { id: '2', title: 'Review pull requests', description: 'Review and merge open PRs before end of day', deadline: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), priority: 'high', status: 'pending' },
  { id: '3', title: 'Weekly team sync', description: 'Prepare agenda for weekly team meeting', deadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), priority: 'medium', status: 'pending' },
  { id: '4', title: 'Update documentation', description: 'Update API docs to reflect latest changes', deadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), priority: 'low', status: 'pending' },
  { id: '5', title: 'Fix login bug', description: 'Investigate and fix the auth redirect bug on mobile', deadline: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), priority: 'critical', status: 'overdue' },
  { id: '6', title: 'Deploy staging build', description: 'Deploy latest changes to staging environment', deadline: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), priority: 'high', status: 'completed' },
];

const MOCK_ORGANISED = {
  critical: MOCK_TASKS.filter(t => t.priority === 'critical' && t.status !== 'completed'),
  urgent:   MOCK_TASKS.filter(t => t.priority === 'high' && t.status !== 'completed'),
  upcoming: MOCK_TASKS.filter(t => t.priority === 'medium' || t.priority === 'low'),
  completed: MOCK_TASKS.filter(t => t.status === 'completed'),
};

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const stats = {
    ...MOCK_STATS,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    overdueTasks: tasks.filter(t => t.status === 'overdue').length,
  };

  const organizedTasks = {
    critical: tasks.filter(t => t.priority === 'critical' && t.status !== 'completed'),
    urgent:   tasks.filter(t => t.priority === 'high' && t.status !== 'completed'),
    upcoming: tasks.filter(t => (t.priority === 'medium' || t.priority === 'low') && t.status !== 'completed'),
    completed: tasks.filter(t => t.status === 'completed'),
  };

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setShowTaskForm(false);
  };

  const handleStatusChange = (id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const renderTaskList = (taskList) =>
    taskList && taskList.length > 0
      ? taskList.map(task => <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />)
      : <p className="empty-state">No tasks in this category</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Smart Reminder Dashboard</h1>
          <p>Welcome back! Here's your task overview</p>
        </div>
        <button className="btn-primary btn-lg" onClick={() => setShowTaskForm(true)}>
          <Plus size={20} /> New Task
        </button>
      </div>

      {showTaskForm && (
        <div className="modal-overlay">
          <TaskForm onClose={() => setShowTaskForm(false)} onTaskCreated={handleTaskCreated} />
        </div>
      )}

      <div className="stats-grid">
        <StatCard title="Total Tasks"     value={stats.totalTasks}     icon={<Clock size={24} />}         color="blue" />
        <StatCard title="Pending"         value={stats.pendingTasks}   icon={<Clock size={24} />}         color="blue" />
        <StatCard title="Completed"       value={stats.completedTasks} icon={<CheckCircle2 size={24} />}  color="green" />
        <StatCard title="Overdue"         value={stats.overdueTasks}   icon={<AlertCircle size={24} />}   color="red" />
        <StatCard title="Completion Rate" value={`${Math.round(stats.completedTasks / stats.totalTasks * 100)}%`} icon={<TrendingUp size={24} />} color="purple" />
      </div>

      <div className="tasks-section">
        <div className="tabs">
          {['overview', 'critical', 'urgent', 'upcoming', 'completed'].map(tab => (
            <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="task-section">
                <h3><AlertCircle size={20} /> Critical Tasks</h3>
                <div className="task-list">{renderTaskList(organizedTasks.critical)}</div>
              </div>
              <div className="task-section">
                <h3><Clock size={20} /> Urgent (Next 24h)</h3>
                <div className="task-list">{renderTaskList(organizedTasks.urgent)}</div>
              </div>
            </div>
          )}
          {activeTab === 'critical'  && <div className="task-list">{renderTaskList(organizedTasks.critical)}</div>}
          {activeTab === 'urgent'    && <div className="task-list">{renderTaskList(organizedTasks.urgent)}</div>}
          {activeTab === 'upcoming'  && <div className="task-list">{renderTaskList(organizedTasks.upcoming)}</div>}
          {activeTab === 'completed' && <div className="task-list">{renderTaskList(organizedTasks.completed)}</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;