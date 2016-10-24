import { Injectable } from '@angular/core';

@Injectable()
export default class WeekService {
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
}
