import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule, defaultApolloClient } from 'apollo-angular';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { FacebookService } from './facebook/facebook.service';
import { MaterialModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { WeekService } from './week.service';
import { HomeComponent } from './home/home.component';
import { WeekListComponent } from './week-list/week-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

const networkInterface = createNetworkInterface({ uri: `${environment.apiAddress}/graphql` });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers['Sandwich-Auth-Token'] = localStorage.getItem('token') || null;
    next();
  }
}]);

networkInterface.useAfter([{
  applyAfterware({response}, next) {
    if (response.status === 401) {
      window.location.pathname = '/login';
    }
    next();
  }
}]);

export function client() {
  return new ApolloClient({
    networkInterface: networkInterface,
    dataIdFromObject: (o: any) => {
      let key;
      switch (o.__typename) {
        case 'user':
          key = `${o.__typename}-${o.userId},`;
          break;
        case 'week':
          key = `${o.__typename}-${o.weekId},`;
          break;
        case 'weekUserLink':
          key = `${o.__typename}-${o.weekId}-${o.userId},`;
          break;
        default:
          key = `${o.__typename}-${o.id},`;
          break;
      }

      return key;
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WeekListComponent,
    ShoppingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(client),
    MaterialModule,
  ],
  providers: [
    FacebookService,
    WeekService,
    defaultApolloClient(client),
    { provide: LOCALE_ID, useValue: 'languages' in navigator && navigator['languages'].length > 0 ? navigator['languages'][0] : 'en-NZ' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
