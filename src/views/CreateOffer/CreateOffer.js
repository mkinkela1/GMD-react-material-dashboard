import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Button
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {ItemsTable} from './components';
import Modal from "@material-ui/core/Modal";

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

const CreateOffer = () => {

  const [selectedDate, handleDateChange] = useState(new Date());
  const [items, setItems] = useState([{
    id: 1,
    productName: 'Zimska tenda',
    quantity: 1,
    unit: 'kom',
    unitPriceBeforeDiscount: 2900,
    discount: 0,
    unitPriceWithDiscount: 2900,
    vat: 725,
    amount: 3625
  }]);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

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
                    <TextField fullWidth name="documentNumber" disabled value={'PONUDA'}/>
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
                    <TextField fullWidth name="documentNumber" placeholder='Broj dokumenta'/>
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
                      <DatePicker value={selectedDate} onChange={handleDateChange} />
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
                    <TextField fullWidth name="boatModel" placeholder='Model broda'/>
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
                  <TextField fullWidth label="Ime i prezime" margin="dense" name="fullName"/>
                  <TextField fullWidth label="Adresa" margin="dense" name="address"/>
                  <TextField fullWidth label="Telefon" margin="dense" name="phoneNumber"/>
                  <TextField fullWidth label="E-mail" margin="dense" name="email"/>
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
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Typography className={classes.title} color="textSecondary" variant="body2">Način plaćanja</Typography>
                  <Typography variant="h3" className={classes.documentName}>
                    <TextField fullWidth name="paymentType" placeholder='Način plaćanja'/>
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
                <p id="simple-modal-description">
                  <TextField fullWidth label="Naziv/Opis" margin="dense" name="productName"/>
                  <TextField fullWidth label="Količina" margin="dense" name="quantity"/>
                  <TextField fullWidth label="Jedinica mjere" margin="dense" name="unit"/>
                  <TextField fullWidth label="Cijena bez rabata" margin="dense" name="unitPriceBeforeDiscount"/>
                  <TextField fullWidth label="Rabat" margin="dense" name="discount"/>
                  <Button color="primary" variant="contained" type="button" onClick={handleOpen}>Dodaj</Button>
                  <Button color="#f44336" type="button" onClick={handleOpen}>Izbriši</Button>
                </p>
              </div>
            </Modal>
          </div>

          <ItemsTable items={items} />
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
                  <TableCell>{items.map(item => item.unitPriceBeforeDiscount).reduce((acc, curr) => ( acc+ curr )).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Iznos rabata</TableCell>
                  <TableCell>{items.map(item => item.discount).reduce((acc, curr) => ( acc+ curr )).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IZNOS BEZ POREZA</TableCell>
                  <TableCell>{items.map(item => item.unitPriceWithDiscount).reduce((acc, curr) => ( acc+ curr )).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PDV</TableCell>
                  <TableCell>{items.map(item => item.vat).reduce((acc, curr) => ( acc+ curr )).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SVEUKUPNO</TableCell>
                  <TableCell>{items.map(item => item.amount).reduce((acc, curr) => ( acc+ curr )).toFixed(2)}</TableCell>
                  <TableCell>HRK</TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </Card>

        </Grid>
      </Grid>
    </div>
  );
};

export default CreateOffer;
