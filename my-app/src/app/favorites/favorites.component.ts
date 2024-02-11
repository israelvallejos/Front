import { Component, OnInit } from '@angular/core';
import { FavoriteNews } from '../models/Favorite-News';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  allFavorites: FavoriteNews[] = [];  
  displayedFavorites: FavoriteNews[] = [];  
  searchQuery: string = '';
  sortOrder: string = 'latest';  

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getAllFavorites().subscribe({
      next: (data) => {
        this.allFavorites = data; 
        this.applyFilterAndSort();  
      },
      error: (error) => {
        console.error('There was an error fetching the favorites:', error);
      }
    });
  }

  applyFilterAndSort(): void {
    let filtered = this.allFavorites.filter(favorite =>
      favorite.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.savedAt);
      const dateB = new Date(b.savedAt);
      return this.sortOrder === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    this.displayedFavorites = filtered.slice(0, 10); 
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value;
    this.applyFilterAndSort();
  }

  onSearchChange(): void {
    this.applyFilterAndSort();
  }

}

