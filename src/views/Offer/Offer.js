import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';

import { OffersList, OffersToolbar } from './components';
import config from '../../config';
import axios from './../../helpers/inderceptors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [offers, setOffers] = useState([]);

  useEffect(() => {

    axios(`${config.apiUrl}/offer`)
      .then(r => setOffers(r.data))
      .catch(e => console.log(e));

  }, []);

  const removeOffers = ids => {

    setOffers(prevOffers => prevOffers.filter(({_id}) => !ids.includes(_id)));

    ids.forEach(id => {
      axios
        .delete(`${config.apiUrl}/offer/${id}`)
        .catch(e => console.log(e));
    })
  }

  return (
    <div className={classes.root}>
      <OffersToolbar />
      <div className={classes.content}>
        <OffersList offers={offers} removeOffers={removeOffers} />
      </div>
    </div>
  );
};

export default UserList;
