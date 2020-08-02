import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Calendar from './components/Calendar';
import {Button, Grid} from '@material-ui/core';
import ListEvents from './components/ListEvents';
import CreateEvent from './components/CreateEvent/CreateEvent';
import setCreateEventExpansionVisibility from '../../store/setters/SetCreateEventExpansionVisibility';
import {getVisibilityOfCreateEventExpansion} from "../../store/reducers/CreateEventExpansionReducer";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={() => props.visibility(true)}
          variant="contained"
        >
          Novi događaj
        </Button>
      </div>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Grid container>
            <Calendar/>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Grid container>
            <ListEvents />
          </Grid>
        </Grid>
      </Grid>
      <CreateEvent />
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
