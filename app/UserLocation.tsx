import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import Button from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';
import customMapStyle from '@/utils/customMapStyle';
import { useColorScheme } from '@/components/useColorScheme';
import useLocation from '../components/useLocation';

function UserLocation() {
    const { userAddress, locationStarted, locationData, mapRegion, setMapRegion, stopLocation, startLocationTracking } = useLocation();
    const colorScheme = useColorScheme();

    // console.log(userAddress)
    return (
        <View style={styles.container}>
            {locationStarted && locationData.latitude > 0 && locationData.longitude > 0  ? (
                <>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={colorScheme === 'dark' ? customMapStyle : []}

                        region={mapRegion}
                        onRegionChangeComplete={(region) => setMapRegion(region)}
                        
                    >
                         
                        <Marker coordinate={{ ...locationData }} title="You" />
                         
                    </MapView>
                    <Button label="Stop Tracking" onPress={stopLocation} />
                    {userAddress &&
                    <View style={styles.addressContainer}>
                        <FontAwesome name="map-pin" size={24} color="#1EB58A" style={{marginRight: 2}} />
                        <View>
                            <Text>{userAddress?.formattedAddress}</Text>
                        </View>
                    </View>
                        }
                </>
            ) : (
                <>
                <View style={styles.iconContainer} >
                <FontAwesome name="map" size={50} color="#1EB58A" />
                </View>
                <Button label="Start Tracking" onPress={startLocationTracking} />
               
                </>
            )}
        </View>
    );
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        map: {
            width: '95%',
            height: '65%',
            borderRadius: 1,
            marginHorizontal: 10,
            marginBottom: 10, 
           
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
            height: '60%',
            borderRadius: 1,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#1EB58A',
            shadowColor: '#1EB58A',
            shadowOffset: {
              width: 4,
              height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 3, // For Android
            marginBottom: 10, 
          },
          addressContainer: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection:'row',
            marginHorizontal: 10,
            paddingTop: 10
        }
          
    });
    



export default UserLocation;