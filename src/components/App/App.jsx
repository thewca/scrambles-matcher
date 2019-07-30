import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
    wcif: null
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  render() {
    const { wcif } = this.state;
    const { match } = this.props;
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <Grid container justify="center" style={{ flexGrow: 1 }}>
              <Grid item xs={12} md={8} style={{ padding: 16 }}>
                {wcif ? (
                  <Competition handleWcifUpdate={this.handleWcifUpdate} wcif={wcif} />
                ) : (
                  <ImportWCIF handleWcifUpdate={this.handleWcifUpdate} />
                )}
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
