import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CubingIconUnofficial } from '../CubingIcon/CubingIcon';
import { signIn } from '../../logic/auth';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  titleIcon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <CubingIconUnofficial
            eventId="333mts"
            className={classes.titleIcon}
          />
          Scrambles Matcher
        </Typography>
        {user ? (
          <Typography>{user.name}</Typography>
        ) : (
          <Button color="inherit" onClick={signIn}>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
