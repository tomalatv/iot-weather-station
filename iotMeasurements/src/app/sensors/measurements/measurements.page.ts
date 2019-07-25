import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '../sensor.service';
import { Measurement } from '../measurement';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

  public measurements: Array<Measurement>;
  public description: string;
  public temperature: Array<{}>;
  public humidity: Array<{}>;
  public pressure: Array<{}>;
  public isLoadReady: boolean;
  public lineChart: Array<{}>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sensorService: SensorService,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.isLoadReady = false;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('deviceRefId')) {
        this.router.navigate(['/sensors']);
        return;
      }
      const deviceRefId =  paramMap.get('deviceRefId');
      this.description = paramMap.get('description');
      this.sensorMeasurements(deviceRefId).then(() => {
        this.isLoadReady = true;
        });
    });
  }

  private sensorMeasurements(deviceRefId: string): Promise<void> {
    return this.sensorService.sensortMeasurement(deviceRefId, 72).then((measurements) => {
        if (measurements.length === 0) {
          this.alertCtrl.create({
            header: 'no data found',
            message: 'no data found',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/sensors']);
                }
              }
            ]
          }).then((alert) => {
            alert.present();
          });
        }
        this.measurements = [...measurements];

        this.pressure = this.measurements.map((me) => ({value: (me.pressure / 1e5), date: me.time}));
        this.humidity = this.measurements.map((me) => ({value: me.humidity, date: me.time}));
        this.temperature = this.measurements.map((me) => ({value: me.temperature, date: me.time}));
    });
  }

}

