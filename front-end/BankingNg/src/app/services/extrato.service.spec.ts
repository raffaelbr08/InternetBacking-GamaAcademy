import { TestBed, inject } from '@angular/core/testing';

import { ExtratoService } from './extrato.service';

describe('ExtratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtratoService]
    });
  });

  it('should be created', inject([ExtratoService], (service: ExtratoService) => {
    expect(service).toBeTruthy();
  }));
});
