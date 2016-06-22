// Angular
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES} from '@angular/router';

// NG2 Material
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

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
    providers: [WeekService, UserService, MdIconRegistry],
    directives: [
        UserTileComponent,
        WeekTileComponent,
        MdToolbar,
        MdButton,
        MD_SIDENAV_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MdIcon,
        ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    private currentWeekId: number;
    public week: Observable<Week>;
    public users: User[];

    constructor(private weekService: WeekService, private userService: UserService) {
        this.currentWeekId = weekService.getCurrentWeekId();
    }

    ngOnInit() {
        this.week = this.weekService.getWeek(this.currentWeekId); // .subscribe((a: Week) => this.week = a);
        this.userService.getAllUsers().subscribe((u: User[]) => this.users = u);
    }

    linkUpdated(event) {
        // this.weekService.updateLink(this.currentWeekId, event.value).subscribe(a => console.log(a));
    }
}
