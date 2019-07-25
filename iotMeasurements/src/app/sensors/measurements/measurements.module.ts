import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeasurementsPage } from './measurements.page';
import { LineChartComponent } from 'src/app/component/line-chart/line-chart.component';


const routes: Routes = [
  {
    path: '',
    component: MeasurementsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [MeasurementsPage, LineChartComponent]
})
export class MeasurementsPageModule {}
