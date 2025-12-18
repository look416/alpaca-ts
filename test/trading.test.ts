import { assertEquals } from "https://deno.land/std@0.217.0/assert/assert_equals.ts";
import {
  createTestClient,
  mockAccount,
  mockOrder,
  mockPosition,
  mockAsset,
  mockCalendar,
  mockClock,
  mockWatchlist,
} from "./helpers.ts";

// ============================================================================
// Account Tests
// ============================================================================

Deno.test("getAccount should return account data", async () => {
  const { client, restore } = createTestClient(mockAccount);

  try {
    const account = await client.getAccount();
    assertEquals(account.id, mockAccount.id);
    assertEquals(account.status, mockAccount.status);
    assertEquals(account.cash, mockAccount.cash);
  } finally {
    restore();
  }
});

Deno.test("getAccountConfigurations should return account configurations", async () => {
  const mockConfig = {
    dtbp_check: "both",
    trade_confirm_email: "all",
    suspend_trade: false,
    no_shorting: false,
  };
  const { client, restore } = createTestClient(mockConfig);

  try {
    const config = await client.getAccountConfigurations();
    assertEquals(config.dtbp_check, mockConfig.dtbp_check);
    assertEquals(config.trade_confirm_email, mockConfig.trade_confirm_email);
  } finally {
    restore();
  }
});

Deno.test("updateAccountConfigurations should update and return configurations", async () => {
  const mockConfig = {
    dtbp_check: "entry",
    trade_confirm_email: "none",
    suspend_trade: false,
    no_shorting: false,
  };
  const { client, restore } = createTestClient(mockConfig);

  try {
    const config = await client.updateAccountConfigurations({
      dtbp_check: "entry",
      trade_confirm_email: "none",
    });
    assertEquals(config.dtbp_check, "entry");
    assertEquals(config.trade_confirm_email, "none");
  } finally {
    restore();
  }
});

Deno.test("getPortfolioHistory should return portfolio history", async () => {
  const mockHistory = {
    timestamp: [1702900800, 1702987200],
    equity: [100000, 101000],
    profit_loss: [0, 1000],
    profit_loss_pct: [0, 0.01],
    base_value: 100000,
    timeframe: "1D",
  };
  const { client, restore } = createTestClient(mockHistory);

  try {
    const history = await client.getPortfolioHistory({});
    assertEquals(history.base_value, mockHistory.base_value);
    assertEquals(history.timeframe, mockHistory.timeframe);
  } finally {
    restore();
  }
});

// ============================================================================
// Orders Tests
// ============================================================================

Deno.test("createOrder should create and return an order", async () => {
  const { client, restore } = createTestClient(mockOrder);

  try {
    const order = await client.createOrder({
      symbol: "AAPL",
      qty: "10",
      side: "buy",
      type: "market",
      time_in_force: "day",
    });
    assertEquals(order.symbol, mockOrder.symbol);
    assertEquals(order.side, mockOrder.side);
    assertEquals(order.type, mockOrder.type);
  } finally {
    restore();
  }
});

Deno.test("getOrder should return an order by ID", async () => {
  const { client, restore } = createTestClient(mockOrder);

  try {
    const order = await client.getOrder({ order_id: "test-order-id" });
    assertEquals(order.id, mockOrder.id);
    assertEquals(order.symbol, mockOrder.symbol);
  } finally {
    restore();
  }
});

Deno.test("getOrderByClientOrderId should return an order by client order ID", async () => {
  const { client, restore } = createTestClient(mockOrder);

  try {
    const order = await client.getOrderByClientOrderId({
      client_order_id: "test-client-order-id",
    });
    assertEquals(order.client_order_id, mockOrder.client_order_id);
  } finally {
    restore();
  }
});

Deno.test("getOrders should return a list of orders", async () => {
  const { client, restore } = createTestClient([mockOrder]);

  try {
    const orders = await client.getOrders({});
    assertEquals(Array.isArray(orders), true);
    assertEquals(orders.length, 1);
    assertEquals(orders[0].id, mockOrder.id);
  } finally {
    restore();
  }
});

Deno.test("replaceOrder should replace and return an order", async () => {
  const replacedOrder = { ...mockOrder, qty: "20" };
  const { client, restore } = createTestClient(replacedOrder);

  try {
    const order = await client.replaceOrder({
      order_id: "test-order-id",
      qty: "20",
    });
    assertEquals(order.qty, "20");
  } finally {
    restore();
  }
});

Deno.test("cancelOrder should cancel an order", async () => {
  const { client, restore } = createTestClient({});

  try {
    await client.cancelOrder({ order_id: "test-order-id" });
    // No error means success
  } finally {
    restore();
  }
});

