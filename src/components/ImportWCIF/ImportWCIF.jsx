import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

const handleFileUploadChange = (updater, event) => {
  console.log(event.target.files);

  let reader = new FileReader();

  reader.onload = e => {
    updater(JSON.parse(e.target.result));
  }

  reader.onerror = e => {
    alert("Couldn't load the JSON file");
  }

  reader.readAsText(event.target.files[0]);
};

const ImportWCIF = ({ handleWcifJSONLoad }) => {
  const classes = useStyles();
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
