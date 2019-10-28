import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, UIManager, LayoutAnimation} from 'react-native';


class AnimatedCollapsible extends React.Component {
  state = {expanded: false};
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({expanded: !this.state.expanded});
          }}>
          <Text>
            Press me to {this.state.expanded ? 'collapse' : 'expand'}!
          </Text>
        </TouchableOpacity>
        {this.state.expanded && <Text>I disappear sometimes!</Text>}
      </View>
    );
  }
}

export default AnimatedCollapsible;
