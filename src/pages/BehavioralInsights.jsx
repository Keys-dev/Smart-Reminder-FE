import React from 'react';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';
import '../styles/BehavioralInsights.css';

const MOCK_ANALYSIS = {
  completionRate: 0.72,
  avgResponseTime: 14400000, // 4 hours in ms
  learningDataPoints: 48,
  escalationSensitivity: 1.4,
  optimalReminderHour: 9,
  optimalReminderDayOfWeek: 2, // Tuesday
  preferredChannel: 'email',
  insights: [
    'You complete tasks 40% faster when reminded in the morning between 9–11am.',
    'Tuesday and Wednesday are your most productive days — schedule critical tasks then.',
    'Email reminders have a 78% response rate for you, outperforming SMS by 23%.',
    'Tasks with deadlines under 4 hours show higher urgency response time.',
    'You tend to dismiss low-priority reminders — consider reducing their frequency.',
  ],
};

const getDayName = (dayOfWeek) => {
  if (dayOfWeek === null) return 'Not enough data';
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
};

const BehavioralInsights = () => {
  const analysis = MOCK_ANALYSIS;

  return (
    <div className="insights-page">
      <div className="page-header">
        <h1>Behavioral Insights</h1>
        <p>Personalized recommendations based on your task completion patterns</p>
      </div>

      <div className="insights-container">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon"><TrendingUp size={24} /></div>
            <div className="metric-content">
              <p className="metric-label">Completion Rate</p>
              <p className="metric-value">{Math.round(analysis.completionRate * 100)}%</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon"><Clock size={24} /></div>
            <div className="metric-content">
              <p className="metric-label">Avg Response Time</p>
              <p className="metric-value">{Math.round(analysis.avgResponseTime / 3600000)}h</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon"><Target size={24} /></div>
            <div className="metric-content">
              <p className="metric-label">Data Points</p>
              <p className="metric-value">{analysis.learningDataPoints}</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon"><Zap size={24} /></div>
            <div className="metric-content">
              <p className="metric-label">Escalation Sensitivity</p>
              <p className="metric-value">{analysis.escalationSensitivity.toFixed(1)}x</p>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h2>Optimal Reminder Timing</h2>
          <div className="timing-grid">
            <div className="timing-card">
              <p className="timing-label">Best Hour</p>
              <p className="timing-value">{analysis.optimalReminderHour.toString().padStart(2, '0')}:00</p>
              <p className="timing-description">You're most productive around this time</p>
            </div>
            <div className="timing-card">
              <p className="timing-label">Best Day</p>
              <p className="timing-value">{getDayName(analysis.optimalReminderDayOfWeek)}</p>
              <p className="timing-description">Your most productive day of the week</p>
            </div>
            <div className="timing-card">
              <p className="timing-label">Preferred Channel</p>
              <p className="timing-value">{analysis.preferredChannel.charAt(0).toUpperCase() + analysis.preferredChannel.slice(1)}</p>
              <p className="timing-description">Channel with highest response rate</p>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h2>Task Completion Progress</h2>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${analysis.completionRate * 100}%` }} />
            </div>
            <p className="progress-text">{Math.round(analysis.completionRate * 100)}% of tasks completed on time</p>
          </div>
        </div>

        <div className="insights-section">
          <h2>Personalized Recommendations</h2>
          <ul className="insights-list">
            {analysis.insights.map((insight, i) => (
              <li key={i} className="insight-item">
                <span className="insight-icon">✓</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BehavioralInsights;