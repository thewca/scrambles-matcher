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
import { flatMap, updateIn } from '../../logic/utils';
import { updateMultiAndFm } from '../../logic/scrambles';

const SpacedFab = withStyles(theme => ({
  root: {
    "margin-left": theme.spacing(3),
  },
}))(Fab);

let scrambleUploadedId = 1;

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localWcif: props.wcif,
      selectedRoundId: null,
      uploadedScrambles: [],
    };
  }

  uploadNewScramble = ev => {
    let reader = new FileReader();

    reader.onload = e => {
      // TODO: some check we're facing well formatted scrambles
      this.setState(state => {
        let newScramble = JSON.parse(e.target.result)
        // Manually assign some id, in case someone uses same name for zip
        // but with different scrambles.
        newScramble.id = scrambleUploadedId++;
        newScramble = updateIn(newScramble, ['sheets'], updateMultiAndFm);
        return {
          uploadedScrambles: [...state.uploadedScrambles, newScramble],
        }
      });
    }

    reader.onerror = e => {
      alert("Couldn't load the JSON scrambles file");
    }

    reader.readAsText(ev.target.files[0]);
  }

  setSelectedRound = id => this.setState({ selectedRoundId: id });

  // TODO: disable the download button if not all scrambles are there
  render() {
    const { localWcif, selectedRoundId, uploadedScrambles } = this.state;
    const { handleWcifUpdate } = this.props;
    const rounds = flatMap(localWcif.events, e => e.rounds);
    return (
      <Fragment>
        <Grid item xs={12} style={{ padding: 16 }}>
          <Typography variant="h2" component="h1" align="center">
            {localWcif.name}
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
            <CompetitionInfo wcif={localWcif} uploadedScrambles={uploadedScrambles}
              uploadAction={this.uploadNewScramble}
            />
          )}
        </Grid>
      </Fragment>
    );
  }
};
