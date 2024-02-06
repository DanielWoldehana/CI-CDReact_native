/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {StyleSheet, View, Button, SafeAreaView} from 'react-native';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

const App = () => {
  useEffect(() => {
    const checkPreviousSession = async () => {
      const didCrash = await Crashes.hasCrashedInLastSession();
      if (didCrash) {
        const report = await Crashes.lastSessionCrashReport();
        alert("Sorry about that crash, we're working on a solution");
      }
    };
    checkPreviousSession();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Calculate Inflation"
          onPress={() =>
            Analytics.trackEvent('calculate_inflation', {
              Internet: 'Cellular',
              GPS: 'On',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
