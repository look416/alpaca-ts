import { baseURLs, ClientContext, Nullable } from "./types.ts";

// ============================================================================
// News Types
// ============================================================================

export type NewsArticleImageSize = "thumb" | "small" | "large";

export type NewsArticleImage = {
  size: NewsArticleImageSize;
  url: string;
};

export type NewsArticle = {
  id: number;
  headline: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary: string;
  content: string;
  url: Nullable<string>;
  images: NewsArticleImage[];
  symbols: string[];
  source: string;
};

export type News = {
  news: NewsArticle[];
  next_page_token: Nullable<string>;
};

export type GetNewsOptions = {
  start?: string;
  end?: string;
  sort?: string;
  symbols?: string;
  limit?: number;
  include_content?: boolean;
  exclude_contentless?: boolean;
  page_token?: string;
};

// ============================================================================
// News Function
// ============================================================================

export const getNews = (context: ClientContext) => (params: GetNewsOptions) =>
  context.request<News>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/news",
    method: "GET",
    params,
  });
