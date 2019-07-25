import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Sensor } from './sensor';
import { from, Observable, Subject } from 'rxjs';
import { Measurement } from './measurement';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private sensorsData: Array<Sensor> = [];
  private readonly app = firebase.app();
  private readonly db: firebase.firestore.Firestore;
  public readonly sensorsSubject: Subject<Array<Sensor>> = new Subject();

  constructor() {
    this.db = firebase.firestore(this.app);
  }

  public sensors(): void {

    // return from(new Promise<Array<Sensor>>((resolve) => {
    // return from(
    this.db.collection('iotdevices').get().then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log('## ', d oc.data(), '\n');
          // console.log('## ', doc.id, '\n');
          this.sensorLatestMeasurement(doc.id).then((latest) => {
            const docData = JSON.parse(JSON.stringify(doc.data()));
            const sensor: Sensor = {
              deviceRefId: doc.id,
              description: docData.description,
              isActive: docData.isActive,
              title: docData.title,
              type: docData.type,
              mac: docData.mac,
              gpslocation: {
                latitude: docData._latitude,
                longitude: docData._longitude
              },
              latestMeasurement: latest
            };
            this.sensorsData.push(sensor);
          });
        });
        this.sensorsSubject.next(this.sensorsData);
      }

      );
      // })
    // );
  }

  public sensortMeasurement(deviceRef: string, limit: number = 5): Promise<Array<Measurement>> {
    const devRef = 'iotdevices/' + deviceRef;
    const measurements: Array<Measurement> = [];
    return new Promise<Array<Measurement>>((resolve) => {
      this.db.collection('devicemeasurements')
        .where('deviceRef', '==', devRef)
        .orderBy('time', 'desc')
        .limit(limit)
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const measurement: Measurement = {
              battery: data.battery,
              deviceRef: data.deviceRef,
              humidity: data.humidity,
              pressure: data.pressure,
              temperature: data.temperature,
              time: new Date(data.time.seconds * 1e3)
            };
            measurements.push(measurement);
          });
          resolve(measurements);
        }).catch((error) => {
          console.log('Error getting measurement documents: ', error);
        });
    });
  }

  private sensorLatestMeasurement(deviceRef: string): Promise<Measurement> {
    const devRef = 'iotdevices/' + deviceRef;
    // console.log('*** ', devRef);
    return new Promise<Measurement>((resolve) => {
      this.db.collection('devicemeasurements')
        .where('deviceRef', '==', devRef)
        .orderBy('time', 'desc')
        .limit(1)
        .get().then((querySnapshot) => {
          // console.log('measurment ', querySnapshot.docs[0]);
          querySnapshot.forEach((doc) => {
            // console.log('measurment 2 ', doc.get('_document.proto.createTime', {serverTimestamps: 'estimate'}));
            // console.log('measurment 3 ', doc.get('CreatedAt', {serverTimestamps: 'estimate'}));
            const data = doc.data();
            // console.log('## ', doc.id);
            const measurement: Measurement = {
              battery: data.battery,
              deviceRef: data.deviceRef,
              humidity: data.humidity,
              pressure: data.pressure,
              temperature: data.temperature,
              time: new Date(data.time.seconds * 1e3)
            };
            // console.log('NOW', measurement);
            resolve(measurement);
          });
        }).catch((error) => {
          console.log('Error getting sensor latest measurement document: ', error);
        });
    });
  }

}
