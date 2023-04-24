import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Field } from '../types'

export const Input: React.FC<Field> = ({ name, onChange, value, label }) => {
  return (
    <View key={name}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChange(name, text)}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 4,
    height: 30,
    paddingLeft: 8
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 4
  }
})
