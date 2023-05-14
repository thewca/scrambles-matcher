import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 20,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function ErrorBar({ message, clear }) {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={true}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="client-snackbar"
        message={<span className={classes.message}>{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={clear}
            size="large"
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
