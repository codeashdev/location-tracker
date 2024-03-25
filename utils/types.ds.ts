import { LocationObject } from "expo-location/build/Location.types";

export interface CustomLocationData extends LocationObject {
    locations: LocationObject[];

}

export type locationData = {
    latitude: number;
    longitude: number;
}