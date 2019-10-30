/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// external packages:
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// custom code:
import NodeHeading from './Heading';
import CodeScanningPage from './CodeScanningPage';

// backend-frontend-shared-code:
import StaticFunctions from 'staticfunctions';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform, UIManager, LayoutAnimation,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
){
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


function HomeScreen(props){
  const hermes = global.HermesInternal == null ? null : (
    <View style={styles.engine}>
      <Text style={styles.footer}>Engine: Hermes</Text>
    </View>
  );
  if(!hermes){
    console.log('hermes not avaliable!');
  }

  console.log('current unix time: ', StaticFunctions.evalCurrentUnixTime());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          {hermes}

          <NodeHeading />

          <CodeScanningPage />

        </ScrollView>
      </SafeAreaView>
    </>
  );
};
HomeScreen.navigationOptions = {
  title: 'Willkommen in Ischas Welt!',
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
