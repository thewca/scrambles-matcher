import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DragDropContext } from "react-beautiful-dnd";

import ScrambleList from '../../Scrambles/ScrambleList';
import { reorderArray } from '../../../logic/utils';

export default class RoundPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableScrambles: this.props.availableScrambles,
    };
  }

  componentDidUpdate(prevProps) {
    let prevIds = this.state.availableScrambles.map(s => s.id);
    let newIds = this.props.availableScrambles.map(s => s.id);

    if (newIds.join("") !== prevIds.join(""))
      this.setState({
        availableScrambles: this.props.availableScrambles,
      });
  }

  handleScrambleMovement = result => {
    const { source, destination } = result;
    const { round, attachScramblesToRound } = this.props;
    const { availableScrambles } = this.state;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      let scrambles = source.droppableId === "available" ?
        [...this.state.availableScrambles] :
        round.scrambleSets;
      reorderArray(scrambles, source.index, destination.index);

      if (source.droppableId === "available")
        this.setState({ availableScrambles: scrambles });
      else
        attachScramblesToRound(scrambles, round.id);
    } else {
      // Whatever we do, we just need to update the parent state
      let scrambles = round.scrambleSets;
      if (destination.droppableId === "round") {
        scrambles.splice(destination.index, 0, availableScrambles[source.index]);
      } else {
        // Just delete the scramble moved to round
        scrambles.splice(source.index, 1);
      }
      attachScramblesToRound(scrambles, round.id);
    }
  };

  // TODO: save to main wcif button

  render() {
    const { round } = this.props;
    const { availableScrambles } = this.state;
    return (
      <DragDropContext onDragEnd={this.handleScrambleMovement}>
        <Typography variant="h3" align="center">
          {round.id}
        </Typography>
        <Grid container justify="center">
          <Grid item xs={6} md={4} style={{ padding: 16 }} align="center">
            <Paper>
              <Typography variant="h4">
                Used for round
              </Typography>
              <ScrambleList scrambles={round.scrambleSets} holds="round" />
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} style={{ padding: 16 }} align="center">
            <Paper>
              <Typography variant="h4">
                Available
              </Typography>
              <ScrambleList scrambles={availableScrambles} holds="available" />
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
};
