// Angular
import { Component, OnInit } from '@angular/core';

// User
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { UserTileComponent } from '../user-tile/user-tile.component';

// Week
import { WeekService } from '../week/week.service';
import { Week } from '../week/week.model';
import { WeekTileComponent } from '../week-tile/week-tile.component';

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
