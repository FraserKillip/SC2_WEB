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

  private weeksGql = gql`
    query {
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
          user {
            userId
            firstName
            lastName
            avatarUrl
          }
        }
        shopper {
          userId
          firstName
          lastName
          avatarUrl
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
      this.primaryShopper = data.primaryShopper || data.me;

      const sortedWeeks = sortBy(data.weeks, 'weekId').reverse();

      this.activeWeeks = sortedWeeks.filter(w => !this.weekService.isWeekDue(w.weekId));
      this.dueWeeks = sortedWeeks.filter(w => this.weekService.isWeekDue(w.weekId));
    });
  }

  refresh() {
    this.weeksQuery.refetch();
  }

  isAllPaid() {
    return Math.abs(this.me.totalCost - this.me.totalPaid) < Number.EPSILON;
  }

  markAllPaid() {
    this.weekService.markAllPaid(this.me.userId)
      .then(() => this.refresh());
  }

}
