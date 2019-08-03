import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';
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

const UploadedScramblesPanel = ({ uploadAction, uploadedScrambles, classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.h}>
        Uploaded JSON files: {uploadedScrambles.length}
      </Typography>
      <div style={{ width: "100%" }}>
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
            className={classes.addJsonButton}
          >
            Upload scrambles json
          </GreenButton>
        </label>
      </div>
      {uploadedScrambles.map(s => (
        <ScrambleFileInfo scramble={s} key={s.competitionName} />
      ))}
    </Paper>
  );
};

export default UploadedScramblesPanel;
