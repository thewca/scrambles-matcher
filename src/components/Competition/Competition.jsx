import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localWcif: props.wcif
    };
  }

  render() {
    const { localWcif } = this.state;
    const { handleWcifUpdate } = this.props;
    return (
      <div>
        <Paper>
          <Typography variant="h1">
            {localWcif.name}
          </Typography>
          <Typography variant="h2">
            h2. Heading
          </Typography>
          <Typography variant="p">
            URL: todo
          </Typography>
          <Button variant="contained" color="primary"
            onClick={() => handleWcifUpdate(null)}>
            nullify
          </Button>
        </Paper>
      </div>
    );
  }
};
