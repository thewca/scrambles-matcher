import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/styles';

import { prefixForIndex } from '../../logic/scrambles';

const DNDList = styled(List)({
  minHeight: '100px',
});

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
  <Draggable draggableId={s.id} index={index}>
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
        <DNDList {...provided.droppableProps} ref={provided.innerRef}>
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
        </DNDList>
      )}
    </Droppable>
  );
};

export default ScrambleList;
