import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.217.0/assert/assert_equals.ts";
import { createIntegrationClient, requireCredentials, sleep } from "./helpers.ts";

// ============================================================================
// Account Tests
// ============================================================================

Deno.test("Integration: getAccount should return real account data", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const account = await client.getAccount();

  assert(account.id !== undefined, "Account should have an ID");
  assert(account.account_number !== undefined, "Account should have an account number");
  assert(account.status !== undefined, "Account should have a status");
  assert(account.currency === "USD", "Account currency should be USD");
  console.log(`  ✓ Account ID: ${account.id}`);
  console.log(`  ✓ Account Status: ${account.status}`);
  console.log(`  ✓ Buying Power: $${account.buying_power}`);
});

Deno.test("Integration: getAccountConfigurations should return configurations", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const config = await client.getAccountConfigurations();

  assert(config.dtbp_check !== undefined, "Should have dtbp_check");
  assert(config.trade_confirm_email !== undefined, "Should have trade_confirm_email");
  console.log(`  ✓ DTBP Check: ${config.dtbp_check}`);
  console.log(`  ✓ Trade Confirm Email: ${config.trade_confirm_email}`);
});

Deno.test("Integration: getPortfolioHistory should return portfolio history", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const history = await client.getPortfolioHistory({
    period: "1W",
    timeframe: "1D",
  });

  assert(history.equity !== undefined, "Should have equity array");
  assert(history.timestamp !== undefined, "Should have timestamp array");
  console.log(`  ✓ History points: ${history.timestamp?.length || 0}`);
});

// ============================================================================
// Clock and Calendar Tests
// ============================================================================

Deno.test("Integration: getClock should return market clock", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const clock = await client.getClock();

  assert(clock.timestamp !== undefined, "Clock should have timestamp");
  assert(typeof clock.is_open === "boolean", "Clock should have is_open boolean");
  assert(clock.next_open !== undefined, "Clock should have next_open");
  assert(clock.next_close !== undefined, "Clock should have next_close");
  console.log(`  ✓ Market is open: ${clock.is_open}`);
  console.log(`  ✓ Next open: ${clock.next_open}`);
  console.log(`  ✓ Next close: ${clock.next_close}`);
});

Deno.test("Integration: getCalendar should return market calendar", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const calendar = await client.getCalendar({
    start: "2024-01-01",
    end: "2024-01-31",
  });

  assert(Array.isArray(calendar), "Calendar should be an array");
  assert(calendar.length > 0, "Calendar should have entries");
  assert(calendar[0].date !== undefined, "Calendar entry should have date");
  assert(calendar[0].open !== undefined, "Calendar entry should have open time");
  assert(calendar[0].close !== undefined, "Calendar entry should have close time");
  console.log(`  ✓ Calendar entries: ${calendar.length}`);
});

// ============================================================================
// Assets Tests
// ============================================================================

Deno.test("Integration: getAsset should return asset details", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const asset = await client.getAsset({ symbol_or_asset_id: "AAPL" });

  assertEquals(asset.symbol, "AAPL", "Asset symbol should be AAPL");
  assert(asset.id !== undefined, "Asset should have an ID");
  assert(asset.name !== undefined, "Asset should have a name");
  assert(asset.tradable !== undefined, "Asset should have tradable flag");
  console.log(`  ✓ Asset: ${asset.symbol} - ${asset.name}`);
  console.log(`  ✓ Tradable: ${asset.tradable}`);
  console.log(`  ✓ Exchange: ${asset.exchange}`);
});

Deno.test("Integration: getAssets should return list of assets", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const assets = await client.getAssets({
    status: "active",
    asset_class: "us_equity",
  });

  assert(Array.isArray(assets), "Assets should be an array");
  assert(assets.length > 0, "Should have at least one asset");
  console.log(`  ✓ Total active US equity assets: ${assets.length}`);
});

// ============================================================================
// Positions Tests
// ============================================================================

Deno.test("Integration: getPositions should return positions list", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const positions = await client.getPositions();

  assert(Array.isArray(positions), "Positions should be an array");
  console.log(`  ✓ Current positions: ${positions.length}`);
  if (positions.length > 0) {
    console.log(`  ✓ First position: ${positions[0].symbol} (${positions[0].qty} shares)`);
  }
});

