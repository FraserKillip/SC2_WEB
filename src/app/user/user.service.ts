import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from "./user.model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get('http://localhost:5000/api/users')
            .map((res: Response) => res.json());
    }

    getUser(userId: number, force = false): Observable<User> {
        return this.http.get(`http://localhost:5000/api/users/${userId}`)
            .map((res: Response) => res.json());
    }
}
