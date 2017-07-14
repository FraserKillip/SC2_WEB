import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import SubscribeToWeekMutation from './queries/SubscribeToWeekMutation';
import PayAllMutation from './queries/PayAllMutation';

@Injectable()
export class WeekService {
  constructor(private apolloClient: Apollo) { }

  weekIdToDate(weekId: number): Date {
    // seconds = weekId * days in a week * hours in a day * minutes in an hours * seconds in a minute * milliseconds in a second
    const seconds = weekId * 7 * 24 * 60 * 60 * 1000;

    const date = this.getStartOfWeek(new Date(seconds));

    return date;
  };

  getCurrentWeekId(): number {
    const startOfWeek = this.getStartOfWeek(new Date());

    return Math.ceil(startOfWeek.getTime() / 1000 / 60 / 60 / 24 / 7);
  };

  getStartOfWeek(week: Date): Date {
    const copy = new Date(week.valueOf());
    copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
    return copy;
  };

  isCurrentWeek(weekId: number): boolean {
    return this.getCurrentWeekId() === weekId;
  }

  isPreviousWeek(weekId: number): boolean {
    return (this.getCurrentWeekId() - 1) === weekId;
  }

  unSubToWeek(userId, weekId) {
    return this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: { userId, weekId, slices: 0 }
    }).toPromise();
  }

  subToWeek(userId, weekId) {
    return this.apolloClient.mutate({
      mutation: SubscribeToWeekMutation,
      variables: { userId, weekId, slices: 1 }
    }).toPromise();
  }

  markAllPaid(userId) {
    return this.apolloClient.mutate({
      mutation: PayAllMutation,
      variables: { userId }
    }).toPromise();
  }
}
