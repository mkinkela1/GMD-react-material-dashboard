import React from 'react';
import {Page, Text, Image, Document, StyleSheet, PDFViewer, View, Font} from '@react-pdf/renderer';
import getDate from './../../helpers/getDate';
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from '@david.kucsai/react-pdf-table';
import formatMoney from '../../helpers/formatMoney';

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
    fontSize: 8,
    fontWeight: 'bold'
  },
  documentInfoHeader: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'normal'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: 'normal'
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


const GeneratePDF = (props) => {

  const { offer } = props.location.state;

  const client = [
    offer.fullName,
    offer.address,
    offer.phoneNumber,
    offer.email,
    offer.masterCitizenNumber
  ].map((data, i) => (<Text key={i}>{data}{'\n'}</Text>));

  const items = offer.items.map((data, idx) => ({...data, id: idx+1}));

  const sumUpEverything = [
    {
      title: {
        hr: 'Sveukupno',
        eng: 'Total amount'
      },
      value: offer.items.map(item => item.amount).reduce((acc, curr) => ( acc+ curr ), 0).toFixed(2)
    }
  ];

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
          <View style={[styles.body, styles.row]}>
            <View style={styles.row.item}>
              <Text style={styles.documentInfoHeaderBold}>Naziv dokumenta</Text>
              <Text style={styles.documentInfoHeader}>Document name</Text>
              <View style={styles.spacer}/>
              <Text style={styles.title}>PONUDA</Text>
              <Text style={styles.titleBold}>OFFER</Text>
            </View>
            <View style={styles.row.item}>
              <Text style={styles.documentInfoHeaderBold}>Broj dokumenta</Text>
              <Text style={styles.documentInfoHeader}>Document No.</Text>
              <View style={styles.spacer}/>
              <Text style={styles.title}>{offer.documentNumber}</Text>
            </View>
            <View style={styles.row.item}>
              <Text style={styles.documentInfoHeaderBold}>Datum dokumenta</Text>
              <Text style={styles.documentInfoHeader}>Document date</Text>
              <View style={styles.spacer}/>
              <Text style={styles.title}>{getDate(offer.documentDate)}</Text>
            </View>
            <View style={styles.row.item}>
              <Text style={styles.documentInfoHeaderBold}>Model broda</Text>
              <Text style={styles.documentInfoHeader}>Boat model</Text>
              <View style={styles.spacer}/>
              <Text style={styles.title}>{offer.boatModel}</Text>
            </View>
          </View>

          <View style={[styles.body, styles.row]}>
            <Table>
              <TableHeader>
                <TableCell style={{padding: '5px'}}>
                  <Text style={styles.documentInfoHeaderBold}>Klijent</Text>
                  <Text style={styles.title}>{client}</Text>
                </TableCell>
                <TableCell style={{padding: '5px'}}>
                  <Text style={styles.documentInfoHeaderBold}>Vrijedi do</Text>
                  <Text style={styles.documentInfoHeader}>Valid till</Text>
                  <Text style={styles.title}>{getDate(offer.validTill)}</Text>
                  <View style={styles.spacer}/>
                  <Text style={styles.documentInfoHeaderBold}>Način plaćanja</Text>
                  <Text style={styles.documentInfoHeader}>Payment method</Text>
                  <Text style={styles.title}>{offer.paymentType}</Text>
                </TableCell>
              </TableHeader>
            </Table>
          </View>

          <View style={[styles.body, styles.row]}>
            <Table data={items}>
              <TableHeader
                includeBottomBorder
                includeLeftBorder={false}
                includeRightBorder={false}
                includeTopBorder={false}
              >
                <TableCell
                  style={{padding: '2px', borderRight: 'none', textAlign: 'center', justifyContent: 'flex-start'}}
                  weighting={0.3}
                >
                  <Text style={styles.documentInfoHeaderBold}>Rbr.</Text>
                  <Text style={styles.documentInfoHeader}>No.</Text>
                </TableCell>
                <TableCell
                  style={{padding: '2px', borderRight: 'none', justifyContent: 'flex-start'}}
                  weighting={1}
                >
                  <Text style={styles.documentInfoHeaderBold}>Naziv/Opis</Text>
                  <Text style={styles.documentInfoHeader}>Product Name/Description</Text>
                </TableCell>
                <TableCell
                  style={{padding: '2px', borderRight: 'none', textAlign: 'center', justifyContent: 'flex-start'}}
                  weighting={0.3}
                >
                  <Text style={styles.documentInfoHeaderBold}>Količina</Text>
                  <Text style={styles.documentInfoHeader}>Qty.</Text>
                </TableCell>
                <TableCell
                  style={{padding: '2px', borderRight: 'none', textAlign: 'center', justifyContent: 'flex-start'}}
                  weighting={0.3}
                >
                  <Text style={styles.documentInfoHeaderBold}>Jedinica mjere</Text>
                  <Text style={styles.documentInfoHeader}>Unit</Text>
                </TableCell>
                <TableCell
                  style={{padding: '2px', borderRight: 'none', textAlign: 'center', justifyContent: 'flex-start'}}
                  weighting={0.3}
                >
                  <Text style={styles.documentInfoHeaderBold}>Jedinična cijena</Text>
                  <Text style={styles.documentInfoHeader}>Unit price</Text>
                </TableCell>
                <TableCell
                  style={{padding: '2px', borderRight: 'none', textAlign: 'center', justifyContent: 'flex-start'}}
                  weighting={0.3}
                >
                  <Text style={styles.documentInfoHeaderBold}>Iznos</Text>
                  <Text style={styles.documentInfoHeader}>Ukupno</Text>
                </TableCell>
              </TableHeader>
            </Table>
          </View>
          <View style={{paddingHorizontal: '35px'}}>
            <Table data={items}>
              <TableBody
                includeBottomBorder
                includeLeftBorder={false}
                includeRightBorder={false}
                includeTopBorder
              >
                <DataTableCell
                  getContent={r => r.id}
                  style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={0.3}
                />
                <DataTableCell
                  getContent={r => r.productName}
                  style={{padding: '2px', textAlign: 'left', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={1}
                />
                <DataTableCell
                  getContent={r => r.quantity}
                  style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={0.3}
                />
                <DataTableCell
                  getContent={r => r.unit}
                  style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={0.3}
                />
                <DataTableCell
                  getContent={r => (
                    <View>
                      <Text style={{textAlign: 'right'}}>{formatMoney(r.unitPrice)} EUR</Text>
                    </View>
                  )}
                  style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={0.3}
                />
                <DataTableCell
                  getContent={r => (
                    <View>
                      <Text style={{textAlign: 'right'}}>{formatMoney(r.amount)} EUR</Text>
                    </View>
                  )}
                  style={{padding: '2px', textAlign: 'center', justifyContent: 'flex-start', fontSize: 10, borderRight: 'none', fontFamily: 'Roboto'}}
                  weighting={0.3}
                />
              </TableBody>
            </Table>
          </View>

          <View style={{paddingHorizontal: '35px', width: '100%', display: 'flex', marginTop: '20px'}}>
            <View style={{width: '50%', marginLeft: 'auto', order: '2'}}>
              <Table data={sumUpEverything}>
                <TableHeader>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableHeader>
                <TableBody
                  includeBottomBorder
                  includeLeftBorder
                  includeRightBorder
                  includeTopBorder
                >
                  <DataTableCell
                    getContent={r => <View><Text style={styles.documentInfoHeaderBold}>{r.title.hr}</Text><Text style={styles.documentInfoHeader}>{r.title.eng}</Text></View>}
                    weighting={1}
                  />
                  <DataTableCell
                    getContent={r => (
                      <View>
                        <Text style={{textAlign: 'right'}}>{formatMoney(r.value)}</Text>
                      </View>
                    )}
                    style={{borderRight: 'none!important'}}
                    weighting={1}
                  />
                  <DataTableCell
                    getContent={r => (
                      <View style={{textAlign: 'center'}}>
                        <Text style={[styles.documentInfoHeaderBold]}>EUR</Text>
                      </View>
                    )}
                    style={{borderLeft: 'none!important'}}
                    weighting={0.3}
                  />
                </TableBody>
              </Table>
            </View>
          </View>

          <View style={[styles.body, styles.row]}>
            <Text style={styles.bottomText}>Poreznik nije u sustavu PDV-a, PDV nije obračunat temeljem čl. 90 st. 1 i st. 2 Zakona o PDV-u.</Text>
            <Text style={styles.bottomText}>(Narodne novine br.73/13).</Text>
          </View>

          <View style={[styles.body, styles.footer]}>
            <Text style={styles.bottomText}>Garancija: 2 godina</Text>
            <Text style={styles.bottomText}>U slučaju narudžbe molimo pismenu potvrdu. PLAĆANJE: 50% AKONTACIJE PO NARUDŽBI, 50% PRIJE MONTAŽE</Text>
            <Text style={styles.bottomText}>Tenda je u vlasništvu GMD-Nautika d.o.o. do podmirenja računa.</Text>
            <Text style={[styles.bottomText, styles.center]}>ŽIRO RAČUN: HR41 2360000-1102199574 Zagrebačka banka</Text>
            <Text style={[styles.bottomText, styles.center]}>SWIFT CODE: ZABAHR2X</Text>
            <Text style={[styles.bottomText, styles.center]}>OVA ISPRAVA NIJE RAČUN I NE MOŽE SE UPORABITI ZA POVRAT
              PRETPOREZA.</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default GeneratePDF;
