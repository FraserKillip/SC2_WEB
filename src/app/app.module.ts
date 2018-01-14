import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { FacebookService } from './facebook/facebook.service';
import { LoginComponent } from './login/login.component';
import { WeekService } from './week.service';
import { HomeComponent } from './home/home.component';
import { WeekListComponent } from './week-list/week-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WeekListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    FacebookService,
    WeekService,
    {
      provide: LOCALE_ID,
      useValue:
        'languages' in navigator && navigator['languages'].length > 0
          ? navigator['languages'][0]
          : 'en-NZ'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({ uri: `${environment.apiAddress}/graphql` });

    const middleware = setContext(() => ({
      headers: new HttpHeaders().set(
        'Sandwich-Auth-Token',
        localStorage.getItem('token') || ''
      )
    }));

    const error = onError(({ networkError, graphQLErrors }) => {
      console.error(networkError);

      window.location.pathname = '/login';
    });

    const link = middleware.concat(error).concat(http);

    apollo.create({
      link,
      cache: new InMemoryCache({
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
      })
    });
  }
}
