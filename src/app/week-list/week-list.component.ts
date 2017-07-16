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

  unSubToWeek(weekId) {
    this.weekService.unSubToWeek(this.me.userId, weekId)
      .then(() => this.onChange.emit());
  }

  subToWeek(weekId) {
    this.weekService.subToWeek(this.me.userId, weekId)
      .then(() => this.onChange.emit());
  }

  isSubbedToWeek(week) {
    const weekLink = this.getWeekLinkForWeek(week);

    return weekLink == null || weekLink.slices <= 0;
  }

  amountPaidForWeek(week): number {
    const weekLink = this.getWeekLinkForWeek(week);

    return weekLink != null ? weekLink.paid : 0;
  }

  hasPaidForWeek(week) {
    return this.amountPaidForWeek(week) > 0;
  }

  getWeekLinkForWeek(week) {
    return week.users.find(l => l.userId === this.me.userId);
  }
}
