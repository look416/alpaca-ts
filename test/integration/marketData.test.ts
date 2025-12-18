import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { createIntegrationClient, requireCredentials } from "./helpers.ts";

// ============================================================================
// Stock Bars Tests
// ============================================================================

Deno.test("Integration: getStocksBars should return stock bars", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksBars({
    symbols: "AAPL",
    timeframe: "1Day",
    start: "2024-01-01",
    end: "2024-01-31",
    limit: 10,
  });

  assert(result.bars !== undefined, "Should have bars");
  assert(result.bars.AAPL !== undefined, "Should have AAPL bars");
  assert(Array.isArray(result.bars.AAPL), "AAPL bars should be an array");
  console.log(`  ✓ AAPL daily bars: ${result.bars.AAPL.length}`);
  if (result.bars.AAPL.length > 0) {
    const bar = result.bars.AAPL[0];
    console.log(`  ✓ First bar: O:${bar.o} H:${bar.h} L:${bar.l} C:${bar.c}`);
  }
});

Deno.test("Integration: getStocksBarsLatest should return latest bars", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksBarsLatest({
    symbols: "AAPL,GOOGL,MSFT",
  });

  assert(result.bars !== undefined, "Should have bars");
  const symbols = Object.keys(result.bars);
  assert(symbols.length > 0, "Should have at least one symbol");
  console.log(`  ✓ Symbols with latest bars: ${symbols.join(", ")}`);
});

// ============================================================================
// Stock Quotes Tests
// ============================================================================

Deno.test("Integration: getStocksQuotesLatest should return latest quotes", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksQuotesLatest({
    symbols: "AAPL,TSLA",
  });

  assert(result.quotes !== undefined, "Should have quotes");
  const symbols = Object.keys(result.quotes);
  assert(symbols.length > 0, "Should have at least one symbol");
  console.log(`  ✓ Symbols with latest quotes: ${symbols.join(", ")}`);
  if (result.quotes.AAPL) {
    console.log(`  ✓ AAPL bid: $${result.quotes.AAPL.bp}, ask: $${result.quotes.AAPL.ap}`);
  }
});

// ============================================================================
// Stock Trades Tests
// ============================================================================

Deno.test("Integration: getStocksTradesLatest should return latest trades", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksTradesLatest({
    symbols: "AAPL,GOOGL",
  });

  assert(result.trades !== undefined, "Should have trades");
  const symbols = Object.keys(result.trades);
  assert(symbols.length > 0, "Should have at least one symbol");
  console.log(`  ✓ Symbols with latest trades: ${symbols.join(", ")}`);
  if (result.trades.AAPL) {
    console.log(`  ✓ AAPL last trade: $${result.trades.AAPL.p}`);
  }
});

// ============================================================================
// Stock Snapshots Tests
// ============================================================================

Deno.test("Integration: getStocksSnapshots should return snapshots", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksSnapshots({
    symbols: "AAPL,MSFT",
  });

  // Note: API returns data directly without a 'snapshots' wrapper
  // The response is { AAPL: {...}, MSFT: {...} } not { snapshots: {...} }
  const snapshots = result.snapshots || result;
  const symbols = Object.keys(snapshots);
  assert(symbols.length > 0, "Should have at least one symbol");
  console.log(`  ✓ Symbols with snapshots: ${symbols.join(", ")}`);

  // Access AAPL data - handle both camelCase (API) and snake_case (SDK type) formats
  const aaplSnapshot = (snapshots as Record<string, unknown>)["AAPL"] as Record<string, unknown> | undefined;
  if (aaplSnapshot) {
    const latestTrade = aaplSnapshot.latestTrade || aaplSnapshot.latest_trade;
    const dailyBar = aaplSnapshot.dailyBar || aaplSnapshot.daily_bar;
    console.log(`  ✓ AAPL latest trade: $${(latestTrade as Record<string, unknown>)?.p}`);
    console.log(`  ✓ AAPL daily bar close: $${(dailyBar as Record<string, unknown>)?.c}`);
  }
});

// ============================================================================
// Stock Meta Tests
// ============================================================================

Deno.test("Integration: getStocksExchangeCodes should return exchange codes", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksExchangeCodes();

  // The response is the exchanges object directly (or wrapped in exchanges property)
  const exchanges = result.exchanges || result;
  assert(exchanges !== undefined, "Should have exchanges");
  const codes = Object.keys(exchanges);
  assert(codes.length > 0, "Should have at least one exchange code");
  console.log(`  ✓ Exchange codes: ${codes.length}`);
  console.log(`  ✓ Sample: ${codes.slice(0, 5).map(c => `${c}=${exchanges[c as keyof typeof exchanges]}`).join(", ")}`);
});

// ============================================================================
// Crypto Tests
// ============================================================================

Deno.test("Integration: getCryptoBars should return crypto bars", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getCryptoBars({
    loc: "us",
    symbols: "BTC/USD",
    timeframe: "1Day",
    start: "2024-01-01",
    end: "2024-01-31",
    limit: 10,
  });

  assert(result.bars !== undefined, "Should have bars");
  console.log(`  ✓ Crypto symbols: ${Object.keys(result.bars).join(", ")}`);
  if (result.bars["BTC/USD"]) {
    console.log(`  ✓ BTC/USD bars: ${result.bars["BTC/USD"].length}`);
  }
});

