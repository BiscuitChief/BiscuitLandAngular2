import { TestBed, inject } from '@angular/core/testing';

import { NavitemService } from './navitem.service';

describe('NavitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavitemService]
    });
  });

  it('should be created', inject([NavitemService], (service: NavitemService) => {
    expect(service).toBeTruthy();
  }));
});
