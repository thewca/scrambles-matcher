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

import CubingIcon from '../../CubingIcon/CubingIcon';

const EventListItem = withStyles({
  root: {
    color: 'black',
    '& .cubing-icon, & svg': {
      color: 'black',
    }
  }
})(ListItem);

const NestedRoundItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    '& svg': {
      color: 'red',
    }
  }
}))(ListItem);

const CompetitionMenu = ({ events, setSelectedRound }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log(events);
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
            <ListItemText primary={event.id} />
          </EventListItem>
          <Collapse
            in={selectedEvent === event.id}
            timeout="auto"
            unmountOnExit
          >
            <List dense={true}>
              {event.rounds.map(round => (
                <NestedRoundItem
                  key={round.id}
                  button
                  onClick={() => { console.log(round.id); setSelectedRound(round.id)} }
                >
                  <ListItemText primary={round.id} />
                  {round.scrambleSets.length === 0 && (
                    <ListItemIcon>
                      <Tooltip title="Missing scrambles">
                        <ReportProblemIcon />
                      </Tooltip>
                    </ListItemIcon>
                  )}
                </NestedRoundItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
};

export default CompetitionMenu;
