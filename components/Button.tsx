import { StyleSheet, Pressable } from 'react-native';
import { View, Text } from './Themed';
import React from 'react';

type ButtonProps = {
  label: string;
  onPress: () => void;
}

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <View >
      <Pressable onPress={onPress}>
        <Text style={styles.btnText}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    backgroundColor: '#1EB58A',
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 0,
    fontFamily: 'Inter'

  }
});
