import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import Toast from 'react-native-root-toast';
import Button from './Button';
import { FontAwesome } from '@expo/vector-icons';
import customMapStyle from '@/utils/customMapStyle';
import { useColorScheme } from '@/components/useColorScheme';
import { CustomLocationData, locationData } from '@/utils/types.ds';

const LOCATION_TRACKING = 'location-tracking';



function UserLocation() {
    
const DEFAULT_LATITUDE_DELTA = 0.0922;
const DEFAULT_LONGITUDE_DELTA = 0.0421;
   
    const [userAddress, setUserAddress] = React.useState<any>()
    const [locationStarted, setLocationStarted] = React.useState<boolean>(false);
    const [locationData, setLocationData] = React.useState<locationData>({
        latitude: 0,
        longitude: 0,

    })
    const [mapRegion, setMapRegion] = React.useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
    });


    // console.log(locationData)
    const startLocationTracking = async () => {
        // First, check foreground permissions
        const foregroundPermission = await Location.getForegroundPermissionsAsync();
        if (foregroundPermission.status !== 'granted') {
            Toast.show('Foreground location permission not granted');
            return;
        }

        // Then, check background permissions
        const backgroundPermission = await Location.getBackgroundPermissionsAsync();
        if (backgroundPermission.status !== 'granted') {
            Toast.show('Background location permission not granted');
            return;
        }

        // If both foreground and background permissions are granted, start location updates
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 0,
        });
    
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
        setLocationStarted(hasStarted);
        // Toast.show('Tracking Status '+ hasStarted, {
        //     position: Toast.positions.TOP + 60,
        //     backgroundColor: ""
        // });
    };

    React.useEffect(() => {
        const checkForegroundPermissions = async () => {
            const resf = await Location.requestForegroundPermissionsAsync();
            if (resf.status !== 'granted') {
                Toast.show('Permission to access foreground location was denied');
            } else {
                Toast.show('Permission to access foreground location granted');
            }
        };
    
        const checkBackgroundPermissions = async () => {
            const resb = await Location.requestBackgroundPermissionsAsync();
            if (resb.status !== 'granted') {
                Toast.show('Permission to access background location was denied');
            } else {
                Toast.show('Permission to access background location granted');
            }
        };
    
        checkForegroundPermissions();
        checkBackgroundPermissions();
    }, []);
    



    const stopLocation = () => {
        setLocationStarted(false);
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
            .then((tracking) => {
                if (tracking) {
                    Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
                }
            })
    }
  

    TaskManager.defineTask<CustomLocationData>(LOCATION_TRACKING, async ({ data, error }) => {
        if (error) {
            console.log('LOCATION_TRACKING task ERROR:', error);
            return;
        }
        if (locationStarted && data) {
            const { locations } = data;
            console.log(data)
            let latitude = locations[0].coords.latitude;
            let longitude = locations[0].coords.longitude;
           const locData = {
             latitude,
             longitude
            }
            setLocationData(locData)
            let address = await Location.reverseGeocodeAsync({ 
                latitude, longitude
              })
              setUserAddress(address[0])
            // console.log(locData)
            
    
            // console.log(
            //     `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
                
            // );
        }
    });

    React.useEffect(() => {
        if (locationData) {
            // Preserve the current delta values if already set
            const newRegion = {
                ...locationData,
                latitudeDelta: mapRegion.latitudeDelta !== 0 ? mapRegion.latitudeDelta : DEFAULT_LATITUDE_DELTA,
                longitudeDelta: mapRegion.longitudeDelta !== 0 ? mapRegion.longitudeDelta : DEFAULT_LONGITUDE_DELTA,
            };
            setMapRegion(newRegion);
        }
    }, [locationData]);

    const getLastUserPosition = async () => {
        try {
            // Requesting the current position of the user
            const location = await Location.getCurrentPositionAsync({});
    
            // Extracting latitude and longitude from the location object
            const { latitude, longitude } = location.coords;
            // console.log(location.coords)
            // Returning an object containing latitude and longitude
            return { latitude, longitude };
        } catch (error) {
            // Handling any errors that might occur during the process
            console.error("Error getting user's last position:", error);
            return null; // Return null if there's an error
        }
    };
    // getLastUserPosition()

    const colorScheme = useColorScheme();

    return (
        <>
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
                </>
            ) : (
                <>
                <View style={styles.container} >
                <FontAwesome name="map" size={50} color="#1EB58A" />
                </View>
                <Button label="Start Tracking" onPress={startLocationTracking} />
                </>
            )}
        </>
    );
}
    const styles = StyleSheet.create({
        map: {
            width: '90%',
            height: '50%',
            borderRadius: 1,
            marginHorizontal: 20,
            marginBottom: 10, 
           
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '50%',
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
          
    });
    



export default UserLocation;