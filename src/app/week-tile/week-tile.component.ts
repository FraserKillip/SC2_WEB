import { Component, OnInit, Input } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';

import { Week } from '../week/week.model';
import { WeekService } from '../week/week.service';

@Component({
  moduleId: module.id,
  selector: 'week-tile',
  templateUrl: 'week-tile.component.html',
  styleUrls: ['week-tile.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class WeekTileComponent implements OnInit {

  @Input() week: Week;

  public weekDate: Date;

  constructor(private weekService: WeekService) {}

  ngOnInit() {
    // this.weekDate = this.weekService.weekIdToDate(this.week.Id);
  }

}
