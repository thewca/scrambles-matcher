import React, { Component, Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CompetitionMenu from './CompetitionMenu/CompetitionMenu';
import RoundPanel from './RoundPanel/RoundPanel';
import CompetitionInfo from './CompetitionInfo/CompetitionInfo';
import { withStyles } from '@material-ui/core/styles';
import { flatMap } from '../../logic/utils';

const SpacedFab = withStyles(theme => ({
  root: {
    "margin-left": theme.spacing(3),
  },
}))(Fab);

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localWcif: props.wcif,
      selectedRoundId: null,
    };
  }

  setSelectedRound = id => this.setState({ selectedRoundId: id });

  // TODO: disable the download button if not all scrambles are there
  render() {
    const { localWcif, selectedRoundId } = this.state;
    const { handleWcifUpdate } = this.props;
    console.log(`Selected: ${selectedRoundId}`);
    const rounds = flatMap(localWcif.events, e => e.rounds);
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
          <CompetitionMenu events={localWcif.events}
            setSelectedRound={this.setSelectedRound} />
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: 16 }}>
          { selectedRoundId ? (
            <RoundPanel round={rounds.find(r => r.id === selectedRoundId)} />
          ) : (
            <CompetitionInfo wcif={localWcif} handleWcifUpdate={handleWcifUpdate} />
          )}
        </Grid>
      </Fragment>
    );
  }
};
