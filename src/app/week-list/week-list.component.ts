import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WeekService } from '../week.service';

@Component({
  selector: 'sc-week-list',
  templateUrl: './week-list.component.html',
  styleUrls: ['./week-list.component.less']
})
export class WeekListComponent implements OnInit {

  @Input() weeks;
  @Input() me;
  @Output() onChange = new EventEmitter();

  currentWeekId: number;

  constructor(public weekService: WeekService) { }

  ngOnInit() {
    this.currentWeekId = this.weekService.getCurrentWeekId();
  }

  numMembersJoined(week) {
    if (week.cost <= 0 || week.costPerUser <= 0) {
      return 0;
    }

    return Math.round(week.cost / week.costPerUser);
  }

  unSubToWeek(weekId) {
    this.weekService.unSubToWeek(this.me.userId, weekId)
      .then(() => this.onChange.emit());
  }

  subToWeek(weekId) {
    this.weekService.subToWeek(this.me.userId, weekId)
      .then(() => this.onChange.emit());
  }

  isSubbedToWeek(weekId) {
    const weekLink = this.getWeekLinkForWeek(weekId);

    return weekLink == null || weekLink.slices <= 0;
  }

  amountPayedForWeek(weekId) {
    const weekLink = this.getWeekLinkForWeek(weekId);

    return weekLink != null ? weekLink.paid : 0;
  }

  hasPayedForWeek(weekId) {
    return this.amountPayedForWeek(weekId) > 0;
  }

  getWeekLinkForWeek(weekId) {
    if (this.me == null || this.me.weeks == null) {
      return null;
    }

    return this.me.weeks.find(w => w.weekId === weekId);
  }
}