Deno.test("Integration: getLatestCryptoBars should return latest crypto bars", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getLatestCryptoBars({
    loc: "us",
    symbols: "BTC/USD,ETH/USD",
  });

  assert(result.bars !== undefined, "Should have bars");
  const symbols = Object.keys(result.bars);
  console.log(`  ✓ Crypto symbols with latest bars: ${symbols.join(", ")}`);
  if (result.bars["BTC/USD"]) {
    console.log(`  ✓ BTC/USD close: $${result.bars["BTC/USD"].c}`);
  }
});

Deno.test("Integration: getCryptoSnapshots should return crypto snapshots", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getCryptoSnapshots({
    loc: "us",
    symbols: "BTC/USD",
  });

  assert(result.snapshots !== undefined, "Should have snapshots");
  console.log(`  ✓ Crypto symbols with snapshots: ${Object.keys(result.snapshots).join(", ")}`);
});

Deno.test("Integration: getLatestCryptoOrderbooks should return orderbooks", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getLatestCryptoOrderbooks({
    loc: "us",
    symbols: "BTC/USD",
  });

  assert(result.orderbooks !== undefined, "Should have orderbooks");
  if (result.orderbooks["BTC/USD"]) {
    const ob = result.orderbooks["BTC/USD"];
    console.log(`  ✓ BTC/USD bids: ${ob.b?.length}, asks: ${ob.a?.length}`);
  }
});

// ============================================================================
// Options Market Data Tests
// ============================================================================

Deno.test("Integration: getOptionsExchanges should return options exchanges", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getOptionsExchanges();

  assert(result !== undefined, "Should have exchanges");
  const codes = Object.keys(result);
  assert(codes.length > 0, "Should have at least one exchange");
  console.log(`  ✓ Options exchanges: ${codes.length}`);
  console.log(`  ✓ Sample: ${codes.slice(0, 5).map(c => `${c}=${result[c]}`).join(", ")}`);
});

// ============================================================================
// Forex Tests
// ============================================================================

Deno.test("Integration: getLatestForexRates should return forex rates", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  try {
    const result = await client.getLatestForexRates({
      currency_pairs: "EUR/USD,GBP/USD",
    });

    assert(result.rates !== undefined, "Should have rates");
    const pairs = Object.keys(result.rates);
    console.log(`  ✓ Currency pairs: ${pairs.join(", ")}`);
    if (result.rates["EUR/USD"]) {
      console.log(`  ✓ EUR/USD mid: ${result.rates["EUR/USD"].mp}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("not authorized for FX data")) {
      console.log(`  ⚠ Skipped: Account not authorized for FX data`);
      return;
    }
    throw error;
  }
});

// ============================================================================
// News Tests
// ============================================================================

Deno.test("Integration: getNews should return news articles", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getNews({
    symbols: "AAPL",
    limit: 5,
  });

  assert(result.news !== undefined, "Should have news");
  assert(Array.isArray(result.news), "News should be an array");
  console.log(`  ✓ News articles: ${result.news.length}`);
  if (result.news.length > 0) {
    console.log(`  ✓ Latest headline: ${result.news[0].headline.substring(0, 60)}...`);
  }
});

// ============================================================================
// Screener Tests
// ============================================================================

Deno.test("Integration: getStocksMostActives should return most actives", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksMostActives({
    top: 10,
  });

  assert(result.most_actives !== undefined, "Should have most_actives");
  assert(Array.isArray(result.most_actives), "most_actives should be an array");
  console.log(`  ✓ Most active stocks: ${result.most_actives.length}`);
  if (result.most_actives.length > 0) {
    const top3 = result.most_actives.slice(0, 3).map(s => s.symbol);
    console.log(`  ✓ Top 3: ${top3.join(", ")}`);
  }
});

Deno.test("Integration: getStocksMarketMovers should return market movers", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksMarketMovers({
    top: 5,
  });

  assert(result.gainers !== undefined, "Should have gainers");
  assert(result.losers !== undefined, "Should have losers");
  console.log(`  ✓ Gainers: ${result.gainers.length}, Losers: ${result.losers.length}`);
  if (result.gainers.length > 0) {
    const topGainer = result.gainers[0];
    console.log(`  ✓ Top gainer: ${topGainer.symbol} (+${topGainer.percent_change.toFixed(2)}%)`);
  }
  if (result.losers.length > 0) {
    const topLoser = result.losers[0];
    console.log(`  ✓ Top loser: ${topLoser.symbol} (${topLoser.percent_change.toFixed(2)}%)`);
  }
});

// ============================================================================
// Corporate Actions Tests
// ============================================================================

Deno.test("Integration: getStocksCorporateActions should return corporate actions", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const result = await client.getStocksCorporateActions({
    symbols: "AAPL",
    types: "cash_dividend",
    start: "2024-01-01",
    end: "2024-12-31",
  });

  assert(result.corporate_actions !== undefined, "Should have corporate_actions");
  console.log(`  ✓ Corporate actions response received`);
  if (result.corporate_actions.cash_dividends) {
    console.log(`  ✓ Cash dividends: ${result.corporate_actions.cash_dividends.length}`);
  }
});
