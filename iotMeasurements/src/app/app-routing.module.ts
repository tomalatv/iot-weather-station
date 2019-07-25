import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard-service.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'sensors',
    children: [
      {
        path: '',
        loadChildren: './sensors/sensors.module#SensorsPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: ':deviceRefId/:description',
        loadChildren: './sensors/measurements/measurements.module#MeasurementsPageModule',
        canActivate: [AuthGuard]
        }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
