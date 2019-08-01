import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import tmpWcif from '../../wcifresults.json';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

const handleFileUploadChange = (updater, event) => {

  let reader = new FileReader();

  reader.onload = e => updater(JSON.parse(e.target.result));

  reader.onerror = e => alert("Couldn't load the JSON file");

  reader.readAsText(event.target.files[0]);
};

const ImportWCIF = ({ handleWcifJSONLoad }) => {
  const classes = useStyles();
  // Dirty hack to preload given WCIF
  handleWcifJSONLoad(tmpWcif);
  return (
    <Grid item xs={12} style={{ padding: 16 }}>
      <input
        accept=".json"
        className={classes.input}
        id="raised-button-file"
        multiple
        type="file"
        onChange={ev => handleFileUploadChange(handleWcifJSONLoad, ev)}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">
          Upload WCIF
        </Button>
      </label>
    </Grid>
  );
};

export default ImportWCIF;
