import React from 'react';
import Grid from '@mui/material/Grid';
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

const CompetitionInfo = ({
  wcif,
  uploadedScrambles,
  uploadAction,
  handleWcifChange,
  version,
}) => {
  const actionDownloadWcif = () =>
    downloadFile(wcif, internalWcifToWcif, `WCIF for ${wcif.id}.json`);

  const actionDownloadResultsJson = () =>
    downloadFile(
      wcif,
      (wcif) => internalWcifToResultsJson(wcif, version),
      `Results for ${wcif.id}.json`
    );

  const actionAssignScrambles = () =>
    handleWcifChange(autoAssignScrambles(wcif, uploadedScrambles));

  const actionClearScrambles = () => handleWcifChange(clearScrambles(wcif));

  const uploadCompetitionIdAction = (id) =>
    handleWcifChange({ ...wcif, id: id });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CompetitionDetailsPanel
          downloadWcifAction={actionDownloadWcif}
          downloadResultsJsonAction={actionDownloadResultsJson}
          uploadCompetitionIdAction={uploadCompetitionIdAction}
          wcif={wcif}
        />
      </Grid>
      <Grid item xs={12}>
        <MatchingScramblesPanel
          assignAction={actionAssignScrambles}
          uploadAction={uploadAction}
          clearAction={actionClearScrambles}
        />
      </Grid>
      <Grid item xs={12}>
        <UploadedScramblesPanel uploadedScrambles={uploadedScrambles} />
      </Grid>
    </Grid>
  );
};

export default CompetitionInfo;
