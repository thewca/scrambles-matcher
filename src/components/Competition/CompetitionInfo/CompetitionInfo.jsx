import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CompetitionInfo = ({ wcif, handleWcifUpdate }) => {
  return (
    <Paper>
      <Typography variant="h1">
        {wcif.name}
      </Typography>
      <Typography variant="h2">
        h2. Heading
      </Typography>
      <Typography paragraph={true}>
        URL: todo
      </Typography>
      <Button variant="contained" color="primary"
        onClick={() => handleWcifUpdate(null)} >
        nullify
      </Button>
    </Paper>
  );
}

export default CompetitionInfo;
