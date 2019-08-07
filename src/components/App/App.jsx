import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Competition from '../Competition/Competition';
import ImportWCIF from '../ImportWCIF/ImportWCIF';
import { processImportedWcif } from '../../logic/scrambles';

export default class App extends Component {
  state = {
    wcif: null,
    uploadedScrambles: [],
    errors: [],
  };

  handleWcifJSONLoad = json => {
    const [wcif, uploadedScrambles] = processImportedWcif(json);
    this.setState({ wcif, uploadedScrambles: [uploadedScrambles] });
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  render() {
    const { wcif, uploadedScrambles, errors } = this.state;
    return (
      <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <CssBaseline />
        {wcif ? (
          <Competition
            handleWcifUpdate={this.handleWcifUpdate}
            wcif={wcif}
            uploadedScrambles={uploadedScrambles}
          />
        ) : (
          <ImportWCIF
            handleWcifJSONLoad={this.handleWcifJSONLoad}
            errors={errors}
          />
        )}
      </div>
    );
  }
}
