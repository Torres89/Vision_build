import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

const pieCharts = [
  {
    title: 'OEE Calculation',
    value: 70,
    data: [
      { name: 'Availability', y: 30 },
      { name: 'Performance', y: 20 },
      { name: 'Quality', y: 20 }
    ]
  },
  {
    title: 'Availability',
    value: 90,
    data: [
      { name: 'Equipment down', y: 40 },
      { name: 'Lack of Material', y: 30 },
      { name: 'No Operator', y: 20 }
    ]
  },
  {
    title: 'Performance',
    value: 80,
    data: [
      { name: 'Reason 1', y: 30 },
      { name: 'Reason 2', y: 30 },
      { name: 'Reason 3', y: 20 }
    ]
  },
  {
    title: 'Quality',
    value: 70,
    data: [
      { name: 'Scrap Reason 1', y: 30 },
      { name: 'Scrap Reason 2', y: 20 },
      { name: 'Unclassified', y: 20 }
    ]
  }
];

const Analysis = () => {
  // Chart options for the trend
  const trendOptions = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
      gridLineWidth: 1,
      gridLineColor: '#f0f0f0',
    },
    yAxis: {
      title: {
        text: ''
      },
      gridLineWidth: 1,
      gridLineColor: '#f0f0f0',
    },
    series: [{
      name: 'A',
      data: [70, 68, 110, 95, 98, 110],
      color: '#2196f3'
    }, {
      name: 'P',
      data: [45, 48, 60, 42, 50, 55],
      color: '#ff9800'
    }, {
      name: 'Q',
      data: [38, 38, 38, 55, 48, 40],
      color: '#4caf50'
    }],
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
    },
    credits: {
      enabled: false
    }
  };

  return (
    <Box className="analysis-container">
      {/* Header */}
      <Box className="analysis-header">
        <Typography variant="h5">Analysis</Typography>
        <Box className="user-profile">
          <Avatar>U1</Avatar>
          <Typography>User 1</Typography>
        </Box>
      </Box>

      {/* Metrics Pie Charts Grid */}
      <Box className="metrics-grid">
        {pieCharts.map((metric, idx) => (
          <Box key={idx} className="metric-card">
            <Typography variant="h6" sx={{ mb: 1 }}>{metric.title}</Typography>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: { type: 'pie', height: 180, backgroundColor: 'transparent' },
                title: { text: undefined },
                tooltip: { enabled: false },
                legend: {
                  enabled: true,
                  align: 'left',
                  verticalAlign: 'center',
                  layout: 'vertical',
                  itemStyle: {
                    fontSize: '12px',
                    marginRight: '10px',
                  },
                },
                colors: ['#2E2E2E', '#8C8C8C', '#E9DAF6'],
                plotOptions: {
                  pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    innerSize: '65%',
                    dataLabels: {
                      enabled: false,
                    },
                    borderColor: '#ffffff',
                    borderWidth: 10,
                    borderRadius: 10,
                    center: ['60%', '50%'],
                  }
                },
                series: [{
                  name: metric.title,
                  data: metric.data,
                  showInLegend: true,
                }],
                credits: { enabled: false },
              }}
              containerProps={{ style: { minWidth: 0, minHeight: 0, width: '100%' } }}
            />
            {/* Center label for donut percent */}
            <Box className="donut-center-label">
              <Typography variant="h5" sx={{ position: 'absolute', left: '58%', top: '58%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', fontWeight: 700 }}>
                {metric.value}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Trend Section */}
      <Box className="trend-section">
        <Typography variant="h5">Trend</Typography>
        <Box>
          <HighchartsReact
            highcharts={Highcharts}
            options={trendOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis; 