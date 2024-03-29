import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';

import { View, Text } from '@/components/Themed';
import { storeProducts } from '@/storage/asyncstorage';
import { productsData } from '@/utils/productData';
import { router } from 'expo-router';


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

  const handleOrder = () => {
    storeProducts(selectedProducts)
    router.dismiss()
  }

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Render each product dynamically */}
      <View style={styles.rowContainer}>
        {productsData.map(product => (
          <View key={product.id} style={styles.cardContainer}>
            <Card
              style={[styles.product, selectedProducts.includes(product.name) && styles.selectedProduct]}
              onPress={() => handleProductSelection(product.name)}
            >
              <Card.Cover source={{ uri: product.img }} />
              <Card.Content style={styles.productContent}>
                <Text style={styles.productText}>{product.name}</Text>
                <Text style={styles.productText}>{product.price}₺</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
      <View style={styles.orderBtnContainer}>
        <Button
          onPress={handleOrder}
          buttonColor="#1EB58A"
          textColor='white'
          mode="elevated"
          disabled={selectedProducts.length === 0}
          contentStyle={{paddingHorizontal: 40,}}
        >
          Order
        </Button>
      </View>
    </ScrollView>
    </View>
  );
        }
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensure that the container fills the available space
    },
    scrollContainer: {
      flexGrow: 1, // Allow the ScrollView to grow to fill the available space
      paddingVertical: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    cardContainer: {
      width: '50%',
      paddingHorizontal: 5,
      marginBottom: 10,
      
    },
    product: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    selectedProduct: {
      backgroundColor: '#1EB58A',
    },
    productText: {
      fontSize: 16,
    },
    orderBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    productContent: {
      flexDirection:'row',
      justifyContent: 'space-between'
    }
  });
  