import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SC2AppComponent, APP_ROUTER_PROVIDERS, environment } from './app/';


if (environment.production) {
  enableProdMode();
}

bootstrap(SC2AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
]);
