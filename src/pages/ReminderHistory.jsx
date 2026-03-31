import React from 'react';
import { Mail, MessageSquare, Phone, CheckCircle2, XCircle, Clock } from 'lucide-react';
import '../styles/ReminderHistory.css';

const MOCK_REMINDERS = [
  { id: 'r1',  channel: 'email', escalationLevel: 1, sentAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),           status: 'sent' },
  { id: 'r2',  channel: 'sms',   escalationLevel: 2, sentAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),           status: 'sent' },
  { id: 'r3',  channel: 'push',  escalationLevel: 1, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),       status: 'dismissed' },
  { id: 'r4',  channel: 'email', escalationLevel: 1, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),       status: 'sent' },
  { id: 'r5',  channel: 'sms',   escalationLevel: 3, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),      status: 'failed' },
  { id: 'r6',  channel: 'email', escalationLevel: 2, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(),      status: 'sent' },
  { id: 'r7',  channel: 'push',  escalationLevel: 1, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),      status: 'sent' },
  { id: 'r8',  channel: 'email', escalationLevel: 1, sentAt: new Date(Date.now() - 1000 * 60 * 60 * 51).toISOString(),      status: 'dismissed' },
];

const getChannelIcon = (channel) => {
  switch (channel) {
    case 'email': return <Mail size={18} />;
    case 'sms':   return <Phone size={18} />;
    default:      return <MessageSquare size={18} />;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'sent':      return <CheckCircle2 size={18} className="icon-green" />;
    case 'failed':    return <XCircle size={18} className="icon-red" />;
    case 'dismissed': return <Clock size={18} className="icon-orange" />;
    default:          return <Clock size={18} />;
  }
};

const ReminderHistory = () => {
  const groupedByDate = MOCK_REMINDERS.reduce((acc, reminder) => {
    const date = new Date(reminder.sentAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(reminder);
    return acc;
  }, {});

  return (
    <div className="reminder-history-page">
      <div className="page-header">
        <h1>Reminder History</h1>
        <p>Track all reminders sent to you over the past 30 days</p>
      </div>

      <div className="history-container">
        {Object.entries(groupedByDate).map(([date, dayReminders]) => (
          <div key={date} className="history-day">
            <h3 className="day-header">{date}</h3>
            <div className="reminders-list">
              {dayReminders.map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-icons">
                    {getChannelIcon(reminder.channel)}
                    {getStatusIcon(reminder.status)}
                  </div>
                  <div className="reminder-info">
                    <p className="reminder-channel">
                      {reminder.channel.charAt(0).toUpperCase() + reminder.channel.slice(1)} Reminder
                    </p>
                    <p className="reminder-meta">
                      Escalation Level: {reminder.escalationLevel} • Status: {reminder.status}
                    </p>
                  </div>
                  <div className="reminder-time">
                    {new Date(reminder.sentAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderHistory;