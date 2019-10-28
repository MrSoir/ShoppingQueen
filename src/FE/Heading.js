

import React, {useState, useEffect} from 'react';
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
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;
let height = 100;
let width = ww;
let opacity = 1;

function NodeHeading(args){
  const [hdng, setHeading] = useState('Hallo Nila!');
  const [cntr, setCounter] = useState(0);

  const [imgOpacity] = useState(new Animated.Value(opacity));
  const [imgHeight] = useState(new Animated.Value(height));
  const [opacityState, setOpacityState] = useState(true);

  React.useEffect(() => {
    const tarOpcty = opacityState ? 1 : 0;
    const tarHeight = opacityState ? height : 0;

    console.log('opacityState: ', opacityState, ' tarHeight: ', tarHeight);

    const animDur = 1000;

    Animated.parallel([
      Animated.timing(
        imgOpacity,
        {
          toValue: tarOpcty,
          duration: animDur,
        }
      ),
      Animated.timing(
        imgHeight,
        {
          toValue: tarHeight,
          duration: animDur,
        }
      )
    ]).start();
  }, [opacityState]);

  function toggleOpacity(){
    setOpacityState(!opacityState);
  }

  setTimeout(()=>{
    setHeading('Hallo Nila! -' + cntr);
    setCounter(cntr + 1);
  }, 1000);

  return (
    <Animated.View style={{...styles.Main, opacity: imgOpacity, height: imgHeight}}>
      <Image
        style={styles.BackgroundImage}
        source={require('../images/heading-logo.png')}
      />
      <TouchableWithoutFeedback onPress={toggleOpacity}>
        <View style={styles.textFlex}>
          <Text style={styles.text}>
            {hdng}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  Main: {
    position: 'relative',
    width: ww,
    overflow: 'hidden'
  },
  background: {
    backgroundColor: '#000000',
    margin: 'auto'
  },
  BackgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ww,
    height: height,
  },
  textFlex: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: ww,
    height: height,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'lime',
    fontWeight: 'bold',
  }
});

export default NodeHeading;
