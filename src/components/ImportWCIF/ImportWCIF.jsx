import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import XLSX from 'xlsx';
import { personWcifFromRegistrationXlsx, roundWcifFromXlsx } from '../../logic/xlsx-utils';


//import tmpWcif from '../../wcifresults.json';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

const loadSheetIntoWcif = (wcif, name, jsonSheet) => {
  // This function strongly assumes that 'Registration' is the first sheet...
  if (name === "Registration") {
    wcif.name = jsonSheet[0][0];
    wcif.shortName = wcif.name;
    wcif.persons = personWcifFromRegistrationXlsx(jsonSheet);
  } else {
    let [eventId, roundNumber] = name.split("-");
    let event = wcif.events.find(e => e.id === eventId);
    if (!event) {
      event = {
        id: eventId,
        rounds: [],
        competitorLimit: null,
        qualification: null,
      };
      wcif.events.push(event);
    }
    event.rounds.push(roundWcifFromXlsx(wcif.persons, eventId, roundNumber, jsonSheet));
  }
};

const xlsxOptions = {
  header: 1,
  raw: false,
  blankrows: false,
};

const handleXlsxUploadChange = (updater, event) => {
  const reader = new FileReader();
	const rABS = !!reader.readAsBinaryString;

  reader.onload = e => {
    const wb = XLSX.read(e.target.result, {type:rABS ? 'binary' : 'array'});
    const sheetNames = wb.SheetNames;
    const wcif = {
      // Unfortunately this is not included in the XLSX :(
      id: null,
      name: "<undefined>",
      shortName: "<undefined>",
      schedule: [],
      events: [],
      persons: [],
    };
    sheetNames.forEach(name => loadSheetIntoWcif(wcif, name, XLSX.utils.sheet_to_json(wb.Sheets[name], xlsxOptions)));
    updater(wcif);
  }

  reader.onerror = e => alert("Couldn't load the JSON file");

  if(rABS)
    reader.readAsBinaryString(event.target.files[0]);
  else
    reader.readAsArrayBuffer(event.target.files[0]);
};

const handleFileUploadChange = (updater, event) => {

  let reader = new FileReader();

  reader.onload = e => updater(JSON.parse(e.target.result));

  reader.onerror = e => alert("Couldn't load the JSON file");

  reader.readAsText(event.target.files[0]);
};

const ImportWCIF = ({ handleWcifJSONLoad }) => {
  const classes = useStyles();
  // Dirty hack to preload given WCIF
  //handleWcifJSONLoad(tmpWcif);
  return (
    <Fragment>
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
      <Grid item xs={12} style={{ padding: 16 }}>
        <input
          accept=".xlsx"
          className={classes.input}
          id="raised-button-xlsx"
          multiple
          type="file"
          onChange={ev => handleXlsxUploadChange(handleWcifJSONLoad, ev)}
        />
        <label htmlFor="raised-button-xlsx">
          <Button component="span">
            Upload XLSX
          </Button>
        </label>
      </Grid>
    </Fragment>
  );
};

export default ImportWCIF;
