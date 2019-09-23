import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Competition from '../Competition/Competition';
import ImportWCIF from '../ImportWCIF/ImportWCIF';
import Header from './Header';
import ErrorBar from './Error';
import { importWcif } from '../../logic/import-export-wcif';
import {
  getMe,
  getUpcomingManageableCompetitions,
  getWcif,
} from '../../logic/wca-api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wcif: null,
      uploadedScrambles: [],
      error: null,
      user: null,
      userToken: props.userToken,
      competitions: null,
      loading: false,
    };
  }

  handleWcifJSONLoad = json => {
    const [wcif, extractedScrambles] = importWcif(json);
    this.setState({
      wcif,
      uploadedScrambles: extractedScrambles,
      loading: false,
    });
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  importFromCompetition = id => {
    this.setState({ loading: true });
    getWcif(this.state.userToken, id)
      .then(wcif => this.handleWcifJSONLoad(wcif))
      .catch(error => this.setState({ error: error.message, loading: false }));
  };

  componentDidMount() {
    const { userToken } = this.state;
    if (userToken) {
      getMe(userToken)
        .then(user => {
          this.setState({
            user: user.me,
            loading: this.state.competitions === null,
          });
        })
        .catch(error => this.setState({ error: error.message }));
      getUpcomingManageableCompetitions(userToken)
        .then(competitions => {
          console.log(competitions);
          this.setState({ competitions, loading: false });
        })
        .catch(error => this.setState({ error: error.message }));
    }
  }

  render() {
    const {
      wcif,
      uploadedScrambles,
      error,
      user,
      competitions,
      loading,
    } = this.state;
    return (
      <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <CssBaseline />
        <Header user={user} />
        {error && (
          <ErrorBar
            message={error}
            clear={() => this.setState({ error: null })}
          />
        )}
        {wcif ? (
          <Competition
            handleWcifUpdate={this.handleWcifUpdate}
            wcif={wcif}
            uploadedScrambles={uploadedScrambles}
          />
        ) : (
          <ImportWCIF
            handleWcifJSONLoad={this.handleWcifJSONLoad}
            importFromCompetition={this.importFromCompetition}
            competitions={competitions}
            loading={loading}
            signedIn={!!this.state.userToken}
          />
        )}
      </div>
    );
  }
}
