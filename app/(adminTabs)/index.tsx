import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { getCustomerOrdered, sendProductsToCarrier } from '@/storage/asyncstorage';
import { AntDesign } from '@expo/vector-icons';
import Button from '@/components/Button';
import { ProductList } from '@/components/productList';

export default function TabAdmincreen() {
 
  const [isListVisible, setIsListVisible] = useState(false);
  const [customerOrdered, setCustomerOrdered] = useState<boolean>(false);
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

  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {customerOrdered ?
      <>
      <View style={styles.orderTitleContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleListVisibility}>
        <View style={styles.orderTitle}>
        <Text style={styles.title}>Order</Text>
         {isListVisible ? <AntDesign name="up" size={15} color="black" /> : <AntDesign name="down" size={15} color="black" /> }
         </View>
      </TouchableOpacity>
      

      <Button label="Send to Carrier" onPress={handleSendToCarrier} />
      </View>
      {isListVisible && (
        <ProductList />
      )}
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
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // flexGrow: 1,
    paddingVertical: 20,
  },
  titleContainer: {
    marginBottom: 10,
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
    width: '65%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
    // borderWidth: 1,
    
    // paddingHorizontal: 40,
    // paddingVertical: 4
  },
  orderTitle: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
