import React, {Component} from 'react';
import LoginScreen from './login';

import { StyleSheet, Text, View } from 'react-native';


export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
