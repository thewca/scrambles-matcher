import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';


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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <Grid container justify="center" style={{ flexGrow: 1 }}>
              <Grid item xs={12} md={8} style={{ padding: 16 }}>
                <Typography variant="h4">Some nice text</Typography>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
