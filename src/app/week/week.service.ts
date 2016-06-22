import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Week } from './week.model';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';

@Injectable()
export class WeekService {

    private resourcePath = 'weeks';

    constructor(private client: HttpService<Week>) {}

    getAllWeeks(): Observable<Week[]> {
        return this.client.getAll(this.resourcePath);
    }

    getWeek(weekId: number): Observable<Week> {
        return this.client.getSingle(this.resourcePath, weekId.toString());
    }

    weekIdToDate(weekId: number): Date {
        // seconds = weekId * days in a week * hours in a day * minutes in an hours * seconds in a minute * milliseconds in a second
        const seconds = weekId * 7 * 24 * 60 * 60 * 1000;

        const date = this.getStartOfWeek(new Date(seconds));

        return date;
    };

    getCurrentWeekId(): number {
        const startOfWeek = this.getStartOfWeek(new Date());

        return Math.ceil(startOfWeek.getTime() / 1000 / 60 / 60 / 24 / 7);
    };

    getStartOfWeek(week: Date): Date {
        const copy = new Date(week.valueOf());
        copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
        return copy;
    };

    // updateLink(weekId: number, link: WeekUserLink): Observable<WeekUserLink> {
    //     return this.client.getAll();
    //     return this.http.post(`http://localhost:5000/api/weeks/${weekId}/link`, JSON.stringify(link), this.options)
    //         .map((res: Response) => res.json());
    // }

}

/*
 var service = this;

 var weeksCache = [];
 var weekUserLinkCache = [];

 service.getWeek = function(weekId, force) {
 if(weeksCache[weekId] && !force) {
 return $q.resolve(weeksCache[weekId]);
 }

 var promise = Restangular.one('week', weekId).get();
 promise.then(function(data) {
 weeksCache[weekId] = data;
 });

 return promise;
 };

 service.payWeek = function(weekId, paid) {
 var linkGetPromise = service.getSlicesForWeek(weekId);

 return linkGetPromise.then(function(weekLink) {
 weekLink.paid = paid ? 1 : 0;
 return Restangular.one('week', weekId).post('link', weekLink);
 }).then(function() {
 return service.getWeek(weekId, true);
 });
 };

 service.updatePlan = function(weekId, plan) {
 var linkGetPromise = service.getSlicesForWeek(weekId);

 return linkGetPromise.then(function(weekLink) {
 weekLink.slices = plan;
 return Restangular.one('week', weekId).post('link', weekLink);
 });
 }

 service.weekIdToDate = function(weekId) {
 // seconds = weekId * days in a week * hours in a day * minutes in an hours * seconds in a minute * milliseconds in a second
 var seconds = weekId * 7 * 24 * 60 * 60 * 1000;

 var date = service.getStartOfWeek(new Date(seconds));

 return date;
 };

 service.getCurrentWeekId = function() {
 var startOfWeek = service.getStartOfWeek(new Date());

 return Math.ceil(startOfWeek.getTime() / 1000 / 60 / 60 / 24 / 7);
 };

 service.getStartOfWeek = function(week) {
 var copy = new Date(week);
 copy.setDate(copy.getDate() - ((copy.getDay() + 6)%7));
 return copy;
 };

 service.getSlicesForWeek = function(weekId) {
 var linkGetPromise;
 linkGetPromise = Restangular.one('week', weekId).one('link').get()
 return linkGetPromise;
 };

 service.addSlice = function(weekId) {
 var linkGetPromise = service.getSlicesForWeek(weekId);

 return linkGetPromise.then(function(weekLink) {
 weekLink.slices++;
 return Restangular.one('week', weekId).post('link', weekLink);
 }).then(function() {
 return service.getWeek(weekId, true);
 });;
 };

 service.removeSlice = function(weekId) {
 var linkGetPromise = service.getSlicesForWeek(weekId);

 return linkGetPromise.then(function(weekLink) {
 weekLink.slices--;
 return Restangular.one('week', weekId).post('link', weekLink);
 }).then(function() {
 return service.getWeek(weekId, true);
 });
 };

 service.setShopperAsUser = function(weekId, userId) {
 service.getWeek(weekId).then(function(week) {
 week.shopper = userId;
 return Restangular.one('week', weekId).customPOST(week);
 }).then(function() {
 return service.getWeek(weekId);
 })
 };

 service.setCost = function(weekId, Cost) {
 service.getWeek(weekId).then(function(week) {
 week.Cost = Cost;
 return Restangular.one('week', weekId).customPOST(week);
 }).then(function() {
 return service.getWeek(weekId);
 })
 };
 */
