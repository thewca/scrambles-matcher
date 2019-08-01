import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

const CompetitionInfo = ({ wcif, uploadedScrambles, uploadAction }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography paragraph>
        Some extra infos about the competition
      </Typography>
      <input
        accept=".json"
        className={classes.input}
        id="upload-scramble-json"
        multiple
        type="file"
        onChange={uploadAction}
      />
      <label htmlFor="upload-scramble-json">
        <Button variant="contained" component="span" color="secondary">
          Upload scrambles json
        </Button>
      </label>
      <Typography variant="h4">
        Uploaded scrambles:
      </Typography>
      {uploadedScrambles.map(s => (
        <ScrambleFileInfo scramble={s} key={s.competitionName} />
      ))}
    </Paper>
  );
}

export default CompetitionInfo;
