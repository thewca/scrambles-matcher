import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { competitionLink } from '../../../logic/wcif';

const LinkToNewPage = (props) => {
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

const CompetitionDetailsPanel = (props) => {
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

  const handleNameChange = (ev) => uploadCompetitionIdAction(ev.target.value);
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Competition details
      </Typography>
      <form className={classes.mb3} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Competition ID"
          value={wcif.id || ''}
          onChange={handleNameChange}
          helperText={<HelperWithLink id={wcif.id} />}
          margin="normal"
          variant="outlined"
        />
      </form>
      <Typography paragraph>
        When you have made sure your competition ID is correct and all your
        rounds have the correct scrambles, you can get the export you want
        below.
      </Typography>
      <ButtonGroup
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
