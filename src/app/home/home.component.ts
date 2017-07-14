import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';

import { UserQuery } from '../queries/Queries';
import WeekQuery from '../queries/WeekQuery';
import SubscribeToWeekMutation from '../queries/SubscribeToWeekMutation';
import UnpaidWeeksQuery from '../queries/UnpaidWeeksQuery';
import UpdateWeekMutation from '../queries/UpdateWeekMutation';
import WeekLinkQuery from '../queries/WeekLinkQuery';
import { WeekService } from '../week.service';
import { FacebookService } from '../facebook/facebook.service';
import PayAllMutation from '../queries/PayAllMutation'

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @Input() weekId: number;
  meId: number;
  me: ApolloQueryObservable<any>;
  primaryShopper: any;
  week: any;
  weeks: ApolloQueryObservable<any>;
  unpaidAmount: Observable<number>;
  cost: number;
  thisWeekSub: any;
  currentWeekId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apolloClient: Apollo,
    private fbService: FacebookService,
    public weekService: WeekService
  ) {
    this.currentWeekId = this.weekService.getCurrentWeekId();
  }

  ngOnInit() {
    this.me = this.apolloClient.watchQuery<any>({ query: UserQuery });
    this.me.subscribe(({ data }) => this.meId = data.me.userId);
    this.me.subscribe(({ data }) => this.primaryShopper = data.primaryShopper);

    this.route.params
      .flatMap(({ weekId }) => {
        this.weekId = +weekId || this.currentWeekId;
        this.weeks = this.apolloClient.watchQuery<any>({ query: WeekQuery, variables: { weekId: this.weekId } });

        return this.weeks;
      })
      .subscribe(({ data }) => {
        this.week = data.week; this.thisWeekSub = data.weekLink;
      });
  }

  nextWeek() {
    this.router.navigate(['week', this.weekId + 1]);
  }

  lastWeek() {
    this.router.navigate(['week', this.weekId - 1]);
  }

  subToWeek() {
    this.thisWeekSub = this.thisWeekSub || {
      slices: 1,
      weekId: this.weekId,
      userId: this.meId,
      paid: 0
    };

    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: { ...this.thisWeekSub, slices: 1 }
    })
      .toPromise().then(() => { this.me.refetch(); this.weeks.refetch(); });
  }

  unsubToWeek() {
    this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: { ...this.thisWeekSub, slices: 0 }
    })
      .toPromise().then(() => { this.me.refetch(); this.weeks.refetch(); });
  }

  payAll() {
    this.apolloClient.mutate({
      mutation: PayAllMutation,
      variables: { userId: this.meId },
    })
      .toPromise().then(() => { this.me.refetch(); this.weeks.refetch(); });
  }

  updateCost() {
    this.apolloClient.mutate({
      mutation: UpdateWeekMutation,
      variables: {
        cost: this.cost,
        weekId: this.weekId,
        shopperId: this.meId
      }
    });
  }
}
