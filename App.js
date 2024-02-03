import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Greeting from './components/Greeting';
const App = () => {
  return (
    <View style={styles.container}>
      <Greeting />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
