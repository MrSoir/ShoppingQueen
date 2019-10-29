

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


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


function PendingView(args){
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
      }}
    >
      <Text>Waiting</Text>
    </View>
  );
}

function RNCameraTest({onCodeDetected, width, height}){
  const cameraRef = useRef(null);

  async function takePicture(){
    const camera = cameraRef.current;
    console.log('taking a picture...');
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    if(onCodeDetected){
      onCodeDetected(data);
    }
    console.log(data.uri);
  }
  return (
    <View style={{...styles.RNCameraContainer, width, height}}>
      <RNCamera
        ref={cameraRef}
        style={{...styles.RNCamera, width, height}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      >
      {({ camera, status, recordAudioPermissionStatus }) => {
        if (status !== 'READY'){
          return <PendingView />;
        }else{
          console.log('clickable camera');
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={takePicture}
                                style={styles.RNCameraCapture}>
                <Text style={styles.RNCameraCaptureTxt}>
                  SNAP
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      }}
      </RNCamera>
    </View>
  );
}

function EmbeddedCamera({onCodeDetected: argsOnCodeDectected,
                         onStartScanning: argsOnStartScanning}){

  const [infoText, setInfoText] = useState('scanning code...');
  const [cameraHidden, setCameraHidden] = useState(false);
  const [qrCodePreviewImg, setQrCodePreviewImg] = useState(require('../images/qrcode.png'));

  let camarePreviewWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.6;
  let camarePreviewHeight = camarePreviewWidth;

  useEffect(()=>{
  }, [cameraHidden]);

  useEffect(()=>{
  }, []);

  useEffect(()=>{
    console.log('qrCodePreviewImg changed: ', qrCodePreviewImg && qrCodePreviewImg.uri);
  }, [qrCodePreviewImg]);

  function toggleHideCamera(){
    setHideCamera()
  }
  function setHideCamera(hide){
    console.log('clicked');
    const animStyle = hide
                          ? LayoutAnimation.Presets.easeInEaseOut
                          : LayoutAnimation.Presets.spring;
    LayoutAnimation.configureNext(animStyle);
    setCameraHidden( hide );
  }

  function onCodeDetected(img){
    // setQrCodePreviewImg( img );
    setHideCamera(true);
    if(argsOnCodeDectected){
      argsOnCodeDectected(img);
    }
  }
  function startScanning(){
    setHideCamera(false);
    if(argsOnStartScanning){
      argsOnStartScanning();
    }
  }

  return (
    <View style={styles.Main}>
      {cameraHidden &&
        (
          <Animated.View style={styles.HideButton}>
            <Button onPress={startScanning}
                    title={'scan code'}
                    color={styles.HideButton.backgroundColor}
            />
          </Animated.View>
        )
      }
      {!cameraHidden &&
        (
          <Animated.View style={styles.CameraView}>
            <RNCameraTest width={camarePreviewWidth}
                          height={camarePreviewHeight}
                          onCodeDetected={onCodeDetected}/>
            <View style={styles.InfoDiv}>
              <Text style={styles.InfoText}>
                {infoText}
              </Text>
            </View>
          </Animated.View>
        )
      }
    </View>
  );
};


const styles = StyleSheet.create({
  Main: {
    marginTop: 20,
  },
  CameraView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  RNCameraContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
    overflow: 'hidden',
  },
  RNCamera: {
    width: '100%',
    height: '100%',
  },
  RNCameraCapture: {
    width: 100,
    height: 50,
    backgroundColor: 'lightblue',
  },
  RNCameraCaptureTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  QrCoddeImageExample: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'green',
  },
  InfoDiv: {
    width: '100%',
    height: '20%'
  },
  InfoText: {
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },

  HideButton: {
    width: '60%',
    maxWidth: 400,
    alignSelf: 'center',
    margin: 20,
    overflow: 'hidden',
  },
  HideButtonTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  }
});

export default EmbeddedCamera;
