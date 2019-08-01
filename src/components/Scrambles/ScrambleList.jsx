import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { styled } from '@material-ui/styles';

const nextChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

const DNDList = styled(List)({
  minHeight: "200px",
});

const ScrambleList = ({ scrambles, setPrefix }) => {
  // The char before 'A' ;)
  let prefix = "@";
  return (
    <DNDList>
      {scrambles.map(s => (
        <ListItem button key={s.id}>
          {setPrefix && (prefix = nextChar(prefix)) && (
            <ListItemText primary={prefix} />
          )}
          <ListItemText primary={s.title} secondary={`From ${s.sheetName}`} />
        </ListItem>
      ))}
      {scrambles.length === 0 && (
        <ListItem key={0}>
          No scrambles
        </ListItem>
      )}
    </DNDList>
  );
}

export default ScrambleList;
