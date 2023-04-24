import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Field } from '../types'

export const Label: React.FC<Field> = ({ label, value }) => {
  return (
    <Text key={label} style={styles.label}>{label} : {value}</Text>
  )
}

export default Label

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    paddingBottom: 4
  }
})