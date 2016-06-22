import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { environment } from '../environment';

declare const FB: FBSDK;

@Injectable()
export class FacebookService {
    constructor() { }

    init() {
        FB.init({
            appId: environment.fbAppId,
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.6' // use graph api version 2.5
        });
    }

    login() {
        FB.login(r => console.log(r));
    }

    getStatus(): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            FB.getLoginStatus(response => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }

    logout() {
        FB.logout(r => console.log(r));
    }
}
