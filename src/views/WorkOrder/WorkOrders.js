import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import { WorkOrdersList, WorkOrdersToolbar } from './components';
import axios from './../../helpers/inderceptors';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const WorkOrders = () => {
  const classes = useStyles();

  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {

    axios(`${config.apiUrl}/work-order`)
      .then(r => setWorkOrders(r.data))
      .catch(e => console.log(e));

  }, []);

  return (
    <div className={classes.root}>
      <WorkOrdersToolbar />
      <div className={classes.content}>
        <WorkOrdersList offers={workOrders} />
      </div>
    </div>
  );
};

export default WorkOrders;
