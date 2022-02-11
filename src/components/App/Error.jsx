import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}
