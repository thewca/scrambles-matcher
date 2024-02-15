import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorBar({ message, clear }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={true}
    >
      <SnackbarContent
        sx={{
          backgroundColor: (theme) => theme.palette.error.dark,
        }}
        aria-describedby="client-snackbar"
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={clear}
            size="large"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
