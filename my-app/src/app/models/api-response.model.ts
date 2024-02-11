// src/app/models/api-response.model.ts

import { NewsArticle } from './new-article.model';

export interface ApiResponse {
  count: number;
  next: string;
  previous?: string;
  results: NewsArticle[];
}
