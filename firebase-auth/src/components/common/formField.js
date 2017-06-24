import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const FormField = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{`${capitalize(label)}: `}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.fieldInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldInput: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 3
  },
  labelText: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  }
});

export default FormField;