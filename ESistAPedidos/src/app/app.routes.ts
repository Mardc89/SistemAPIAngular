
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';

import { layoutRoutes } from './Components/layout/layout.routes';

import { AuthService } from './Services/auth.service';



export const routes: Routes = [
  /*{ path: '', redirectTo: 'dash-board', pathMatch: 'full' },*/
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},

  { path: 'pages', component: LayoutComponent,canActivate:[AuthService], children: layoutRoutes },
  { path: '**', redirectTo: 'login' , pathMatch: 'full'}
];


