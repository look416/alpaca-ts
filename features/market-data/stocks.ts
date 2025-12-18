import { baseURLs, ClientContext, Feed, Nullable, Sort } from "./types.ts";

// ============================================================================
// Stock Bar Types
// ============================================================================

export type StockBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export type StocksBar = StockBar;

export type StocksBars = {
  bars: { [symbol: string]: StocksBar[] };
  next_page_token: Nullable<string>;
};

export type StocksBarsLatest = {
  bars: { [symbol: string]: StocksBar };
};

export type GetStocksBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  adjustment?: string;
  asof?: string;
  feed?: string;
  page_token?: string;
  sort?: string;
};

export type GetStocksBarsLatestOptions = {
  symbols: string;
  feed?: string;
  currency?: string;
};

// ============================================================================
// Stock Quote Types
// ============================================================================

export type StockQuote = {
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string[];
  z: string;
};

export type StocksQuotes = {
  quotes: { [symbol: string]: StockQuote[] };
  next_page_token: Nullable<string>;
};

export type StocksQuotesLatest = {
  quotes: { [symbol: string]: StockQuote };
};

export type GetStocksQuotesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  sip?: string;
  page_token?: string;
  sort?: Sort;
};

export type GetStocksQuotesLatestOptions = {
  symbols: string;
  feed?: string;
};

// ============================================================================
// Stock Trade Types
// ============================================================================

export type StockTrade = {
  t: string;
  p: number;
  s: number;
  c: string[];
  i: number;
  z: string;
};

export type StocksTrades = {
  trades: { [symbol: string]: StockTrade[] };
  next_page_token: Nullable<string>;
};

export type StocksTradesLatest = {
  trades: { [symbol: string]: StockTrade };
};

export type GetStocksTradesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  sip?: string;
  page_token?: string;
  sort?: Sort;
};

export type GetStocksTradesLatestOptions = {
  symbols: string;
  feed?: Feed;
  sip?: string;
};

// ============================================================================
// Stock Snapshot Types
// ============================================================================

export type StockSnapshot = {
  latest_trade: StockTrade;
  latest_quote: StockQuote;
  minute_bar: StockBar;
  daily_bar: StockBar;
  prev_daily_bar: StockBar;
};

export type StockSnapshots = {
  snapshots: {
    [symbol: string]: StockSnapshot;
  };
};

export type GetStocksSnapshotsOptions = {
  symbols: string;
  feed?: Feed;
  sip?: string;
};

// ============================================================================
// Stock Auction Types
// ============================================================================

export type StocksAuctionPrice = {
  c: string;
  p: number;
  t: string;
  x: string;
};

export type StocksAuction = {
  d: string;
  o: StocksAuctionPrice[];
  c: StocksAuctionPrice[];
};

export type StocksAuctions = {
  auctions: { [symbol: string]: StocksAuction[] };
  next_page_token: Nullable<string>;
};

export type GetStocksAuctionsOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  page_token?: string;
  sort?: string;
};

// ============================================================================
// Stock Meta Types
// ============================================================================

export type StocksConditions = {
  conditions: { [code: string]: string };
};

export type GetStocksConditionsOptions = {
  tickType: string;
  tape: string;
};

export type StocksExchangeCodes = {
  exchanges: { [code: string]: string };
};

// ============================================================================
// Stock Bars Functions
// ============================================================================

export const getStocksBars =
  (context: ClientContext) => (params: GetStocksBarsOptions) =>
    context.request<StocksBars>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/bars",
      method: "GET",
      params,
    });

export const getStocksBarsLatest =
  (context: ClientContext) => (params: GetStocksBarsLatestOptions) =>
    context.request<StocksBarsLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/bars/latest",
      method: "GET",
      params,
    });

// ============================================================================
// Stock Quotes Functions
// ============================================================================

export const getStocksQuotes =
  (context: ClientContext) => (params: GetStocksQuotesOptions) =>
    context.request<StocksQuotes>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/quotes",
      method: "GET",
      params,
    });

export const getStocksQuotesLatest =
  (context: ClientContext) => (params: GetStocksQuotesLatestOptions) =>
    context.request<StocksQuotesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/quotes/latest",
      method: "GET",
      params,
    });

// ============================================================================
// Stock Trades Functions
// ============================================================================

export const getStocksTrades =
  (context: ClientContext) => (params: GetStocksTradesOptions) =>
    context.request<StocksTrades>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/trades",
      method: "GET",
      params,
    });

export const getStocksTradesLatest =
  (context: ClientContext) => (params: GetStocksTradesLatestOptions) =>
    context.request<StocksTradesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/trades/latest",
      method: "GET",
      params,
    });

// ============================================================================
// Stock Snapshots Function
// ============================================================================

export const getStocksSnapshots =
  (context: ClientContext) => (params: GetStocksSnapshotsOptions) =>
    context.request<StockSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/snapshots",
      method: "GET",
      params,
    });

// ============================================================================
// Stock Auctions Function
// ============================================================================

export const getStocksAuctions =
  (context: ClientContext) => (params: GetStocksAuctionsOptions) =>
    context.request<StocksAuctions>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/auctions",
      method: "GET",
      params,
    });

// ============================================================================
// Stock Meta Functions
// ============================================================================

export const getStocksConditions =
  (context: ClientContext) => (params: GetStocksConditionsOptions) =>
    context.request<StocksConditions>({
      baseURL: baseURLs.marketData,
      path: `/v2/stocks/meta/conditions/${params.tickType}`,
      method: "GET",
      params: { tape: params.tape },
    });

export const getStocksExchangeCodes = (context: ClientContext) => () =>
  context.request<StocksExchangeCodes>({
    baseURL: baseURLs.marketData,
    path: "/v2/stocks/meta/exchanges",
    method: "GET",
  });
