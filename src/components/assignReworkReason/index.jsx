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

const AssignReworkReason = ({ open, onClose, onSave, initialReason, part, id }) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) {
      setReason(initialReason || '');
    }
  }, [open, initialReason]);

  const isFormValid = reason.trim() !== '';

  const handleSave = () => {
    onSave(reason);
    setReason('');
    onClose();
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Rework Reason</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <TextField
            fullWidth
            label="Part"
            value={part || ''}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="ID"
            value={id || ''}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Reason"
            value={reason}
            onChange={e => setReason(e.target.value)}
            margin="normal"
          />
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

export default AssignReworkReason; 