import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { NewsArticle } from '../models/new-article.model';
import { PageEvent } from '@angular/material/paginator';
import { ApiResponse } from '../models/api-response.model';
import { FavoritesService } from '../favorites.service';
import { FavoriteNews } from '../models/Favorite-News';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalNewsItems = 0; 
  pageSize = 10; 
  currentPage = 0; 
  newsArticles: NewsArticle[] = [];
  filteredNewsArticles: NewsArticle[] = [];
  searchQuery: string = ''; 
  sort: string = ''; 
  sortOrder: string = 'latest'; 
  constructor(private newsService: NewsService, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.fetchNews(0, this.pageSize); 
  }
  
  onDateSortChange(sortValue: string) {
    this.sortOrder = sortValue;
    this.filterAndSortNews(); 
  }

  filterAndSortNews() {
    let filtered = this.newsArticles.filter(article => {
    
      const queryLower = this.searchQuery.toLowerCase();
      
    
      const isDateQuery = /^\d{4}-\d{2}-\d{2}$/.test(queryLower);
      
      if (isDateQuery) {
    
        const articleDate = article.published_at.split('T')[0];
        return articleDate === queryLower;
      } else {
  
        return article.title.toLowerCase().includes(queryLower);
      }

      
    });
  
    filtered.sort((a, b) => {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);
      return this.sortOrder === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    this.filteredNewsArticles = filtered;
  }
  
  onOtherSortChange(newSort: string) {
    this.sort = newSort;
    this.filterAndSortNews(); 
  }
  
  onSearch(query: string) {
    this.searchQuery = query;
    this.filterAndSortNews(); 
  }
  
  fetchNews(offset: number, pageSize: number) {
   
    this.newsService.getLatestNews(offset, pageSize).subscribe(
      (response: ApiResponse) => {
        this.newsArticles = response.results;
        this.totalNewsItems = response.count;
        this.filterAndSortNews(); 
      },
      error => {

      }
    );
  }
  
  changePage(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.fetchNews(offset, this.pageSize);
  }
  
  formatDateToBackend(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('.')[0]; 
  }

  addToFavorites(article: NewsArticle): void {
    const favoriteToAdd: FavoriteNews = {
      id: null,
      title: article.title,
      content: article.summary, 
      summary: article.summary,
      url: article.url,
      imageUrl: article.image_url, 
      news_site: article.news_site,
      savedAt: Date.now().toString(), 
      published_at: this.formatDateToBackend(article.published_at),
    };
  
    this.favoritesService.createFavorite(favoriteToAdd).subscribe({
      next: (response) => {
        console.log('Article added to favorites successfully', response);
      },
      error: (error) => {
        console.error('Error adding article to favorites', error);
      }
    });
  }
  
}
