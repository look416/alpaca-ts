// If `APCA_DEBUG` false, console.debug() should not log anything.
if (JSON.parse(Deno.env.get("APCA_DEBUG") || "false")) {
  console.debug = () => {};
} else {
  // Prefix all debug logs with "alpaca-ts" to make it easier to
  // for users to filter out debug logs from this SDK.
  console.debug = (...args) =>
    console.log("alpaca-ts:debug", ...args);
}
// Market Data API
export {
  // Corporate Actions
  type CashDividend,
  type CashMerger,
  type CorporateActions,
  type ForwardSplit,
  getStocksCorporateActions,
  type GetStocksCorporateActionsOptions,
  type NameChange,
  type Redemption,
  type ReverseSplit,
  type SpinOff,
  type StockAndCashMerger,
  type StockDividend,
  type StockMerger,
  type UnitSplit,
  type WorthlessRemoval,
  // Logos
  getLogo,
  type GetLogoOptions,
  type Logo,
  // News
  getNews,
  type GetNewsOptions,
  type News,
  type NewsArticle,
  type NewsArticleImage,
  // Screener
  getStocksMarketMovers,
  getStocksMostActives,
  type GetStocksMarketMoversOptions,
  type GetStocksMostActivesOptions,
  type MarketMover,
  type MarketMovers,
  type MostActive,
  type MostActives,
  // Stocks
  getStocksAuctions,
  getStocksBars,
  getStocksBarsLatest,
  getStocksConditions,
  getStocksExchangeCodes,
  getStocksQuotes,
  getStocksQuotesLatest,
  getStocksSnapshots,
  getStocksTrades,
  getStocksTradesLatest,
  type GetStocksAuctionsOptions,
  type GetStocksBarsLatestOptions,
  type GetStocksBarsOptions,
  type GetStocksConditionsOptions,
  type GetStocksQuotesLatestOptions,
  type GetStocksQuotesOptions,
  type GetStocksSnapshotsOptions,
  type GetStocksTradesLatestOptions,
  type GetStocksTradesOptions,
  type StockBar,
  type StockQuote,
  type StocksBars,
  type StocksBarsLatest,
  type StockSnapshots,
  type StocksAuction,
  type StocksAuctionPrice,
  type StocksAuctions,
  type StocksBar,
  type StocksConditions,
  type StocksExchangeCodes,
  type StocksQuotes,
  type StocksQuotesLatest,
  type StocksTrades,
  type StocksTradesLatest,
  type StockTrade,
  // Crypto
  getCryptoBars,
  getCryptoQuotes,
  getCryptoQuotesLatest,
  getCryptoSnapshots,
  getCryptoTrades,
  getCryptoTradesLatest,
  getLatestCryptoBars,
  getLatestCryptoOrderbooks,
  type CryptoBar,
  type CryptoBars,
  type CryptoBarsLatest,
  type CryptoOrderbook,
  type CryptoOrderbookEntry,
  type CryptoOrderbooksLatest,
  type CryptoQuote,
  type CryptoQuotes,
  type CryptoQuotesLatest,
  type CryptoSnapshots,
  type CryptoTrade,
  type CryptoTrades,
  type CryptoTradesLatest,
  type GetCryptoBarsLatestOptions,
  type GetCryptoBarsOptions,
  type GetCryptoOrderbooksLatestOptions,
  type GetCryptoQuotesLatestOptions,
  type GetCryptoQuotesOptions,
  type GetCryptoSnapshotsOptions,
  type GetCryptoTradesLatestOptions,
  type GetCryptoTradesOptions,
  // Options
  getOptionsBars,
  getOptionsExchanges,
  getOptionsSnapshots,
  getOptionsTrades,
  getOptionsTradesLatest,
  type GetOptionsBarsOptions,
  type GetOptionsSnapshotsOptions,
  type GetOptionsTradesLatestOptions,
  type GetOptionsTradesOptions,
  type OptionBar,
  type OptionsBars,
  type OptionsExchanges,
  type OptionsSnapshots,
  type OptionsSnapshotsQuote,
  type OptionsSnapshotsTrade,
  type OptionsTrades,
  type OptionsTradesLatest,
  // Forex
  getForexRates,
  getLatestForexRates,
  type ForexRate,
  type ForexRates,
  type ForexRatesLatest,
  type GetForexRatesLatestOptions,
  type GetForexRatesOptions,
  // Shared Types
  type Sort,
} from "./features/market-data/mod.ts";

