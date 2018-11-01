import { TestBed, inject } from '@angular/core/testing';

import { ConversasService } from './conversas.service';

describe('ConversasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversasService]
    });
  });

  it('should be created', inject([ConversasService], (service: ConversasService) => {
    expect(service).toBeTruthy();
  }));
});
