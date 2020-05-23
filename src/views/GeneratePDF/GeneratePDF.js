import React from 'react';
import {Page, Text, Image, Document, StyleSheet, PDFViewer, View, Font} from '@react-pdf/renderer';

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
  documentInfoHeader: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold'
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
  }
});


const GeneratePDF = () => (
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
            <Text style={styles.documentInfoHeader}>Naziv dokumenta</Text>
            <Text style={styles.documentInfoHeader}>Document name</Text>
            <View style={styles.spacer}/>
            <Text style={styles.title}>PONUDA</Text>
            <Text style={styles.titleBold}>OFFER</Text>
          </View>
          <View style={styles.row.item}>
            <Text style={styles.documentInfoHeader}>Broj dokumenta</Text>
            <Text style={styles.documentInfoHeader}>Document No.</Text>
            <View style={styles.spacer}/>
            <Text style={styles.title}>{}</Text>
          </View>
          <View style={styles.row.item}>
            <Text style={styles.documentInfoHeader}>Datum dokumenta</Text>
            <Text style={styles.documentInfoHeader}>Document date</Text>
            <View style={styles.spacer}/>
            <Text style={styles.title}>{}</Text>
          </View>
          <View style={styles.row.item}>
            <Text style={styles.documentInfoHeader}>Model broda</Text>
            <Text style={styles.documentInfoHeader}>Boat model</Text>
            <View style={styles.spacer}/>
            <Text style={styles.title}>{}</Text>
          </View>
        </View>

        <View style={[styles.body, styles.row]}>
          <View style={styles.row.item}>
            <Text style={styles.documentInfoHeader}>Klijent</Text>
            <Text style={styles.title}>{}</Text>
          </View>
          <View style={styles.row.item}>
            <Text style={styles.documentInfoHeader}>Vrijedi do</Text>
            <Text style={styles.documentInfoHeader}>Valid till</Text>
            <Text style={styles.title}>{}</Text>
            <View style={styles.spacer}/>
            <Text style={styles.documentInfoHeader}>Način plaćanja</Text>
            <Text style={styles.documentInfoHeader}>Payment method</Text>
            <Text style={styles.title}>{}</Text>
          </View>
        </View>

        <View style={[styles.body, styles.row]}>
          {/* Table */}
          <View style={styles.table}>
            {/* Table row */}
            <View style={styles.tableRow}>
              {/* Table cells */}
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Rbr.</Text>
                <Text style={styles.documentInfoHeader}>No.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Naziv/Opis</Text>
                <Text style={styles.documentInfoHeader}>Product Name/Description</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Količina</Text>
                <Text style={styles.documentInfoHeader}>Qty.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Jedinica mjere</Text>
                <Text style={styles.documentInfoHeader}>Unit</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Cijena bez rabata</Text>
                <Text style={styles.documentInfoHeader}>Unit price before discount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Rabat</Text>
                <Text style={styles.documentInfoHeader}>Discount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Jed. cijena (sa rabatom)</Text>
                <Text style={styles.documentInfoHeader}>Unit price with discount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.documentInfoHeader}>Iznos</Text>
                <Text style={styles.documentInfoHeader}>Ukupno</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.body, styles.row]}>
          <View style={styles.row.item}>
            {/* Table */}
            <View style={[styles.table, styles.displayNone]}>
              {/* Table row */}
              <View style={styles.tableRow}>
                {/* Table cells */}
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>Iznos bez rabata</Text>
                  <Text style={styles.documentInfoHeader}>Amount without discount</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>{}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>HRK</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.row.item}>
            {/* Table */}
            <View style={styles.table}>
              {/* Table row */}
              <View style={styles.tableRow}>
                {/* Table cells */}
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>Iznos bez rabata</Text>
                  <Text style={styles.documentInfoHeader}>Amount without discount</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>{}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>HRK</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                {/* Table cells */}
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>Iznos rabata</Text>
                  <Text style={styles.documentInfoHeader}>Discount</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>{}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>HRK</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                {/* Table cells */}
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>Sveukupno</Text>
                  <Text style={styles.documentInfoHeader}>Total amount</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>{}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.documentInfoHeader}>HRK</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        <View style={[styles.body, styles.footer]}>
          <Text style={styles.bottomText}>Garancija: 2 godina</Text>
          <Text style={styles.bottomText}>U slučaju narudžbe molimo pismenu potvrdu. PLAĆANJE: 50% AKONTACIJE PO NARUDŽBI, 50% PRIJE MONTAŽE</Text>
          <Text style={styles.bottomText}>Tenda je u vlasništvu GMD-Nautika d.o.o. do podmirenja računa.</Text>
          <Text style={[styles.bottomText, styles.center]}>ŽIRO RAČUN: HR41 2360000-1102199574 Zagrebačka banka</Text>
          <Text style={[styles.bottomText, styles.center]}>SWIFT CODE: ZABAHR2X</Text>
          <Text style={[styles.bottomText, styles.center]}>OVA ISPRAVA NIJE RAČUN I NE MOŽE SE UPORABITI ZA POVRAT PRETPOREZA.</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default GeneratePDF;
