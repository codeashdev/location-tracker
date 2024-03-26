import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState, useEffect } from 'react';
import { getsendProductsToCarrier, sendLocationToUser } from '@/storage/asyncstorage'; // Assuming you have implemented the getProductsSentToCarrier function
import { ProductList } from '@/components/productList';
import { AntDesign } from '@expo/vector-icons';
import Button from '@/components/Button';

export default function TabHomeScreen() {
  const [productsSent, setProductsSent] = useState<boolean>(false);
  const [isListVisible, setIsListVisible] = useState(false);
  useEffect(() => {
    
    const fetchProductsSentToCarrier = async () => {
      const sent = await getsendProductsToCarrier();
      setProductsSent(sent);
    };

    fetchProductsSentToCarrier();
  }, []);

  const toggleListVisibility = () => {
    setIsListVisible(prev => !prev);
  };

  const handleTakeOrder = () => {
    sendLocationToUser();
  }

    // console.log(productsSent)
  return (
    <View style={styles.container}>
    
      {productsSent ?
      <>
      <View style={styles.orderTitleContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleListVisibility}>
        <View style={styles.orderTitle}>
        <Text style={styles.title}>Order</Text>
         {isListVisible ? <AntDesign name="up" size={15} color="black" /> : <AntDesign name="down" size={15} color="black" /> }
         </View>
      </TouchableOpacity>
      
  
      <Button label="Take Order" onPress={handleTakeOrder} />
      </View>
      {isListVisible && (
        <ProductList />
      )}
        </>
        :
        <View style={styles.noOrderContainer}>
          <Text style={styles.noOrderTitle}>No Orders to show</Text>
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
    width: '80%',
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

