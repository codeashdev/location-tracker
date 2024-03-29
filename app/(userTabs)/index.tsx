import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from '@/components/Themed';
import useLocationStatus from '@/components/useLocationStatus';

export default function TabUserScreen() {
  const locationOn = useLocationStatus();
  

  const handleLocationPress = () => {
    router.push('/CarrierLocation');
  }

  const handleOrderPress = () => {
    router.push('/selectProduct');
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
     
     <TouchableOpacity style={styles.orderContainer} onPress={handleOrderPress}>
         <FontAwesome name="shopping-bag" size={28} color="white" />
         <Text style={styles.linkText}>Order</Text>
       </TouchableOpacity>

      {locationOn ?
      <>      
       <TouchableOpacity style={styles.orderContainer} onPress={handleLocationPress}>
         <FontAwesome name="map-marker" size={28} color="white" />
         <Text style={styles.linkText}>Show Location</Text>
       </TouchableOpacity>
       </>
       :
       <TouchableOpacity style={styles.noOrderContainer} >
       <FontAwesome name="exclamation-circle" size={28} color="black" />
       <Text style={styles.noLinkText}>No Order to Track</Text>
     </TouchableOpacity>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    
  },
  linkText: {
    fontSize: 25,
    color: 'white',
  },
  noLinkText: {
    fontSize: 25,
    color: 'black',
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    paddingVertical: 50,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#1EB58A',
  },
  noOrderContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    paddingVertical: 50,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    borderColor: '#1EB58A',
    borderWidth: 2,
  },
  linkStyle: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: '90%',
    paddingVertical: 50,
    borderRadius: 20,
    backgroundColor: '#1EB58A',
  },
  aprrovalText: {
    fontSize: 15,
  }
});
