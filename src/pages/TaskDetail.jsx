import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import '../styles/TaskDetail.css';

const MOCK_TASKS = {
  '1': { id: '1', title: 'Finish project proposal', description: 'Complete the Q2 project proposal for the design team. Include budget estimates, timeline, and resource allocation.', deadline: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), priority: 'critical', status: 'pending', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  '2': { id: '2', title: 'Review pull requests', description: 'Review and merge open PRs before end of day', deadline: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), priority: 'high', status: 'pending', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  '3': { id: '3', title: 'Weekly team sync', description: 'Prepare agenda for weekly team meeting', deadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), priority: 'medium', status: 'pending', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  '4': { id: '4', title: 'Update documentation', description: 'Update API docs to reflect latest changes', deadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), priority: 'low', status: 'pending', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
  '5': { id: '5', title: 'Fix login bug', description: 'Investigate and fix the auth redirect bug on mobile', deadline: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), priority: 'critical', status: 'overdue', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString() },
  '6': { id: '6', title: 'Deploy staging build', description: 'Deploy latest changes to staging environment', deadline: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), priority: 'high', status: 'completed', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() },
};

const MOCK_REMINDERS = {
  '1': [
    { id: 'r1', channel: 'email', escalationLevel: 1, scheduledAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), status: 'sent' },
    { id: 'r2', channel: 'sms', escalationLevel: 2, scheduledAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(), status: 'pending' },
  ],
  '5': [
    { id: 'r3', channel: 'email', escalationLevel: 1, scheduledAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), status: 'sent' },
    { id: 'r4', channel: 'sms', escalationLevel: 2, scheduledAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: 'sent' },
    { id: 'r5', channel: 'push', escalationLevel: 3, scheduledAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), status: 'sent' },
  ],
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(MOCK_TASKS[id] || null);
  const reminders = MOCK_REMINDERS[id] || [];

  if (!task) return <div className="error-message">Task not found</div>;

  const isOverdue = task.status === 'overdue' || new Date(task.deadline) < new Date();

  const handleCompleteTask = () => {
    setTask({ ...task, status: 'completed', completedAt: new Date().toISOString() });
  };

  return (
    <div className="task-detail-page">
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="task-detail-card">
        <div className="detail-header">
          <div>
            <h1>{task.title}</h1>
            <p className="task-meta">Created on {new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="detail-badges">
            <span className={`badge priority-${task.priority}`}>{task.priority.toUpperCase()}</span>
            <span className={`badge status-${task.status}`}>{task.status.toUpperCase()}</span>
          </div>
        </div>

        {task.description && (
          <div className="detail-section">
            <h2>Description</h2>
            <p>{task.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h2>Deadline</h2>
          <div className={`deadline-info ${isOverdue ? 'overdue' : ''}`}>
            <Clock size={20} />
            <div>
              <p className="deadline-date">
                {new Date(task.deadline).toLocaleDateString()} at {new Date(task.deadline).toLocaleTimeString()}
              </p>
              {isOverdue && <p className="overdue-text">This task is overdue</p>}
            </div>
          </div>
        </div>

        {task.status !== 'completed' && (
          <button className="btn-complete-large" onClick={handleCompleteTask}>
            <CheckCircle2 size={20} /> Mark as Completed
          </button>
        )}

        {reminders.length > 0 && (
          <div className="detail-section">
            <h2>Reminders ({reminders.length})</h2>
            <div className="reminders-list">
              {reminders.map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-info">
                    <p className="reminder-channel">{reminder.channel.toUpperCase()} — Level {reminder.escalationLevel}</p>
                    <p className="reminder-time">Scheduled: {new Date(reminder.scheduledAt).toLocaleString()}</p>
                  </div>
                  <span className={`badge status-${reminder.status}`}>{reminder.status.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;