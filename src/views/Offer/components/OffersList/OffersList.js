import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const OffersList = props => {

  const { className, offers, ...rest } = props;
  console.log(offers);
  const classes = useStyles();

  const [selectedOffers, setSelectedOffers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { offers } = props;

    let selectedOffers;

    if (event.target.checked) {
      selectedOffers = offers.map(user => user.id);
    } else {
      selectedOffers = [];
    }

    setSelectedOffers(selectedOffers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOffers.indexOf(id);
    let newSelectedOffers = [];

    if (selectedIndex === -1) {
      newSelectedOffers = newSelectedOffers.concat(selectedOffers, id);
    } else if (selectedIndex === 0) {
      newSelectedOffers = newSelectedOffers.concat(selectedOffers.slice(1));
    } else if (selectedIndex === selectedOffers.length - 1) {
      newSelectedOffers = newSelectedOffers.concat(selectedOffers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOffers = newSelectedOffers.concat(
        selectedOffers.slice(0, selectedIndex),
        selectedOffers.slice(selectedIndex + 1)
      );
    }

    setSelectedOffers(newSelectedOffers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOffers.length === offers.length}
                      color="primary"
                      indeterminate={
                        selectedOffers.length > 0 &&
                        selectedOffers.length < offers.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Naziv</TableCell>
                  <TableCell>Datum izrade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers.slice(page*rowsPerPage, (page+1)*rowsPerPage).map(offer => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={offer._id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOffers.indexOf(offer.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, offer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{offer.documentNumber}</TableCell>
                    <TableCell>{offer.documentName}</TableCell>
                    <TableCell>{moment(offer.createdAt).format('DD/MM/YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={offers.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

OffersList.propTypes = {
  className: PropTypes.string,
  offers: PropTypes.array.isRequired
};

export default OffersList;
