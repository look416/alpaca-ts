import {
  AddAssetToWatchlistByNameOptions,
  AddAssetToWatchlistOptions,
  ClientContext,
  CreateWatchlistOptions,
  DeleteWatchlistByNameOptions,
  DeleteWatchlistOptions,
  GetWatchlistByNameOptions,
  GetWatchlistOptions,
  RemoveAssetFromWatchlistOptions,
  UpdateWatchlistByNameOptions,
  UpdateWatchlistOptions,
  Watchlist,
  WatchlistWithoutAssets,
} from "./types.ts";

// ============================================================================
// Get All Watchlists
// GET /v2/watchlists
// ============================================================================

export const getWatchlists = ({ request }: ClientContext) => () =>
  request<WatchlistWithoutAssets[]>({
    path: "/v2/watchlists",
    method: "GET",
  });

// ============================================================================
// Create Watchlist
// POST /v2/watchlists
// ============================================================================

export const createWatchlist =
  ({ request }: ClientContext) =>
  (data: CreateWatchlistOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists",
      method: "POST",
      data,
    });

// ============================================================================
// Get Watchlist by ID
// GET /v2/watchlists/{watchlist_id}
// ============================================================================

export const getWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id }: GetWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "GET",
    });

// ============================================================================
// Update Watchlist by ID
// PUT /v2/watchlists/{watchlist_id}
// ============================================================================

export const updateWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id, ...data }: UpdateWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "PUT",
      data,
    });

// ============================================================================
// Add Asset to Watchlist by ID
// POST /v2/watchlists/{watchlist_id}
// ============================================================================

export const addAssetToWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id, symbol }: AddAssetToWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "POST",
      data: { symbol },
    });

// ============================================================================
// Delete Watchlist by ID
// DELETE /v2/watchlists/{watchlist_id}
// ============================================================================

export const deleteWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id }: DeleteWatchlistOptions) =>
    request<void>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "DELETE",
    });

// ============================================================================
// Get Watchlist by Name
// GET /v2/watchlists:by_name
// ============================================================================

export const getWatchlistByName =
  ({ request }: ClientContext) =>
  (params: GetWatchlistByNameOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists:by_name",
      method: "GET",
      params,
    });

// ============================================================================
// Update Watchlist by Name
// PUT /v2/watchlists:by_name
// ============================================================================

export const updateWatchlistByName =
  ({ request }: ClientContext) =>
  ({ name, ...data }: UpdateWatchlistByNameOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists:by_name",
      method: "PUT",
      params: { name },
      data,
    });

// ============================================================================
// Add Asset to Watchlist by Name
// POST /v2/watchlists:by_name
// ============================================================================

export const addAssetToWatchlistByName =
  ({ request }: ClientContext) =>
  ({ name, symbol }: AddAssetToWatchlistByNameOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists:by_name",
      method: "POST",
      params: { name },
      data: { symbol },
    });

// ============================================================================
// Delete Watchlist by Name
// DELETE /v2/watchlists:by_name
// ============================================================================

export const deleteWatchlistByName =
  ({ request }: ClientContext) =>
  (params: DeleteWatchlistByNameOptions) =>
    request<void>({
      path: "/v2/watchlists:by_name",
      method: "DELETE",
      params,
    });

// ============================================================================
// Remove Asset from Watchlist
// DELETE /v2/watchlists/{watchlist_id}/{symbol}
// ============================================================================

export const removeAssetFromWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id, symbol }: RemoveAssetFromWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}/${symbol}`,
      method: "DELETE",
    });
