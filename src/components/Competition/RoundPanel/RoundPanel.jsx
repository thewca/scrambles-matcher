import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export default class RoundPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedScrambles: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.round.id !== prevProps.round.id)
      this.setState({ savedScrambles: [] });
  }

  // TODO: save to main wcif button

  render() {
    const { round } = this.props;
    return (
      <Paper>
        <Typography variant="h3" align="center">
          {round.id}
        </Typography>
      </Paper>
    );
  }
};
