import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Description as DescriptionIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon,
  Help as HelpIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { FaHome, FaTasks, FaClock, FaThumbsUp, FaChartLine, FaCog, FaIndustry, FaCalendarAlt } from 'react-icons/fa';
import './styles.css';

const Sidebar = ({ onNavigate, currentPage }) => {
  const handleItemClick = (page) => {
    if (page) {
      onNavigate(page);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'taskCount', label: 'Task Count', icon: <FaTasks /> },
    { id: 'taskDuration', label: 'Task Duration', icon: <FaClock /> },
    { id: 'goodBadCount', label: 'Good/Bad Count', icon: <FaThumbsUp /> },
    { id: 'analysis', label: 'Analysis', icon: <FaChartLine /> },,
  ];

  const configItems = [
    { id: 'configurationSystem', label: 'Configuration System', icon: <FaCog /> },
    { id: 'configurationStation', label: 'Configuration Station', icon: <FaIndustry /> },
    { id: 'configurationSchedule', label: 'Configuration Schedule', icon: <FaCalendarAlt /> },
  ];

  return (
    <Box className="sidebar">
      <Box 
        className={`logo ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => handleItemClick('home')} 
      >
        <Typography variant="h6" className="logo-text">
          AutomationHR AI
        </Typography>
      </Box>
      <Typography variant="h6" className="task-title">Reports</Typography>
      <List className='task-list'>
        {navItems.map((item) => (
          <ListItem
            key={item.id}
            className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <ListItemIcon className="sidebar-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className="task-title">Configuration</Typography>
      <List className='config-list'>
        {configItems.map((item) => (
          <ListItem
          key={item.id}
          className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => handleItemClick(item.id)}
        >
          <ListItemIcon className="sidebar-icon">
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
        ))}
      </List>

      <Box className="sidebar-footer">
        <ListItem className='sidebar-item'>
          <ListItemIcon className="sidebar-icon">
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem className='sidebar-item'>
          <ListItemIcon className="sidebar-icon">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar; 