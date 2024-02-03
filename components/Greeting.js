import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Greeting = () => {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 30, borderColor: 'gray', borderWidth: 1}}
        placeholder="Write your name..."
        placeholderTextColor="gray"
        onChangeText={name => setName(name)}
      />
      <Text style={{marginTop: 10}}>Welcome to this CI/CD course, {name}!</Text>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginHorizontal: 10,
  },
});
