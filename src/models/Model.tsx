import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import model1 from './model1.json'
import { Input, Label } from './fields';
import { Field, ModelObjectType } from './types';
import { deviation, mean, median, multiple, sum } from './calculateMethods'

const renderFields = (fieldType: string, data: Field) => {
  switch (fieldType) {
    case 'input':
      return <Input {...data} />
    case 'label':
      return <Label {...data} />
    default:
      return null;
  }
}

const Model = () => {
  const fields = model1.fields as ModelObjectType
  const [data, setData] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<{ [key: string]: { value: string, label: string } }>({})

  const onChange = (name: string, value: string) => setData({
    ...data,
    [name]: value
  })

  const calculate = (method: string) => {
    if (method.includes("sum(")) {
      const params = method.substring(4, method.length - 1).split(",");
      return sum(params.map(p => Number(data[p.trim()])))
    }
    if (method.includes("multiple(")) {
      const params = method.substring(9, method.length - 1).split(",");
      return multiple(params.map(p => Number(data[p.trim()])))
    }
    if (method.includes("mean(")) {
      const params = method.substring(5, method.length - 1).split(",");
      return mean(params.map(p => Number(data[p.trim()])))
    }
    if (method.includes("median(")) {
      const params = method.substring(7, method.length - 1).split(",");
      return median(params.map(p => Number(data[p.trim()])))
    }
    if (method.includes("deviation(")) {
      const params = method.substring(10, method.length - 1).split(",");
      return deviation(params.map(p => Number(data[p.trim()])))
    }
    return -1
  }

  const onSubmit = () => {
    const methods: { [k: string]: string }[] = []
    Object.keys(fields).map(k => {
      const method = fields[k].calculate
      if (fields[k].readOnly && method !== null) {
        methods.push({
          [k]: method
        })
      }
    })

    let calculatedValues: { [k: string]: { value: string, label: string } } = {}
    methods.forEach(m => {
      const key = Object.keys(m)[0]
      const value = calculate(m[key])
      calculatedValues = {
        ...calculatedValues,
        [key]: {
          value: [value || 0].toString(),
          label: fields[key].label
        }
      }
    })
    setResult(calculatedValues)
  }

  return (
    <View>
      <Text style={styles.title}>{model1.name.toString()}</Text>
      {
        Object.keys(fields).map((k: string) => renderFields(
          fields[k].readOnly ? "label" : "input", {
          label: fields[k].label,
          name: k,
          onChange: onChange,
          value: fields[k].readOnly ? result[k]?.value ?? '' : data[k] ?? ''
        }
        ))
      }
      <View style={styles.buttonContainer}>
        <Button
          title='Calculate'
          onPress={onSubmit}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  }
})

export default Model



