// In favorites.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../favorites.service';
import { of } from 'rxjs';
import { FavoriteNews } from '../models/Favorite-News'; 
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getAllFavorites']);

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ],
      imports: [HttpClientTestingModule, FormsModule, MatCardModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    const dummyFavorites: FavoriteNews[] = [
      {
        title: 'Test News 1',
        content: 'Content for Test News 1',
        summary: 'Summary for Test News 1',
        url: 'https://example.com/test-news-1',
        news_site: 'Test News Site 1',
        imageUrl: 'https://example.com/image1.jpg',
        published_at: '2021-01-01T00:00:00Z',
        savedAt: '2021-01-01T00:00:00Z',
      },
      {
        title: 'Test News 2',
        content: 'Content for Test News 2',
        summary: 'Summary for Test News 2',
        url: 'https://example.com/test-news-2',
        news_site: 'Test News Site 2',
        imageUrl: 'https://example.com/image2.jpg',
        published_at: '2021-01-02T00:00:00Z',
        savedAt: '2021-01-02T00:00:00Z',
      }
    ];

    favoritesServiceSpy.getAllFavorites.and.returnValue(of(dummyFavorites));

    fixture.detectChanges(); 

    expect(component.allFavorites).toEqual(dummyFavorites); 
    expect(favoritesServiceSpy.getAllFavorites).toHaveBeenCalled();
  });

});
