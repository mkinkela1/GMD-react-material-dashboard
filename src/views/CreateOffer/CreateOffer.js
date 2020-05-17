import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%'
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
  }
}));

const CreateOffer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid
                container
                justify="space-between"
              >
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Naziv dokumenta
                  </Typography>
                  <Typography variant="h3" className={classes.documentName}>PONUDA</Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid
                container
                justify="space-between"
              >
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Broj dokumenta
                  </Typography>
                  <Typography variant="h3" className={classes.documentName}>234544</Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid
                container
                justify="space-between"
              >
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Datum dokumenta
                  </Typography>
                  <Typography variant="h3" className={classes.documentName}>465w76</Typography>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Grid
                container
                justify="space-between"
              >
                <Grid item>

                  <TextField
                    fullWidth
                    label="Model broda"
                    margin="dense"
                    name="boatModel"
                    //onChange={}
                    //value={}

                  />
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
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Klijent
                </Typography>
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
                    label="Ime i prezime"
                    margin="dense"
                    name="fullName"
                    //onChange={handleChange}
                    //value={values.country}
                  />
                  <TextField
                    fullWidth
                    label="Adresa"
                    margin="dense"
                    name="address"
                    //onChange={handleChange}
                    //value={values.country}
                  />
                  <TextField
                    fullWidth
                    label="Telefon"
                    margin="dense"
                    name="phoneNumber"
                    //onChange={handleChange}
                    //value={values.country}
                  />

                  <TextField
                    fullWidth
                    label="E-mail"
                    margin="dense"
                    name="email"
                    //onChange={handleChange}
                    //value={values.country}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <InputLabel id="demo-controlled-open-select-label">Način plaćanja</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            //open={open}
            //onClose={handleClose}
            //onOpen={handleOpen}
            //value={age}
            //onChange={handleChange}
          >

            <MenuItem value='gotovina'>Gotovina</MenuItem>
          </Select>

        </Grid>
      </Grid>
    </div>
  );
};

export default CreateOffer;
