import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));


const ScrambleFileInfo = ({ scramble }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {scramble.competitionName}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          Generated with {scramble.version}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          On {scramble.generationDate}
        </Typography>
      </CardContent>
    </Card>
  );
}

const CompetitionInfo = ({ wcif, uploadedScrambles, uploadAction }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography variant="h2">
        {wcif.name}
      </Typography>
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
      {uploadedScrambles.map((s, i) => (
        <ScrambleFileInfo scramble={s} key={i} />
      ))}
    </Paper>
  );
}

export default CompetitionInfo;
