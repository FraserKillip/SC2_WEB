import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacebookService } from './facebook/facebook.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private fbService: FacebookService) { }

  ngOnInit() {
    this.fbService.init();
  }

  logout() {
    this.fbService.logout()
      .toPromise().then(() => {
        this.router.navigate(['login']);
      });
  }
}
