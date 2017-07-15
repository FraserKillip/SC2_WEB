import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { sortBy } from 'lodash';
import gql from 'graphql-tag';

import { WeekService } from '../week.service';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  // we don't use thisweek but if we don't request it then new weeks will
  // never be created in the db.
  private weeksGql = gql`
    query {
      thisweek {
        weekId
      }
      me {
        userId
        totalCost
        totalPaid
      }
      primaryShopper {
        userId
        firstName
        bankDetails
        bankName
      }
      weeks {
        weekId
        cost
        costPerUser
        users {
          weekId
          userId
          slices
          paid
        }
      }
    }
  `;

  weeksQuery: ApolloQueryObservable<any>;
  loading;
  me;
  primaryShopper;
  activeWeeks;
  dueWeeks;

  constructor(private apolloClient: Apollo, private weekService: WeekService) { }

  ngOnInit() {
    this.loading = true;

    this.weeksQuery = this.apolloClient.watchQuery({ query: this.weeksGql });

    this.weeksQuery.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.me = data.me;
      this.primaryShopper = data.primaryShopper;

      const sortedWeeks = sortBy(data.weeks, 'weekId').reverse();

      this.activeWeeks = sortedWeeks.filter(w => !this.isDueWeek(w.weekId));
      this.dueWeeks = sortedWeeks.filter(w => this.isDueWeek(w.weekId));
    });
  }

  refresh() {
    this.weeksQuery.refetch();
  }

  isDueWeek(weekId: number) {
    return !this.weekService.isCurrentWeek(weekId) && !this.weekService.isPreviousWeek(weekId);
  }

  isAllPaid() {
    return Math.abs(this.me.totalCost - this.me.totalPaid) < Number.EPSILON;
  }

  markAllPaid() {
    this.weekService.markAllPaid(this.me.userId)
      .then(() => this.refresh());
  }

}
