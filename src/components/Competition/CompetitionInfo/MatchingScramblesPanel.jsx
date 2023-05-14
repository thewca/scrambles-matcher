import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import DeleteIcon from '@mui/icons-material/Delete';
import classnames from 'classnames';

const MatchingScramblesPanel = ({
  assignAction,
  clearAction,
  uploadAction,
  classes,
}) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Matching scrambles to rounds
      </Typography>
      <Typography paragraph align="justify">
        Clicking "Automatically assign scrambles" will attempt to automatically
        detect which scrambles sets belongs to which round, assigning up to the
        number of scramble sets listed on the "Manage events" page on the WCA
        website. Unlike the workbook assistant, this will attempt to assign
        unused scrambles only to rounds <b>without</b> scrambles! Which means
        that clicking several times the button with the same uploaded scrambles
        will have no effect.
        <br />
        You can check scrambles assignments by browsing through the rounds in
        the menu. For each round (or each attempt for Multiple Blindfolded and
        Fewest Moves) you can assign scrambles manually from the unused
        scrambles in the uploaded scrambles.
        <br />
        When everything looks good, get the Results JSON to import the results
        on the WCA website.
        <br />
        Don't forget to set the competition ID if it's not detected!
      </Typography>
      <Grid container direction="row" spacing={2}>
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
            <Button
              variant="contained"
              component="span"
              color="primary"
              fullWidth
              className={classnames(classes.addJsonButton)}
            >
              Upload scrambles json from TNoodle
            </Button>
          </label>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={assignAction}
          >
            <FreeBreakfastIcon className={classes.extendedIcon} />
            Automatically assign scrambles
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
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
