import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
} from '@mui/material';

const AssignReason = ({ open, onClose, onSave, taskId, taskName: initialTaskName }) => {
  const [taskName, setTaskName] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) {
      setTaskName(initialTaskName || '');
      setReason('');
    }
  }, [open, initialTaskName]);

  const isFormValid = taskName.trim() !== '' && reason.trim() !== '';

  const handleSave = () => {
    onSave({ id: taskId, task: taskName, reason });
    setTaskName('');
    setReason('');
    onClose();
  };

  const handleCancel = () => {
    setTaskName('');
    setReason('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Reason</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            fullWidth
            label="Task"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="ID"
            value={taskId}
            margin="normal"
            disabled
          />
          <TextField
            select
            fullWidth
            label="Reason"
            value={reason}
            onChange={e => setReason(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Reason 1">Reason 1</MenuItem>
            <MenuItem value="Reason 2">Reason 2</MenuItem>
            <MenuItem value="Reason 3">Reason 3</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={!isFormValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignReason; 