// Trading API (positions, orders)
export {
  // Position functions
  closeAllPositions,
  type CloseAllPositionsOptions,
  closePosition,
  type ClosePositionOptions,
  doNotExerciseOption,
  type DoNotExerciseOptionOptions,
  exerciseOption,
  type ExerciseOptionOptions,
  getPosition,
  type GetPositionOptions,
  getPositions,
  // Order functions
  cancelAllOrders,
  cancelOrder,
  type CancelOrderOptions,
  createOrder,
  type CreateOrderOptions,
  getOrder,
  getOrderByClientOrderId,
  type GetOrderByClientOrderIdOptions,
  type GetOrderOptions,
  getOrders,
  type GetOrdersOptions,
  replaceOrder,
  type ReplaceOrderOptions,
  // Types
  type AssetClass,
  type ExchangeForPosition,
  type MultiStatusResponse,
  type Nullable,
  type Order,
  type OrderClass,
  type OrderDirection,
  type OrderSide,
  type OrderStatus,
  type OrderType,
  type Position,
  type PositionIntent,
  type PositionSide,
  type StopLoss,
  type TakeProfit,
  type TimeInForce,
} from "./features/trading/mod.ts";

// Account API
export {
  type Account,
  type AccountConfigurations,
  type AccountStatus,
  getAccount,
  getAccountConfigurations,
  type GetPortfolioHistoryOptions,
  getPortfolioHistory,
  type OptionsApprovedLevel,
  type OptionsTradingLevel,
  type PortfolioHistory,
  updateAccountConfigurations,
  type UpdateAccountConfigurationsOptions,
} from "./features/account/mod.ts";

// Assets API
export {
  type Asset,
  type AssetAttributes,
  type AssetClass as AssetClassType,
  type AssetExchange,
  type AssetStatus,
  getAsset,
  type GetAssetOptions,
  getAssets,
  type GetAssetsOptions,
} from "./features/assets/mod.ts";

// Calendar API
export {
  type Calendar,
  type Clock,
  getCalendar,
  type GetCalendarOptions,
  getClock,
} from "./features/calendar/mod.ts";

// Activities API
export {
  type Activity,
  type ActivityCategory,
  type ActivityType,
  getActivities,
  type GetActivitiesOptions,
  getActivity,
  type GetActivityOptions,
  type NonTradeActivity,
  type TradeActivity,
} from "./features/activities/mod.ts";

// Options Contracts API
export {
  type Deliverable,
  getOptionsContract,
  type GetOptionsContractOptions,
  getOptionsContracts,
  type GetOptionsContractsOptions,
  type OptionsContract,
  type OptionsContractStatus,
  type OptionsContractsResponse,
  type OptionsContractStyle,
  type OptionsContractType,
} from "./features/options-contracts/mod.ts";

// Watchlists API
export {
  addAssetToWatchlist,
  type AddAssetToWatchlistByNameOptions,
  addAssetToWatchlistByName,
  type AddAssetToWatchlistOptions,
  createWatchlist,
  type CreateWatchlistOptions,
  deleteWatchlist,
  deleteWatchlistByName,
  type DeleteWatchlistByNameOptions,
  type DeleteWatchlistOptions,
  getWatchlist,
  getWatchlistByName,
  type GetWatchlistByNameOptions,
  type GetWatchlistOptions,
  getWatchlists,
  removeAssetFromWatchlist,
  type RemoveAssetFromWatchlistOptions,
  updateWatchlist,
  updateWatchlistByName,
  type UpdateWatchlistByNameOptions,
  type UpdateWatchlistOptions,
  type Watchlist,
  type WatchlistWithoutAssets,
} from "./features/watchlists/mod.ts";

// Corporate Actions API
export {
  type CorporateAction,
  getCorporateAction,
  type GetCorporateActionOptions,
  getCorporateActions,
  type GetCorporateActionsOptions,
  type UnstableNumber,
} from "./api/trade.ts";

// Crypto Funding API
export {
  createCryptoTransfer,
  type CreateCryptoTransferOptions,
  type CryptoFee,
  type CryptoTransfer,
  type CryptoTransferDirection,
  type CryptoTransferResponse,
  type CryptoTransferStatus,
  type CryptoWallet,
  type GetCryptoFeeEstimateOptions,
  getCryptoTransfer,
  type GetCryptoTransferOptions,
  getCryptoTransfers,
  type GetCryptoTransfersOptions,
  getCryptoWallet,
  getCryptoWallets,
  getCryptoWhitelistedAddress,
  getCryptoWhitelistedAddresses,
  type GetCryptoWhitelistedAddressOptions,
  getFeeEstimate,
  type GetWalletOptions,
  removeCryptoWhitelistedAddress,
  type RemoveCryptoWhitelistedAddressOptions,
  requestCryptoWhitelistedAddress,
  type RequestCryptoWhitelistedAddressOptions,
  type WhitelistedAddress,
  type WhitelistedAddressStatus,
} from "./features/crypto-funding/mod.ts";

export {
  baseURLs,
  type Client,
  type ClientContext,
  createClient,
  type CreateClientOptions,
  type RequestOptions,
} from "./factory/createClient.ts";

export {
  createTokenBucket,
  type TokenBucketOptions,
} from "./factory/createTokenBucket.ts";

export {
  type MockFetch,
  mockFetch,
  type MockResponse,
} from "./util/mockFetch.ts";
