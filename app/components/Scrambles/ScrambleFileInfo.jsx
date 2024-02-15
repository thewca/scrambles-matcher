import React, { useState, Fragment, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

const ScrambleFileInfo = ({ scramble }) => {
  const [expanded, setExpanded] = useState(false);
  const expandOpenDeg = useMemo(() => (expanded ? 180 : 0), [expanded]);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardActionArea component="span" onClick={handleExpandClick}>
        <CardHeader
          action={
            <IconButton
              sx={{
                transform: `rotate(${expandOpenDeg}deg)`,
                transition: (theme) =>
                  theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              size="large"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={scramble.competitionName}
          titleTypographyProps={{ variant: 'subtitle1' }}
          subheader={
            <Fragment>
              <Typography variant="body2" component="p" color="textSecondary">
                Generated with {scramble.version}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                On {scramble.generationDate}
              </Typography>
            </Fragment>
          }
        />
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List dense sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {scramble.sheets.map((sheet) => (
              <ListItem key={sheet.id}>
                <ListItemText primary={sheet.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ScrambleFileInfo;
