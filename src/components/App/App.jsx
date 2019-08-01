import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import Competition from '../Competition/Competition';
import ImportWCIF from '../ImportWCIF/ImportWCIF';
import { ensureScramblesMember } from '../../logic/scrambles';
import { sortWcifEvents } from '../../logic/events';
import { updateIn } from '../../logic/utils';


const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: grey
  },
  typography: {
    useNextVariants: true,
  }
});

export default class App extends Component {
  state = {
    wcif: null,
    errors: []
  };

  handleWcifJSONLoad = json => {
    let wcif = updateIn(json, ['events'], ensureScramblesMember)
    wcif = updateIn(wcif, ['events'], sortWcifEvents);
    this.setState({ wcif });
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  render() {
    const { wcif, errors } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
          <CssBaseline />
          <Grid container>
            {wcif ? (
              <Competition handleWcifUpdate={this.handleWcifUpdate} wcif={wcif} />
            ) : (
              <ImportWCIF handleWcifJSONLoad={this.handleWcifJSONLoad} errors={errors} />
            )}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
