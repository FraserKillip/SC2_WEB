import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { FacebookService } from './facebook/facebook.service';
import { HttpService } from './http.service';

@Component({
  moduleId: module.id,
  selector: 'sc2-app',
  templateUrl: 'sc2.component.html',
  styleUrls: ['sc2.component.css'],
  directives: [
  ROUTER_DIRECTIVES],
  providers: [FacebookService, HttpService]
})
export class SC2AppComponent {
  // Router needs to be injected or it doesn't load...
  constructor(private router: Router, private fbService: FacebookService) {
    this.fbService.init();
  }
}
