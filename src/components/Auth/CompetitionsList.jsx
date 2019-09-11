import React, { Fragment } from 'react';
//import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { signIn } from '../../logic/auth';

const CompetitionsList = ({ userToken, setCompetitionWcif }) => {
  //const [competitions, setCompetitions] = useState([]);
  return (
    <Fragment>
      {userToken ? (
        <Typography variant="h6">Token: {userToken}</Typography>
      ) : (
        <Button
          variant="contained"
          component="span"
          color="secondary"
          onClick={signIn}
        >
          Sign in with the WCA
        </Button>
      )}
    </Fragment>
  );
};

export default CompetitionsList;