// ============================================================================
// Orders Tests
// ============================================================================

Deno.test("Integration: getOrders should return orders list", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const orders = await client.getOrders({
    status: "all",
    limit: 10,
  });

  assert(Array.isArray(orders), "Orders should be an array");
  console.log(`  ✓ Recent orders: ${orders.length}`);
});

Deno.test("Integration: create and cancel a limit order", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  // Create a limit order at a price that won't fill immediately
  const order = await client.createOrder({
    symbol: "AAPL",
    qty: "1",
    side: "buy",
    type: "limit",
    time_in_force: "day",
    limit_price: "1.00", // Very low price, won't fill
  });

  assert(order.id !== undefined, "Order should have an ID");
  assertEquals(order.symbol, "AAPL", "Order symbol should be AAPL");
  assertEquals(order.side, "buy", "Order side should be buy");
  assertEquals(order.type, "limit", "Order type should be limit");
  console.log(`  ✓ Created order: ${order.id}`);
  console.log(`  ✓ Order status: ${order.status}`);

  // Wait a moment for order to be processed
  await sleep(1000);

  // Cancel the order
  await client.cancelOrder({ order_id: order.id });
  console.log(`  ✓ Cancelled order: ${order.id}`);

  // Verify the order was cancelled
  await sleep(1000);
  const cancelledOrder = await client.getOrder({ order_id: order.id });
  assert(
    cancelledOrder.status === "canceled",
    "Order should be canceled"
  );
  console.log(`  ✓ Order status after cancel: ${cancelledOrder.status}`);
});

// ============================================================================
// Watchlists Tests
// ============================================================================

Deno.test("Integration: create, update, and delete a watchlist", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const testName = `Test_Watchlist_${Date.now()}`;

  // Create a watchlist
  const created = await client.createWatchlist({
    name: testName,
    symbols: ["AAPL", "GOOGL"],
  });

  assert(created.id !== undefined, "Watchlist should have an ID");
  assertEquals(created.name, testName, "Watchlist name should match");
  console.log(`  ✓ Created watchlist: ${created.name} (${created.id})`);

  // Get the watchlist
  const fetched = await client.getWatchlist({ watchlist_id: created.id });
  assertEquals(fetched.id, created.id, "Fetched watchlist ID should match");
  console.log(`  ✓ Fetched watchlist: ${fetched.name}`);

  // Add an asset to the watchlist
  const updated = await client.addAssetToWatchlist({
    watchlist_id: created.id,
    symbol: "MSFT",
  });
  console.log(`  ✓ Added MSFT to watchlist`);

  // Delete the watchlist
  await client.deleteWatchlist({ watchlist_id: created.id });
  console.log(`  ✓ Deleted watchlist: ${created.id}`);
});

Deno.test("Integration: getWatchlists should return watchlists", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const watchlists = await client.getWatchlists();

  assert(Array.isArray(watchlists), "Watchlists should be an array");
  console.log(`  ✓ Total watchlists: ${watchlists.length}`);
});

// ============================================================================
// Activities Tests
// ============================================================================

Deno.test("Integration: getActivities should return activities", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  const activities = await client.getActivities({});

  assert(Array.isArray(activities), "Activities should be an array");
  console.log(`  ✓ Total activities: ${activities.length}`);
});

// ============================================================================
// Options Contracts Tests
// ============================================================================

Deno.test("Integration: getOptionsContracts should return options contracts", async () => {
  requireCredentials();
  const client = createIntegrationClient();

  // Get options contracts for AAPL
  const result = await client.getOptionsContracts({
    underlying_symbols: "AAPL",
    status: "active",
    limit: 10,
  });

  assert(result.option_contracts !== undefined, "Should have option_contracts");
  assert(Array.isArray(result.option_contracts), "option_contracts should be an array");
  console.log(`  ✓ AAPL options contracts: ${result.option_contracts.length}`);
  if (result.option_contracts.length > 0) {
    const contract = result.option_contracts[0];
    console.log(`  ✓ First contract: ${contract.symbol} (${contract.type})`);
  }
});
