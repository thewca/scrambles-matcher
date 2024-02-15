import React, { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { prefixForIndex } from '../../logic/scrambles';

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
});

const ScrambleListHeader = () => (
  <ListItem>
    <Grid item xs={6} md={4} lg={2} align="center">
      <Typography variant="subtitle1">Group</Typography>
    </Grid>
    <Grid item xs={6} md={8} lg={10} align="right">
      <Typography variant="subtitle1">Scramble sheet</Typography>
    </Grid>
  </ListItem>
);

const ScrambleWithPrefix = ({ prefix, title, subtitle }) => (
  <Fragment>
    <Grid item xs={6} md={4} lg={2}>
      <ListItemText primary={prefix} align="center" />
    </Grid>
    <Grid item xs={6} md={8} lg={10} align="right">
      <ListItemText primary={title} secondary={subtitle} />
    </Grid>
  </Fragment>
);

const ScrambleItem = ({ title, subtitle }) => (
  <Grid item xs={12}>
    <ListItemText primary={title} secondary={subtitle} />
  </Grid>
);

const DraggableScramble = ({ s, index, showPrefix }) => (
  <Draggable draggableId={s.id.toString()} index={index}>
    {(provided, snapshot) => (
      <ListItem
        button
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {showPrefix && !snapshot.isDragging ? (
          <ScrambleWithPrefix
            prefix={prefixForIndex(index)}
            title={s.title}
            subtitle={`From ${s.sheetName}`}
          />
        ) : (
          <ScrambleItem title={s.title} subtitle={`From ${s.sheetName}`} />
        )}
      </ListItem>
    )}
  </Draggable>
);

const ScrambleList = ({ scrambles, holds, round }) => {
  let showPrefix = holds.startsWith('round') && !round.id.startsWith('333fm');
  return (
    <Droppable droppableId={holds}>
      {(provided, snapshot) => (
        <List
          sx={{ minHeight: '100px' }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {showPrefix && <ScrambleListHeader />}
          {scrambles.map((s, index) => (
            <DraggableScramble
              key={s.id}
              s={s}
              index={index}
              showPrefix={showPrefix}
            />
          ))}
          {false && scrambles.length === 0 && (
            <ListItem key={0}>No scrambles</ListItem>
          )}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default ScrambleList;
