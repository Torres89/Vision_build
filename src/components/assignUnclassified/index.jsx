import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import './styles.css';

const AssignUnclassified = ({ open, onClose, onSave, taskId }) => {
  const [taskName, setTaskName] = useState('');
  const [taskIdInput, setTaskIdInput] = useState('');

  useEffect(() => {
    if (open) {
      setTaskIdInput(taskId.toString());
    }
  }, [open, taskId]);

  const isFormValid = taskName.trim() !== '' && taskIdInput.trim() !== '';

  const handleSave = () => {
    onSave(taskId, taskName, taskIdInput);
    setTaskName('');
    setTaskIdInput('');
    onClose();
  };

  const handleCancel = () => {
    setTaskName('');
    setTaskIdInput('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Task</DialogTitle>
      <DialogContent>
        <Box className="assign-modal-content">
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Task ID"
            value={taskIdInput}
            onChange={(e) => setTaskIdInput(e.target.value)}
            margin="normal"
            disabled
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={!isFormValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignUnclassified; 