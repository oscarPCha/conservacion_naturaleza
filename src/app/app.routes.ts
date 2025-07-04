import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    title: 'Conservación Natural Perú'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - Conservación Natural Perú'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
