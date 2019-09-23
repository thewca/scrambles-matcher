import React, { Fragment, useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import { CubingIcon } from '../../CubingIcon/CubingIcon';
import {
  eventHasValidScrambles,
  roundHasValidScrambles,
} from '../../../logic/wcif';
import { eventNameById, roundTypeIdForRound } from '../../../logic/events';
import { roundTypeById } from '../../../logic/roundtypes';

const useStyles = makeStyles(theme => ({
  nestedItem: {
    paddingLeft: theme.spacing(4),
  },
}));

const CompetitionMenu = ({ events, setSelectedRound }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const classes = useStyles();
  return (
    <List dense={true}>
      <ListItem
        button
        onClick={() => {
          setSelectedEvent(null);
          setSelectedRound(null);
        }}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </ListItem>
      {events.map(event => (
        <Fragment key={event.id}>
          <ListItem
            button
            onClick={e => {
              setSelectedEvent(selectedEvent === event.id ? null : event.id);
              e.stopPropagation();
            }}
          >
            <ListItemIcon>
              <CubingIcon eventId={event.id} />
            </ListItemIcon>
            <ListItemText primary={eventNameById(event.id)} />
            {!eventHasValidScrambles(event) && (
              <Tooltip title="Missing scrambles">
                <ReportProblemIcon color="error" />
              </Tooltip>
            )}
          </ListItem>
          <Collapse
            in={selectedEvent === event.id}
            timeout="auto"
            unmountOnExit
          >
            <List dense={true}>
              {event.rounds.map(round => (
                <ListItem
                  key={round.id}
                  button
                  className={classes.nestedItem}
                  onClick={() => setSelectedRound(round.id)}
                >
                  <ListItemText
                    primary={
                      roundTypeById(
                        roundTypeIdForRound(event.rounds.length, round)
                      ).name
                    }
                  />
                  {!roundHasValidScrambles(event.id, round) && (
                    <Tooltip title="Missing scrambles">
                      <ReportProblemIcon color="error" />
                    </Tooltip>
                  )}
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
};

export default CompetitionMenu;
