import { Component, OnInit, Input } from '@angular/core';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { User } from "../user/user.model";

@Component({
    moduleId: module.id,
    selector: 'user-tile',
    templateUrl: 'user-tile.component.html',
    styleUrls: ['user-tile.component.css'],
    directives: [ MD_CARD_DIRECTIVES, MD_SLIDE_TOGGLE_DIRECTIVES, MD_BUTTON_DIRECTIVES ]
})
export class UserTileComponent implements OnInit {

    @Input() user: User;

    constructor() { }

    ngOnInit() {
    }

}
