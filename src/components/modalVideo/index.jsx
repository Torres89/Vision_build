import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './styles.css';

const ModalVideo = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className="video-modal"
    >
      <DialogContent className="video-modal-content">
        <IconButton
          className="close-button"
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>
        <Box className="video-player-modal">
          <video controls width="100%" height="auto" autoPlay muted>
            <source src="/video_converted.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVideo; 