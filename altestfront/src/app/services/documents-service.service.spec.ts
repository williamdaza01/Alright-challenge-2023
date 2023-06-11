import { TestBed } from '@angular/core/testing';

import { DocumentsServiceService } from './documents-service.service';

describe('DocumentsServiceService', () => {
  let service: DocumentsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
