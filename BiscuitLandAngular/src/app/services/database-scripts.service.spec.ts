import { TestBed, inject } from '@angular/core/testing';

import { DatabaseScriptsService } from './database-scripts.service';

describe('DatabaseScriptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseScriptsService]
    });
  });

  it('should be created', inject([DatabaseScriptsService], (service: DatabaseScriptsService) => {
    expect(service).toBeTruthy();
  }));
});
