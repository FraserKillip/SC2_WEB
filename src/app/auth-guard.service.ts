import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

import { FacebookService } from './facebook/facebook.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private fbService: FacebookService) { }

  canActivate() {
    return this.fbService.getStatus().map(response => {
      if (response.status === 'connected') {
        return true;
      }

      this.router.navigate(['login']);
    });
  }
}
