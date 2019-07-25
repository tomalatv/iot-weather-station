import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Sensor } from './sensor';
import { SensorService } from './sensor.service';
import { Measurement } from './measurement';
@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  public sensors: Array<Sensor> = [];
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit() {
    this.sensorService.sensors();
    this.sensorService.sensorsSubject.subscribe((sensorsData) => {
      this.sensors = sensorsData;
    });
  }

  // public openMeasurements(deviceRef: string): void {
  //   this.sensorService.sensortMeasurement(deviceRef).then((measurements) => {
  //     measurements.forEach((measurement) => {
  //       console.log('measurement ', measurement);
  //     });
  //   });
  // }
}
