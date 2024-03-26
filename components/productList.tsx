import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import React from 'react';
import { CellContainer, FlashList } from "@shopify/flash-list";
import { useStoredProducts } from './useGetProducts';


export function ProductList() {
  const { products } = useStoredProducts();
  
  // console.log(products)
    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <CellContainer style={styles.cellContainer} index={index}>
          <Text>{item}</Text> 
          
        </CellContainer>
      );
      

    return (
        <View style={styles.listContainer}>
        <FlashList
          data={products}
          renderItem={renderItem}
          estimatedItemSize={140}
        />
      </View>
    )
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