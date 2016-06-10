// Angular
import { Component, OnInit } from '@angular/core';

// User
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserTileComponent } from '../user-tile';

// Week
import { Week, WeekService } from '../week/index';
import { WeekTileComponent } from '../week-tile';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [WeekService, UserService],
    directives: [UserTileComponent, WeekTileComponent]
})
export class HomeComponent implements OnInit {
    private currentWeekId: number;
    public week: Week;
    public users: User[];

    constructor(private weekService: WeekService, private userService: UserService) {
        this.currentWeekId = weekService.getCurrentWeekId();
    }

    ngOnInit() {
        this.weekService.getWeek(this.currentWeekId).subscribe((a: Week) => this.week = a);
        this.userService.getAllUsers().subscribe((u:User[]) => this.users = u);
    }

    loadWeeks() {
        this.weekService.getWeek(++this.currentWeekId).subscribe((a: Week) => this.week = a);
    }

}
