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
import AssignReworkReason from '../../components/assignReworkReason';
import './styles.css';

const initialTaskData = [
  { 
    id: 1, 
    part: 'Part 1', 
    startTime: '2025 - 04 - 09 13:00:00', 
    endTime: '2025 - 04 - 09 13:00:00',
    activity: 'Good',
    duration: 150,
    good: 150, 
    scrap: 30, 
    rework: 20, 
    reason: 'Assigned'
  },
  { 
    id: 2, 
    part: 'Part 2', 
    startTime: '2025 - 04 - 09 13:00:00', 
    endTime: '2025 - 04 - 09 13:00:00',
    activity: 'Bad',
    duration: 50,
    good: 100, 
    scrap: 50, 
    rework: 10, 
    reason: 'Assigned'
  },
  { 
    id: 3, 
    part: 'Part 3', 
    startTime: '2025 - 04 - 09 13:00:00', 
    endTime: '2025 - 04 - 09 13:00:00',
    activity: 'Good',
    duration: 200,
    good: 200, 
    scrap: 20, 
    rework: 10, 
    reason: 'Not Assigned'
  },
];

const GoodBadCount = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [taskData, setTaskData] = useState(initialTaskData);
  const [isReworkModalOpen, setIsReworkModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleOpenReworkModal = (row) => {
    setSelectedRow(row);
    setIsReworkModalOpen(true);
  };

  const handleCloseReworkModal = () => {
    setIsReworkModalOpen(false);
    setSelectedRow(null);
  };

  const handleSaveReworkReason = (reason) => {
    setTaskData(taskData.map(row =>
      row.id === selectedRow.id ? { ...row, reason } : row
    ));
    handleCloseReworkModal();
  };

  const chartOptions = {
    chart: {
      type: 'column',
      height: 330,
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Good vs Bad Count by Task',
      style: {
        fontSize: '16px',
        fontWeight: '500'
      }
    },
    xAxis: {
      categories: taskData.map(item => item.part),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5,
        groupPadding: 0.1
      }
    },
    series: [{
      name: 'Good',
      data: taskData.map(item => item.good),
      color: '#4caf50'
    }, {
      name: 'Scrap',
      data: taskData.map(item => item.scrap),
      color: '#f44336'
    }, {
      name: 'Rework',
      data: taskData.map(item => item.rework),
      color: '#ff9800'
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <Box className="good-bad-container">
      {/* Header */}
      <Box className="header">
        <Typography variant="h5">Good Bad Count</Typography>
        <Box className="user-profile">
          <Avatar>U1</Avatar>
          <Typography>User 1</Typography>
        </Box>
      </Box>

      {/* Bar Chart */}
      <Paper className="chart-container good-bad-chart">
        <Box className="chart-area">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </Box>
      </Paper>

      {/* Table */}
      <Box className="table-section good-bad-table">
        <Typography variant="h5">
          Task Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Part</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Total Duration</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.part}</TableCell>
                  <TableCell>{task.startTime}</TableCell>
                  <TableCell>{task.endTime}</TableCell>
                  <TableCell>
                    <Box className="play-video" onClick={handleOpenVideoModal} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Play Video
                      <IconButton size="small" onClick={handleOpenVideoModal}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className={`status-badge ${task.activity.toLowerCase()}`}>
                      {task.activity}
                    </Box>
                  </TableCell>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell>{task.reason}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenReworkModal(task)}>
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
      <AssignReworkReason
        open={isReworkModalOpen}
        onClose={handleCloseReworkModal}
        onSave={handleSaveReworkReason}
        initialReason={selectedRow ? selectedRow.reason : ''}
        part={selectedRow ? selectedRow.part : ''}
        id={selectedRow ? selectedRow.id : ''}
      />
    </Box>
  );
};

export default GoodBadCount; 
