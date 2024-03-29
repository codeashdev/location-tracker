import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { getsendProductsToCarrier, sendLocationToUser } from '@/storage/asyncstorage';
import { ProductList } from '@/components/productList';
import Button from '@/components/Button';
import useLocation from '@/components/useLocation';
import socket from '@/utils/socket';

export default function TabHomeScreen() {
  const [productsSent, setProductsSent] = useState<boolean>(false);
  const { userAddress, locationStarted, locationData, mapRegion, stopLocation, startLocationTracking, getLastKnownLocation, lastLocation, lastAddress } = useLocation();
  let carrierAddress = userAddress?.formattedAddress;
  let carrierLastAdress= lastAddress?.formattedAddress
  let carrierLocationData = {
    locationData,
    mapRegion,
    carrierAddress,
    lastLocation,
    carrierLastAdress,
  }
  const [buttonPressed, setButtonPressed] = useState(false);
  useEffect(() => {
    
    const fetchProductsSentToCarrier = async () => {
      const sent = await getsendProductsToCarrier();
      setProductsSent(sent);
    };

    fetchProductsSentToCarrier();
  }, []);

  useEffect(() => {
    if (buttonPressed) {
        const emitData = () => {
            startLocationTracking();
            // console.log(carrierLocationData)
            socket.emit('send_data', carrierLocationData);
        };
        emitData();
    }
}, [buttonPressed, carrierLocationData, socket]); 



  const handleTakeOrder = () => {
    setButtonPressed(true);
    sendLocationToUser();
    getLastKnownLocation();
    // console.log(carrierLocationData)
  }

  const handleStop = () => {
    setButtonPressed(false);
    stopLocation();
  }
   
  return (
    <View style={styles.container}>
      {productsSent ?
      <>
        <ProductList />
       <View style={styles.btnContainer}>
       {!locationStarted ? <Button label="Take Order" onPress={handleTakeOrder} /> : <Button label="delivery Complete" onPress={handleStop} />}
       </View> 
       </>
       :
       <View style={styles.noOrderContainer}>
       <Text style={styles.noOrderTitle}>No order to show</Text>
        </View>
      } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
  },
  btnContainer: {
      width: '100%',
      alignItems: 'center'
  },
  noOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrderTitle: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#1EB58A',
  },
});
