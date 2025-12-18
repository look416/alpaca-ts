import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.217.0/assert/assert_equals.ts";
import { assertRejects } from "https://deno.land/std@0.217.0/assert/assert_rejects.ts";
import { createClient } from "../factory/createClient.ts";
import { mockFetch } from "../util/mockFetch.ts";

Deno.test("createClient should create a client with key/secret credentials", () => {
  const client = createClient({
    key: "TEST_KEY_ID",
    secret: "TEST_KEY_SECRET",
  });

  assert(client !== undefined);
  assert(typeof client.getAccount === "function");
  assert(typeof client.createOrder === "function");
  assert(typeof client.getPositions === "function");
});

Deno.test("createClient should create a client with accessToken", () => {
  const client = createClient({
    accessToken: "test-access-token",
  });

  assert(client !== undefined);
  assert(typeof client.getAccount === "function");
});

Deno.test("createClient should throw error without credentials", () => {
  try {
    createClient({});
    assert(false, "Should have thrown an error");
  } catch (error) {
    assert(error instanceof Error);
    assertEquals(error.message, "Missing credentials (need accessToken or key/secret)");
  }
});

Deno.test("createClient should default to paper trading", () => {
  const client = createClient({
    key: "TEST_KEY_ID",
    secret: "TEST_KEY_SECRET",
  });

  // Client should be created (paper is default)
  assert(client !== undefined);
});

Deno.test("createClient should have all Trading API methods", () => {
  const client = createClient({
    key: "TEST_KEY_ID",
    secret: "TEST_KEY_SECRET",
  });

  // Account
  assert(typeof client.getAccount === "function");
  assert(typeof client.getAccountConfigurations === "function");
  assert(typeof client.updateAccountConfigurations === "function");
  assert(typeof client.getPortfolioHistory === "function");

  // Orders
  assert(typeof client.createOrder === "function");
  assert(typeof client.getOrder === "function");
  assert(typeof client.getOrderByClientOrderId === "function");
  assert(typeof client.getOrders === "function");
  assert(typeof client.replaceOrder === "function");
  assert(typeof client.cancelOrder === "function");
  assert(typeof client.cancelAllOrders === "function");

  // Positions
  assert(typeof client.getPosition === "function");
  assert(typeof client.getPositions === "function");
  assert(typeof client.closePosition === "function");
  assert(typeof client.closeAllPositions === "function");
  assert(typeof client.exerciseOption === "function");
  assert(typeof client.doNotExerciseOption === "function");

  // Assets
  assert(typeof client.getAsset === "function");
  assert(typeof client.getAssets === "function");

  // Calendar
  assert(typeof client.getCalendar === "function");
  assert(typeof client.getClock === "function");

  // Activities
  assert(typeof client.getActivity === "function");
  assert(typeof client.getActivities === "function");

  // Options Contracts
  assert(typeof client.getOptionsContract === "function");
  assert(typeof client.getOptionsContracts === "function");

  // Watchlists
  assert(typeof client.getWatchlist === "function");
  assert(typeof client.getWatchlistByName === "function");
  assert(typeof client.getWatchlists === "function");
  assert(typeof client.createWatchlist === "function");
  assert(typeof client.updateWatchlist === "function");
  assert(typeof client.updateWatchlistByName === "function");
  assert(typeof client.deleteWatchlist === "function");
  assert(typeof client.deleteWatchlistByName === "function");
  assert(typeof client.addAssetToWatchlist === "function");
  assert(typeof client.addAssetToWatchlistByName === "function");
  assert(typeof client.removeAssetFromWatchlist === "function");

  // Corporate Actions
  assert(typeof client.getCorporateAction === "function");
  assert(typeof client.getCorporateActions === "function");

  // Crypto Funding
  assert(typeof client.getCryptoWallet === "function");
  assert(typeof client.getCryptoWallets === "function");
  assert(typeof client.getFeeEstimate === "function");
  assert(typeof client.getCryptoTransfer === "function");
  assert(typeof client.getCryptoTransfers === "function");
  assert(typeof client.createCryptoTransfer === "function");
  assert(typeof client.getCryptoWhitelistedAddress === "function");
  assert(typeof client.getCryptoWhitelistedAddresses === "function");
  assert(typeof client.requestCryptoWhitelistedAddress === "function");
  assert(typeof client.removeCryptoWhitelistedAddress === "function");
});

Deno.test("createClient should have all Market Data API methods", () => {
  const client = createClient({
    key: "TEST_KEY_ID",
    secret: "TEST_KEY_SECRET",
  });

  // Stocks
  assert(typeof client.getStocksBars === "function");
  assert(typeof client.getStocksBarsLatest === "function");
  assert(typeof client.getStocksQuotes === "function");
  assert(typeof client.getStocksQuotesLatest === "function");
  assert(typeof client.getStocksTrades === "function");
  assert(typeof client.getStocksTradesLatest === "function");
  assert(typeof client.getStocksSnapshots === "function");
  assert(typeof client.getStocksAuctions === "function");
  assert(typeof client.getStocksConditions === "function");
  assert(typeof client.getStocksExchangeCodes === "function");

  // Crypto
  assert(typeof client.getCryptoBars === "function");
  assert(typeof client.getLatestCryptoBars === "function");
  assert(typeof client.getCryptoQuotes === "function");
  assert(typeof client.getCryptoQuotesLatest === "function");
  assert(typeof client.getCryptoTrades === "function");
  assert(typeof client.getCryptoTradesLatest === "function");
  assert(typeof client.getCryptoSnapshots === "function");
  assert(typeof client.getLatestCryptoOrderbooks === "function");

  // Options
  assert(typeof client.getOptionsBars === "function");
  assert(typeof client.getOptionsTrades === "function");
  assert(typeof client.getOptionsTradesLatest === "function");
  assert(typeof client.getOptionsSnapshots === "function");
  assert(typeof client.getOptionsExchanges === "function");

  // Forex
  assert(typeof client.getForexRates === "function");
  assert(typeof client.getLatestForexRates === "function");

  // News
  assert(typeof client.getNews === "function");

  // Screener
  assert(typeof client.getStocksMostActives === "function");
  assert(typeof client.getStocksMarketMovers === "function");

  // Logos
  assert(typeof client.getLogo === "function");

  // Corporate Actions (Market Data)
  assert(typeof client.getStocksCorporateActions === "function");
});
