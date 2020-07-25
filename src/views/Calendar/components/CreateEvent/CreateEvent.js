import React  from 'react';
import {
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import setCreateEventExpansionVisibility from '../../../../store/setters/SetCreateEventExpansionVisibility';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getVisibilityOfCreateEventExpansion } from '../../../../store/reducers/CreateEventExpansionReducer';

const CreateEvent = (props) => {

  const classes = useStyles();

  return (
    <div className={[props.isVisible ? classes.container : classes.hideContainer]}>
      <header className={classes.header}>
        <h1 className={classes.title}>
          a
        </h1>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => props.visibility(false)}
        >
          <Close />
        </IconButton>
      </header>

      <div className={classes.content}>

        <section className={[classes.section, classes.status]}>
          <h2 className={classes.sectionTitle}>b</h2>

          <div className={classes.statusGrid}>
            c
          </div>
        </section>


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
  title: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 500,
    margin: 0,
    textAlign: 'left'
  },
  closeButton: {
    padding: '0'
  },
  content: {
    padding: '30px',
  },
  section: {
    color: '#505D68',
    fontSize: '14px',
    lineHeight: '20px',
    paddingBottom: '30px',
    borderBottom: '1px solid #CCD9DF',
    marginBottom: '30px',
    textAlign: 'left'
  },
  sectionTitle: {
    color: '#373D41',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    margin: '0 0 12px'
  },
  sectionText: {
    margin: 0
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: '20px',
    gridRowGap: '14px'
  },
  statusTitle: {
    fontWeight: 500,
    margin: 0
  },
  statusIncome: {
    textAlign: 'center',
    margin: 0
  },
  notBooked: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  income: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: '20px'
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridColumnGap: '20px'
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    alignSelf: 'center'
  },
  invoices: {
    border: 'none'
  }
}));

const mapStateToProps = (state) => ({
  isVisible: getVisibilityOfCreateEventExpansion(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  visibility: setCreateEventExpansionVisibility
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
