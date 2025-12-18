import { baseURLs, ClientContext } from "./types.ts";

// ============================================================================
// Most Actives Types
// ============================================================================

export type MostActive = {
  symbol: string;
  volume: number;
  trade_count: number;
};

export type MostActives = {
  most_actives: MostActive[];
  last_updated: string;
};

export type GetStocksMostActivesOptions = {
  by?: string;
  top?: number;
};

// ============================================================================
// Market Movers Types
// ============================================================================

export type MarketMover = {
  symbol: string;
  percent_change: number;
  change: number;
  price: number;
};

export type MarketMovers = {
  gainers: MarketMover[];
  losers: MarketMover[];
  market_type: string;
  last_updated: string;
};

export type GetStocksMarketMoversOptions = {
  by?: string;
  top?: number;
};

// ============================================================================
// Screener Functions
// ============================================================================

export const getStocksMostActives =
  (context: ClientContext) => (params: GetStocksMostActivesOptions) =>
    context.request<MostActives>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/screener/stocks/most-actives",
      method: "GET",
      params,
    });

export const getStocksMarketMovers =
  (context: ClientContext) => (params: GetStocksMarketMoversOptions) =>
    context.request<MarketMovers>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/screener/stocks/movers",
      method: "GET",
      params,
    });
