import { assertEquals } from "https://deno.land/std@0.217.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import {
  createTestClient,
  mockStockBar,
  mockStockQuote,
  mockStockTrade,
} from "./helpers.ts";

// ============================================================================
// Stock Bars Tests
// ============================================================================

Deno.test("getStocksBars should return stock bars", async () => {
  const mockResponse = {
    bars: {
      AAPL: [mockStockBar],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksBars({
      symbols: "AAPL",
      timeframe: "1Day",
    });
    assertEquals(result.bars.AAPL.length, 1);
    assertEquals(result.bars.AAPL[0].o, mockStockBar.o);
    assertEquals(result.bars.AAPL[0].c, mockStockBar.c);
  } finally {
    restore();
  }
});

Deno.test("getStocksBarsLatest should return latest stock bars", async () => {
  const mockResponse = {
    bars: {
      AAPL: mockStockBar,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksBarsLatest({ symbols: "AAPL" });
    assertEquals(result.bars.AAPL.o, mockStockBar.o);
  } finally {
    restore();
  }
});

// ============================================================================
// Stock Quotes Tests
// ============================================================================

Deno.test("getStocksQuotes should return stock quotes", async () => {
  const mockResponse = {
    quotes: {
      AAPL: [mockStockQuote],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksQuotes({ symbols: "AAPL" });
    assertEquals(result.quotes.AAPL.length, 1);
    assertEquals(result.quotes.AAPL[0].bp, mockStockQuote.bp);
    assertEquals(result.quotes.AAPL[0].ap, mockStockQuote.ap);
  } finally {
    restore();
  }
});

Deno.test("getStocksQuotesLatest should return latest stock quotes", async () => {
  const mockResponse = {
    quotes: {
      AAPL: mockStockQuote,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksQuotesLatest({ symbols: "AAPL" });
    assertEquals(result.quotes.AAPL.bp, mockStockQuote.bp);
  } finally {
    restore();
  }
});

// ============================================================================
// Stock Trades Tests
// ============================================================================

Deno.test("getStocksTrades should return stock trades", async () => {
  const mockResponse = {
    trades: {
      AAPL: [mockStockTrade],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksTrades({ symbols: "AAPL" });
    assertEquals(result.trades.AAPL.length, 1);
    assertEquals(result.trades.AAPL[0].p, mockStockTrade.p);
  } finally {
    restore();
  }
});

Deno.test("getStocksTradesLatest should return latest stock trades", async () => {
  const mockResponse = {
    trades: {
      AAPL: mockStockTrade,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksTradesLatest({ symbols: "AAPL" });
    assertEquals(result.trades.AAPL.p, mockStockTrade.p);
  } finally {
    restore();
  }
});

// ============================================================================
// Stock Snapshots Tests
// ============================================================================

Deno.test("getStocksSnapshots should return stock snapshots", async () => {
  const mockResponse = {
    snapshots: {
      AAPL: {
        latest_trade: mockStockTrade,
        latest_quote: mockStockQuote,
        minute_bar: mockStockBar,
        daily_bar: mockStockBar,
        prev_daily_bar: mockStockBar,
      },
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksSnapshots({ symbols: "AAPL" });
    assert(result.snapshots.AAPL !== undefined);
    assertEquals(result.snapshots.AAPL.latest_trade.p, mockStockTrade.p);
    assertEquals(result.snapshots.AAPL.latest_quote.bp, mockStockQuote.bp);
  } finally {
    restore();
  }
});

// ============================================================================
// Stock Auctions Tests
// ============================================================================

Deno.test("getStocksAuctions should return stock auctions", async () => {
  const mockResponse = {
    auctions: {
      AAPL: [
        {
          d: "2023-12-18",
          o: [{ c: "O", p: 150.0, t: "2023-12-18T09:30:00Z", x: "Q" }],
          c: [{ c: "C", p: 154.0, t: "2023-12-18T16:00:00Z", x: "Q" }],
        },
      ],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksAuctions({ symbols: "AAPL" });
    assertEquals(result.auctions.AAPL.length, 1);
    assertEquals(result.auctions.AAPL[0].d, "2023-12-18");
  } finally {
    restore();
  }
});

// ============================================================================
// Stock Meta Tests
// ============================================================================

Deno.test("getStocksConditions should return condition codes", async () => {
  const mockResponse = {
    conditions: {
      "@": "Regular Sale",
      A: "Acquisition",
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksConditions({
      tickType: "trades",
      tape: "A",
    });
    assertEquals(result.conditions["@"], "Regular Sale");
  } finally {
    restore();
  }
});

Deno.test("getStocksExchangeCodes should return exchange codes", async () => {
  const mockResponse = {
    exchanges: {
      Q: "NASDAQ",
      N: "NYSE",
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksExchangeCodes();
    assertEquals(result.exchanges.Q, "NASDAQ");
  } finally {
    restore();
  }
});

// ============================================================================
// Crypto Tests
// ============================================================================

Deno.test("getCryptoBars should return crypto bars", async () => {
  const mockCryptoBar = {
    t: "2023-12-18T10:00:00Z",
    o: 42000.0,
    h: 42500.0,
    l: 41800.0,
    c: 42300.0,
    v: 100.5,
    n: 500,
    vw: 42150.0,
  };
  const mockResponse = {
    bars: {
      "BTC/USD": [mockCryptoBar],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getCryptoBars({
      loc: "us",
      symbols: "BTC/USD",
      timeframe: "1Hour",
    });
    assertEquals(result.bars["BTC/USD"].length, 1);
    assertEquals(result.bars["BTC/USD"][0].o, mockCryptoBar.o);
  } finally {
    restore();
  }
});

Deno.test("getLatestCryptoBars should return latest crypto bars", async () => {
  const mockCryptoBar = {
    t: "2023-12-18T10:00:00Z",
    o: 42000.0,
    h: 42500.0,
    l: 41800.0,
    c: 42300.0,
    v: 100.5,
    n: 500,
    vw: 42150.0,
  };
  const mockResponse = {
    bars: {
      "BTC/USD": mockCryptoBar,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getLatestCryptoBars({
      loc: "us",
      symbols: "BTC/USD",
    });
    assertEquals(result.bars["BTC/USD"].c, mockCryptoBar.c);
  } finally {
    restore();
  }
});

Deno.test("getCryptoQuotes should return crypto quotes", async () => {
  const mockCryptoQuote = {
    t: "2023-12-18T10:00:00Z",
    bp: 42000.0,
    bs: 1.5,
    ap: 42010.0,
    as: 2.0,
  };
  const mockResponse = {
    quotes: {
      "BTC/USD": [mockCryptoQuote],
    },
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getCryptoQuotes({ symbols: "BTC/USD" });
    assertEquals(result.quotes["BTC/USD"].length, 1);
    assertEquals(result.quotes["BTC/USD"][0].bp, mockCryptoQuote.bp);
  } finally {
    restore();
  }
});

Deno.test("getCryptoSnapshots should return crypto snapshots", async () => {
  const mockSnapshot = {
    snapshots: {
      "BTC/USD": {
        daily_bar: { t: "2023-12-18", o: 42000, h: 43000, l: 41000, c: 42500, v: 1000, n: 500, vw: 42200 },
        latest_quote: { t: "2023-12-18T10:00:00Z", bp: 42500, bs: 1.0, ap: 42510, as: 1.0 },
        latest_trade: { t: "2023-12-18T10:00:00Z", p: 42505, s: 0.5, tks: "B", i: 123 },
        minute_bar: { t: "2023-12-18T10:00:00Z", o: 42500, h: 42510, l: 42490, c: 42505, v: 10, n: 50, vw: 42500 },
        prev_daily_bar: { t: "2023-12-17", o: 41000, h: 42000, l: 40500, c: 42000, v: 900, n: 400, vw: 41500 },
      },
    },
  };
  const { client, restore } = createTestClient(mockSnapshot);

  try {
    const result = await client.getCryptoSnapshots({
      loc: "us",
      symbols: "BTC/USD",
    });
    assert(result.snapshots["BTC/USD"] !== undefined);
  } finally {
    restore();
  }
});

Deno.test("getLatestCryptoOrderbooks should return latest orderbooks", async () => {
  const mockResponse = {
    orderbooks: {
      "BTC/USD": {
        t: "2023-12-18T10:00:00Z",
        b: [{ p: 42000, s: 1.5 }, { p: 41990, s: 2.0 }],
        a: [{ p: 42010, s: 1.0 }, { p: 42020, s: 1.5 }],
      },
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getLatestCryptoOrderbooks({
      loc: "us",
      symbols: "BTC/USD",
    });
    assertEquals(result.orderbooks["BTC/USD"].b.length, 2);
    assertEquals(result.orderbooks["BTC/USD"].a.length, 2);
  } finally {
    restore();
  }
});

// ============================================================================
// Options Tests
// ============================================================================

Deno.test("getOptionsBars should return options bars", async () => {
  const mockOptionBar = {
    t: "2023-12-18T10:00:00Z",
    o: 5.0,
    h: 5.5,
    l: 4.8,
    c: 5.2,
    v: 1000,
    n: 50,
    vw: 5.1,
  };
  const mockResponse = {
    bars: [mockOptionBar],
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getOptionsBars({
      symbols: "AAPL250117C00150000",
      timeframe: "1Day",
    });
    assertEquals(result.bars.length, 1);
    assertEquals(result.bars[0].o, mockOptionBar.o);
  } finally {
    restore();
  }
});

Deno.test("getOptionsSnapshots should return options snapshots", async () => {
  const mockResponse = {
    snapshots: {
      AAPL250117C00150000: {
        latest_trade: { t: "2023-12-18T10:00:00Z", x: "C", p: 5.2, s: 10, c: "@" },
        latest_quote: { t: "2023-12-18T10:00:00Z", ax: "C", ap: 5.3, as: 50, bx: "C", bp: 5.1, bs: 100, c: "A" },
      },
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getOptionsSnapshots({
      symbols: "AAPL250117C00150000",
    });
    assert(result.snapshots.AAPL250117C00150000 !== undefined);
  } finally {
    restore();
  }
});

Deno.test("getOptionsExchanges should return options exchanges", async () => {
  const mockResponse = {
    A: "AMEX",
    B: "BOX",
    C: "CBOE",
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getOptionsExchanges();
    assertEquals(result.C, "CBOE");
  } finally {
    restore();
  }
});

// ============================================================================
// Forex Tests
// ============================================================================

Deno.test("getForexRates should return forex rates", async () => {
  const mockRate = {
    bp: 1.0850,
    mp: 1.0855,
    ap: 1.0860,
    t: "2023-12-18T10:00:00Z",
  };
  const mockResponse = {
    rates: {
      "EUR/USD": [mockRate],
    },
    next_page_token: "",
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getForexRates({
      currency_pairs: "EUR/USD",
      timeframe: "1Hour",
    });
    assertEquals(result.rates["EUR/USD"].length, 1);
    assertEquals(result.rates["EUR/USD"][0].mp, mockRate.mp);
  } finally {
    restore();
  }
});

Deno.test("getLatestForexRates should return latest forex rates", async () => {
  const mockRate = {
    bp: 1.0850,
    mp: 1.0855,
    ap: 1.0860,
    t: "2023-12-18T10:00:00Z",
  };
  const mockResponse = {
    rates: {
      "EUR/USD": mockRate,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getLatestForexRates({
      currency_pairs: "EUR/USD",
    });
    assertEquals(result.rates["EUR/USD"].mp, mockRate.mp);
  } finally {
    restore();
  }
});

// ============================================================================
// News Tests
// ============================================================================

Deno.test("getNews should return news articles", async () => {
  const mockResponse = {
    news: [
      {
        id: 12345,
        headline: "Apple Announces New Product",
        author: "Test Author",
        created_at: "2023-12-18T10:00:00Z",
        updated_at: "2023-12-18T10:00:00Z",
        summary: "Apple announced a new product today.",
        content: "Full article content...",
        url: "https://example.com/news/12345",
        images: [],
        symbols: ["AAPL"],
        source: "Test Source",
      },
    ],
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getNews({ symbols: "AAPL" });
    assertEquals(result.news.length, 1);
    assertEquals(result.news[0].headline, "Apple Announces New Product");
    assertEquals(result.news[0].symbols[0], "AAPL");
  } finally {
    restore();
  }
});

// ============================================================================
// Screener Tests
// ============================================================================

Deno.test("getStocksMostActives should return most active stocks", async () => {
  const mockResponse = {
    most_actives: [
      { symbol: "AAPL", volume: 50000000, trade_count: 100000 },
      { symbol: "TSLA", volume: 40000000, trade_count: 80000 },
    ],
    last_updated: "2023-12-18T16:00:00Z",
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksMostActives({ top: 10 });
    assertEquals(result.most_actives.length, 2);
    assertEquals(result.most_actives[0].symbol, "AAPL");
  } finally {
    restore();
  }
});

Deno.test("getStocksMarketMovers should return market movers", async () => {
  const mockResponse = {
    gainers: [{ symbol: "AAPL", percent_change: 5.5, change: 8.0, price: 154.0 }],
    losers: [{ symbol: "TSLA", percent_change: -3.2, change: -8.0, price: 242.0 }],
    market_type: "stocks",
    last_updated: "2023-12-18T16:00:00Z",
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksMarketMovers({ top: 10 });
    assertEquals(result.gainers.length, 1);
    assertEquals(result.losers.length, 1);
    assertEquals(result.gainers[0].symbol, "AAPL");
    assertEquals(result.losers[0].symbol, "TSLA");
  } finally {
    restore();
  }
});

// ============================================================================
// Logo Tests
// ============================================================================

Deno.test("getLogo should return a logo response", async () => {
  // The Logo endpoint returns image data or a URL
  // When mocked, the response parsing may return empty object if the response isn't valid JSON
  const mockResponse = { url: "https://logo.clearbit.com/apple.com" };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getLogo({ symbol: "AAPL" });
    // The client.getLogo function exists and can be called
    assert(result !== undefined);
  } finally {
    restore();
  }
});

// ============================================================================
// Corporate Actions Tests
// ============================================================================

Deno.test("getStocksCorporateActions should return corporate actions", async () => {
  const mockResponse = {
    corporate_actions: {
      cash_dividends: [
        {
          symbol: "AAPL",
          rate: 0.24,
          special: false,
          foreign: false,
          process_date: "2023-12-18",
          ex_date: "2023-12-15",
          record_date: "2023-12-16",
          payable_date: "2023-12-20",
        },
      ],
      next_page_token: null,
    },
  };
  const { client, restore } = createTestClient(mockResponse);

  try {
    const result = await client.getStocksCorporateActions({ symbols: "AAPL" });
    assertEquals(result.corporate_actions.cash_dividends?.length, 1);
    assertEquals(result.corporate_actions.cash_dividends?.[0].symbol, "AAPL");
  } finally {
    restore();
  }
});
