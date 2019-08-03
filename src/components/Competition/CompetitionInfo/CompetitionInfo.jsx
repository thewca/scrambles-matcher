import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { internalWcifToWcif, internalWcifToResultsJson } from '../../../logic/wcif';
import { autoAssignScrambles, clearScrambles } from '../../../logic/scrambles';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';


const downloadFile = (wcif, exporter, filename="wcif.json") => {
  let blob = new Blob([JSON.stringify(exporter(wcif), null, 2)], { type: 'application/json' });
  let blobURL = window.URL.createObjectURL(blob);

  let tmp = document.createElement('a');
  tmp.href = blobURL;
  tmp.setAttribute('download', filename);
  document.body.appendChild(tmp);
  tmp.click();
};

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  addJsonButton: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: 16,
    marginBottom: theme.spacing(2),
  },
  h: {
    marginBottom: theme.spacing(1),
  }
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

  const actionClearScrambles = () =>
    handleWcifChange(clearScrambles(wcif));

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Typography paragraph>
          Some extra infos about the competition
        </Typography>
        <Grid container direction="row">
          <Button variant="contained" component="span"
            disabled={exportUnavailable} color="primary"
            className={classes.button}
            onClick={actionDownloadWcif}
          >
            Get WCIF
          </Button>
          <Button variant="contained" component="span"
            disabled={exportUnavailable} color="primary"
            className={classes.button}
            onClick={actionDownloadResultsJson}
          >
            Get results JSON
          </Button>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.h}>
          Matching scrambles to rounds
        </Typography>
        <Typography paragraph align="justify">
          Clicking "Automatically assign scrambles" will attempt to automatically
          detect which scrambles sets belongs to which round.
          Unlike the workbook assistant, this will attempt to assign unused scrambles
          only to rounds <b>without</b> scrambles! Which means that clicking several
          times the button with the same uploaded scrambles will have no effect.
          <br/>
          You can check scrambles assignments by browsing through the rounds in
          the menu.
          For each round (or each attempt for Multiple Blindfolded and Fewest Moves)
          you can assign scrambles manually from the unused scrambles in the
          uploaded scrambles.
          <br/>
          When everything looks good, get the Results JSON to import the results
          on the WCA website.
          <br/>
          Don't forget to set the competition ID if it's not detected!
        </Typography>
        <Button variant="contained" component="span"
          color="primary"
          className={classes.button}
          onClick={actionAssignScrambles}
        >
          <FreeBreakfastIcon className={classes.extendedIcon} />
          Automatically assign scrambles
        </Button>
        <Button variant="contained" color="secondary"
          className={classes.button}
          onClick={actionClearScrambles}
        >
          <DeleteIcon className={classes.extendedIcon} />
          Clear scrambles assignments
        </Button>
      </Paper>
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
            <GreenButton variant="contained" component="span" color="primary" className={classes.addJsonButton}>
              Upload scrambles json
            </GreenButton>
    </label>
  </div>
        {uploadedScrambles.map(s => (
          <ScrambleFileInfo scramble={s} key={s.competitionName} />
        ))}
      </Paper>
    </Fragment>
  );
}

export default CompetitionInfo;
