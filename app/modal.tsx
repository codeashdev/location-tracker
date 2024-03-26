import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { locationData } from '@/utils/types.ds';

export default function ModalScreen() {
  const [ lastLocation, setLastLocation ] = React.useState<locationData>({
    latitude: 0,
    longitude: 0,
  })

  const getLastUserPosition = async () => {
    try {
        // Requesting the current position of the user
        const location = await Location.getCurrentPositionAsync({});

        // Extracting latitude and longitude from the location object
        const { latitude, longitude } = location.coords;
        
        setLastLocation({
          latitude,
          longitude,}
        )
    } catch (error) {
        
        console.error("Error getting user's last position:", error);
        return null; 
    }
};
console.log(lastLocation)
// getLastUserPosition()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
