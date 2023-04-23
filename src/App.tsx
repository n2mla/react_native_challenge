import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Model from './models/Model'

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Model />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

export default App;
