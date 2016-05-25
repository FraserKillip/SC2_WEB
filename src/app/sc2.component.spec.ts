import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SC2AppComponent } from '../app/sc2.component';

beforeEachProviders(() => [SC2AppComponent]);

describe('App: SC2', () => {
  it('should create the app',
      inject([SC2AppComponent], (app: SC2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'sc2 works!\'',
      inject([SC2AppComponent], (app: SC2AppComponent) => {
    expect(app.title).toEqual('sc2 works!');
  }));
});
