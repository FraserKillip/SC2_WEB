import { Component } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { LoginComponent } from './+login';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { RegisterComponent } from './+register';
import { HomeComponent } from './+home';

@Component({
  moduleId: module.id,
  selector: 'sc2-app',
  templateUrl: 'sc2.component.html',
  styleUrls: ['sc2.component.css'],
  directives: [
    MdToolbar,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdIcon,
    ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, MdIconRegistry]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/home', component: HomeComponent}
])
export class SC2AppComponent {
  title = 'sc2 works!';
}
