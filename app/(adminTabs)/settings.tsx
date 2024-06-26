import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { router } from 'expo-router';
import useLocationStatus from '@/components/useLocationStatus';
import Toast from 'react-native-root-toast';

export default function adminSettingsScreen() {
  const colorScheme = useColorScheme();
  const locationOn = useLocationStatus();
  const gradientColors = colorScheme === 'dark' ? ['#1EB58A', 'black'] : ['#1EB58A', 'white'];

const handleLastLocationPress = () => {
  router.push('/lastLocation')
}
const handleCurrentLocationPress = () => {
    router.push('/CarrierLocation')
  
}
// console.log(locationOn)
  return (
    <>
      <LinearGradient
          colors={gradientColors}
          locations={[0, 0.9]}
          style={styles.container}
        >
        <Text style={styles.title}> <AntDesign size={28} style={{ marginRight: 0 }} name="setting" color="white" />Settings</Text>
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'dark'].background }]}>
          <TouchableOpacity style={styles.itemsContainer} onPress={handleLastLocationPress}>
            <View style={styles.item}>
              <View style={styles.itemTextIcon} >
              <View style={styles.iconContainer}>
              <FontAwesome size={18} style={{ marginRight: 0 }} name='map-marker' color="white" />
              </View>
              <Text   style={[styles.itemsText, { color: Colors[colorScheme ?? 'dark'].text }]}>Last Known Location</Text>
              </View>
              <AntDesign size={15} style={{ marginLeft: 5, color: Colors[colorScheme ?? 'dark'].text }} name="right" color="black" />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemsContainer} onPress={handleCurrentLocationPress}>
            <View style={styles.item}>
              <View style={styles.itemTextIcon} >
              <View style={styles.iconContainer}>
              <Feather name="map" size={18} color="white" />
              </View>
              <Text   style={[styles.itemsText, { color: Colors[colorScheme ?? 'dark'].text }]}>Current Location</Text>
              </View>
              <AntDesign size={15} style={{ marginLeft: 5, color: Colors[colorScheme ?? 'dark'].text }} name="right" color="black" />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    fontFamily: 'Inter'
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '95%',
  },
  card: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
  },
  itemsContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 20,
    width: "100%",
  
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    fontFamily: 'Inter'
  },
  itemTextIcon: {
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: '#1EB58A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15, 
  },
});