import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';

const UploadedScramblesPanel = ({ uploadedScrambles, classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Uploaded JSON files: {uploadedScrambles.length}
      </Typography>
      {uploadedScrambles.map(s => (
        <ScrambleFileInfo scramble={s} key={s.competitionName} />
      ))}
    </Paper>
  );
};

export default UploadedScramblesPanel;
