import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from './+login';
import { RegisterComponent } from './+register';
import { HomeComponent } from './+home';


export const routes: RouterConfig = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
