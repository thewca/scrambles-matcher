import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
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
