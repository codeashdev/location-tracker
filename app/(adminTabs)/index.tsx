import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { getCustomerOrdered, sendProductsToCarrier } from '@/storage/asyncstorage';
import Button from '@/components/Button';
import { ProductList } from '@/components/productList';
import socket from '@/utils/socket';

export default function TabAdmincreen() {
  const [customerOrdered, setCustomerOrdered] = useState<boolean>(false);
  const [userOrder, setUserOrder] = useState<string[]>();

  useEffect(() => {
    
    const fetchProductsSentToCarrier = async () => {
      const ordered = await getCustomerOrdered();
      setCustomerOrdered(ordered);
    };

    fetchProductsSentToCarrier();
  }, []);

  const handleSendToCarrier = async () => {
    sendProductsToCarrier()
  };

//   useEffect(() => {
//     const handleReceiveData = (data: string[]) => {
//         setUserOrder(data);
//         // console.log("recieved data from user:" + data)
//     };
//     socket.on('receive_data', handleReceiveData);

//     return () => {
//         socket.off('receive_data', handleReceiveData);
//     };
// }, [socket]); 

// console.log(userOrder)

  return (
    <View style={styles.container}>
      {customerOrdered ?
      <>
        <ProductList />
      <View style={styles.btnContainer}>
        <Button label="Send to Carrier" onPress={handleSendToCarrier} />
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
  orderTitle: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
