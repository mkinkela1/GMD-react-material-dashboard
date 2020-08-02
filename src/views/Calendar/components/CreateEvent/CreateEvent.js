import React, {useState}  from 'react';
import {
  makeStyles,
  IconButton,
  Typography,
  TextField, Button
} from '@material-ui/core';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Close } from '@material-ui/icons';
import setCreateEventExpansionVisibility from '../../../../store/setters/SetCreateEventExpansionVisibility';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getVisibilityOfCreateEventExpansion } from '../../../../store/reducers/CreateEventExpansionReducer';
import DateFnsUtils from '@date-io/date-fns';

const CreateEvent = (props) => {

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [selectedTime, setSelectedTime] = useState(Date.now());

  return (
    <div className={[props.isVisible ? classes.container : classes.hideContainer]}>
      <header className={classes.header}>
        <Typography variant="h4">
          Novi događaj
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => props.visibility(false)}
        >
          <Close />
        </IconButton>
      </header>

      <div className={classes.content}>

        <div className={classes.row}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="dd.MM.yyyy"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              label="Datum"
              onChange={setSelectedDate}
              value={selectedDate}
              variant="inline"
            />
            <KeyboardTimePicker
              ampm={false}
              clearable
              label="Vrijeme"
              onChange={setSelectedTime}
              value={selectedTime}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.row}>
          <TextField
            fullWidth
            label="Naziv događaja"
          />
        </div>
        <div className={classes.row}>
          <div>&nbsp;</div>
          <Button
            color="primary"
            variant="contained"
          >
            Kreiraj novi događaj
          </Button>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme=> ({
  hideContainer: {
    display: 'none'
  },
  container: {
    background: '#fff',
    width: '660px',
    top: 64,
    maxWidth: '60%',
    position: 'fixed',
    right: 0,
    height: 'calc(100vh - 64px)',
    transition: '.2s',
    boxShadow: '-2px 2px 8px 0 rgba(80,93,104,0.2)',
    overflowY: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      maxWidth: '100%',
      zIndex: 1
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    color: '#505D68',
    borderBottom: '1px solid #CCD9DF',
  },
  closeButton: {
    padding: '0'
  },
  content: {
    padding: '30px',
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    marginTop: 20
  }
}));

const mapStateToProps = (state) => ({
  isVisible: getVisibilityOfCreateEventExpansion(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  visibility: setCreateEventExpansionVisibility
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
