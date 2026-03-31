import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onStatusChange }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const diff = new Date(task.deadline).getTime() - Date.now();
      if (diff <= 0) { setTimeRemaining('Overdue'); return; }
      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0)        setTimeRemaining(`${days}d ${hours}h`);
      else if (hours > 0)  setTimeRemaining(`${hours}h ${mins}m`);
      else                 setTimeRemaining(`${mins}m`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [task.deadline]);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onStatusChange?.(task.id, 'completed');
      setIsCompleting(false);
    }, 300);
  };

  const isOverdue = task.status === 'overdue' || new Date(task.deadline) < new Date();
  const isCompleted = task.status === 'completed';

  const getStatusIcon = () => {
    if (isCompleted)  return <CheckCircle2 className="icon-green" size={20} />;
    if (isOverdue)    return <AlertCircle className="icon-red" size={20} />;
    return <Clock className="icon-blue" size={20} />;
  };

  return (
    <div className={`task-card ${isOverdue && !isCompleted ? 'overdue' : ''}`}>
      <div className="task-card-content">
        <div className="task-icon">{getStatusIcon()}</div>
        <div className="task-info">
          <div className="task-header">
            <Link to={`/task/${task.id}`} className="task-title">
              {isCompleted ? <s>{task.title}</s> : task.title}
            </Link>
            <div className="task-badges">
              <span className={`badge priority-${task.priority}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <span className="badge status">
                {isCompleted ? 'Completed' : isOverdue ? 'Overdue' : 'Pending'}
              </span>
            </div>
          </div>

          {task.description && (
            <p className={`task-description ${isCompleted ? 'completed' : ''}`}>{task.description}</p>
          )}

          <div className="task-meta">
            <div className="countdown">
              <Clock size={16} />
              <span className={isOverdue && !isCompleted ? 'overdue-text' : ''}>{timeRemaining}</span>
            </div>
            <span className="deadline">
              {new Date(task.deadline).toLocaleDateString()}{' '}
              {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {isExpanded && task.description && <div className="task-details"><p>{task.description}</p></div>}
        </div>

        <div className="task-actions">
          {!isCompleted && (
            <button className="btn-complete" onClick={handleComplete} disabled={isCompleting}>
              {isCompleting ? '...' : 'Complete'}
            </button>
          )}
          {task.description && (
            <button className="btn-expand" onClick={() => setIsExpanded(!isExpanded)}>
              <ChevronDown size={18} className={isExpanded ? 'rotated' : ''} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;