import { LocationObject } from "expo-location/build/Location.types";

export interface CustomLocationData extends LocationObject {
    locations: LocationObject[];

}

export type locationData = {
    latitude: number;
    longitude: number;
}

export type CarrierLocationDataType = {
    carrierAddress: string;
    locationData: {
        latitude: number;
        longitude: number;
    }
    mapRegion: {
        latitude: number;
        latitudeDelta: number;
        longitude: number;
        longitudeDelta: number;
    };
    carrierLastAdress: string;
    lastLocation: {
        latitude: number;
        longitude: number;
    }


};
