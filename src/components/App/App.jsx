import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Competition from '../Competition/Competition';
import ImportWCIF from '../ImportWCIF/ImportWCIF';
import { ensureScramblesMember } from '../../logic/scrambles';
import { sortWcifEvents } from '../../logic/events';
import { updateIn } from '../../logic/utils';

export default class App extends Component {
  state = {
    wcif: null,
    errors: [],
  };

  handleWcifJSONLoad = json => {
    let wcif = updateIn(json, ['events'], ensureScramblesMember);
    wcif = updateIn(wcif, ['events'], sortWcifEvents);
    this.setState({ wcif });
  };

  handleWcifUpdate = wcif => {
    this.setState({ wcif });
  };

  render() {
    const { wcif, errors } = this.state;
    return (
      <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <CssBaseline />
        {wcif ? (
          <Competition handleWcifUpdate={this.handleWcifUpdate} wcif={wcif} />
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
