import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { WeekService } from './week.service';

describe('Week Service', () => {
  beforeEachProviders(() => [WeekService]);

  it('should ...',
      inject([WeekService], (service: WeekService) => {
    expect(service).toBeTruthy();
  }));
});
