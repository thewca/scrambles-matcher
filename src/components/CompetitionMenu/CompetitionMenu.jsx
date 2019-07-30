import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import CubingIcon from '../CubingIcon/CubingIcon';

const EventListItem = withStyles({
  root: {
    color: 'black',
    '& .cubing-icon': {
      color: 'black',
    }
  }
})(ListItem);

const NestedRoundItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
  }
}))(ListItem);

const CompetitionMenu = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <List dense={true}>
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
                  component={Link}
                  to={`/rounds/${round.id}`}
                >
                  <ListItemText primary={round.id} />
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
