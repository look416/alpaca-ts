import { baseURLs, ClientContext, Sort } from "./types.ts";

// ============================================================================
// Forex Rate Types
// ============================================================================

export type ForexRate = {
  bp: number;
  mp: number;
  ap: number;
  t: string;
};

export type ForexRates = {
  next_page_token: string;
  rates: {
    [currencyPair: string]: ForexRate[];
  };
};

export type ForexRatesLatest = {
  rates: {
    [currencyPair: string]: ForexRate;
  };
};

export type GetForexRatesOptions = {
  currency_pairs: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  sort?: Sort;
  page_token?: string;
};

export type GetForexRatesLatestOptions = {
  currency_pairs: string;
};

// ============================================================================
// Forex Functions
// ============================================================================

export const getForexRates =
  (context: ClientContext) => (params: GetForexRatesOptions) =>
    context.request<ForexRates>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/forex/rates",
      method: "GET",
      params,
    });

export const getLatestForexRates =
  (context: ClientContext) => (params: GetForexRatesLatestOptions) =>
    context.request<ForexRatesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/forex/latest/rates",
      method: "GET",
      params,
    });
