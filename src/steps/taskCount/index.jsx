import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon, MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ModalVideo from '../../components/modalVideo';
import AssignUnclassified from '../../components/assignUnclassified';
import './styles.css';

const TaskCount = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskData, setTaskData] = useState([
    { id: 1, startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00' },
    { id: 2, startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00' },
    { id: 3, startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00' },
    { id: 4, startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00' },
  ]);
  const [barData, setBarData] = useState([
    { task: 'Task 1', value: 75 },
    { task: 'Task 2', value: 45 },
    { task: 'Task 3', value: 90 },
  ]);

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleOpenAssignModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedTaskId(null);
  };

  const handleSaveTask = (taskId, taskName, newTaskId) => {
    // Remove task from table
    setTaskData(taskData.filter(task => task.id !== taskId));
    
    // Generate random value between 5 and 100
    const randomValue = Math.floor(Math.random() * 96) + 5;
    
    // Add new column to chart with both ID and Name and random value
    setBarData([...barData, { task: `${taskName}`, value: randomValue }]);
  };

  const chartOptions = {
    chart: {
      type: 'column',
      height: 300,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: barData.map(item => item.task),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Task Count (%)',
        style: {
          fontSize: '13px',
          fontWeight: 'bold'
        }
      },
      labels: {
        format: '{value}%'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="padding:0"><b>{point.y}%</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5,
        color: '#1b5e20'
      }
    },
    series: [{
      name: 'Task Count',
      data: barData.map(item => item.value),
      showInLegend: false
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <Box className="task-count-container">
      {/* Header */}
      <Box className="header">
        <Typography variant="h5">Task Count</Typography>
        <Box className="user-profile">
          <Avatar>U1</Avatar>
          <Typography>User 1</Typography>
        </Box>
      </Box>

      {/* Bar Chart */}
      <Paper className="chart-container-count">
        <Box className="chart-area-count">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </Box>
      </Paper>

      {/* Table */}
      <Box className="table-section">
        <Typography variant="h5">
          Unclassified Tasks
        </Typography>
        <TableContainer component={Paper} className="table-count">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>ID</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.startTime}</TableCell>
                  <TableCell>{task.endTime}</TableCell>
                  <TableCell>
                    <Box className="play-video" onClick={handleOpenVideoModal}>
                      Play Video
                      <IconButton size="small" onClick={handleOpenVideoModal}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenAssignModal(task.id)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ModalVideo open={isVideoModalOpen} onClose={handleCloseVideoModal} />
      <AssignUnclassified
        open={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onSave={handleSaveTask}
        taskId={selectedTaskId}
      />
    </Box>
  );
};

export default TaskCount;
