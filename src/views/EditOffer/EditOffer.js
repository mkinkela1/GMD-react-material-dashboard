import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';
import { withRouter } from 'react-router';

import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {ItemsTable} from './components';
import Modal from '@material-ui/core/Modal';
import axios from './../../helpers/inderceptors';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  documentName: {
    align: 'center'
  },
  contentTable: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  tableRoot: {},
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditOffer = (props) => {

  const [offer, setOffer] = useState({
    documentName: '',
    documentNumber: '',
    documentDate: Date.now(),
    boatModel: '',
    masterCitizenNumber: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    validTill: Date.now(),
    paymentType: '',
    items: []
  });
  const [item, setItem] = useState({
    id: 1,
    productName: '',
    quantity: 0,
    unit: '',
    unitPriceBeforeDiscount: 0,
    discount: 0,
    unitPriceWithDiscount: 0,
    amount: 0
  });

  useEffect(() => {

    // eslint-disable-next-line react/prop-types
    axios(`${config.apiUrl}/offer/${props.match.params.id}`)
      .then(r => setOffer(r.data))
      .catch(e => console.log(e));

    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id]);

  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const handleModalData = (e) => {

    const { name, value } = e.target;

    setItem( prevItem => ({ ...prevItem, [name]: value}) );
  }

  const handleChange = (e) => {

    const { name, value } = e.target;

    setOffer( prevOffer => ({ ...prevOffer, [name]: value }) );
  };

  const resetItem = () => {
    setItem({
      id: 1,
      productName: '',
      quantity: 0,
      unit: '',
      unitPriceBeforeDiscount: 0,
      discount: 0,
      unitPriceWithDiscount: 0,
      amount: 0
    });
  };

  const addItem = () => {

    let tmpItem = item;

    tmpItem.quantity = parseInt(tmpItem.quantity);
    tmpItem.unitPriceBeforeDiscount = parseInt(tmpItem.unitPriceBeforeDiscount);
    tmpItem.discount = parseInt(tmpItem.discount);

    tmpItem.unitPriceWithDiscount = tmpItem.unitPriceBeforeDiscount * (1 - tmpItem.discount/100);
    tmpItem.amount = tmpItem.unitPriceWithDiscount * tmpItem.quantity;

    console.log(tmpItem);

    setOffer( prevOffer => ({ ...prevOffer, items: [...prevOffer.items, tmpItem] }) );
    resetItem();
  };

  const handleDateChange = (name, value) => {
    setOffer( prevOffer => ({ ...prevOffer, [name]: value }) );
  }

  const handleSave = () => {

    axios
      .put(`${config.apiUrl}/offer/${props.match.params.id}`, offer)
      .then(r => props.history.push({
        pathname: '/offer/pdf',
        state: { offer: r.data }
      }))
      .catch(e => console.log(e));
  };

  const handleRemoveItem = (removeId) => {
    console.log(removeId);
    setOffer( prevOffer => {
      if(prevOffer.items.length === 1)
        return {...prevOffer, items: []};
      else
        return {...prevOffer, items: prevOffer.items.filter(({id}) => id !== removeId)}
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.title} color="textSecondary" variant="body2">Naziv dokumenta</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <TextField fullWidth name="documentName" placeholder='Naziv dokumenta' value={offer.documentName} onChange={(e) => handleChange(e)}/>
                  </Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.title} color="textSecondary" variant="body2">Broj dokumenta</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <TextField fullWidth name="documentNumber" placeholder='Broj dokumenta' value={offer.documentNumber} onChange={(e) => handleChange(e)}/>
                  </Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.title} color="textSecondary"  variant="body2" >Datum dokumenta</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                      <DatePicker value={offer.documentDate} onChange={(e) => handleDateChange('documentDate', e)} />
                    </MuiPickersUtilsProvider>
                  </Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>

                  <Typography className={classes.title} color="textSecondary" variant="body2">Model broda</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <TextField fullWidth name="boatModel" placeholder='Model broda' value={offer.boatModel} onChange={(e) => handleChange(e)}/>
                  </Typography>

                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid item>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">Klijent</Typography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Ime i prezime" margin="dense" name="fullName" value={offer.fullName} onChange={(e) => handleChange(e)}/>
                  <TextField fullWidth label="Adresa" margin="dense" name="address" value={offer.address} onChange={(e) => handleChange(e)}/>
                  <TextField fullWidth label="Telefon" margin="dense" name="phoneNumber" value={offer.phoneNumber} onChange={(e) => handleChange(e)}/>
                  <TextField fullWidth label="E-mail" margin="dense" name="email" value={offer.email} onChange={(e) => handleChange(e)}/>
                  <TextField fullWidth label="OIB" margin="dense" name="masterCitizenNumber" value={offer.masterCitizenNumber} onChange={(e) => handleChange(e)}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Card style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <CardContent>
              <Grid item>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">Plaćanje</Typography>
              </Grid>
              <Grid container spacing={5}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Typography className={classes.title} color="textSecondary" variant="body2">Vrijedi do</Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <DatePicker value={offer.validTill} onChange={(e) => handleDateChange('validTill', e)} />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Typography className={classes.title} color="textSecondary" variant="body2">Način plaćanja</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <TextField fullWidth name="paymentType" placeholder='Način plaćanja' value={offer.paymentType} onChange={(e) => handleChange(e)}/>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>

          <div className={classes.row}>
            <span className={classes.spacer} />
            <Button color="primary" variant="contained" type="button" onClick={handleOpen}>Dodaj novi zapis</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
              <div className={classes.paper}>
                <h2 id="simple-modal-title">Kreiraj novi zapis</h2>
                <div id="simple-modal-description">
                  <TextField fullWidth label="Naziv/Opis" margin="dense" name="productName" onChange={(e) => handleModalData(e)} value={item.productName}/>
                  <TextField fullWidth label="Količina" margin="dense" name="quantity" onChange={(e) => handleModalData(e)} value={+item.quantity}/>
                  <TextField fullWidth label="Jedinica mjere" margin="dense" name="unit" onChange={(e) => handleModalData(e)} value={item.unit}/>
                  <TextField fullWidth label="Cijena bez rabata" margin="dense" name="unitPriceBeforeDiscount" onChange={(e) => handleModalData(e)} value={+item.unitPriceBeforeDiscount}/>
                  <TextField fullWidth label="Rabat" margin="dense" name="discount" onChange={(e) => handleModalData(e)} value={+item.discount}/>
                  <Button color="primary" variant="contained" type="button" onClick={() => { addItem(); handleClose(); }}>Dodaj</Button>
                  <Button color="inherit" type="button" onClick={() => { resetItem(); handleClose(); }}>Izbriši</Button>
                </div>
              </div>
            </Modal>
          </div>

          <ItemsTable items={offer.items} removeItem={handleRemoveItem} />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>

        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>

          <Card>
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>Naziv</TableCell>
                  <TableCell>Ukupno</TableCell>
                  <TableCell>Valuta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Iznos bez rabata</TableCell>
                  <TableCell>{offer.items.map(item => item.unitPriceBeforeDiscount).reduce((acc, curr) => ( acc+ curr ), 0).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Iznos rabata</TableCell>
                  <TableCell>{offer.items.map(item => item.discount).reduce((acc, curr) => ( acc+ curr ), 0).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SVEUKUPNO</TableCell>
                  <TableCell>{offer.items.map(item => item.amount).reduce((acc, curr) => ( acc+ curr ), 0).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </Card>
          <div className={classes.row} style={{paddingTop: '10px'}}>
            <span className={classes.spacer} />
            <Button color="primary" variant="contained" type="button" onClick={handleSave}>Spremi i generiraj PDF</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(EditOffer);
