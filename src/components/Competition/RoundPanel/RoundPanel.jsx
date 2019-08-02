import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DragDropContext } from "react-beautiful-dnd";
import { withStyles } from '@material-ui/core/styles';

import ScrambleList from '../../Scrambles/ScrambleList';
import { groupBy, partition, flatMap, reorderArray } from '../../../logic/utils';
import { eventIdFromRound } from '../../../logic/wcif';
import { formatById } from '../../../logic/formats';

const SpacedPaper = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  }
}))(Paper);


const attemptFromDroppable = elem => parseInt(elem.droppableId.split("-")[1]);

const ListForGenericRound = ({ round }) => (
  <Paper>
    <Typography variant="h4">
      Used for round
    </Typography>
    <ScrambleList scrambles={round.scrambleSets} holds="round" />
  </Paper>
);

const ListForAttemptBasedRound = ({ round }) => {
  const nAttempts = formatById(round.format).solveCount;
  let attempts = [...Array(nAttempts).keys()].map(i => ++i);
  return (
    <Fragment>
      {attempts.map(index => (
        <SpacedPaper key={index}>
          <Typography variant="h4">
            Used for attempt {index}
          </Typography>
          <ScrambleList
            scrambles={round.scrambleSets.filter(s => s.attemptNumber === index)}
            holds={`round-${index}`}
          />
        </SpacedPaper>
      ))}
    </Fragment>
  );
}


export default class RoundPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableScrambles: this.props.availableScrambles,
    };
  }

  componentDidUpdate(prevProps) {
    let prevIds = this.state.availableScrambles.map(s => s.id).sort();
    let newIds = this.props.availableScrambles.map(s => s.id).sort();

    if (newIds.join("") !== prevIds.join("")) {
      this.setState({
        availableScrambles: this.props.availableScrambles,
      });
    }
  }

  handleReOrdering = (source, destination) => {
    const { round, attachScramblesToRound } = this.props;
    const { availableScrambles } = this.state;
    // Simple re-ordering within a list :
    //   - figure out wich scrambles to re-order
    //   - then what state to update (wcif or this)
    let scrambles = [];
    if (source.droppableId.startsWith("round-")) {
      // We're in the 333fm or 333mbf case
      // We want to re-order for a given attempt number
      let attemptNumber = attemptFromDroppable(destination);
      let [forAttempt, others] = partition(round.scrambleSets, s => s.attemptNumber === attemptNumber);
      reorderArray(forAttempt, source.index, destination.index);
      scrambles = [...forAttempt, ...others];
    } else {
      // We're in the simple case, just re-order the relevant scrambles
      scrambles = source.droppableId === "available"
        ? [...availableScrambles]
        : round.scrambleSets;
      reorderArray(scrambles, source.index, destination.index);
    }

    if (source.droppableId === "available")
      this.setState({ availableScrambles: scrambles });
    else
      attachScramblesToRound(scrambles, round);
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
      this.handleReOrdering(source, destination);
    } else {
      // Whatever we do, we just need to update the parent state
      let scrambles = round.scrambleSets;
      if (destination.droppableId === "round") {
        scrambles.splice(destination.index, 0, availableScrambles[source.index]);
      } else if (destination.droppableId === "available") {
        if (source.droppableId === "round") {
          // Just delete the scramble moved to round
          scrambles.splice(source.index, 1);
        } else {
          // Get the attempt number from the droppable id
          let attemptNumber = attemptFromDroppable(source);
          // Group round's scrambles based on attempt number
          let scrambleByAttempt = groupBy(scrambles, s => s.attemptNumber);
          scrambleByAttempt[attemptNumber].splice(source.index, 1);
          scrambles = flatMap(Object.keys(scrambleByAttempt), k => scrambleByAttempt[k]);
        }
      } else {
        // We're in the 333fm or 333mbf case
        // We want to keep them in order for a given attempt number

        // Get the attempt number from the droppable id
        let attemptNumber = attemptFromDroppable(destination);
        // Group round's scrambles based on attempt number
        let scrambleByAttempt = groupBy(scrambles, s => s.attemptNumber);
        if (!scrambleByAttempt[attemptNumber])
          scrambleByAttempt[attemptNumber] = [];
        // Update the attempt number for the selected scramble
        let scramble = null;
        if (source.droppableId === "available")
          scramble = availableScrambles[source.index]
        else {
          let sourceAttempt = attemptFromDroppable(source);
          scramble = scrambleByAttempt[sourceAttempt].splice(source.index, 1)[0];
        }
        scramble.attemptNumber = attemptNumber;
        scrambleByAttempt[attemptNumber].splice(destination.index, 0, scramble);
        scrambles = flatMap(Object.keys(scrambleByAttempt), k => scrambleByAttempt[k]);
      }
      attachScramblesToRound(scrambles, round);
    }
  };

  // TODO: save to main wcif button

  render() {
    const { round } = this.props;
    const eventId = eventIdFromRound(round);
    const { availableScrambles } = this.state;
    return (
      <DragDropContext onDragEnd={this.handleScrambleMovement}>
        <Typography variant="h3" align="center">
          {round.id}
        </Typography>
        <Grid container justify="center">
          <Grid item xs={6} md={4} style={{ padding: 16 }} align="center">
            {["333mbf", "333fm"].includes(eventId) ? (
              <ListForAttemptBasedRound round={round} />
            ) : (
              <ListForGenericRound round={round} />
            )}
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
