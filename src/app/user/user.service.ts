import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';

@Injectable()
export class UserService {

    private resourcePath = 'users';

    constructor(private client: HttpService<User>) {}

    getAllUsers(): Observable<User[]> {
        return this.client.getAll(this.resourcePath);
    }

    getUser(userId: number): Observable<User> {
        return this.client.getSingle(this.resourcePath, userId.toString());
    }
}
