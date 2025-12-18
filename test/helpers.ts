import { mockFetch, MockResponse } from "../util/mockFetch.ts";
import { createClient, Client } from "../factory/createClient.ts";

/**
 * Creates a test client with mocked fetch
 * Returns the client and a function to restore the original fetch
 */
export function createTestClient(mockResponse: MockResponse): {
  client: Client;
  restore: () => void;
} {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockFetch(mockResponse) as typeof fetch;

  const client = createClient({
    key: "TEST_KEY_ID",
    secret: "TEST_KEY_SECRET",
    tokenBucket: {
      capacity: 1000,
      fillRate: 1000,
    },
  });

  return {
    client,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

/**
 * Mock account data for testing
 */
export const mockAccount = {
  id: "test-account-id",
  account_number: "123456789",
  status: "ACTIVE",
  currency: "USD",
  cash: "100000.00",
  portfolio_value: "150000.00",
  buying_power: "200000.00",
  equity: "150000.00",
  last_equity: "145000.00",
  long_market_value: "50000.00",
  short_market_value: "0",
  initial_margin: "25000.00",
  maintenance_margin: "12500.00",
  daytrade_count: 0,
  pattern_day_trader: false,
  trading_blocked: false,
  transfers_blocked: false,
  account_blocked: false,
  created_at: "2023-01-01T00:00:00Z",
};

/**
 * Mock order data for testing
 */
export const mockOrder = {
  id: "test-order-id",
  client_order_id: "test-client-order-id",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  submitted_at: "2023-01-01T00:00:00Z",
  filled_at: null,
  expired_at: null,
  canceled_at: null,
  failed_at: null,
  replaced_at: null,
  replaced_by: null,
  replaces: null,
  asset_id: "test-asset-id",
  symbol: "AAPL",
  asset_class: "us_equity",
  qty: "10",
  filled_qty: "0",
  type: "market",
  side: "buy",
  time_in_force: "day",
  limit_price: null,
  stop_price: null,
  filled_avg_price: null,
  status: "new",
  extended_hours: false,
  legs: null,
};

/**
 * Mock position data for testing
 */
export const mockPosition = {
  asset_id: "test-asset-id",
  symbol: "AAPL",
  exchange: "NASDAQ",
  asset_class: "us_equity",
  avg_entry_price: "150.00",
  qty: "10",
  side: "long",
  market_value: "1550.00",
  cost_basis: "1500.00",
  unrealized_pl: "50.00",
  unrealized_plpc: "0.0333",
  unrealized_intraday_pl: "25.00",
  unrealized_intraday_plpc: "0.0166",
  current_price: "155.00",
  lastday_price: "152.50",
  change_today: "0.0164",
};

/**
 * Mock asset data for testing
 */
export const mockAsset = {
  id: "test-asset-id",
  class: "us_equity",
  exchange: "NASDAQ",
  symbol: "AAPL",
  name: "Apple Inc.",
  status: "active",
  tradable: true,
  marginable: true,
  shortable: true,
  easy_to_borrow: true,
  fractionable: true,
};

/**
 * Mock calendar data for testing
 */
export const mockCalendar = {
  date: "2023-12-18",
  open: "09:30",
  close: "16:00",
  settlement_date: "2023-12-20",
};

/**
 * Mock clock data for testing
 */
export const mockClock = {
  timestamp: "2023-12-18T10:30:00Z",
  is_open: true,
  next_open: "2023-12-19T09:30:00Z",
  next_close: "2023-12-18T16:00:00Z",
};

/**
 * Mock watchlist data for testing
 */
export const mockWatchlist = {
  id: "test-watchlist-id",
  account_id: "test-account-id",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  name: "My Watchlist",
  assets: [mockAsset],
};

/**
 * Mock stock bar data for testing
 */
export const mockStockBar = {
  t: "2023-12-18T09:30:00Z",
  o: 150.0,
  h: 155.0,
  l: 149.0,
  c: 154.0,
  v: 1000000,
  n: 5000,
  vw: 152.5,
};

/**
 * Mock stock quote data for testing
 */
export const mockStockQuote = {
  t: "2023-12-18T10:30:00Z",
  ax: "Q",
  ap: 154.05,
  as: 100,
  bx: "Q",
  bp: 154.0,
  bs: 200,
  c: ["R"],
  z: "C",
};

/**
 * Mock stock trade data for testing
 */
export const mockStockTrade = {
  t: "2023-12-18T10:30:00Z",
  p: 154.02,
  s: 50,
  c: ["@"],
  i: 12345,
  z: "C",
};
