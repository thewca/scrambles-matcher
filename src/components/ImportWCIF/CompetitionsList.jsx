import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { signIn } from '../../logic/auth';

export const CompetitionsList = ({ competitions, importFromCompetition }) => (
  <List>
    {competitions.length === 0 ? (
      <ListItem>
        <ListItemText>You have no upcoming competitions to manage</ListItemText>
      </ListItem>
    ) : (
      competitions.map(competition => (
        <ListItem
          key={competition.id}
          button
          onClick={() => importFromCompetition(competition.id)}
        >
          <ListItemText>{competition.name}</ListItemText>
        </ListItem>
      ))
    )}
  </List>
);

export const CompetitionsSection = ({
  competitions,
  importFromCompetition,
}) => (
  <Fragment>
    {competitions ? (
      <CompetitionsList
        competitions={competitions}
        importFromCompetition={importFromCompetition}
      />
    ) : (
      <Button
        variant="outlined"
        component="span"
        color="secondary"
        onClick={signIn}
      >
        Sign in with the WCA
      </Button>
    )}
  </Fragment>
);
