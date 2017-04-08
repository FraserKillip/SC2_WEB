import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from '../facebook/facebook.service';
import { WeekService } from '../week.service';


@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private router: Router, private fbService: FacebookService, private weekService: WeekService) {
  }

  doLogin() {
    this.fbService.login().subscribe((response: any) => {
      if (response.status === 'connected') {
        this.router.navigate(['']);
      }
    });
  }
}
