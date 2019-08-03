import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import DeleteIcon from '@material-ui/icons/Delete';

const MatchingScramblesPanel = ({ assignAction, clearAction, classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Matching scrambles to rounds
      </Typography>
      <Typography paragraph align="justify">
        Clicking "Automatically assign scrambles" will attempt to automatically
        detect which scrambles sets belongs to which round.
        Unlike the workbook assistant, this will attempt to assign unused scrambles
        only to rounds <b>without</b> scrambles! Which means that clicking several
        times the button with the same uploaded scrambles will have no effect.
        <br/>
        You can check scrambles assignments by browsing through the rounds in
        the menu.
        For each round (or each attempt for Multiple Blindfolded and Fewest Moves)
        you can assign scrambles manually from the unused scrambles in the
        uploaded scrambles.
        <br/>
        When everything looks good, get the Results JSON to import the results
        on the WCA website.
        <br/>
        Don't forget to set the competition ID if it's not detected!
      </Typography>
      <Button variant="contained" component="span"
        color="primary"
        className={classes.button}
        onClick={assignAction}
      >
        <FreeBreakfastIcon className={classes.extendedIcon} />
        Automatically assign scrambles
      </Button>
      <Button variant="contained" color="secondary"
        className={classes.button}
        onClick={clearAction}
      >
        <DeleteIcon className={classes.extendedIcon} />
        Clear scrambles assignments
      </Button>
    </Paper>
  );
};

export default MatchingScramblesPanel;
