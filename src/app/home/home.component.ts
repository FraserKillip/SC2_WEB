import { Component, OnInit, Input } from '@angular/core';
import { MeQuery } from '../queries/Queries';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { FacebookService } from '../facebook/facebook.service';
import { StateService } from 'ui-router-ng2';
import WeekQuery from '../queries/WeekQuery';
import SubscribeToWeekMutation from '../queries/SubscribeToWeekMutation';
import UnpaidWeeksQuery from '../queries/UnpaidWeeksQuery';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import UpdateWeekMutation from '../queries/UpdateWeekMutation';
import WeekLinkQuery from '../queries/WeekLinkQuery';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @Input() weekId: number;
  meId: number;
  me: ApolloQueryObservable<ApolloQueryResult>;
  week: any;
  unpaidAmount: Observable<number>;
  cost: number;
  thisWeekSub: any;

  constructor(private apolloClient: Angular2Apollo, private fbService: FacebookService, private stateService: StateService) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.stateService.go('login');
      return;
    }
    this.me = this.apolloClient.watchQuery({query: MeQuery});
    this.me.subscribe((result) => this.meId = result.data.me.userId);

    this.apolloClient.watchQuery({query: UnpaidWeeksQuery}).subscribe(({data}) => {
      this.unpaidAmount = Observable.from(data.me.weeks).scan((acc: number, next: any): number => {
        return acc + (next.week.cost / next.week.users.length);
      }, 0) as Observable<number>;
    });


    this.apolloClient.watchQuery({
      query: WeekQuery,
      variables: {weekId: this.weekId}
    }).subscribe(({data}) => {
      this.week = data.week;
    });

    this.apolloClient.watchQuery({
      query: WeekLinkQuery,
      variables: {weekId: this.weekId}
    }).subscribe(({data}) => {
      this.thisWeekSub = data.weekLink;
    });
  }

  logout() {
    this.fbService.logout();
    this.stateService.go('login');
  }

  nextWeek() {
    this.stateService.go('home', {weekId: (this.weekId + 1)});
  }

  lastWeek() {
    this.stateService.go('home', {weekId: (this.weekId - 1)});
  }

  subToWeek() {

    this.thisWeekSub = this.thisWeekSub || {
      slices: 1,
      weekId: this.weekId,
      userId: this.meId,
      paid: 0
  };

    this.thisWeekSub.slices = 1;

    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: this.thisWeekSub
    }).then(({data}) => {
      console.log(data);
    });
  }

  payWeek() {

    this.thisWeekSub.paid = this.week.cost / this.week.users.length;

    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: this.thisWeekSub
    }).then(({data}) => {
      console.log(data);
    });
  }

  unsubToWeek() {
    this.thisWeekSub.slices = 0;
    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: this.thisWeekSub
    }).then(({data}) => {
      console.log(data);
    });
  }

  refetch() {
    this.me.refetch();
  }

  updateCost() {
    this.apolloClient.mutate({
      mutation: UpdateWeekMutation,
      variables: {
        cost: this.cost,
        weekId: this.weekId,
        shopperId: this.meId
      }
    }).then(({data}) => {
      console.log(data);
    });
  }
}
