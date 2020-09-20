import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {Button, Grid} from '@material-ui/core';
import CreateEvent from './components/CreateEvent/CreateEvent';
import setCreateEventExpansionVisibility from '../../store/setters/SetCreateEventExpansionVisibility';
import {getVisibilityOfCreateEventExpansion} from '../../store/reducers/CreateEventExpansionReducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import config from '../../config';
import axios from './../../helpers/inderceptors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const localizer = momentLocalizer(moment)

let allViews = Object.keys(Views).map(k => Views[k])

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  spacer: {
    flexGrow: 1
  },
  dayWithDotContainer: {
    position: 'relative'
  },
  dayWithDot: {
    position: 'relative',
    display: 'inline-flex',
    height: 0,
    width: 0,
    border: '2px solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.main
  }
}));

const CalendarView = (props) => {

  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const classes = useStyles();

  useEffect(() => {

    axios( `${config.apiUrl}/event` )
      .then(r => console.log(r))
      .catch()
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <span className={classes.spacer}/>
        <Button
          color="primary"
          onClick={() => props.visibility(true)}
          variant="contained"
        >
          Novi događaj
        </Button>
      </div>
      <Grid
        container
        justify={'center'}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BigCalendar
            date={selectedDate}
            events={[events]}
            localizer={localizer}
            onNavigate={date => setSelectedDate(date)}
            selectable
            step={1}
            style={{ height: 500, background: '#fff' }}
            timeslots={60}
            views={allViews}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <CreateEvent/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: getVisibilityOfCreateEventExpansion(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  visibility: setCreateEventExpansionVisibility
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
