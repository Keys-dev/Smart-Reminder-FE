const API_BASE = '/api';

export const api = {
  // Tasks
  tasks: {
    list: () => fetch(`${API_BASE}/tasks`).then(r => r.json()),
    get: (id) => fetch(`${API_BASE}/tasks/${id}`).then(r => r.json()),
    create: (data) =>
      fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
    update: (id, data) =>
      fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
    delete: (id) =>
      fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' }).then(r => r.json()),
  },

  // Reminders
  reminders: {
    list: () => fetch(`${API_BASE}/reminders`).then(r => r.json()),
    getHistory: (taskId) =>
      fetch(`${API_BASE}/reminders/task/${taskId}`).then(r => r.json()),
    create: (data) =>
      fetch(`${API_BASE}/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
  },

  // Dashboard
  dashboard: {
    getSummary: () => fetch(`${API_BASE}/dashboard/summary`).then(r => r.json()),
    getOrganizedTasks: () =>
      fetch(`${API_BASE}/dashboard/organized-tasks`).then(r => r.json()),
  },

  // Behavioral
  behavioral: {
    getAnalysis: () => fetch(`${API_BASE}/behavioral/analyze`).then(r => r.json()),
    recordInteraction: (data) =>
      fetch(`${API_BASE}/behavioral/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
  },

  // Auth
  auth: {
    me: () => fetch(`${API_BASE}/auth/me`).then(r => r.json()),
    logout: () => fetch(`${API_BASE}/auth/logout`, { method: 'POST' }).then(r => r.json()),
  },
};