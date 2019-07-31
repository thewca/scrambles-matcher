import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import Competition from '../Competition/Competition';
import ImportWCIF from '../ImportWCIF/ImportWCIF';


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
    this.setState({ wcif: json });
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  render() {
    const { wcif, errors } = this.state;
    const { match } = this.props;
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
