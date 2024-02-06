/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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

  const [inflationRate, setInflationrRate] = useState(0.0);
  const [riskFreeRate, setRiskFreeRate] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [timeInYears, setTimeInYears] = useState(0.0);
  const [afterInflation, setAfterInflation] = useState(0.0);
  const [atRiskFree, setAtRiskFree] = useState(0.0);
  const [atRiskFreeAfterInflation, setAtRiskFreeAfterInflation] = useState(0.0);
  const [difference, setDifference] = useState(0.0);

  const calculateInflationImpact = (value, inflationRate, time) => {
    return value / Math.pow(1 + inflationRate, time);
  };

  const calculate = () => {
    setAfterInflation(
      calculateInflationImpact(amount, inflationRate / 100, timeInYears),
    );
    setAtRiskFree(amount * Math.pow(1 + riskFreeRate / 100, timeInYears));

    setAtRiskFreeAfterInflation(
      calculateInflationImpact(atRiskFree, inflationRate / 100, timeInYears),
    );

    setDifference(atRiskFreeAfterInflation - afterInflation);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <TextInput
          placeholder="Current inflation rate"
          placeholderTextColor="gray"
          style={styles.textBox}
          keyboardType="decimal-pad"
          value={inflationRate}
          onChangeText={value => setInflationrRate(value)}
        />
        <TextInput
          placeholder="Current risk free rate"
          placeholderTextColor="gray"
          style={styles.textBox}
          keyboardType="decimal-pad"
          value={riskFreeRate}
          onChangeText={value => setRiskFreeRate(value)}
        />
        <TextInput
          placeholder="Amount you want to save"
          placeholderTextColor="gray"
          style={styles.textBox}
          keyboardType="decimal-pad"
          onChangeText={value => setAmount(value)}
        />
        <TextInput
          placeholder="For how long (in years) will you save?"
          placeholderTextColor="gray"
          style={styles.textBox}
          keyboardType="decimal-pad"
          value={timeInYears}
          onChangeText={value => setTimeInYears(value)}
        />
        <Button
          style={{marginTop: 4}}
          title="Calculate inflation"
          onPress={() => {
            calculate();
            Analytics.trackEvent('calculate_inflation', {
              Internet: 'WiFi',
              GPS: 'Off',
            });
          }}
        />
        <Text style={styles.label}>
          {timeInYears} years from now you will still have ${amount} but it will
          only be worth ${afterInflation}.
        </Text>
        <Text style={styles.label}>
          But if you invest it at a risk free rate you will have ${atRiskFree}.
        </Text>
        <Text style={styles.label}>
          Which will be worth ${atRiskFreeAfterInflation} after inflation.
        </Text>
        <Text style={styles.label}>A difference of: ${difference}.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContainer: {
    marginHorizontal: 16,
  },
  label: {
    marginTop: 10,
  },
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
  },
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

export default App;
