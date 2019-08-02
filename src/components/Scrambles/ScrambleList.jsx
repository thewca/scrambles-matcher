import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { styled } from '@material-ui/styles';

const nextChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

const DNDList = styled(List)({
  minHeight: "200px",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const DraggableScramble = ({ s, index, getPrefix }) => {
  let prefix = getPrefix();
  return (
    <Draggable draggableId={s.id} index={index}>
      {(provided, snapshot) =>(
        <ListItem button
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          {prefix && (
            <ListItemText primary={prefix} />
          )}
          <ListItemText primary={s.title} secondary={`From ${s.sheetName}`} />
        </ListItem>
      )}
    </Draggable>
  );
}

const ScrambleList = ({ scrambles, holds }) => {
  // The char before 'A' ;)
  let prefix = "@";
  let setPrefix = holds === "round";
  let getPrefix = () => setPrefix ? (prefix = nextChar(prefix)) : null;

  return (
    <Droppable droppableId={holds}>
      {(provided, snapshot) => (
        <DNDList
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {scrambles.map((s, index) => (
            <DraggableScramble key={s.id} s={s} index={index} getPrefix={getPrefix} />
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
}

export default ScrambleList;
