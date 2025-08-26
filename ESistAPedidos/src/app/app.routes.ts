
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { layoutRoutes } from './Components/layout/layout.routes';

export const routes: Routes = [
  /*{ path: '', redirectTo: 'dash-board', pathMatch: 'full' },*/
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'pages', component: LayoutComponent, children: layoutRoutes },
  { path: '**', redirectTo: 'login' , pathMatch: 'full'}
];