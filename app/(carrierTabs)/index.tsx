import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { getsendProductsToCarrier, sendLocationToUser } from '@/storage/asyncstorage'; // Assuming you have implemented the getProductsSentToCarrier function
import { ProductList } from '@/components/productList';
import { AntDesign } from '@expo/vector-icons';
import Button from '@/components/Button';
import * as Location from 'expo-location';
import useLocation from '@/components/useLocation';
import socket from '@/utils/socket';

export default function TabHomeScreen() {
  const [productsSent, setProductsSent] = useState<boolean>(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const { userAddress, locationStarted, locationData, mapRegion, setMapRegion, stopLocation, startLocationTracking } = useLocation();
  let carrierAddress = userAddress?.formattedAddress;
  let carrierLocationData = {
    locationData,
    mapRegion,
    carrierAddress
  }
  const [role, setRole] = React.useState('');
  useEffect(() => {
    
    const fetchProductsSentToCarrier = async () => {
      const sent = await getsendProductsToCarrier();
      setProductsSent(sent);
    };

    fetchProductsSentToCarrier();
  }, []);

  React.useEffect(() => {
    // Listen for the 'set_role' event from the server
    socket.on('set_role', (role) => {
      setRole(role);
      console.log(role)
    });

    // Cleanup function
    return () => {
      // Remove the event listener when the component unmounts
      socket.off('set_role');
    };
  }, []); // Empty dependency array to ensure the effect runs only once
console.log(role)
  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

  const handleTakeOrder = () => {

    sendLocationToUser();
    startLocationTracking();

   
    socket.emit('send_data', carrierLocationData);
    
  }
  // console.log(carrierLocationData)
    
  return (
    <View style={styles.container}>
      
      <>
      <View style={styles.orderTitleContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleListVisibility}>
        <View style={styles.orderTitle}>
        <Text style={styles.title}>Order</Text>
         {isListVisible ? <AntDesign name="up" size={15} color="black" /> : <AntDesign name="down" size={15} color="black" /> }
         </View>
      </TouchableOpacity>
      
  
      {!locationStarted ? <Button label="Take Order" onPress={handleTakeOrder} /> : <Button label="delivery Complete" onPress={stopLocation} />}
      </View>
      {isListVisible && (
        <ProductList />
      )}
        </>
    
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // flexGrow: 1,
    paddingVertical: 20,
  },
  noOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  noOrderTitle: {
    fontFamily: "Inter",
    fontSize: 20,
    color: '#1EB58A'
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 10
  },
  listContainer: {
    width: '30%',
    marginBottom: 0,
    height: '15%',
    backgroundColor:'#ccc',
    marginLeft: 15,
    borderRadius: 10
  },
  cellContainer: {
    height: 40,
    marginLeft: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  orderTitleContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
    // borderWidth: 1,
    
    // paddingHorizontal: 40,
    // paddingVertical: 4
  },
  orderTitle: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

