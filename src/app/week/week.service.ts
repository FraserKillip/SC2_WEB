import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Week } from "./week.model";
import { WeekUserLink } from './weekUserLink.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeekService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getAllWeeks(): Observable<Week[]> {
        return this.http.get('http://localhost:5000/api/weeks')
            .map((res: Response) => res.json());
    }

    getWeek(weekId: number, force = false): Observable<Week> {
        return this.http.get(`http://localhost:5000/api/weeks/${weekId}`)
            .map((res: Response) => res.json());
    }

    weekIdToDate(weekId: number): Date {
        // seconds = weekId * days in a week * hours in a day * minutes in an hours * seconds in a minute * milliseconds in a second
        var seconds = weekId * 7 * 24 * 60 * 60 * 1000;

        var date = this.getStartOfWeek(new Date(seconds));

        return date;
    };

    getCurrentWeekId(): number {
        var startOfWeek = this.getStartOfWeek(new Date());

        return Math.ceil(startOfWeek.getTime() / 1000 / 60 / 60 / 24 / 7);
    };

    getStartOfWeek(week: Date): Date {
        var copy = new Date(week.valueOf());
        copy.setDate(copy.getDate() - ((copy.getDay() + 6)%7));
        return copy;
    };

    updateLink(weekId: number, link: WeekUserLink): Observable<WeekUserLink> {
        return this.http.post(`http://localhost:5000/api/weeks/${weekId}/link`, JSON.stringify(link), this.options)
            .map((res: Response) => res.json());
    }

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