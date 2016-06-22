import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from '@angular/common';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from  '@angular2-material/icon';

import { WeekUserLink } from '../week/weekUserLink.model';
import { WeekService } from '../week/week.service';

@Component({
    moduleId: module.id,
    selector: 'user-tile',
    templateUrl: 'user-tile.component.html',
    styleUrls: ['user-tile.component.css'],
    directives: [ MD_CARD_DIRECTIVES, MD_SLIDE_TOGGLE_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES, NgClass ]
})
export class UserTileComponent implements OnInit {

    @Input() link: WeekUserLink;

    @Output() linkUpdated = new EventEmitter();

    constructor(private weekService: WeekService) { }

    ngOnInit() {
    }

    didClick() {
        this.link.Slices = this.link.Slices > 0 ? 0 : 1;
        this.linkUpdated.emit({
            value: this.link
        });
    }

}
