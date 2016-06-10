import { Component, OnInit, Input } from '@angular/core';
import {NgClass} from '@angular/common';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from  '@angular2-material/icon';

import { User } from "../user/user.model";

@Component({
    moduleId: module.id,
    selector: 'user-tile',
    templateUrl: 'user-tile.component.html',
    styleUrls: ['user-tile.component.css'],
    directives: [ MD_CARD_DIRECTIVES, MD_SLIDE_TOGGLE_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES, NgClass ]
})
export class UserTileComponent implements OnInit {

    public selected: boolean = false;

    @Input() user: User;

    constructor() { }

    ngOnInit() {
    }

    didClick() {
        this.selected = !this.selected;
    }

}
