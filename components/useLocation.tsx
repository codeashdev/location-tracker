import { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { CustomLocationData } from '@/utils/types.ds';
import { LocationGeocodedAddress } from 'expo-location';

const LOCATION_TRACKING = 'location-tracking';

TaskManager.defineTask<CustomLocationData>(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  // if (data) {
  //   const { locations } = data;
  //   // Process location data here
  //   // console.log('New location data:', locations);
  // }
});

function useLocation() {
  const DEFAULT_LATITUDE_DELTA = 0.0922;
  const DEFAULT_LONGITUDE_DELTA = 0.0421;

  const [userAddress, setUserAddress] = useState<LocationGeocodedAddress | null>(null);
  const [lastAddress, setlastAddress] = useState<LocationGeocodedAddress | null>(null);
  const [locationStarted, setLocationStarted] = useState(false);
  const [locationData, setLocationData] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [lastLocation, setLastLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: DEFAULT_LATITUDE_DELTA,
    longitudeDelta: DEFAULT_LONGITUDE_DELTA,
  });

  const startLocationTracking = async () => {
    try {
      const foregroundPermission = await Location.requestForegroundPermissionsAsync();
      if (foregroundPermission.status !== 'granted') {
        Toast.show('Foreground location permission not granted');
      }

      const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (backgroundPermission.status !== 'granted') {
        Toast.show('Background location permission not granted');
      }

      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 0,
      });

      const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
      setLocationStarted(hasStarted);
    } catch (e) {
      Toast.show("error");
    }
  };

  const getLastKnownLocation = async () => {
    try {
      const lastLocation = await Location.getLastKnownPositionAsync();
      if (lastLocation) {
        setLastLocation({
          latitude: lastLocation.coords.latitude,
          longitude: lastLocation.coords.longitude,
        });
        const address = await Location.reverseGeocodeAsync({ latitude: lastLocation.coords.latitude, longitude: lastLocation.coords.longitude });
        setlastAddress(address[0]);
      } else {
        Toast.show('Last known location not available');
      }
    } catch (error) {
      console.error('Error getting last known location:', error);
    }
  };

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
      .then((tracking) => {
        if (tracking) {
          Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
        }
      });
  };

  TaskManager.defineTask<CustomLocationData>(LOCATION_TRACKING, async ({ data }) => {
    if (locationStarted && data) {
      const { locations } = data;
      const { latitude, longitude } = locations[0].coords;
      const locData = { latitude, longitude };
      setLocationData(locData);

      // convert the latlongdata to address
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      setUserAddress(address[0]);
    }
  });

  useEffect(() => {
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

  return { userAddress, locationStarted, locationData, mapRegion, setMapRegion, stopLocation, lastAddress, lastLocation, startLocationTracking, getLastKnownLocation };
}

export default useLocation;
