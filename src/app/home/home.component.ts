import { Component, OnInit } from '@angular/core';
import { MeQuery } from '../queries/Queries';
import { Angular2Apollo } from 'angular2-apollo';
import { FacebookService } from '../facebook/facebook.service';
import { StateService } from 'ui-router-ng2';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  me: any;

  constructor(private apolloClient: Angular2Apollo, private fbService: FacebookService, private stateService: StateService) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.stateService.go('login');
      return;
    }
    this.apolloClient.watchQuery({query: MeQuery}).subscribe(({data}) => {
      this.me = data.me;
    });
  }

  logout() {
    this.fbService.logout();
    this.stateService.go('login');
  }

}
