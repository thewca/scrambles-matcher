import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';
import { internalWcifToWcif, internalWcifToResultsJson } from '../../../logic/wcif';
import { autoAssignScrambles } from '../../../logic/scrambles';


const downloadFile = (wcif, exporter, filename="wcif.json") => {
  let blob = new Blob([JSON.stringify(exporter(wcif), null, 2)], { type: 'application/json' });
  let blobURL = window.URL.createObjectURL(blob);

  let tmp = document.createElement('a');
  tmp.href = blobURL;
  tmp.setAttribute('download', filename);
  document.body.appendChild(tmp);
  tmp.click();
};

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  button: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const CompetitionInfo = ({ wcif, uploadedScrambles, uploadAction, handleWcifChange, version }) => {
  const classes = useStyles();
  // FIXME: restore the check ;)
  //const exportUnavailable = wcif.events.some(e => e.rounds.some(r => r.scrambleSets.length === 0));
  const exportUnavailable = false;
  const actionDownloadWcif = () => downloadFile(wcif, internalWcifToWcif);
  const actionDownloadResultsJson = () =>
    downloadFile(wcif, wcif => internalWcifToResultsJson(wcif, version), `Results for ${wcif.name}.json`);
  const actionAssignScrambles = () =>
    handleWcifChange(autoAssignScrambles(wcif, uploadedScrambles));
  return (
    <Paper style={{ padding: 16 }}>
      <Typography paragraph>
        Some extra infos about the competition
      </Typography>
      <Grid container direction="row">
        <div>
          <input
            accept=".json"
            className={classes.input}
            id="upload-scramble-json"
            multiple
            type="file"
            onChange={uploadAction}
          />
          <label htmlFor="upload-scramble-json">
            <Button variant="contained" component="span" color="secondary" className={classes.button}>
              Upload scrambles json
            </Button>
          </label>
        </div>
        <div>
          <Button variant="contained" component="span"
            color="primary"
            className={classes.button}
            onClick={actionAssignScrambles}
          >
            Auto assign scrambles
          </Button>
        </div>
        <div>
          <Button variant="contained" component="span"
            disabled={exportUnavailable} color="primary"
            className={classes.button}
            onClick={actionDownloadWcif}
          >
            Get WCIF
          </Button>
        </div>
        <div>
          <Button variant="contained" component="span"
            disabled={exportUnavailable} color="primary"
            className={classes.button}
            onClick={actionDownloadResultsJson}
          >
            Get results JSON
          </Button>
        </div>
      </Grid>
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
