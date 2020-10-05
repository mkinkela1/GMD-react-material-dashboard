import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  IconButton,
  Typography,
  TextField, Button
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import {
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import setCreateEventExpansionVisibility from '../../../../store/setters/SetCreateEventExpansionVisibility';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getVisibilityOfCreateEventExpansion } from '../../../../store/reducers/CreateEventExpansionReducer';
import DateFnsUtils from '@date-io/date-fns';
import axios from './../../../../helpers/inderceptors';
import config from '../../../../config';

const CreateEvent = (props) => {

  const classes = useStyles();
  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());
  const [title, setTitle] = useState('');
  const [allDay, setAllDay] = useState(false);

  const handleSaveEvent = () => {

    const data = {
      start,
      end,
      title,
      allDay
    };

    axios.post( `${config.apiUrl}/event`, data )
      .then(r => console.log(r))
      .catch(e => console.log(e));

  }

  const handleChange = event => {
    setTitle(event.target.value);
  }

  const setCheckbox = event => {
    setAllDay(event.target.checked);
  }

  return (
    <div className={[props.isVisible ? classes.container : classes.hideContainer]} style={{zIndex: 1000}}>
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
            <DateTimePicker
              ampm={false}
              format="dd.MM.yyyy, HH:mm"
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              label="Početak eventa"
              onChange={setStart}
              value={start}
              variant="inline"
            />
            <DateTimePicker
              ampm={false}
              format="dd.MM.yyyy, HH:mm"
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              label="Kraj eventa"
              onChange={setEnd}
              value={end}
              variant="inline"
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.row}>
          <TextField
            fullWidth
            label="Naziv događaja"
            onChange={handleChange}
            value={title}
          />
        </div>
        <div className={classes.row}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allDay}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                onChange={setCheckbox}
              />
            }
            label="Cijeli dan?"
          />
        </div>
        <div className={classes.row}>
          <div>&nbsp;</div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSaveEvent()}
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
