import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CubingIconUnofficial } from '../CubingIcon/CubingIcon';
import { signIn } from '../../logic/auth';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  titleIcon: {
    marginRight: theme.spacing(2),
  },
  username: {
    marginRight: theme.spacing(1),
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <CubingIconUnofficial
            eventId="333mts"
            className={classes.titleIcon}
          />
          Scrambles Matcher
        </Typography>
        {user ? (
          <Fragment>
            <Typography variant="subtitle1" className={classes.username}>
              {user.name}
            </Typography>
            <Avatar src={user.avatar.thumb_url} />
          </Fragment>
        ) : (
          <Button color="inherit" onClick={signIn}>
            Sign in with the WCA
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
