import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  internalWcifToWcif,
  internalWcifToResultsJson,
} from '../../../logic/import-export-wcif';
import { autoAssignScrambles, clearScrambles } from '../../../logic/scrambles';
import CompetitionDetailsPanel from './CompetitionDetailsPanel';
import MatchingScramblesPanel from './MatchingScramblesPanel';
import UploadedScramblesPanel from './UploadedScramblesPanel';

const downloadFile = (wcif, exporter, filename = 'wcif.json') => {
  let blob = new Blob([JSON.stringify(exporter(wcif))], {
    type: 'application/json',
  });
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
  addJsonButton: {
    marginTop: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  mb3: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const CompetitionInfo = ({
  wcif,
  uploadedScrambles,
  uploadAction,
  handleWcifChange,
  version,
}) => {
  const classes = useStyles();

  const actionDownloadWcif = () =>
    downloadFile(wcif, internalWcifToWcif, `WCIF for ${wcif.id}.json`);

  const actionDownloadResultsJson = () =>
    downloadFile(
      wcif,
      wcif => internalWcifToResultsJson(wcif, version),
      `Results for ${wcif.id}.json`
    );

  const actionAssignScrambles = () =>
    handleWcifChange(autoAssignScrambles(wcif, uploadedScrambles));

  const actionClearScrambles = () => handleWcifChange(clearScrambles(wcif));

  const uploadCompetitionIdAction = id => handleWcifChange({ ...wcif, id: id });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CompetitionDetailsPanel
          downloadWcifAction={actionDownloadWcif}
          downloadResultsJsonAction={actionDownloadResultsJson}
          uploadCompetitionIdAction={uploadCompetitionIdAction}
          classes={classes}
          wcif={wcif}
        />
      </Grid>
      <Grid item xs={12}>
        <MatchingScramblesPanel
          assignAction={actionAssignScrambles}
          uploadAction={uploadAction}
          clearAction={actionClearScrambles}
          classes={classes}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadedScramblesPanel
          uploadedScrambles={uploadedScrambles}
          classes={classes}
        />
      </Grid>
    </Grid>
  );
};

export default CompetitionInfo;
