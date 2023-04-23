import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Model from './models/Model'

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Model />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

export default App;
