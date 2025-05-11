import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Avatar,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import './styles.css';

if (typeof HighchartsMore === 'function') {
  HighchartsMore(Highcharts);
}

const taskData = [
  { name: 'Task 1', start: 0, duration: 3 },
  { name: 'Task 2', start: 4, duration: 5 },
  { name: 'Task 3', start: 9, duration: 2 },
  { name: 'Task 4', start: 12, duration: 3 },
  { name: 'Task 5', start: 16, duration: 10 },
];

const HomePage = () => {

  const chartOptions = {
    chart: {
      type: 'columnrange',
      height: 250,
      inverted: true
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: taskData.map(task => task.name),
      title: {
        text: null
      },
      labels:{
        style:{
          fontSize: '13px', 
        }
      }
    },
    yAxis: {
      min: 0,
      max: 30,
      tickInterval: 5,
      title: {
        text: null
      },
      gridLineWidth: 1,
      labels:{
        style:{
          fontSize: '13px', 
        }
      }
    },
    plotOptions: {
      columnrange: {
        pointPadding: 0.2,
        borderRadius: 3,
        color: '#FF7F50',
        grouping: false,
        pointWidth: 20
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return `<b>${this.x}</b><br/>
                Start: ${this.point.low}<br/>
                Duration: ${this.point.high - this.point.low}`;
      }
    },
    series: [{
      name: 'Tasks',
      data: taskData.map(task => ({
        low: task.start,
        high: task.start + task.duration,
        x: taskData.indexOf(task)
      }))
    }]
  };

  return (
    <Box className="home-container">
      <Box className="header">
        <Typography variant="h5">Welcome back, User 1</Typography>
        <Box className="user-profile">
          <Avatar src="/user-avatar.png" />
          <Typography>User 1</Typography>
        </Box>
      </Box>

      <Paper className="video-container">
        <Typography variant="h6" className="video-title">
          Live Video from Camera
        </Typography>
        <Box className="video-player">
          <video controls width="100%" height="auto">
            <source src="/video_converted.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Paper>

      <Paper className="timeline-container" style={{ padding: '20px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </Paper>
    </Box>
  );
};

export default HomePage;
