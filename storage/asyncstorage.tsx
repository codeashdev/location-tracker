import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';


export const userRoleData = async (value: string) => {
    try {
      await AsyncStorage.setItem('user-role', value);
    } catch (e) {
      // saving error
    }
  };

 export const getuserRoleData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-role');
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      // error reading value
    }
  };

  export const storeProducts = async (selectedProducts:string[]) => {
    // Store selected products in AsyncStorage
    try {
      await AsyncStorage.setItem('customer-ordered', 'true');
      await AsyncStorage.setItem('selected-products', JSON.stringify(selectedProducts));
      Toast.show('Selected products stored successfully.');
      // You can also navigate to another screen or perform any other action here
    } catch (error) {
      console.error('Error storing selected products:', error);
    }
  };

  export const getStoredProducts = async () => {
    try {
      const value = await AsyncStorage.getItem('selected-products');
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      // error reading value
    }
  };

  export const getCustomerOrdered = async () => {
    try {
      const value = await AsyncStorage.getItem('customer-ordered');
      if (value !== null) {
        // Convert the string value to a boolean
        return value === 'true';
      }
      return false; // Return false if the value is null or undefined
    } catch (error) {
      console.error('Error retrieving products sent to the carrier:', error);
      return false; // Return false if an error occurs
    }
  }


  

  export const sendProductsToCarrier = async () => {
    try {
      // Save boolean value to indicate that products have been sent to the carrier
      await AsyncStorage.setItem('productsSentToCarrier', 'true');
      Toast.show('Products sent to the carrier.');
    } catch (error) {
      console.error('Error saving products sent to the carrier:', error);
    }
  };

  export const getsendProductsToCarrier = async () => {
    try {
      const value = await AsyncStorage.getItem('productsSentToCarrier');
      if (value !== null) {
        // Convert the string value to a boolean
        return value === 'true';
      }
      return false; // Return false if the value is null or undefined
    } catch (error) {
      console.error('Error retrieving products sent to the carrier:', error);
      return false; // Return false if an error occurs
    }
  };

  export const sendLocationToUser = async () => {
    try {
      // Save boolean value to indicate that products have been sent to the carrier
      await AsyncStorage.setItem('carrier-location', 'true');
      Toast.show('Location shard with the user');
    } catch (error) {
      console.error('Error saving products sent to the carrier:', error);
    }
  };

  export const getsendLocationToUser = async () => {
    try {
      const value = await AsyncStorage.getItem('carrier-location');
      if (value !== null) {
        // Convert the string value to a boolean
        return value === 'true';
      }
      return false; // Return false if the value is null or undefined
    } catch (error) {
      console.error('Error retrieving products sent to the carrier:', error);
      return false; // Return false if an error occurs
    }
  };

  export const clearAllAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      Toast.show('AsyncStorage cleared successfully.');
    } catch (error) {
      Toast.show('Error clearing AsyncStorage:');
    }
  };