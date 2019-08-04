import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import DeleteIcon from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const MatchingScramblesPanel = ({ assignAction, clearAction, uploadAction, classes }) => {
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
      <Grid container direction="row">
        <Grid item xs={12}>
          <input
            accept=".json"
            className={classes.input}
            id="add-scramble-json"
            multiple
            type="file"
            onChange={uploadAction}
          />
          <label htmlFor="add-scramble-json">
            <GreenButton variant="contained"
              component="span"
              color="primary"
              className={classnames(classes.addJsonButton, classes.mb3)}
            >
              Upload scrambles json
            </GreenButton>
          </label>
        </Grid>
        <Grid item xs={6} style={{ paddingRight: 8 }}>
          <Button variant="contained" component="span"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={assignAction}
          >
            <FreeBreakfastIcon className={classes.extendedIcon} />
            Automatically assign scrambles
          </Button>
        </Grid>
        <Grid item xs={6} style={{ paddingLeft: 8 }}>
          <Button variant="contained" color="secondary"
            fullWidth
            className={classes.button}
            onClick={clearAction}
          >
            <DeleteIcon className={classes.extendedIcon} />
            Clear scrambles assignments
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchingScramblesPanel;
