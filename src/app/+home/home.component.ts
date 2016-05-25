import { Component, OnInit } from '@angular/core';
import {WeekService} from "../week/week.service";
import {Week} from "../week/week.model";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
    providers: [WeekService]
})
export class HomeComponent implements OnInit {

  constructor(private weekService: WeekService) {}

  ngOnInit() {
  }

    loadWeeks() {
        this.weekService.getWeek(1).subscribe((a: Week[]) => a.map(b => console.log(b.Cost)));
    }

}
