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
import HighchartsMore from 'highcharts/highcharts-more';
import AssignReason from '../../components/assignReason';
import ModalVideo from '../../components/ModalVideo';
import './styles.css';

if (typeof HighchartsMore === 'function') {
  HighchartsMore(Highcharts);
}

const initialBoxPlotData = [
  {
    name: 'Task 5',
    low: 4.3,
    q1: 4.8,
    median: 5.0,
    q3: 5.2,
    high: 5.8,
    mean: 5.0
  },
  {
    name: 'Task 6',
    low: 4.8,
    q1: 5.7,
    median: 6.0,
    q3: 6.3,
    high: 7.0,
    mean: 5.9
  },
  {
    name: 'Task 7',
    low: 5.6,
    q1: 6.2,
    median: 6.5,
    q3: 6.8,
    high: 8.0,
    mean: 6.6
  }
];

const initialTaskData = [
  { id: 1, task: 'Task 1', startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00', totalDuration: '260 sec', reason: 'Assigned' },
  { id: 2, task: 'Task 2', startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00', totalDuration: '150 sec', reason: 'Not Assigned' },
  { id: 3, task: 'Task 3', startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00', totalDuration: '300 sec', reason: 'Not assigned' },
  { id: 4, task: 'Task 4', startTime: '2025 - 04 - 09 13:00:00', endTime: '2025 - 04 - 09 13:00:00', totalDuration: '400 sec', reason: 'Not Assigned' },
];

const TaskDuration = () => {
  const [boxPlotData, setBoxPlotData] = useState(initialBoxPlotData);
  const [taskData, setTaskData] = useState(initialTaskData);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenAssignModal = (row) => {
    setSelectedRow(row);
    setAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
    setSelectedRow(null);
  };

  const handleSaveAssign = ({ id, task, reason }) => {
    // Generar valores random para boxplot
    let low = +(Math.random() * 3 + 4).toFixed(1); // 4.0 - 7.0
    let q1 = +(low + Math.random() * 0.5).toFixed(1);
    let median = +(q1 + Math.random() * 0.5).toFixed(1);
    let q3 = +(median + Math.random() * 0.5).toFixed(1);
    let high = +(q3 + Math.random() * 0.5).toFixed(1);
    let mean = +(low + (high - low) * Math.random()).toFixed(1);
    setBoxPlotData([
      ...boxPlotData,
      { name: task, low, q1, median, q3, high, mean }
    ]);
    // Cambiar estado de la fila a 'Assigned'
    setTaskData(taskData.map(row =>
      row.id === id ? { ...row, reason: 'Assigned', task } : row
    ));
  };

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const chartOptions = {
    chart: {
      type: 'boxplot',
      height: 300
    },
    title: {
      text: 'Box Plot with Mean Value',
      style: {
        fontSize: '16px'
      }
    },
    legend: {
      enabled: false
    },
    credits:{
      enabled:false
    },
    xAxis: {
      categories: boxPlotData.map(data => data.name),
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: null
      },
      min: 4.0,
      max: 8.5,
      gridLineWidth: 1
    },
    plotOptions: {
      boxplot: {
        fillColor: '#b3e5fc',
        lineWidth: 1,
        medianColor: '#1976d2',
        medianWidth: 2,
        stemColor: '#64b5f6',
        stemDashStyle: 'solid',
        stemWidth: 1,
        whiskerColor: '#64b5f6',
        whiskerLength: '50%',
        whiskerWidth: 1
      }
    },
    series: [
      {
        name: 'Duration',
        data: boxPlotData.map(data => [
          data.low,
          data.q1,
          data.median,
          data.q3,
          data.high
        ]),
        tooltip: {
          headerFormat: '<em>{point.key}</em><br/>'
        }
      },
      {
        name: 'Mean',
        type: 'scatter',
        data: boxPlotData.map((data, i) => ({
          x: i,
          y: data.mean
        })),
        marker: {
          fillColor: '#ef5350',
          lineWidth: 0,
          lineColor: '#ef5350',
          radius: 4
        },
        tooltip: {
          pointFormat: 'Mean: {point.y:.1f}'
        }
      }
    ]
  };

  return (
    <Box className="task-duration-container">
      {/* Header */}
      <Box className="header">
        <Typography variant="h5">Task Duration</Typography>
        <Box className="user-profile">
          <Avatar>U1</Avatar>
          <Typography>User 1</Typography>
        </Box>
      </Box>

      {/* Box Plot Chart */}
      <Paper className="chart-container" style={{ padding: '20px', marginBottom: '20px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </Paper>

      {/* Table */}
      <Box className="table-section duration-table">
        <Typography variant="h5">
          Tasks Duration List
        </Typography>
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Video</TableCell>
                <TableCell>Total Duration</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.endTime}</TableCell>
                  <TableCell>
                    <Box className="play-video" onClick={handleOpenVideoModal} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Play Video
                      <IconButton size="small" onClick={handleOpenVideoModal}>
                        <PlayArrowIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{row.totalDuration}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenAssignModal(row)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AssignReason
        open={assignModalOpen}
        onClose={handleCloseAssignModal}
        onSave={handleSaveAssign}
        taskId={selectedRow ? selectedRow.id : ''}
        taskName={selectedRow ? selectedRow.task : ''}
      />
      <ModalVideo open={isVideoModalOpen} onClose={handleCloseVideoModal} />
    </Box>
  );
};

export default TaskDuration; 