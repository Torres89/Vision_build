import React, { useState } from 'react';
import { Box } from '@mui/material';
import HomePage from './steps/home';
import TaskCount from './steps/taskCount';
import TaskDuration from './steps/taskDuration';
import GoodBadCount from './steps/goodBadCount';
import Analysis from './steps/analysis';
import ConfigurationSystem from './steps/configurationSystem';
import ConfigurationStation from './steps/configurationStation';
import ConfigurationSchedule from './steps/configurationSchedule';
import Sidebar from './components/sideBar';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'taskCount':
        return <TaskCount />;
      case 'taskDuration':
        return <TaskDuration />;
      case 'goodBadCount':
        return <GoodBadCount />;
      case 'analysis':
        return <Analysis />;
      case 'configurationSystem':
        return <ConfigurationSystem />;
      case 'configurationStation':
        return <ConfigurationStation />;
      case 'configurationSchedule':
        return <ConfigurationSchedule />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
