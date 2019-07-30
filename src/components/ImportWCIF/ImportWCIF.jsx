import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class ImportWCIF extends Component {
  render() {
    const { handleWcifUpdate } = this.props;
    return (
      <div>
        Coucou
        <Button variant="contained" color="primary"
          onClick={() => handleWcifUpdate({ "name": "This test" })}>
          Do it!
        </Button>
      </div>
    );
  }
};
