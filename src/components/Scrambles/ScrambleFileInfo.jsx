import React, { useState, Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
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
}));

const NestedScrambleItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
  },
}))(ListItem);

const ScrambleFileInfo = ({ scramble }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
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
        title={
          <Link
            component="button"
            variant="h5"
            color="inherit"
            onClick={handleExpandClick}
          >
            {scramble.competitionName}
          </Link>
        }
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List dense>
            {scramble.sheets.map(sheet => (
              <NestedScrambleItem key={sheet.id}>
                {sheet.title}
              </NestedScrambleItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ScrambleFileInfo;
