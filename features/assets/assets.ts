import {
  Asset,
  ClientContext,
  GetAssetOptions,
  GetAssetsOptions,
} from "./types.ts";

// ============================================================================
// Get All Assets
// GET /v2/assets
// ============================================================================

export const getAssets =
  ({ request }: ClientContext) =>
  (params: GetAssetsOptions = {}) =>
    request<Asset[]>({
      path: "/v2/assets",
      method: "GET",
      params,
    });

// ============================================================================
// Get Asset by Symbol or Asset ID
// GET /v2/assets/{symbol_or_asset_id}
// ============================================================================

export const getAsset =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: GetAssetOptions) =>
    request<Asset>({
      path: `/v2/assets/${symbol_or_asset_id}`,
      method: "GET",
    });
