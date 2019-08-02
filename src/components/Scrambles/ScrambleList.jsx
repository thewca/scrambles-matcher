import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from '@material-ui/styles';

// 65 is the char code for 'A'
const prefixForIndex = index => String.fromCharCode(65 + index);

const DNDList = styled(List)({
  minHeight: "100px",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const DraggableScramble = ({ s, index, showPrefix }) => (
  <Draggable draggableId={s.id} index={index}>
    {(provided, snapshot) =>(
      <ListItem button
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {showPrefix && !snapshot.isDragging && (
          <ListItemText primary={prefixForIndex(index)} />
        )}
        <ListItemText primary={s.title} secondary={`From ${s.sheetName}`} />
      </ListItem>
    )}
  </Draggable>
);

const ScrambleList = ({ scrambles, holds }) => (
  <Droppable droppableId={holds}>
    {(provided, snapshot) => (
      <DNDList
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {scrambles.map((s, index) => (
          <DraggableScramble key={s.id} s={s} index={index}
            showPrefix={holds === "round"}
          />
        ))}
        {false && scrambles.length === 0 && (
          <ListItem key={0}>
            No scrambles
          </ListItem>
        )}
        {provided.placeholder}
      </DNDList>
    )}
  </Droppable>
);

export default ScrambleList;
