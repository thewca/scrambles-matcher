import React from 'react';
import Typography from '@material-ui/core/Typography';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';

const UploadedScramblesPanel = ({ uploadedScrambles, classes }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Uploaded JSON files: {uploadedScrambles.length}
      </Typography>
      {uploadedScrambles.map((s) => (
        <ScrambleFileInfo scramble={s} key={s.competitionName} />
      ))}
    </div>
  );
};

export default UploadedScramblesPanel;
