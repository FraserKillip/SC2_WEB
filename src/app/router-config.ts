import { Injectable } from '@angular/core';
import { FacebookService } from './facebook/facebook.service';
import { StateService } from 'ui-router-ng2';


@Injectable()
export default class RouterConfig {

  constructor(private fbService: FacebookService, private stateService: StateService) {
    this.fbService.init();
    this.fbService.getStatus().subscribe(response => {
      if (response.status === 'connected') {
        localStorage.setItem('token', `facebook ${response.authResponse.accessToken}`);
      } else {
        this.stateService.go('login');
      }
    });
  }
}
