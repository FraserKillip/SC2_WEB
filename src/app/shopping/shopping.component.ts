import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { sortBy } from 'lodash';
import gql from 'graphql-tag';

import { WeekService } from '../week.service';

@Component({
  selector: 'sc-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.less']
})
export class ShoppingComponent implements OnInit {

  private shoppingGql = gql`
    query {
      primaryShopper {
        userId
      }
      weeks {
        weekId
        cost
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
          firstName
          lastName
        }
      }
      users {
			  userId
			  firstName
			  lastName
			  avatarUrl
			  totalCost
			  totalPaid
			}
    }
  `;

  weeksQuery: ApolloQueryObservable<any>;
  currentWeekId: number;
  loading;
  me;
  primaryShopper;
  weeks: any[];
  members: any[];
  costs = {};

  constructor(private apolloClient: Apollo, private weekService: WeekService) { }

  ngOnInit() {
    this.loading = true;

    this.currentWeekId = this.weekService.getCurrentWeekId();
    this.weeksQuery = this.apolloClient.watchQuery({ query: this.shoppingGql });

    this.weeksQuery.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.primaryShopper = data.primaryShopper;
      this.weeks = sortBy(data.weeks, 'weekId').reverse();
      this.costs = this.weeks.reduce((prev, w) => { prev[w.weekId] = w.cost; return prev; }, {});
      this.members = sortBy(data.users, u => u.totalCost - u.totalPaid).reverse();
    });
  }

  updateWeek(week) {
    this.loading = true;

    this.weekService.updateWeek(week.weekId, this.primaryShopper.userId, this.costs[week.weekId])
      .then(() => this.weeksQuery.refetch());
  }

  totalPaidForWeek(week) {
    return week.users.reduce((prev, u) => prev + u.paid, 0);
  }

  outstandingMembers(week) {
    return week.users.filter(u => u.paid <= 0);
  }

  amountOwed() {
    const pendingWeeks = this.weeks.filter(w => !this.weekService.isCurrentWeek(w.weekId) && !this.weekService.isPreviousWeek(w.weekId));

    const totalCost = pendingWeeks.reduce((prev, w) => prev + w.cost, 0);
    const totalOwed = totalCost - pendingWeeks.reduce((prev, w) => prev + this.totalPaidForWeek(w), 0);

    return totalOwed;
  }
}
