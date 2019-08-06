import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { competitionLink } from '../../../logic/wcif';

const LinkToNewPage = props => {
  const { block, ...extraProps } = props;
  return (
    <Link {...extraProps} target="_blank" rel="noreferrer">
      {block}
    </Link>
  );
};

const HelperWithLink = ({ id }) => (
  <span>
    The ID is correct if and only if{' '}
    <LinkToNewPage href={`${competitionLink(id)}`} block="this link" /> opens
    your competition's page.
  </span>
);

const CompetitionDetailsPanel = props => {
  const {
    wcif,
    downloadWcifAction,
    downloadResultsJsonAction,
    classes,
    uploadCompetitionIdAction,
  } = props;

  const exportAvailable = wcif.id;
  // For now allow export even if missing scrambles.
  // && competitionHasValidScrambles(wcif);

  const handleNameChange = ev => uploadCompetitionIdAction(ev.target.value);
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Competition details
      </Typography>
      <form className={classes.mb3} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Competition ID"
          //className={classes.textField}
          value={wcif.id || ''}
          onChange={handleNameChange}
          helperText={<HelperWithLink id={wcif.id} />}
          margin="normal"
          variant="outlined"
        />
      </form>
      <Typography paragraph>
        When you have make sure your competition ID is correct and all your
        rounds have the correct scrambles, you can get the export you want
        below.
      </Typography>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
        disabled={!exportAvailable}
      >
        <Button onClick={downloadWcifAction}>Get WCIF</Button>
        <Button onClick={downloadResultsJsonAction}>Get results JSON</Button>
      </ButtonGroup>
    </Paper>
  );
};

export default CompetitionDetailsPanel;
