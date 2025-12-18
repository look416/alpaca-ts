import { baseURLs, ClientContext, Nullable, Sort } from "./types.ts";

// ============================================================================
// Option Bar Types
// ============================================================================

export type OptionBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export type OptionsBars = {
  bars: OptionBar[];
  next_page_token: Nullable<string>;
};

export type GetOptionsBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

// ============================================================================
// Options Trade Types
// ============================================================================

export type OptionsSnapshotsTrade = {
  t: string;
  x: string;
  p: number;
  s: number;
  c: string;
};

export type OptionsTrades = {
  trades: {
    [symbol: string]: OptionsSnapshotsTrade[];
  };
  next_page_token: Nullable<string>;
};

export type OptionsTradesLatest = {
  trades: {
    [symbol: string]: OptionsSnapshotsTrade[];
  };
  next_page_token: Nullable<string>;
};

export type GetOptionsTradesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type GetOptionsTradesLatestOptions = {
  symbols: string;
  feed?: string;
};

// ============================================================================
// Options Quote Types
// ============================================================================

export type OptionsSnapshotsQuote = {
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string;
};

// ============================================================================
// Options Snapshot Types
// ============================================================================

export type OptionsSnapshot = {
  latest_trade: OptionsSnapshotsTrade;
  latest_quote: OptionsSnapshotsQuote;
};

export type OptionsSnapshots = {
  snapshots: {
    [symbol: string]: OptionsSnapshot;
  };
};

export type GetOptionsSnapshotsOptions = {
  symbols: string;
  feed?: string;
};

// ============================================================================
// Options Meta Types
// ============================================================================

export type OptionsExchanges = {
  [exchangeCode: string]: string;
};

// ============================================================================
// Options Bars Function
// ============================================================================

export const getOptionsBars =
  (context: ClientContext) => (params: GetOptionsBarsOptions) =>
    context.request<OptionsBars>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/bars",
      method: "GET",
      params,
    });

// ============================================================================
// Options Trades Functions
// ============================================================================

export const getOptionsTrades =
  (context: ClientContext) => (params: GetOptionsTradesOptions) =>
    context.request<OptionsTrades>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/trades",
      method: "GET",
      params,
    });

export const getOptionsTradesLatest =
  (context: ClientContext) => (params: GetOptionsTradesLatestOptions) =>
    context.request<OptionsTradesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/trades/latest",
      method: "GET",
      params,
    });

// ============================================================================
// Options Snapshots Function
// ============================================================================

export const getOptionsSnapshots =
  (context: ClientContext) => (params: GetOptionsSnapshotsOptions) =>
    context.request<OptionsSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/snapshots",
      method: "GET",
      params,
    });

// ============================================================================
// Options Meta Function
// ============================================================================

export const getOptionsExchanges = (context: ClientContext) => () =>
  context.request<OptionsExchanges>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/options/meta/exchanges",
    method: "GET",
  });
