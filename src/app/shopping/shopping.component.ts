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
      }
    }
  `;

  weeksQuery: ApolloQueryObservable<any>;
  loading;
  me;
  primaryShopper;
  weeks;

  constructor(private apolloClient: Apollo, private weekService: WeekService) { }

  ngOnInit() {
    this.loading = true;

    this.weeksQuery = this.apolloClient.watchQuery({ query: this.shoppingGql });

    this.weeksQuery.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.me = data.me;
      this.primaryShopper = data.primaryShopper;
      this.weeks = sortBy(data.weeks, 'weekId').reverse();
    });
  }

}
