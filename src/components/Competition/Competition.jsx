import React, { Component, Fragment } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CompetitionMenu from '../CompetitionMenu/CompetitionMenu';
import { withStyles } from '@material-ui/core/styles';

const SpacedFab = withStyles(theme => ({
  root: {
    "margin-left": theme.spacing(3),
  },
}))(Fab);

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localWcif: props.wcif
    };
  }

  // TODO: disable the download button if not all scrambles are there
  render() {
    const { localWcif } = this.state;
    const { handleWcifUpdate } = this.props;
    return (
      <Fragment>
        <Grid item xs={12} style={{ padding: 16 }}>
          <Typography variant="h2" component="h1" align="center">
            {localWcif.name}
            <SpacedFab aria-label="delete">
              <GetAppIcon />
            </SpacedFab>
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} style={{ padding: 16 }}>
          <CompetitionMenu events={localWcif.events} />
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: 16 }}>
          <Paper>
            <Typography variant="h1">
              {localWcif.name}
            </Typography>
            <Typography variant="h2">
              h2. Heading
            </Typography>
            <Typography paragraph={true}>
              URL: todo
            </Typography>
            <Button variant="contained" color="primary"
              onClick={() => handleWcifUpdate(null)}>
              nullify
            </Button>
          </Paper>
        </Grid>
      </Fragment>
    );
  }
};
