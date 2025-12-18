import { baseURLs, ClientContext, Nullable, Sort } from "./types.ts";

// ============================================================================
// Crypto Bar Types
// ============================================================================

export type CryptoBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export type CryptoBars = {
  bars: {
    [symbol: string]: CryptoBar[];
  };
  next_page_token: Nullable<string>;
};

export type CryptoBarsLatest = {
  bars: { [symbol: string]: CryptoBar };
};

export type GetCryptoBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type GetCryptoBarsLatestOptions = {
  loc: string;
  symbols: string;
};

// ============================================================================
// Crypto Quote Types
// ============================================================================

export type CryptoQuote = {
  t: string;
  bp: number;
  bs: number;
  ap: number;
  as: number;
};

export type CryptoQuotes = {
  quotes: {
    [symbol: string]: CryptoQuote[];
  };
  next_page_token: Nullable<string>;
};

export type CryptoQuotesLatest = {
  quotes: { [symbol: string]: CryptoQuote };
};

export type GetCryptoQuotesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type GetCryptoQuotesLatestOptions = {
  loc: string;
  symbols: string;
};

// ============================================================================
// Crypto Trade Types
// ============================================================================

export type CryptoTrade = {
  t: string;
  p: number;
  s: number;
  tks: string;
  i: number;
};

export type CryptoTrades = {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: Nullable<string>;
};

export type CryptoTradesLatest = {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: Nullable<string>;
};

export type GetCryptoTradesOptions = {
  loc: string;
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: string;
};

export type GetCryptoTradesLatestOptions = {
  loc: string;
  symbols: string;
};

// ============================================================================
// Crypto Orderbook Types
// ============================================================================

export type CryptoOrderbookEntry = {
  p: number;
  s: number;
};

export type CryptoOrderbook = {
  t: string;
  b: CryptoOrderbookEntry[];
  a: CryptoOrderbookEntry[];
};

export type CryptoOrderbooksLatest = {
  orderbooks: { [symbol: string]: CryptoOrderbook };
};

export type GetCryptoOrderbooksLatestOptions = {
  loc: string;
  symbols: string;
};

// ============================================================================
// Crypto Snapshot Types
// ============================================================================

export type CryptoSnapshot = {
  daily_bar: CryptoBar;
  latest_quote: CryptoQuote;
  latest_trade: CryptoTrade;
  minute_bar: CryptoBar;
  prev_daily_bar: CryptoBar;
};

export type CryptoSnapshots = {
  snapshots: {
    [symbol: string]: CryptoSnapshot;
  };
};

export type GetCryptoSnapshotsOptions = {
  loc: string;
  symbols: string;
};

// ============================================================================
// Crypto Bars Functions
// ============================================================================

export const getCryptoBars =
  (context: ClientContext) => (params: GetCryptoBarsOptions) =>
    context.request<CryptoBars>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/bars",
      method: "GET",
      params,
    });

export const getLatestCryptoBars =
  (context: ClientContext) => (params: GetCryptoBarsLatestOptions) =>
    context.request<CryptoBarsLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/bars`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

// ============================================================================
// Crypto Quotes Functions
// ============================================================================

export const getCryptoQuotes =
  (context: ClientContext) => (params: GetCryptoQuotesOptions) =>
    context.request<CryptoQuotes>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/quotes",
      method: "GET",
      params,
    });

export const getCryptoQuotesLatest =
  (context: ClientContext) => (params: GetCryptoQuotesLatestOptions) =>
    context.request<CryptoQuotesLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/quotes`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

// ============================================================================
// Crypto Trades Functions
// ============================================================================

export const getCryptoTrades =
  (context: ClientContext) => (params: GetCryptoTradesOptions) =>
    context.request<CryptoTrades>({
      baseURL: baseURLs.marketData,
      path: "/v1beta3/crypto/:loc/trades",
      method: "GET",
      params,
    });

export const getCryptoTradesLatest =
  (context: ClientContext) => (params: GetCryptoTradesLatestOptions) =>
    context.request<CryptoTradesLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/trades`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

// ============================================================================
// Crypto Orderbooks Function
// ============================================================================

export const getLatestCryptoOrderbooks =
  (context: ClientContext) => (params: GetCryptoOrderbooksLatestOptions) =>
    context.request<CryptoOrderbooksLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/orderbooks`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

// ============================================================================
// Crypto Snapshots Function
// ============================================================================

export const getCryptoSnapshots =
  (context: ClientContext) => (params: GetCryptoSnapshotsOptions) =>
    context.request<CryptoSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/snapshots",
      method: "GET",
      params,
    });