Deno.test("cancelAllOrders should cancel all orders", async () => {
  const { client, restore } = createTestClient([]);

  try {
    const result = await client.cancelAllOrders();
    assertEquals(Array.isArray(result), true);
  } finally {
    restore();
  }
});

// ============================================================================
// Positions Tests
// ============================================================================

Deno.test("getPosition should return a position", async () => {
  const { client, restore } = createTestClient(mockPosition);

  try {
    const position = await client.getPosition({ symbol_or_asset_id: "AAPL" });
    assertEquals(position.symbol, mockPosition.symbol);
    assertEquals(position.qty, mockPosition.qty);
  } finally {
    restore();
  }
});

Deno.test("getPositions should return all positions", async () => {
  const { client, restore } = createTestClient([mockPosition]);

  try {
    const positions = await client.getPositions();
    assertEquals(Array.isArray(positions), true);
    assertEquals(positions.length, 1);
    assertEquals(positions[0].symbol, mockPosition.symbol);
  } finally {
    restore();
  }
});

Deno.test("closePosition should close a position", async () => {
  const { client, restore } = createTestClient(mockOrder);

  try {
    const result = await client.closePosition({ symbol_or_asset_id: "AAPL" });
    assertEquals(result.symbol, mockOrder.symbol);
  } finally {
    restore();
  }
});

Deno.test("closeAllPositions should close all positions", async () => {
  const { client, restore } = createTestClient([]);

  try {
    const result = await client.closeAllPositions({});
    assertEquals(Array.isArray(result), true);
  } finally {
    restore();
  }
});

// ============================================================================
// Assets Tests
// ============================================================================

Deno.test("getAsset should return an asset", async () => {
  const { client, restore } = createTestClient(mockAsset);

  try {
    const asset = await client.getAsset({ symbol_or_asset_id: "AAPL" });
    assertEquals(asset.symbol, mockAsset.symbol);
    assertEquals(asset.name, mockAsset.name);
  } finally {
    restore();
  }
});

Deno.test("getAssets should return a list of assets", async () => {
  const { client, restore } = createTestClient([mockAsset]);

  try {
    const assets = await client.getAssets({});
    assertEquals(Array.isArray(assets), true);
    assertEquals(assets.length, 1);
    assertEquals(assets[0].symbol, mockAsset.symbol);
  } finally {
    restore();
  }
});

// ============================================================================
// Calendar Tests
// ============================================================================

Deno.test("getCalendar should return market calendar", async () => {
  const { client, restore } = createTestClient([mockCalendar]);

  try {
    const calendar = await client.getCalendar({});
    assertEquals(Array.isArray(calendar), true);
    assertEquals(calendar.length, 1);
    assertEquals(calendar[0].date, mockCalendar.date);
  } finally {
    restore();
  }
});

Deno.test("getClock should return market clock", async () => {
  const { client, restore } = createTestClient(mockClock);

  try {
    const clock = await client.getClock();
    assertEquals(clock.is_open, mockClock.is_open);
  } finally {
    restore();
  }
});

// ============================================================================
// Watchlists Tests
// ============================================================================

Deno.test("getWatchlists should return all watchlists", async () => {
  const { client, restore } = createTestClient([mockWatchlist]);

  try {
    const watchlists = await client.getWatchlists();
    assertEquals(Array.isArray(watchlists), true);
    assertEquals(watchlists.length, 1);
  } finally {
    restore();
  }
});

Deno.test("getWatchlist should return a watchlist by ID", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.getWatchlist({
      watchlist_id: "test-watchlist-id",
    });
    assertEquals(watchlist.id, mockWatchlist.id);
    assertEquals(watchlist.name, mockWatchlist.name);
  } finally {
    restore();
  }
});

Deno.test("getWatchlistByName should return a watchlist by name", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.getWatchlistByName({
      name: "My Watchlist",
    });
    assertEquals(watchlist.name, mockWatchlist.name);
  } finally {
    restore();
  }
});

Deno.test("createWatchlist should create a watchlist", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.createWatchlist({
      name: "My Watchlist",
      symbols: ["AAPL"],
    });
    assertEquals(watchlist.name, mockWatchlist.name);
  } finally {
    restore();
  }
});

Deno.test("updateWatchlist should update a watchlist", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.updateWatchlist({
      watchlist_id: "test-watchlist-id",
      name: "Updated Watchlist",
      symbols: ["AAPL", "GOOGL"],
    });
    assertEquals(watchlist.id, mockWatchlist.id);
  } finally {
    restore();
  }
});

