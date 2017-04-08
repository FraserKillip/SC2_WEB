import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { environment } from '../../environments/environment';
import LoginStatusResponse = FB.LoginStatusResponse;

declare const FB: FBSDK;

@Injectable()
export class FacebookService {
  constructor() {
  }

  init() {
    FB.init({
      appId: environment.fbAppId,
      cookie: true,
      xfbml: true,  // parse social plugins on this page
      version: 'v2.6' // use graph api version 2.5
    });
  }

  login(): Observable<LoginStatusResponse> {
    return Observable.create((subscriber: Subscriber<any>) => {
      FB.login(response => {
        if (response.status === 'connected') {
          localStorage.setItem('token', `facebook ${response.authResponse.accessToken}`);
        }

        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  getStatus(): Observable<LoginStatusResponse> {
    return Observable.create((subscriber: Subscriber<any>) => {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          localStorage.setItem('token', `facebook ${response.authResponse.accessToken}`);
        }

        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    return Observable.create((subscriber: Subscriber<any>) => {
      FB.logout((response) => {
        subscriber.next(response);
        subscriber.complete();
      });
    });
  }
}
