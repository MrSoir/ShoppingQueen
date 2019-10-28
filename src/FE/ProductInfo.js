

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Animated,
  StatusBar,
  Image,
  Dimensions,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

function InfoItm({info}){
  console.log('InfoItm: ', info);
  return (
    <View style={styles.InfoItm}>
      <Text style={styles.InfoItmTxt}>
        {info}
      </Text>
    </View>
  )
}

function formattedPrice(price){
  return price
       ? price.toFixed(2) + '€'
       : '-- €';
}

function PriceItm({price}){
  let priceFrmtd = formattedPrice(price);
  return (
    <View style={styles.PriceItm}>
      <Text style={styles.PriceItmTxt}>
        {priceFrmtd}
      </Text>
    </View>
  )
}

  function _alertIndex(index) {
    console.log(`row clicked ${index}`);
    // Alert.alert(`This is row ${index + 1}`);
  }

function AvailibilityTable({headers, tableData}){
  if(!headers){
    headers = ['Head0', 'Head1', 'Head2'];
  }
  if(!tableData){
    tableData = [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c']
    ];
  }
  let initHeaders = [...headers, ''];
  tableData = tableData.map(dataRow=>[...dataRow, 'order']);

  const [hrds, __] = useState(initHeaders);
  const [td, ___]  = useState(tableData);

  const buttonCell = (data, rowIndex) => {
    let highlightStyle = rowIndex % 2 ? styles.TableRowUnEven : styles.TableRowEven;
    highlightStyle = {...styles.TableCell, ...highlightStyle};
    let textStyle = {...styles.TableCellTxt, ...styles.TableButton};
    return (
      <View style={highlightStyle}>
        <Text style={textStyle}>{data}</Text>
      </View>
    );
  };
  const cellView = (data, rowIndex)=>{
    const highlightStyle = rowIndex % 2 ? styles.TableRowUnEven : styles.TableRowEven;
    return (
      <View style={{...styles.TableCell, ...highlightStyle}}>
        <Text style={styles.TableCellTxt}>{data}</Text>
      </View>
    );
  };

  const orderCol = td && td.length > 0 ? td[0].length-1 : -1;

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row data={hrds} style={styles.head} textStyle={styles.headText}/>
        {
          td.map((rowData, rowIndex) => (
            <TableWrapper key={rowIndex} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex}
                        data={cellIndex === orderCol ? buttonCell(cellData, rowIndex) : cellView(cellData, rowIndex)}
                        textStyle={styles.text}
                        />
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
    </View>
  );
}

function ProductInfo({productInfo, price, productInfoHidden: viewHidden}){

  // const [productInfoLoaded, setProductInfoLoaded] = useState(false);
  // const [viewHidden, setViewHidden] = useState(true);

  let camarePreviewWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.6;
  let camarePreviewHeight = camarePreviewWidth;

  // useEffect(()=>{
  //   setViewHidden( !productInfoLoaded );
  // }, [productInfoLoaded]);

  let id = 0;
  let productInfos = productInfo.map(i=>{
    return {
      id: id++,
      info: i
    };
  });

  const toggleShowView = ()=>{
    // const animStyle = !viewHidden
    //                       ? LayoutAnimation.Presets.easeInEaseOut
    //                       : LayoutAnimation.Presets.spring;
    // LayoutAnimation.configureNext(animStyle);
    // setViewHidden( !viewHidden );
  };

  console.log('productInfos: ', productInfos);

  return (
    <View>
      <TouchableOpacity
        onPress={toggleShowView}>
        <Text style={{textAlign: 'center', padding: 10}}>
          Press me to {viewHidden ? 'show view' : 'hide view'}!
        </Text>
      </TouchableOpacity>
      {!viewHidden && (
          <View style={{...styles.Main}}>
            <Text style={styles.ProductInfoHeading}>
              Product
            </Text>
            <View style={styles.InfoFlex}>
              <Image
                 style={styles.BrandLogo}
                 source={require('../images/prada.png')}
              />
              <FlatList
                data={productInfos}
                renderItem={({item}) => <InfoItm info={item.info}/>}
                keyExtractor={item => item.id}
              />
            </View>

            <View style={styles.SeparatorItm}/>

            <PriceItm price={price}/>

            <AvailibilityTable/>
          </View>
        )
      }
    </View>
  );
};


const styles = StyleSheet.create({
  Main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 0.25,
    width: '80%',
    alignSelf: 'center',
  },
  InfoFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  BrandLogo: {
    width: 100,
    height: 100,
  },
  ProductInfoHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#66aa66',
    paddingLeft: 10,
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  InfoItm: {
    paddingLeft: 20,
  },
  InfoItmTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005500',
  },
  PriceItm: {

  },
  PriceItmTxt: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
  },
  SeparatorItm: {
    width: '80%',
    height: 1,
    backgroundColor: 'green',
    marginTop: 5,
    marginBottom: 5,
  },


  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    width: '100%',
  },
  head: {
    height: 40,
    backgroundColor: 'green',
  },
  headText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    margin: 6
  },
  row: {
    flexDirection: 'row',
    margin: 3,
  },
  TableButton: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#00aaff',
  },
  TableCell: {
    textAlign: 'center',
    color: 'black',
  },
  TableCellTxt: {
    textAlign: 'center',
  },
  TableRowEven: {
    backgroundColor: '#ffffff',
  },
  TableRowUnEven: {
    backgroundColor: '#aaffaa',
  },
  TableHeadingEven: {
    backgroundColor: 'green'
  },
  TableHeadingUnEven: {
    backgroundColor: '#00dd00',
  }
});

export default ProductInfo;
