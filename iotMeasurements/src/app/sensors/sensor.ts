import { Measurement } from './measurement';

export interface Sensor {
    deviceRefId: string;
    description: string;
    isActive: boolean;
    title: string;
    type: string;
    mac: string;
    gpslocation?: {
        latitude: number,
        longitude: number
    };
    latestMeasurement: Measurement;
}
