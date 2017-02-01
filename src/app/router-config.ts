import { Injector } from '@angular/core';
import { FacebookService } from './facebook/facebook.service';
import { UIRouter, StateService } from 'ui-router-ng2';


export function configureModule(router: UIRouter, injector: Injector) {
  const fbService = injector.get(FacebookService);
  const stateService = injector.get(StateService);

  fbService.init();
  fbService.getStatus().subscribe(response => {
    if (response.status === 'connected') {
      localStorage.setItem('token', `facebook ${response.authResponse.accessToken}`);
    } else {
      stateService.go('login');
    }
  });
}
