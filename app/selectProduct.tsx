import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text } from '@/components/Themed';
import { storeProducts } from '@/storage/asyncstorage';
import { productsData } from '@/utils/productData';



export default function SelectProductScreen() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Function to handle product selection
  const handleProductSelection = (productName: string) => {
    setSelectedProducts(prevSelectedProducts => {
      if (prevSelectedProducts.includes(productName)) {
        // If product is already selected, deselect it
        return prevSelectedProducts.filter(name => name !== productName);
      } else {
        // If product is not selected, add it to the list
        return [...prevSelectedProducts, productName];
      }
    });
  };

  // console.log(selectedProducts)
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Render each product dynamically */}
      {productsData.map(product => (
        <TouchableOpacity
          key={product.id}
          style={[styles.product, selectedProducts.includes(product.name) && styles.selectedProduct]}
          onPress={() => handleProductSelection(product.name)}
        >
          <Text style={styles.productText}>{product.name}</Text>
        </TouchableOpacity>
      ))}

     
        <Button title="Order" onPress={() => storeProducts(selectedProducts)} color="#1EB58A" disabled={selectedProducts.length === 0} />
   

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  product: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedProduct: {
    backgroundColor: '#1EB58A',
    
  },
  productText: {
    fontSize: 16,
  },
});
