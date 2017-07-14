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
      me {
        userId
        totalCost
        totalPaid
        weeks {
          weekId
          userId
          slices
          paid
        }
      }
      primaryShopper {
        userId
        firstName
        lastName
        bankDetails
        bankName
      }
      weeks {
        weekId
        cost
        costPerUser
        shopper {
          firstName
          lastName
        }
      }
    }
  `;

  weeksQuery: ApolloQueryObservable<any>;
  currentWeekId: number;
  loading;
  me;
  primaryShopper;
  weeks: any[];
  costs = {};

  constructor(private apolloClient: Apollo, private weekService: WeekService) { }

  ngOnInit() {
    this.loading = true;

    this.currentWeekId = this.weekService.getCurrentWeekId();
    this.weeksQuery = this.apolloClient.watchQuery({ query: this.shoppingGql });

    this.weeksQuery.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.me = data.me;
      this.primaryShopper = data.primaryShopper;
      this.weeks = sortBy(data.weeks, 'weekId').reverse();
      this.costs = this.weeks.reduce((prev, w) => { prev[w.weekId] = w.cost; return prev; }, {});
    });
  }

  updateWeek(week) {
    this.loading = true;

    this.weekService.updateWeek(week.weekId, this.primaryShopper.userId, this.costs[week.weekId])
      .then(() => this.weeksQuery.refetch());
  }

}
