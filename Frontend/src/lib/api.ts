import { apiRequest } from "./queryClient";
import type { Article, Category } from "@shared/schema";

export const api = {
  // Articles
  getArticles: async (category?: Category, limit?: number, offset?: number): Promise<Article[]> => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    
    const response = await apiRequest("GET", `/api/articles?${params.toString()}`);
    return response.json();
  },

  getArticle: async (id: string): Promise<Article> => {
    const response = await apiRequest("GET", `/api/articles/${id}`);
    return response.json();
  },

  getFeaturedArticle: async (): Promise<Article> => {
    const response = await apiRequest("GET", "/api/featured");
    return response.json();
  },

  getTrendingArticles: async (limit?: number): Promise<Article[]> => {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    
    const response = await apiRequest("GET", `/api/trending?${params.toString()}`);
    return response.json();
  },

  searchArticles: async (query: string): Promise<Article[]> => {
    const params = new URLSearchParams({ q: query });
    const response = await apiRequest("GET", `/api/search?${params.toString()}`);
    return response.json();
  },

  subscribeNewsletter: async (email: string): Promise<{ message: string }> => {
    const response = await apiRequest("POST", "/api/newsletter", { email });
    return response.json();
  },
};
