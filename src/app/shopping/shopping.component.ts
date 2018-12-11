import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
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
        firstName
        lastName
      }
      primaryShopper {
        userId
        firstName
        lastName
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
        }
      }
      users {
        userId
        firstName
        lastName
        avatarUrl
        totalCost
        totalPaid
        totalOwed
      }
    }
  `;

  weeksQuery;
  currentWeekId: number;
  loading;
  primaryShopper;
  weeks: any[];
  members: any[];
  costs = {};

  constructor(private apolloClient: Apollo, private weekService: WeekService) { }

  ngOnInit() {
    this.loading = true;

    this.currentWeekId = this.weekService.getCurrentWeekId();
    this.weeksQuery = this.apolloClient.watchQuery({ query: this.shoppingGql });

    this.weeksQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.primaryShopper = data.primaryShopper || data.me;

      this.weeks = this.addWeekIfDoesntExist(
        this.addWeekIfDoesntExist(sortBy(data.weeks, 'weekId').reverse(), this.currentWeekId),
        this.currentWeekId + 1
      );

      this.costs = this.weeks.reduce((prev, w) => { prev[w.weekId] = w.cost; return prev; }, {});
      this.members = sortBy(data.users, u => u.totalCost - u.totalPaid).reverse();
    });
  }

  addWeekIfDoesntExist(weeks, weekId) {
    const existingWeek = weeks.find(w => w.weekId === weekId);

    return existingWeek != null
      ? weeks
      : [
        {
          weekId: weekId,
          cost: 0,
          users: [],
          shopper: this.primaryShopper
        },
        ...weeks
      ];
  }

  updateWeek(week) {
    this.loading = true;

    this.weekService.updateWeek(week.weekId, this.primaryShopper.userId, this.costs[week.weekId])
      .then(() => this.weeksQuery.refetch());
  }

  amountOwed() {
    return members.reduce((member, amount) => amount + member.totalOwed, 0);
  }
}
