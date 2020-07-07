import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  TablePagination, Button
} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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

const ItemsTable = props => {
  const { className, items, removeItem, ...rest } = props;

  const classes = useStyles();

  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { items } = props;

    let selectedItems;

    if (event.target.checked) {
      selectedItems = items.map(item => item.id);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleDelete = () => {
    selectedItems.forEach(id => removeItem(id))
  }

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
                      checked={selectedItems.length === items.length}
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < items.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Rbr.</TableCell>
                  <TableCell>Naziv/Opis</TableCell>
                  <TableCell>Količina</TableCell>
                  <TableCell>Jedinica mjere</TableCell>
                  <TableCell>Jedinična cijena</TableCell>
                  <TableCell>Iznos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.slice(page*rowsPerPage, (page+1)*rowsPerPage).map((item, idx) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                    selected={selectedItems.indexOf(item.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.indexOf(item.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, item.id)}
                        value="true"
                      />
                    </TableCell>

                    <TableCell>{page*rowsPerPage+idx+1}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>{item.amount.toFixed(2)}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <div style={{width: '50%'}}>
          <Button onClick={handleDelete}><Delete /></Button>
        </div>
        <div style={{width: '50%'}}>
          <TablePagination
            component="div"
            count={items.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </CardActions>
    </Card>
  );
};

ItemsTable.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func
};

export default ItemsTable;
