import { TestBed } from '@angular/core/testing';

import { LogsignServiceService } from './logsign-service.service';

describe('LogsignServiceService', () => {
  let service: LogsignServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsignServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
