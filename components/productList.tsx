import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import React from 'react';
import { useStoredProducts } from './useGetProducts';


export function ProductList() {
  const { products } = useStoredProducts();
  const [accordionExpanded, setAccordionExpanded] = React.useState(false);
  

      const handleAccordionPress = () => setAccordionExpanded(!accordionExpanded);
    return (
    
      <List.Section title='New Order'>
      <List.Accordion
        title="Order"
        rippleColor='#1EB58A'
        left={props => <List.Icon {...props} icon="shopping" color='#1EB58A' />}
        expanded={accordionExpanded}
        onPress={handleAccordionPress}>
          {products.map((product, index) => (
              <List.Item key={index} title={product} />
          ))}
       
      </List.Accordion>
    </List.Section>

      
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