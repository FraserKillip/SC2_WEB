import { Component } from '@angular/core';
import { LoginComponent } from './+login';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { RegisterComponent } from './+register';
import { HomeComponent } from './+home';

@Component({
  moduleId: module.id,
  selector: 'sc2-app',
  templateUrl: 'sc2.component.html',
  styleUrls: ['sc2.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/home', component: HomeComponent}
])
export class SC2AppComponent {
  title = 'sc2 works!';
}
