import * as marketData from "../features/market-data/mod.ts";
import * as trade from "../api/trade.ts";
import * as trading from "../features/trading/mod.ts";
import * as account from "../features/account/mod.ts";
import * as assets from "../features/assets/mod.ts";
import * as calendar from "../features/calendar/mod.ts";
import * as activities from "../features/activities/mod.ts";
import * as optionsContracts from "../features/options-contracts/mod.ts";
import * as watchlists from "../features/watchlists/mod.ts";
import * as cryptoFunding from "../features/crypto-funding/mod.ts";

import { createTokenBucket, TokenBucketOptions } from "./createTokenBucket.ts";

export const baseURLs = {
  live: "https://api.alpaca.markets",
  paper: "https://paper-api.alpaca.markets",
  marketData: "https://data.alpaca.markets",
} as const;

export type BaseURLKey = keyof typeof baseURLs;

export type RequestOptions<T> = {
  path: string;
  method?: string;
  baseURL?: (typeof baseURLs)[BaseURLKey];
  data?: object;
  params?: object;
};

// Filter out type exports from feature modules (only keep functions)
type TradingFunctions = {
  [K in keyof typeof trading as (typeof trading)[K] extends (...args: never[]) => unknown ? K : never]: (typeof trading)[K];
};

type AccountFunctions = {
  [K in keyof typeof account as (typeof account)[K] extends (...args: never[]) => unknown ? K : never]: (typeof account)[K];
};

type AssetsFunctions = {
  [K in keyof typeof assets as (typeof assets)[K] extends (...args: never[]) => unknown ? K : never]: (typeof assets)[K];
};

type CalendarFunctions = {
  [K in keyof typeof calendar as (typeof calendar)[K] extends (...args: never[]) => unknown ? K : never]: (typeof calendar)[K];
};

type ActivitiesFunctions = {
  [K in keyof typeof activities as (typeof activities)[K] extends (...args: never[]) => unknown ? K : never]: (typeof activities)[K];
};

type OptionsContractsFunctions = {
  [K in keyof typeof optionsContracts as (typeof optionsContracts)[K] extends (...args: never[]) => unknown ? K : never]: (typeof optionsContracts)[K];
};

type WatchlistsFunctions = {
  [K in keyof typeof watchlists as (typeof watchlists)[K] extends (...args: never[]) => unknown ? K : never]: (typeof watchlists)[K];
};

type CryptoFundingFunctions = {
  [K in keyof typeof cryptoFunding as (typeof cryptoFunding)[K] extends (...args: never[]) => unknown ? K : never]: (typeof cryptoFunding)[K];
};

type MarketDataFunctions = {
  [K in keyof typeof marketData as (typeof marketData)[K] extends (...args: never[]) => unknown ? K : never]: (typeof marketData)[K];
};

export type Client =
  & { [K in keyof typeof trade]: ReturnType<(typeof trade)[K]> }
  & { [K in keyof MarketDataFunctions]: ReturnType<MarketDataFunctions[K]> }
  & { [K in keyof TradingFunctions]: ReturnType<TradingFunctions[K]> }
  & { [K in keyof AccountFunctions]: ReturnType<AccountFunctions[K]> }
  & { [K in keyof AssetsFunctions]: ReturnType<AssetsFunctions[K]> }
  & { [K in keyof CalendarFunctions]: ReturnType<CalendarFunctions[K]> }
  & { [K in keyof ActivitiesFunctions]: ReturnType<ActivitiesFunctions[K]> }
  & { [K in keyof OptionsContractsFunctions]: ReturnType<OptionsContractsFunctions[K]> }
  & { [K in keyof WatchlistsFunctions]: ReturnType<WatchlistsFunctions[K]> }
  & { [K in keyof CryptoFundingFunctions]: ReturnType<CryptoFundingFunctions[K]> };

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions<T>) => Promise<T>;
};

export type CreateClientOptions = {
  key?: string;
  secret?: string;
  accessToken?: string;
  baseURL?: string;
  paper?: boolean;
  tokenBucket?: TokenBucketOptions;
};

export const createClient = (options: CreateClientOptions) => {
  const {
    key = "",
    secret = "",
    accessToken = "",
    paper = true,
  } = {
    key: options.key || Deno.env.get("APCA_KEY_ID"),
    secret: options.secret || Deno.env.get("APCA_KEY_SECRET"),
    accessToken: options.accessToken || Deno.env.get("APCA_ACCESS_TOKEN"),
  };

  // Check if credentials are provided
  if (!accessToken && (!key || !secret)) {
    throw new Error("Missing credentials (need accessToken or key/secret)");
  }

  const baseURL = options.baseURL || (paper ? baseURLs.paper : baseURLs.live);

  // Create a token bucket for rate limiting
  const bucket = createTokenBucket(options.tokenBucket);

  // Throttled request function that respects the token bucket
  const request = async <T>({
    method = "GET",
    path,
    params,
    data,
    baseURL: requestBaseURL,
  }: RequestOptions<T>): Promise<T> => {
    await new Promise((resolve) => {
      // Poll the token bucket every second
      const timer = setInterval(() => {
        // If a token is available, resolve the promise
        if (bucket.take(1)) {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000);
    });

    // Construct the URL - use request-specific baseURL if provided
    const url = new URL(path, requestBaseURL || baseURL);

    if (params) {
      // Filter out undefined and null values, then append query parameters to the URL
      const filteredParams = Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null
      ) as [string, string][];
      url.search = new URLSearchParams(filteredParams).toString();
    }

    // Construct the headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (accessToken) {
      // Use the access token for authentication
      headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      // Use the API key and secret for authentication
      headers.set("APCA-API-KEY-ID", key);
      headers.set("APCA-API-SECRET-KEY", secret);
    }

    // Make the request
    return fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    }).then(async (response) => {
      if (!response.ok) {
        // The response will contain an error message (usually)
        throw new Error(await response.text());
      }

      // Parse the response and cast it to the expected type
      return response.json().catch(() => ({})) as Promise<T>;
    });
  };

  // Create a context object to pass to the client factory
  const context: ClientContext = { options, request };

  // Filter feature modules to only include functions
  const tradingFunctions = Object.entries(trading)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const accountFunctions = Object.entries(account)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const assetsFunctions = Object.entries(assets)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const calendarFunctions = Object.entries(calendar)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const activitiesFunctions = Object.entries(activities)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const optionsContractsFunctions = Object.entries(optionsContracts)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const watchlistsFunctions = Object.entries(watchlists)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const cryptoFundingFunctions = Object.entries(cryptoFunding)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  const marketDataFunctions = Object.entries(marketData)
    .filter(([_, value]) => typeof value === "function")
    .map(([_, fn]) => fn);

  // Return an object with all methods
  return [
    ...Object.values(trade),
    ...marketDataFunctions,
    ...tradingFunctions,
    ...accountFunctions,
    ...assetsFunctions,
    ...calendarFunctions,
    ...activitiesFunctions,
    ...optionsContractsFunctions,
    ...watchlistsFunctions,
    ...cryptoFundingFunctions,
  ].reduce(
    (prev, fn) => ({ ...prev, [(fn as { name: string }).name]: (fn as CallableFunction)(context) }),
    {} as Client,
  );
};
