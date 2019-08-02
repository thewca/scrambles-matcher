import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CompetitionMenu from './CompetitionMenu/CompetitionMenu';
import RoundPanel from './RoundPanel/RoundPanel';
import CompetitionInfo from './CompetitionInfo/CompetitionInfo';
import { flatMap, updateIn } from '../../logic/utils';
import { updateMultiAndFm, transformUploadedScrambles, allScramblesForEvent, usedScramblesIdsForEvent } from '../../logic/scrambles';

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
        newScramble.competitionName = `${scrambleUploadedId++}: ${newScramble.competitionName}`;
        newScramble = updateIn(newScramble, ['sheets'], updateMultiAndFm);
        newScramble = transformUploadedScrambles(newScramble);
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

  render() {
    const { localWcif, selectedRoundId, uploadedScrambles } = this.state;
    // const { handleWcifUpdate } = this.props;
    const rounds = flatMap(localWcif.events, e => e.rounds);
    let availableScrambles = [];
    let round = null;
    if (selectedRoundId) {
      round = rounds.find(r => r.id === selectedRoundId);
      let eventId = round.id.split("-")[0];
      let used = usedScramblesIdsForEvent(localWcif.events, eventId);
      availableScrambles = allScramblesForEvent(uploadedScrambles, eventId, used);
    }
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
          { round ? (
            <RoundPanel round={round} availableScrambles={availableScrambles} />
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
