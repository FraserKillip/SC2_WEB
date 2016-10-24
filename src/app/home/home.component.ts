import { Component, OnInit, Input } from '@angular/core';
import { MeQuery } from '../queries/Queries';
import { Angular2Apollo } from 'angular2-apollo';
import { FacebookService } from '../facebook/facebook.service';
import { StateService } from 'ui-router-ng2';
import WeekQuery from '../queries/WeekQuery';
import SubscribeToWeekMutation from '../queries/SubscribeToWeekMutation';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @Input() weekId: number;
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


    this.apolloClient.watchQuery({
      query: WeekQuery,
      variables: {weekId: this.weekId}
    }).subscribe(({data}) => {
      console.log(data);
    });
  }

  logout() {
    this.fbService.logout();
    this.stateService.go('login');
  }

  subToWeek() {
    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: {
        slices: 1,
        weekId: this.weekId,
        userId: this.me.userId
      }
    }).then(({data}) => {
      console.log(data);
    });
  }

}
