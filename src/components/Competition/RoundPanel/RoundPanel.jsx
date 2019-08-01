import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ScrambleList from '../../Scrambles/ScrambleList';

export default class RoundPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedScrambles: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.round.id !== prevProps.round.id)
      this.setState({ savedScrambles: [] });
  }

  // TODO: save to main wcif button

  render() {
    const { round, availableScrambles } = this.props;
    return (
      <Fragment>
        <Typography variant="h3" align="center">
          {round.id}
        </Typography>
        <Grid container justify="center">
          <Grid item xs={6} md={4} style={{ padding: 16 }} align="center">
            <Paper>
              <Typography variant="h4">
                Used for round
              </Typography>
              <ScrambleList scrambles={round.scrambleSets} setPrefix />
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} style={{ padding: 16 }} align="center">
            <Paper>
              <Typography variant="h4">
                Available
              </Typography>
              <ScrambleList scrambles={availableScrambles} />
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
};
