import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabUserSettingsScreen() {
  const colorScheme = useColorScheme();
  const gradientColors = colorScheme === 'dark' ? ['#1EB58A', 'black'] : ['#1EB58A', 'white'];
  return (
    <>
      <LinearGradient
          colors={gradientColors}
          locations={[0, 0.9]}
          style={styles.container}
        >
        <Text style={styles.title}> <AntDesign size={28} style={{ marginRight: 0 }} name="setting" color="white" />Settings</Text>
        <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'dark'].background }]}>
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