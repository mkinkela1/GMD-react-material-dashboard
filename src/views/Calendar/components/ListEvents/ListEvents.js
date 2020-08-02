import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  timeline: {
  },
  item: {
    '&:before': {
      flex: 'none',
      content: 'none'
    }
  },
  dot: {
    background: '#3f51b5'
  },
  paper: {
    padding: '6px 16px',
    boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)'
  }
}));

const ListEvents = () => {
  const classes = useStyles();

  const events = [
    {ts: '2017-09-17T12:22:46.587Z', text: 'Logged in'},
    {ts: '2017-09-17T12:21:46.587Z', text: 'Clicked Home Page'},
    {ts: '2017-09-17T12:20:46.587Z', text: 'Edited Profile'},
    {ts: '2017-09-16T12:22:46.587Z', text: 'Registred'},
    {ts: '2017-09-16T12:21:46.587Z', text: 'Clicked Cart'},
    {ts: '2017-09-16T12:20:46.587Z', text: 'Clicked Checkout'},
    {ts: '2017-09-17T12:22:46.587Z', text: 'Logged in'},
    {ts: '2017-09-17T12:21:46.587Z', text: 'Clicked Home Page'},
    {ts: '2017-09-17T12:20:46.587Z', text: 'Edited Profile'},
    {ts: '2017-09-16T12:22:46.587Z', text: 'Registred'},
    {ts: '2017-09-16T12:21:46.587Z', text: 'Clicked Cart'},
    {ts: '2017-09-16T12:20:46.587Z', text: 'Clicked Checkout'},
  ];

  return (
    <Timeline
      align="left"
      className={classes.timeline}
    >
      {
        events.map(({ts, text}, idx) => (
          <TimelineItem className={classes.item}>
            <TimelineSeparator>
              <TimelineDot className={classes.dot} />
              {idx === events.length - 1 ? '' : <TimelineConnector /> }
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5">{text}</Typography>
                <Typography>{ts}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))
      }
    </Timeline>
  );
};

export default ListEvents;
