import React from 'react';
import {Page, Text, Image, Document, StyleSheet, PDFViewer, View, Font} from '@react-pdf/renderer';
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from '@david.kucsai/react-pdf-table';
import getDate from '../../helpers/getDate';
import getTime from '../../helpers/getTime';

Font.register({
  family: 'Roboto',
  fonts: [
    {src: `${process.env.PUBLIC_URL}/fonts/Roboto-Regular.ttf`},
    {src: `${process.env.PUBLIC_URL}/fonts/Roboto-Bold.ttf`, fontWeight: 'bold'},
  ]
});

const styles = StyleSheet.create({
  pdf: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto'
  },
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  image: {
    width: '100%'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'left',
    color: 'grey',
  },
  bottomText: {
    margin: 0,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Roboto'
  },
  center: {
    textAlign: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    item: {
      flexGrow: 1
    }
  },
  documentInfoHeaderBold: {
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  documentInfoHeader: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'normal'
  },
  title: {
    fontSize: 11
  },
  titleBold: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  spacer: {
    marginBottom: 10
  },
  table: {
    display: 'table',
    width: '100%'
  },
  tableRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  tableCell: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center'
  },
  displayNone: {
    color: '#fff'
  },
  border: {
    border: '5px solid #f00'
  }
});


const GenerateWorkOrderPDF = (props) => {

  const { workOrder } = props.location.state;

  return (
    <PDFViewer style={styles.pdf}>
      <Document>
        <Page>
          <View style={styles.body}>
            <Image
              src={process.env.PUBLIC_URL + '/images/offer/header.jpg'}
              style={styles.image}
            />
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={[
              {name: 'Radni nalog', value: workOrder.workOrderNumber},
              {name: 'Lokacija', value: workOrder.location},
              {name: 'Datum izdavanja naloga', value: workOrder.date},
            ]}>
              <TableHeader
                includeBottomBorder={false}
              >
                <TableCell weighting={0.3}>
                </TableCell>
                <TableCell weighting={0.3}>
                </TableCell>
              </TableHeader>
              <TableBody
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder={false}
              >
                <DataTableCell weighting={0.3} getContent={r => r.name} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={0.3} getContent={r => r.value} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
          <View style={styles.body}>
            <Text style={styles.documentInfoHeaderBold}>Naručitelj servisa</Text>
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={[
              {name: 'Ime i prezime / Tvrtka', value: workOrder.fullName},
              {name: 'Adresa', value: workOrder.address},
              {name: 'OIB', value: workOrder.vatNumber},
            ]}>
              <TableHeader
                includeBottomBorder={false}
              >
                <TableCell weighting={0.3}>
                </TableCell>
                <TableCell weighting={0.3}>
                </TableCell>
              </TableHeader>
              <TableBody
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder
              >
                <DataTableCell weighting={0.3} getContent={r => r.name} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={0.3} getContent={r => r.value} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
          <View style={styles.body}>
            <Text style={styles.documentInfoHeaderBold}>Dogovoreni radovi</Text>
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={[
              {name: 'Dogovoreni radovi', value: workOrder.works}
            ]}>
              <TableHeader
                includeBottomBorder={false}
                includeLeftBorder
                includeRightBorder
                includeTopBorder
              >
                <TableCell weighting={1} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                </TableCell>
              </TableHeader>
              <TableBody
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder={false}
              >
                <DataTableCell weighting={1} getContent={r => r.value} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
          <View style={styles.body}>
            <Text style={styles.documentInfoHeaderBold}>Opis radova</Text>
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={workOrder.workDescription}>
              <TableHeader
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder
              >
                <TableCell weighting={0.3} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Datum</Text>
                </TableCell>
                <TableCell weighting={0.3} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Radnik</Text>
                </TableCell>
                <TableCell weighting={0.3} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Sati od</Text>
                </TableCell>
                <TableCell weighting={0.3} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Sati do</Text>
                </TableCell>
                <TableCell weighting={1.5} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Opis radova</Text>
                </TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.3} getContent={r => getDate(r.date)} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={0.3} getContent={r => r.worker} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={0.3} getContent={r => getTime(r.timeFrom)} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={0.3} getContent={r => getTime(r.timeTo)} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={1.5} getContent={r => r.workDescription} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
          <View style={styles.body}>
            <Text style={styles.documentInfoHeaderBold}>Utrošena sredstva</Text>
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={workOrder.fundsSpent}>
              <TableHeader
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder
              >
                <TableCell weighting={2} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Opis</Text>
                </TableCell>
                <TableCell weighting={1} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Količina</Text>
                </TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={2} getContent={r => r.description} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={1} getContent={r => r.amount} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
          <View style={{paddingHorizontal: '35px', marginTop: '20px'}}>
            <Table data={[1]}>
              <TableHeader
                includeBottomBorder
                includeLeftBorder
                includeRightBorder
                includeTopBorder
              >
                <TableCell weighting={0.5} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Datum</Text>
                </TableCell>
                <TableCell weighting={1} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Radove izvršio</Text>
                </TableCell>
                <TableCell weighting={1.5} style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>
                  <Text style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}}>Odobrenje naručitelja</Text>
                </TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.5} getContent={() => ''} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto', height: '40px'}} />
                <DataTableCell weighting={1} getContent={() => ''} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
                <DataTableCell weighting={1.5} getContent={() => ''} style={{padding: '2px', textAlign: 'justify', justifyContent: 'flex-start', fontSize: 10, fontFamily: 'Roboto'}} />
              </TableBody>
            </Table>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default GenerateWorkOrderPDF;
