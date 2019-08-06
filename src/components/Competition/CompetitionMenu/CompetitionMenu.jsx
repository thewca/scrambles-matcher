import React, { Fragment, useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import classnames from 'classnames';

import CubingIcon from '../../CubingIcon/CubingIcon';
import {
  eventHasValidScrambles,
  roundHasValidScrambles,
} from '../../../logic/wcif';
import { eventNameById, roundTypeIdForRound } from '../../../logic/events';
import { roundTypeById } from '../../../logic/roundtypes';

const EventListItem = withStyles({
  root: {
    color: 'black',
    '& .cubing-icon, & svg': {
      color: 'black',
    },
  },
})(ListItem);

const useStyles = makeStyles(theme => ({
  item: {
    paddingLeft: theme.spacing(4),
  },
  svg: {
    '& svg': {
      color: 'red',
    },
  },
}));

const CompetitionMenu = ({ events, setSelectedRound }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const classes = useStyles();
  return (
    <List dense={true}>
      <EventListItem button onClick={() => setSelectedRound(null)}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </EventListItem>
      {events.map(event => (
        <Fragment key={event.id}>
          <EventListItem
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
              <ListItemIcon className={classes.svg}>
                <Tooltip title="Missing scrambles">
                  <ReportProblemIcon />
                </Tooltip>
              </ListItemIcon>
            )}
          </EventListItem>
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
                  className={classnames(classes.svg, classes.item)}
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
                    <ListItemIcon>
                      <Tooltip title="Missing scrambles">
                        <ReportProblemIcon />
                      </Tooltip>
                    </ListItemIcon>
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
