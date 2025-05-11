import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './styles.css';

const ConfigurationSchedule = () => {
  const [shiftConfig, setShiftConfig] = useState({
    shiftName: '',
    shiftType: 'Regular',
    startTime: '',
    endTime: '',
    lunchStart: '',
    lunchEnd: '',
    breaks: []
  });

  const [weeklySchedule, setWeeklySchedule] = useState({
    applyTo: 'This Week',
    schedule: [
      { day: 'Monday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Tuesday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Wednesday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Thursday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Friday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Saturday', shift: 'Select Shift', startTime: '', endTime: '' },
      { day: 'Sunday', shift: 'Select Shift', startTime: '', endTime: '' }
    ]
  });

  const handleBreakAdd = () => {
    setShiftConfig(prev => ({
      ...prev,
      breaks: [...prev.breaks, { start: '', end: '' }]
    }));
  };

  const handleBreakDelete = (index) => {
    setShiftConfig(prev => ({
      ...prev,
      breaks: prev.breaks.filter((_, i) => i !== index)
    }));
  };

  const handleShiftSave = () => {
    console.log('Saving shift configuration:', shiftConfig);
  };

  const handleScheduleApply = () => {
    console.log('Applying weekly schedule:', weeklySchedule);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Configuration Schedule</h1>
        <div className="user-profile">
          <img src="/path-to-user-avatar.jpg" alt="User 1" />
          <span>User 1</span>
        </div>
      </div>

      {/* Shift Configuration Section */}
      <Paper className="section-container">
        <Typography variant="h6" className="section-title">
          Shift Configuration
        </Typography>
        <Box className="create-modify-shift">
          <Typography variant="subtitle1">Create/Modify Shift</Typography>
          
          <div className="form-row">
            <TextField
              label="Shift Name"
              value={shiftConfig.shiftName}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, shiftName: e.target.value }))}
              fullWidth
            />
            <Select
              value={shiftConfig.shiftType}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, shiftType: e.target.value }))}
              fullWidth
            >
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </Select>
          </div>

          <div className="form-row">
            <TextField
              label="Start Time"
              type="time"
              value={shiftConfig.startTime}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, startTime: e.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
            <TextField
              label="End Time"
              type="time"
              value={shiftConfig.endTime}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, endTime: e.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          </div>

          <div className="form-row">
            <TextField
              label="Lunch Start"
              type="time"
              value={shiftConfig.lunchStart}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, lunchStart: e.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
            <TextField
              label="Lunch End"
              type="time"
              value={shiftConfig.lunchEnd}
              onChange={(e) => setShiftConfig(prev => ({ ...prev, lunchEnd: e.target.value }))}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          </div>

          <Typography variant="subtitle1" className="breaks-title">Breaks</Typography>
          {shiftConfig.breaks.map((breakTime, index) => (
            <div key={index} className="break-row">
              <TextField
                label="Start Time"
                type="time"
                value={breakTime.start}
                onChange={(e) => {
                  const newBreaks = [...shiftConfig.breaks];
                  newBreaks[index].start = e.target.value;
                  setShiftConfig(prev => ({ ...prev, breaks: newBreaks }));
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
              />
              <TextField
                label="End Time"
                type="time"
                value={breakTime.end}
                onChange={(e) => {
                  const newBreaks = [...shiftConfig.breaks];
                  newBreaks[index].end = e.target.value;
                  setShiftConfig(prev => ({ ...prev, breaks: newBreaks }));
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }}
              />
              <IconButton onClick={() => handleBreakDelete(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          <div className="button-row">
            <Button variant="outlined" onClick={handleBreakAdd}>Add Break</Button>
            <Button variant="contained" onClick={handleShiftSave}>Save Shift</Button>
          </div>
        </Box>
      </Paper>

      {/* Weekly Schedule Section */}
      <Paper className="section-container">
        <Typography variant="h6" className="section-title">
          Weekly Schedule
        </Typography>
        
        <Box className="weekly-schedule">
          <div className="form-row">
            <Typography>Apply Schedule To:</Typography>
            <Select
              value={weeklySchedule.applyTo}
              onChange={(e) => setWeeklySchedule(prev => ({ ...prev, applyTo: e.target.value }))}
              fullWidth
            >
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="Next Week">Next Week</MenuItem>
            </Select>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklySchedule.schedule.map((day, index) => (
                  <TableRow key={day.day}>
                    <TableCell>{day.day}</TableCell>
                    <TableCell>
                      <Select
                        value={day.shift}
                        onChange={(e) => {
                          const newSchedule = [...weeklySchedule.schedule];
                          newSchedule[index].shift = e.target.value;
                          setWeeklySchedule(prev => ({ ...prev, schedule: newSchedule }));
                        }}
                        fullWidth
                      >
                        <MenuItem value="Select Shift">Select Shift</MenuItem>
                        <MenuItem value="Morning">Morning Shift</MenuItem>
                        <MenuItem value="Evening">Evening Shift</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        value={day.startTime}
                        onChange={(e) => {
                          const newSchedule = [...weeklySchedule.schedule];
                          newSchedule[index].startTime = e.target.value;
                          setWeeklySchedule(prev => ({ ...prev, schedule: newSchedule }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        value={day.endTime}
                        onChange={(e) => {
                          const newSchedule = [...weeklySchedule.schedule];
                          newSchedule[index].endTime = e.target.value;
                          setWeeklySchedule(prev => ({ ...prev, schedule: newSchedule }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleScheduleApply}
            className="apply-schedule-button"
          >
            Apply Schedule
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default ConfigurationSchedule; 