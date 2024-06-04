import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const CustomInputField = ({ iconSource, placeholder, secureTextEntry, onChangeText, value ,error }) => {
    const isError = error && (error.includes(placeholder) || !value);
    return (
        <View style={[styles.inputContainer, isError && { borderColor: 'red' }]}>
          <Image source={iconSource} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#000"
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            value={value}
            onChangeText={onChangeText}
          />
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 16,
      paddingHorizontal:10,
    },
  });
  
export default CustomInputField;