import React, { useState, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const NestedScrambleItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
  }
}))(ListItem);

const ScrambleFileInfo = ({ scramble }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card>
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
            {scramble.id}: {scramble.competitionName}
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
              <NestedScrambleItem>
                {sheet.title}
              </NestedScrambleItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const CompetitionInfo = ({ wcif, uploadedScrambles, uploadAction }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography paragraph>
        Some extra infos about the competition
      </Typography>
      <input
        accept=".json"
        className={classes.input}
        id="upload-scramble-json"
        multiple
        type="file"
        onChange={uploadAction}
      />
      <label htmlFor="upload-scramble-json">
        <Button variant="contained" component="span" color="secondary">
          Upload scrambles json
        </Button>
      </label>
      <Typography variant="h4">
        Uploaded scrambles:
      </Typography>
      {uploadedScrambles.map(s => (
        <ScrambleFileInfo scramble={s} key={s.id} />
      ))}
    </Paper>
  );
}

export default CompetitionInfo;
