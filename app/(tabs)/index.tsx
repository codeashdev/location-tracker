import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import UserLocation from '@/components/UserLocation';
import React from 'react';

export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <UserLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
