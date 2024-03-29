import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import customMapStyle from '@/utils/customMapStyle';
import { useColorScheme } from '@/components/useColorScheme';
import useReceiveLocation from '@/components/useReceiveLocation';

function CarrierLocation() {
    const DEFAULT_LATITUDE_DELTA = 0.0922;
    const DEFAULT_LONGITUDE_DELTA = 0.0421;
    const colorScheme = useColorScheme();
    const carrierLocation = useReceiveLocation()
    const [mapRegionIn, setMapRegion] = React.useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: DEFAULT_LATITUDE_DELTA,
      longitudeDelta: DEFAULT_LONGITUDE_DELTA,
    });
 
  // console.log(carrierLocation)
    React.useEffect(() => {
        if (carrierLocation?.locationData) {
          // Preserve the current delta values if already set
          const newRegion = {
            ...carrierLocation?.locationData,
            latitudeDelta: mapRegionIn.latitudeDelta !== 0 ? mapRegionIn.latitudeDelta : DEFAULT_LATITUDE_DELTA,
            longitudeDelta: mapRegionIn.longitudeDelta !== 0 ? mapRegionIn.longitudeDelta : DEFAULT_LONGITUDE_DELTA,
          };
          setMapRegion(newRegion);
        }
      }, [carrierLocation?.locationData]);

    return (
        <View style={styles.container}>
            {carrierLocation ? (
                <>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={colorScheme === 'dark' ? customMapStyle : []}

                        region={mapRegionIn}
                        onRegionChangeComplete={(region) => setMapRegion(region)}
                        
                    >
                         
                        <Marker coordinate={{ ...carrierLocation?.locationData }} title="Carrier" />
                         
                    </MapView>
                    {carrierLocation?.carrierAddress &&
                    <View style={styles.addressContainer}>
                        <FontAwesome name="map-pin" size={24} color="#1EB58A" style={{marginRight: 2}} />
                        <View>
                            <Text>{carrierLocation?.carrierAddress}</Text>
                        </View>
                    </View>
                        }
                </>
            ) : (
                <>
                <View style={styles.iconContainer} >
                <FontAwesome name="map" size={50} color="#1EB58A" />
                </View>
               
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
    



export default CarrierLocation;