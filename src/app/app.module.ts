import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule, defaultApolloClient } from 'apollo-angular';
import { environment } from '../environments/environment';
import { FacebookService } from './facebook/facebook.service';
import { MaterialModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WeekService } from './week.service';

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
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(client),
    MaterialModule.forRoot(),
  ],
  providers: [
    FacebookService,
    WeekService,
    defaultApolloClient(client),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
