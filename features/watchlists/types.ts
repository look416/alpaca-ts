import { ClientContext } from "../../factory/createClient.ts";
import { Asset } from "../assets/mod.ts";

export type { Asset, ClientContext };

// Watchlist entity (without assets for list responses)
export type WatchlistWithoutAssets = {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
};

// Watchlist entity (with assets)
export type Watchlist = WatchlistWithoutAssets & {
  assets: Asset[];
};

// Get watchlist by ID options
export type GetWatchlistOptions = {
  watchlist_id: string;
};

// Create watchlist options
export type CreateWatchlistOptions = {
  name: string;
  symbols?: string[];
};

// Update watchlist options (by ID)
export type UpdateWatchlistOptions = {
  watchlist_id: string;
  name: string;
  symbols?: string[];
};

// Delete watchlist by ID options
export type DeleteWatchlistOptions = {
  watchlist_id: string;
};

// Add asset to watchlist by ID options
export type AddAssetToWatchlistOptions = {
  watchlist_id: string;
  symbol: string;
};

// Get watchlist by name options
export type GetWatchlistByNameOptions = {
  name: string;
};

// Update watchlist by name options
export type UpdateWatchlistByNameOptions = {
  name: string;
  new_name?: string;
  symbols?: string[];
};

// Delete watchlist by name options
export type DeleteWatchlistByNameOptions = {
  name: string;
};

// Add asset to watchlist by name options
export type AddAssetToWatchlistByNameOptions = {
  name: string;
  symbol: string;
};

// Remove asset from watchlist options
export type RemoveAssetFromWatchlistOptions = {
  watchlist_id: string;
  symbol: string;
};
