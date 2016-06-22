// Angular
import { Component, OnInit } from '@angular/core';

// NG2 Material
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { FacebookService } from '../facebook/facebook.service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    providers: [FacebookService]
})
export class LoginComponent implements OnInit {

    constructor(private fbService: FacebookService) {
    }

    onFacebookLoginClick() {
        this.fbService.login();
    }

    ngOnInit() {
        //this.fbService.getStatus();
    }
}
