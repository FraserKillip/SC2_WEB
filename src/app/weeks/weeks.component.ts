import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { sortBy } from 'lodash';
import gql from 'graphql-tag';

import { WeekService } from '../week.service';

@Component({
  selector: 'sc-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.less']
})
export class WeeksComponent implements OnInit {

  private weeksGql = gql`
    query {
      me {
        userId
        weeks {
          weekId
          paid
          week {
            weekId
            cost
            costPerUser
            shopper {
              firstName
              avatarUrl
            }
          }
        }
      }
    }
  `;

  currentWeekId: number;
  weeksQuery;
  weeks;
  me;
  meWeeks;
  lolWeeks;

  constructor(private apolloClient: Apollo, public weekService: WeekService
  ) {
  }

  ngOnInit() {
    this.currentWeekId = this.weekService.getCurrentWeekId();

    this.weeksQuery = this.apolloClient.watchQuery({
      query: this.weeksGql
    });

    this.weeks = this.weeksQuery.map(({ data }) => { console.log(data); return sortBy(data.me.weeks, 'weekId').reverse(); });
    this.meWeeks = this.weeks.map((weeks) => weeks.slice(2));
    this.lolWeeks = this.weeks.map((weeks) => { console.log(weeks); return weeks.slice(0, 2) });
  }

  hasJoinedWeek(users) {
    return this.me.map(me => users.map(u => u.user.userId).includes(me.userId));
  }
}
