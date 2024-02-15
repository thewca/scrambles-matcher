import React from 'react';
import Typography from '@mui/material/Typography';
import ScrambleFileInfo from '../../Scrambles/ScrambleFileInfo';

const UploadedScramblesPanel = ({ uploadedScrambles }) => {
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
