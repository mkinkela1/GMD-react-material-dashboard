import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell, TableBody, TableFooter, Button
} from '@material-ui/core';
import { withRouter } from 'react-router';
import axios from './../../helpers/inderceptors';

import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker, KeyboardDatePicker, KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Delete } from '@material-ui/icons';
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

const CreateWorkOrder = (props) => {

  const classes = useStyles();
  const [workOrder, setWorkOrder] = useState({
    workOrderNumber: null,
    location: '',
    date: null,
    fullName: '',
    address: '',
    vatNumber: null,
    works: '',
    workDescription: [],
    totalHours: null,
    fundsSpent: []
  });

  useEffect(() => {
    if(props.match.params.id)
      axios( `${config.apiUrl}/work-order/${props.match.params.id}` )
        .then(r => setWorkOrder(r.data[0]))
        .catch(e => console.log(e));
  }, [props.match.params.id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setWorkOrder( prevOffer => ({ ...prevOffer, [name]: value }) );
  };

  const handleWorkOrderChange = (name, e, idx) => {

    const { value } = e.target;

    const workOrderData = workOrder.workDescription;
    workOrderData[idx][name] = value;

    setWorkOrder( prevOffer => ({ ...prevOffer, workDescription: workOrderData }) );
  };

  const handleFundsSpentChange = (name, e, idx) => {

    const { value } = e.target;

    const fundsSpent = workOrder.fundsSpent;
    fundsSpent[idx][name] = value;

    setWorkOrder( prevOffer => ({
      ...prevOffer,
      fundsSpent
    }) );
  }


  const handleDateChange = (name, value) => {
    setWorkOrder( prevOffer => ({ ...prevOffer, [name]: value }) );
  }

  const handleWorkOrderDateChange = (name, value, idx) => {

    const workOrderData = workOrder.workDescription;
    workOrderData[idx][name] = value;

    setWorkOrder( prevOffer => ({ ...prevOffer, workDescription: workOrderData }) );
  }

  const handleSave = () => {

    if(!props.match.params.id)
      axios
        .post(`${config.apiUrl}/work-order`, workOrder)
        .then(r => props.history.push({
          pathname: '/work-orders/pdf',
          state: { workOrder: r.data }
        }))
        .catch(e => console.log(e));
    else
      axios
        .put(`${config.apiUrl}/work-order/${props.match.params.id}`, workOrder)
        .then(r => props.history.push({
          pathname: '/work-orders/pdf',
          state: { workOrder: r.data }
        }))
        .catch(e => console.log(e));
  };


  const addNewWorkDescription = () => {
    const workDescription = workOrder.workDescription;
    workDescription.push({
      date: null,
      worker: '',
      timeFrom: null,
      timeTo: null,
      workDescription: ''
    });

    setWorkOrder(prevState => ({
      ...prevState,
      workDescription
    }));
  }

  const addNewFundSpent = () => {
    const fundsSpent = workOrder.fundsSpent;
    fundsSpent.push({
      description: '',
      amount: null
    });

    setWorkOrder(prevState => ({
      ...prevState,
      fundsSpent
    }));
  };

  const deleteWorkOrderRow = (idx) => {
    const workOrderData = workOrder.workDescription;
    workOrderData.splice(idx, 1);

    setWorkOrder( prevOffer => ({ ...prevOffer, workDescription: workOrderData }) );
  }

  const deleteFundsSpentRow = (idx) => {
    const fundsSpent = workOrder.fundsSpent;
    fundsSpent.splice(idx, 1);

    setWorkOrder( prevOffer => ({ ...prevOffer, fundsSpent }) );
  }

  return (
    <div className={classes.root}>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Card>
            <CardContent>
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >Radni nalog</Typography>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Radni nalog br."
                    margin="dense"
                    name="workOrderNumber"
                    onChange={(e) => handleChange(e)}
                    value={workOrder.workOrderNumber}
                  />
                  <TextField
                    fullWidth
                    label="Lokacija"
                    margin="dense"
                    name="location"
                    onChange={(e) => handleChange(e)}
                    value={workOrder.location}
                  />
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                  >
                    <DatePicker
                      fullWidth
                      label="Datum izdavanja naloga"
                      onChange={(e) => handleDateChange('date', e)}
                      style={{marginTop: 10}}
                      value={workOrder.date}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Card>
            <CardContent>
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >Naručitelj servisa</Typography>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Ime prezime / tvrtka"
                    margin="dense"
                    name="fullName"
                    onChange={(e) => handleChange(e)}
                    value={workOrder.fullName}
                  />
                  <TextField
                    fullWidth
                    label="Adresa"
                    margin="dense"
                    name="address"
                    onChange={(e) => handleChange(e)}
                    value={workOrder.address}
                  />
                  <TextField
                    fullWidth
                    label="OIB"
                    margin="dense"
                    name="vatNumber"
                    onChange={(e) => handleChange(e)}
                    value={workOrder.vatNumber}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Card>
            <CardContent>
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >Dogovoreni radovi</Typography>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    id="standard-multiline-flexible"
                    multiline
                    name="works"
                    onChange={(e) => handleChange(e)}
                    rowsMax={4}
                    value={workOrder.works}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Card>
            <CardContent>
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >Opis radova</Typography>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Datum</TableCell>
                        <TableCell align="center">Radnik</TableCell>
                        <TableCell align="center">Sati od</TableCell>
                        <TableCell align="center">Sati do</TableCell>
                        <TableCell align="center">Opis radova</TableCell>
                        <TableCell align="center">Akcije</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workOrder.workDescription && workOrder.workDescription.map((item, idx) => (
                        <TableRow key={`work-description-${idx}`}>
                          <TableCell>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                              <KeyboardDatePicker
                                fullWidth
                                variant="inline"
                                onChange={(e) => handleWorkOrderDateChange('date', e, idx)}
                                value={workOrder.workDescription[idx].date}
                              />
                            </MuiPickersUtilsProvider>
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              margin="dense"
                              onChange={(e) => handleWorkOrderChange('worker', e, idx)}
                              value={workOrder.workDescription[idx].worker}
                            />
                          </TableCell>
                          <TableCell>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                              <KeyboardTimePicker
                                fullWidth
                                margin="dense"
                                variant="inline"
                                ampm={false}
                                onChange={(e) => handleWorkOrderDateChange('timeFrom', e, idx)}
                                value={workOrder.workDescription[idx].timeFrom}
                              />
                            </MuiPickersUtilsProvider>
                          </TableCell>
                          <TableCell>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                              <KeyboardTimePicker
                                fullWidth
                                variant="inline"
                                margin="dense"
                                ampm={false}
                                onChange={(e) => handleWorkOrderDateChange('timeTo', e, idx)}
                                value={workOrder.workDescription[idx].timeTo}
                              />
                            </MuiPickersUtilsProvider>
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              margin="dense"
                              multiline
                              onChange={(e) => handleWorkOrderChange('workDescription', e, idx)}
                              value={workOrder.workDescription[idx].workDescription}
                            />
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => deleteWorkOrderRow(idx)}>
                              <Delete />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell
                          align="right"
                          colSpan={6}
                        >
                          <Button
                            color="primary"
                            onClick={() => addNewWorkDescription()}
                            size="small"
                            variant="text"
                          >
                            Dodaj novi zapis
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>



                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Card>
            <CardContent>
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >Utrošeno sredstava</Typography>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                />
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Opis</TableCell>
                      <TableCell align="center">Količina</TableCell>
                      <TableCell align="center">Akcije</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workOrder.fundsSpent && workOrder.fundsSpent.map((item, idx) => (
                      <TableRow>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            margin="dense"
                            onChange={(e) => handleFundsSpentChange('description', e, idx)}
                            value={workOrder.fundsSpent[idx].descriptiom}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            margin="dense"
                            onChange={(e) => handleFundsSpentChange('amount', e, idx)}
                            value={workOrder.fundsSpent[idx].amount}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => deleteFundsSpentRow(idx)}>
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell
                        align="right"
                        colSpan={6}
                      >
                        <Button
                          color="primary"
                          onClick={() => addNewFundSpent()}
                          size="small"
                          variant="text"
                        >
                          Dodaj novi zapis
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className={classes.row} style={{paddingTop: '10px'}}>
        <span className={classes.spacer} />
        <Button color="primary" variant="contained" type="button" onClick={() => handleSave()}>Spremi i generiraj PDF</Button>
      </div>
    </div>
  );
};

export default withRouter(CreateWorkOrder);
