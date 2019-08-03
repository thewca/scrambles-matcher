import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CompetitionDetailsPanel = ({ downloadWcifAction, downloadResultsJsonAction, classes, exportAvailable }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Competition details
      </Typography>
      <Grid container direction="row">
        <Button variant="contained" component="span"
          disabled={!exportAvailable} color="primary"
          className={classes.button}
          onClick={downloadWcifAction}
        >
          Get WCIF
        </Button>
        <Button variant="contained" component="span"
          disabled={!exportAvailable} color="primary"
          className={classes.button}
          onClick={downloadResultsJsonAction}
        >
          Get results JSON
        </Button>
      </Grid>
    </Paper>
  );
};

export default CompetitionDetailsPanel;
