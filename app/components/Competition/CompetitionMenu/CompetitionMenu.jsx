import React, { Fragment, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import { CubingIcon } from '../../CubingIcon/CubingIcon';
import {
  eventHasValidScrambles,
  roundHasValidScrambles,
} from '../../../logic/wcif';
import { eventNameById, roundTypeIdForRound } from '../../../logic/events';
import { roundTypeById } from '../../../logic/roundtypes';

const CompetitionMenu = ({ events, setSelectedRound }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      {events.map((event) => (
        <Fragment key={event.id}>
          <ListItem
            button
            onClick={(e) => {
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
              {event.rounds.map((round) => (
                <ListItem
                  key={round.id}
                  button
                  sx={{ paddingLeft: 4 }}
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
