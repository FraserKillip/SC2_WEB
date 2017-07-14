import { Component, OnInit, Input } from '@angular/core';

import { WeekService } from '../week.service';

@Component({
  selector: 'sc-week-card',
  templateUrl: './week-card.component.html',
  styleUrls: ['./week-card.component.less']
})
export class WeekCardComponent implements OnInit {

  @Input() weekLink;
  currentWeekId: number;

  constructor(public weekService: WeekService) { }

  ngOnInit() {
    console.log(this.weekLink.week);
    this.currentWeekId = this.weekService.getCurrentWeekId();
  }

}
