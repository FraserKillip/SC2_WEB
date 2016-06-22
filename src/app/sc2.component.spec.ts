import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Router} from '@angular/router';
import { SC2AppComponent } from '../app/sc2.component';

beforeEachProviders(() => [SC2AppComponent, Router]);

describe('App: SC2', () => {
  it('should create the app',
      inject([SC2AppComponent], (app: SC2AppComponent) => {
    expect(app).toBeTruthy();
  }));
});
