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
import { WeekTileComponent } from './week-tile.component';
import { WeekService } from '../week/week.service';
import { HTTP_PROVIDERS } from '@angular/http';

describe('Component: WeekTile', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [WeekTileComponent, WeekService, HTTP_PROVIDERS]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([WeekTileComponent],
      (component: WeekTileComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(WeekTileComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(WeekTileComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <week-tile></week-tile>
  `,
  directives: [WeekTileComponent]
})
class WeekTileComponentTestController {
}

