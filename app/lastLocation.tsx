import useLocation from '@/components/useLocation';
import customMapStyle from '@/utils/customMapStyle';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text } from '@/components/Themed';
import useLocationStatus from '@/components/useLocationStatus';

const LastLocation = () => {
  const { lastLocation, lastAddress, getLastKnownLocation } = useLocation();
  const locationOn = useLocationStatus();
  const colorScheme = useColorScheme();
  

  useEffect(() => {
    getLastKnownLocation();
  }, []);

  // console.log(loactionOn)

  return (
    <View style={styles.container}>
      {locationOn ?
      <>
      {lastLocation.latitude > 0 && lastLocation.longitude > 0 ?  (
          <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={colorScheme === 'dark' ? customMapStyle : []}
                        region={{
                            latitude: lastLocation.latitude,
                            longitude: lastLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        
                    >   
                        <Marker coordinate={{ ...lastLocation }} title="Carrier" />
                    </MapView>
      ) : (
        <Text style={styles.text}>Fetching last known location...</Text>
      )}
                    <View style={styles.addressContainer}>
                        <FontAwesome name="map-pin" size={24} color="#1EB58A" style={{marginRight: 2}} />
                        <View>
                            <Text>{lastAddress?.formattedAddress}</Text>
                        </View>
                    </View>
                    </>
                    :
                    <View style={styles.noOrderContainer}>
                            <Text style={styles.noOrderTitle}>No Order yet</Text>
                        </View>
                    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  map: {
    width: '100%',
    height: '90%',
    borderRadius: 1,
    marginHorizontal: 10,
    marginBottom: 10, 
   
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  addressContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginHorizontal: 10,
    paddingTop: 10
}
});

export default LastLocation;
