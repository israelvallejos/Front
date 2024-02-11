import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, BrowserAnimationsModule], 
      providers: [FavoritesService]
    });
    service = TestBed.inject(FavoritesService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
