import React, { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CubingIconUnofficial } from '../CubingIcon/CubingIcon';
import { signIn } from '../../logic/auth';

const Header = ({ user }) => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <CubingIconUnofficial eventId="333mts" sx={{ marginRight: 2 }} />
          Scrambles Matcher
        </Typography>
        {user ? (
          <Fragment>
            <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
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