Deno.test("deleteWatchlist should delete a watchlist", async () => {
  const { client, restore } = createTestClient({});

  try {
    await client.deleteWatchlist({ watchlist_id: "test-watchlist-id" });
    // No error means success
  } finally {
    restore();
  }
});

Deno.test("addAssetToWatchlist should add an asset to a watchlist", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.addAssetToWatchlist({
      watchlist_id: "test-watchlist-id",
      symbol: "NVDA",
    });
    assertEquals(watchlist.id, mockWatchlist.id);
  } finally {
    restore();
  }
});

Deno.test("removeAssetFromWatchlist should remove an asset from a watchlist", async () => {
  const { client, restore } = createTestClient(mockWatchlist);

  try {
    const watchlist = await client.removeAssetFromWatchlist({
      watchlist_id: "test-watchlist-id",
      symbol: "AAPL",
    });
    assertEquals(watchlist.id, mockWatchlist.id);
  } finally {
    restore();
  }
});

// ============================================================================
// Activities Tests
// ============================================================================

Deno.test("getActivities should return account activities", async () => {
  const mockActivities = [
    {
      id: "test-activity-id",
      activity_type: "FILL",
      transaction_time: "2023-12-18T10:30:00Z",
    },
  ];
  const { client, restore } = createTestClient(mockActivities);

  try {
    const activities = await client.getActivities({});
    assertEquals(Array.isArray(activities), true);
  } finally {
    restore();
  }
});

Deno.test("getActivity should return activities by type", async () => {
  const mockActivities = [
    {
      id: "test-activity-id",
      activity_type: "FILL",
      transaction_time: "2023-12-18T10:30:00Z",
    },
  ];
  const { client, restore } = createTestClient(mockActivities);

  try {
    const activities = await client.getActivity({ activity_type: "FILL" });
    assertEquals(Array.isArray(activities), true);
  } finally {
    restore();
  }
});

// ============================================================================
// Options Contracts Tests
// ============================================================================

Deno.test("getOptionsContracts should return options contracts", async () => {
  const mockContracts = {
    option_contracts: [
      {
        id: "test-contract-id",
        symbol: "AAPL250117C00150000",
        status: "active",
        tradable: true,
      },
    ],
    next_page_token: null,
  };
  const { client, restore } = createTestClient(mockContracts);

  try {
    const result = await client.getOptionsContracts({
      underlying_symbols: "AAPL",
    });
    assertEquals(result.option_contracts.length, 1);
  } finally {
    restore();
  }
});

Deno.test("getOptionsContract should return an options contract", async () => {
  const mockContract = {
    id: "test-contract-id",
    symbol: "AAPL250117C00150000",
    status: "active",
    tradable: true,
  };
  const { client, restore } = createTestClient(mockContract);

  try {
    const contract = await client.getOptionsContract({
      symbol_or_id: "AAPL250117C00150000",
    });
    assertEquals(contract.symbol, mockContract.symbol);
  } finally {
    restore();
  }
});

// ============================================================================
// Crypto Funding Tests
// ============================================================================

Deno.test("getCryptoWallets should return crypto wallets", async () => {
  const mockWallets = [
    {
      id: "test-wallet-id",
      currency: "BTC",
      balance: "1.5",
      available: "1.0",
      held: "0.5",
      profile_id: "test-profile-id",
    },
  ];
  const { client, restore } = createTestClient(mockWallets);

  try {
    const wallets = await client.getCryptoWallets();
    assertEquals(Array.isArray(wallets), true);
    assertEquals(wallets.length, 1);
    assertEquals(wallets[0].currency, "BTC");
  } finally {
    restore();
  }
});

Deno.test("getCryptoWallet should return a crypto wallet", async () => {
  const mockWallet = {
    id: "test-wallet-id",
    currency: "BTC",
    balance: "1.5",
    available: "1.0",
    held: "0.5",
    profile_id: "test-profile-id",
  };
  const { client, restore } = createTestClient(mockWallet);

  try {
    const wallet = await client.getCryptoWallet({ asset: "BTC" });
    assertEquals(wallet.currency, "BTC");
  } finally {
    restore();
  }
});

Deno.test("getCryptoTransfers should return crypto transfers", async () => {
  const mockTransfers = [
    {
      id: "test-transfer-id",
      tx_hash: "0x123",
      direction: "OUTGOING",
      status: "COMPLETE",
      amount: "0.5",
      asset: "BTC",
    },
  ];
  const { client, restore } = createTestClient(mockTransfers);

  try {
    const transfers = await client.getCryptoTransfers({});
    assertEquals(Array.isArray(transfers), true);
    assertEquals(transfers.length, 1);
  } finally {
    restore();
  }
});
