import { TestBed } from '@angular/core/testing';

import { EcosistemaService } from './ecosistema.service';

describe('EcosistemaService', () => {
  let service: EcosistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
