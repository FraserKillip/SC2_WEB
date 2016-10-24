import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../facebook/facebook.service';
import { StateService } from 'ui-router-ng2';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private fbService: FacebookService, private stateService: StateService) {
  }

  ngOnInit() {
    console.log(this);
  }

  doLogin() {
    this.fbService.login().subscribe((response: any) => {
      if (response.status === 'connected') {
        localStorage.setItem('token', `facebook ${response.authResponse.accessToken}`);
        this.stateService.go('home');
      }
    });
  }
}
