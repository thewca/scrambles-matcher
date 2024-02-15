import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import CompetitionMenu from './CompetitionMenu/CompetitionMenu';
import RoundPanel from './RoundPanel/RoundPanel';
import CompetitionInfo from './CompetitionInfo/CompetitionInfo';
import { flatMap, updateIn } from '../../logic/utils';
import { parseActivityCode } from '../../logic/wcif';
import { getUniqueScrambleUploadedId } from '../../logic/import-export-wcif';
import {
  transformUploadedScrambles,
  allScramblesForEvent,
  usedScramblesIdsForEvent,
} from '../../logic/scrambles';

import packageInfo from '../../../package.json';

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wcif: props.wcif,
      selectedRoundId: null,
      uploadedScrambles: props.uploadedScrambles,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleOnBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleOnBeforeUnload);
  }

  handleOnBeforeUnload = (ev) => {
    ev.preventDefault();
    ev.returnValue = '';
  };

  // It's worth noting we only handle one competition over the life of the component,
  // therefore no componentDidUpdate is necessary.
  // To upload scrambles for another competition the user would just refresh the page.

  uploadNewScramble = (ev) => {
    let reader = new FileReader();

    reader.onload = (e) => {
      // TODO: some check we're facing well formatted scrambles
      this.setState((state) => {
        let newScramble = JSON.parse(e.target.result);
        // Manually assign some id, in case someone uses same name for zip
        // but with different scrambles.
        newScramble.competitionName = `${getUniqueScrambleUploadedId()}: ${
          newScramble.competitionName
        }`;
        newScramble = transformUploadedScrambles(newScramble);
        return {
          wcif: {
            ...state.wcif,
            scrambleProgram: newScramble.version,
          },
          uploadedScrambles: [...state.uploadedScrambles, newScramble],
        };
      });
    };

    reader.onerror = (e) => {
      alert("Couldn't load the JSON scrambles file");
    };

    if (ev.target.files.length > 0) reader.readAsText(ev.target.files[0]);
  };

  attachScramblesToRound = (scrambles, round) => {
    const { wcif } = this.state;
    let { eventId } = parseActivityCode(round.id);
    let eventIndex,
      roundIndex = null;
    let event = wcif.events.find((e, index) => {
      eventIndex = index;
      return e.id === eventId;
    });
    event.rounds.find((r, index) => {
      roundIndex = index;
      return r.id === round.id;
    });
    this.setState({
      wcif: updateIn(
        wcif,
        ['events', eventIndex, 'rounds', roundIndex],
        (r) => ({
          ...r,
          scrambleSets: scrambles,
        })
      ),
    });
  };

  handleWcifChange = (wcif) => this.setState({ wcif });

  setSelectedRound = (id) => this.setState({ selectedRoundId: id });

  render() {
    const { wcif, selectedRoundId, uploadedScrambles } = this.state;
    // const { handleWcifUpdate } = this.props;
    const rounds = flatMap(wcif.events, (e) => e.rounds);
    let availableScrambles = [];
    let round = null;
    let event = null;
    if (selectedRoundId) {
      round = rounds.find((r) => r.id === selectedRoundId);
      let { eventId } = parseActivityCode(round.id);
      event = wcif.events.find((e) => e.id === eventId);
      let used = usedScramblesIdsForEvent(wcif.events, event.id);
      availableScrambles = allScramblesForEvent(
        uploadedScrambles,
        event.id,
        used
      );
    }
    return (
      <div style={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          style={{ width: 250, zIndex: 1 }}
          PaperProps={{ style: { width: 250 } }}
        >
          <div style={{ minHeight: 64 }} />
          <div style={{ overflowY: 'auto' }}>
            <CompetitionMenu
              events={wcif.events}
              setSelectedRound={this.setSelectedRound}
            />
          </div>
        </Drawer>
        <div style={{ padding: 16, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                {wcif.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {round ? (
                <RoundPanel
                  event={event}
                  round={round}
                  availableScrambles={availableScrambles}
                  attachScramblesToRound={this.attachScramblesToRound}
                />
              ) : (
                <CompetitionInfo
                  wcif={wcif}
                  uploadedScrambles={uploadedScrambles}
                  uploadAction={this.uploadNewScramble}
                  handleWcifChange={this.handleWcifChange}
                  version={packageInfo.version}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
