import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserTileComponent } from './user-tile.component';
import { WeekService } from '../week/week.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from  '@angular2-material/icon';

describe('Component: UserTile', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [UserTileComponent, WeekService, HTTP_PROVIDERS, MdIconRegistry]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([UserTileComponent],
      (component: UserTileComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(UserTileComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(UserTileComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <user-tile></user-tile>
  `,
  directives: [UserTileComponent]
})
class UserTileComponentTestController {
}

