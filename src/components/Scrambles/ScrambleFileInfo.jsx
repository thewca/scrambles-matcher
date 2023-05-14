import React, { useState, Fragment } from 'react';
import makeStyles from '@mui/styles/makeStyles';
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
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  list: {
    maxHeight: 200,
    overflowY: 'auto',
  },
}));

const ScrambleFileInfo = ({ scramble }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea component="span" onClick={handleExpandClick}>
        <CardHeader
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
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
          <List dense className={classes.list}>
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
