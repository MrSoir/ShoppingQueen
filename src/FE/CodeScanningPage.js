

import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  StatusBar,
  Image,
  Dimensions,
  Button,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback,
  Platform, UIManager,
  LayoutAnimation
} from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';

// custom code:
import EmbeddedCamera from './EmbeddedCamera';
import ProductInfo    from './ProductInfo';
import TestComponent  from './TestComponent';


function createTestProductInfo(){
  return [
    'Nila',
    '18',
    'wundascheeee!!!'
  ];
}


function CodeScanningPage(args){

  const [productInfoHidden, setProductInfoHidden] = useState(true);

  function onCodeDetected(){
    hideProductInfo(false);
  }
  function onStartScanning(){
    hideProductInfo(true);
  }

  function hideProductInfo(hide){
    const animStyle = !productInfoHidden
                          ? LayoutAnimation.Presets.easeInEaseOut
                          : LayoutAnimation.Presets.spring;
    LayoutAnimation.configureNext(animStyle);
    setProductInfoHidden( hide );
  }

  return (
    <View style={styles.Main}>
      <EmbeddedCamera onCodeDetected={onCodeDetected}
                      onStartScanning={onStartScanning}/>

      <ProductInfo productInfo={createTestProductInfo()}
                   price={18}
                   productInfoHidden={productInfoHidden}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  Main: {
  },
});

export default CodeScanningPage;
