import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { competitionLink } from '../../../logic/wcif';

const LinkToNewPage = props => {
  const { block, ...extraProps } = props;
  return (
    <Link {...extraProps} target="_blank" rel="noreferrer">
      { block }
    </Link>
  );
};

const HelperWithLink = ({ id }) => (
  <span>
    The ID is correct if and only
    if <LinkToNewPage href={`${competitionLink(id)}`} block="this link" /> opens
    your competition's page.
  </span>
);

const CompetitionDetailsPanel = (props) => {
  const {
    wcif, downloadWcifAction,
    downloadResultsJsonAction, classes,
    exportAvailable, uploadCompetitionIdAction
  } = props;

  const handleNameChange = ev => uploadCompetitionIdAction(ev.target.value);
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Competition details
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Competition ID"
          //className={classes.textField}
          value={wcif.id}
          onChange={handleNameChange}
          helperText={<HelperWithLink id={wcif.id} />}
          margin="normal"
          variant="outlined"
        />
      </form>
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
