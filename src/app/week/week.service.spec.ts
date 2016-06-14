import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
} from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';


import { WeekService } from './week.service';

describe('Week Service', () => {
  beforeEachProviders(() => [WeekService, HTTP_PROVIDERS]);

  it('should ...',
      inject([WeekService], (service: WeekService) => {
    expect(service).toBeTruthy();
  }));
});
