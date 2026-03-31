import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import ReminderHistory from './pages/ReminderHistory';
import BehavioralInsights from './pages/BehavioralInsights';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/history" element={<ReminderHistory />} />
            <Route path="/insights" element={<BehavioralInsights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;