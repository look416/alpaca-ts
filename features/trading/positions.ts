import {
  ClientContext,
  Nullable,
  Order,
  Position,
} from "./types.ts";

// ============================================================================
// Get All Positions
// GET /v2/positions
// ============================================================================

export const getPositions = ({ request }: ClientContext) => () =>
  request<Position[]>({
    path: "/v2/positions",
    method: "GET",
  });

// ============================================================================
// Get Position by Symbol or Asset ID
// GET /v2/positions/{symbol_or_asset_id}
// ============================================================================

export type GetPositionOptions = {
  symbol_or_asset_id: string;
};

export const getPosition =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: GetPositionOptions) =>
    request<Position>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "GET",
    });

// ============================================================================
// Close All Positions
// DELETE /v2/positions
// ============================================================================

export type CloseAllPositionsOptions = {
  cancel_orders?: boolean;
};

export const closeAllPositions =
  ({ request }: ClientContext) =>
  (params: CloseAllPositionsOptions = {}) =>
    request<Nullable<Order>[]>({
      path: "/v2/positions",
      method: "DELETE",
      params,
    });

// ============================================================================
// Close Position by Symbol or Asset ID
// DELETE /v2/positions/{symbol_or_asset_id}
// ============================================================================

export type ClosePositionOptions = {
  symbol_or_asset_id: string;
  qty?: string;
  percentage?: string;
};

export const closePosition =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id, ...params }: ClosePositionOptions) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "DELETE",
      params,
    });

// ============================================================================
// Exercise Option Position
// POST /v2/positions/{symbol_or_contract_id}/exercise
// ============================================================================

export type ExerciseOptionOptions = {
  symbol_or_contract_id: string;
};

export const exerciseOption =
  ({ request }: ClientContext) =>
  ({ symbol_or_contract_id }: ExerciseOptionOptions) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_contract_id}/exercise`,
      method: "POST",
    });

// ============================================================================
// Do Not Exercise Option Position
// POST /v2/positions/{symbol_or_contract_id}/do-not-exercise
// ============================================================================

export type DoNotExerciseOptionOptions = {
  symbol_or_contract_id: string;
};

export const doNotExerciseOption =
  ({ request }: ClientContext) =>
  ({ symbol_or_contract_id }: DoNotExerciseOptionOptions) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_contract_id}/do-not-exercise`,
      method: "POST",
    });
