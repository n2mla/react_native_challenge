import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import model1 from './model1.json'
import model2 from './model2.json'

import { Input, Label } from './fields';
import { Field, ModelObjectType } from './types';
import { deviation, mean, median, multiple, sha256, sum } from './calculateMethods'

const renderFields = (fieldType: string, data: Field) => {
  switch (fieldType) {
    case 'input':
      return <Input key={data.name} {...data} />
    case 'label':
      return <Label key={data.name} {...data} />
    default:
      return null;
  }
}

const Model = () => {
  const [data, setData] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<{ [key: string]: { value: string, label: string } }>({})
  const [selectedItemPicker, setSelectedItemPicker] = useState<number | null>(1);
  const [selectedModel, setSelectedModel] = useState<{ name: string, fields: ModelObjectType }>();

  useEffect(() => {
    setSelectedModel(selectedItemPicker === 1 ? model1 : model2)
  }, [selectedItemPicker])

  const onChange = (name: string, value: string) => setData({
    ...data,
    [name]: value
  })

  const calculate = (method: string) => {
    if (method.includes("sum(")) {
      const params = method.substring(4, method.length - 1).split(",");
      return sum(params.map(p => Number(data[p.trim()])).filter(v => !isNaN(v)))
    }
    if (method.includes("multiple(")) {
      const params = method.substring(9, method.length - 1).split(",");
      return multiple(params.map(p => Number(data[p.trim()])).filter(v => !isNaN(v)))
    }
    if (method.includes("mean(")) {
      const params = method.substring(5, method.length - 1).split(",");
      return mean(params.map(p => Number(data[p.trim()])).filter(v => !isNaN(v)))
    }
    if (method.includes("median(")) {
      const params = method.substring(7, method.length - 1).split(",");
      return median(params.map(p => Number(data[p.trim()])).filter(v => !isNaN(v)))
    }
    if (method.includes("deviation(")) {
      const params = method.substring(10, method.length - 1).split(",");
      return deviation(params.map(p => Number(data[p.trim()])).filter(v => !isNaN(v)))
    }
    if (method.includes("sha256(")) {
      const params = method.substring(7, method.length - 1).split(",");
      return sha256(params.map(p => data[p.trim()]))
    }
    return -1
  }

  const convertData = (data: any, dataType: string) => {
    if (isNaN(data)) {
      return data;
    }
    switch (dataType) {
      case "int":
        return parseInt(data);
      case "float":
        return parseFloat(data);
      case "double":
        return Number(data);
      case "string":
        return data.toString();
      default:
        return "Invalid data type";
    }
  }

  const onSubmit = async () => {
    const fields = selectedModel?.fields
    if (fields) {
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
      for (const m of methods) {
        const key = Object.keys(m)[0]
        const value = await calculate(m[key])
        calculatedValues = {
          ...calculatedValues,
          [key]: {
            value: [value || 0].toString(),
            label: fields[key].label
          }
        }
      }
      setResult(calculatedValues)
    }
  }

  const renderModel = (fields: ModelObjectType | undefined) => (
    fields ? <>
      <Text style={styles.title}>{selectedModel?.name.toString()}</Text>
      {
        Object.keys(fields).map((k: string) => renderFields(
          fields[k].readOnly ? "label" : "input", {
          label: fields[k].label,
          name: k,
          onChange: onChange,
          value: fields[k].readOnly ? convertData(result[k]?.value, fields[k].type) ?? '' : data[k] ?? ''
        }
        ))
      }
      <View style={styles.buttonContainer}>
        <Button
          title='Calculate'
          onPress={onSubmit}
        />
      </View>
    </> : null
  )

  return (
    <View>
      <Picker
        style={styles.picker}
        itemStyle={{ height: 110, fontSize: 16 }}
        selectedValue={selectedItemPicker}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedItemPicker(itemValue)
        }>
        <Picker.Item label="Data Model1" value={1} />
        <Picker.Item label="Data Model2" value={2} />
      </Picker>

      {renderModel(selectedModel?.fields)}

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
  },
  picker: {
  }
})

export default Model



