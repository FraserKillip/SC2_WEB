import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/cache';
import { Observable } from 'rxjs/Observable';

import { FacebookService } from './facebook/facebook.service';

import { environment } from './environment';

@Injectable()
export class HttpService<T> {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  private fbObservable: Observable<any>;

  constructor(private fbService: FacebookService, private http: Http) {
    this.fbObservable = fbService.getStatus().do(response => {
      this.headers.append('Sandwich-Auth-Token', `facebook ${response.authResponse.accessToken}`);
    }).cache();
  }

  getAll(resourcePath: string): Observable<T[]> {
    return this.fbObservable.mergeMap((response) => {
      return this.http.get(`${environment.apiAddress}/${resourcePath}`, this.options)
    })
      .map((res: Response) => res.json());

  };

  getSingle(resourcePath: string, key: string): Observable<T> {
    return this.fbObservable.mergeMap((response) => {
      return this.http.get(`${environment.apiAddress}/${resourcePath}/${key}`, this.options);
    })
      .map((res: Response) => res.json());
  }

}
