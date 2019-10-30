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
import NodeHeading      from './src/FE/Heading';
import CodeScanningPage from './src/FE/CodeScanningPage';
import HomeScreen       from './src/FE/HomeScreen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
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
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}



// function HomeScreen(props){
//   const {navigate} = props.navigation;
//   return(
//     <View>
//       <Button
//         title="Go to Jane's profile"
//       />
//     </View>
//   );
// }
// HomeScreen.navigationOptions = {
//   title: 'Welcome',
// };

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
