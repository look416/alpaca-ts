import {
  ClientContext,
  GetOptionsContractOptions,
  GetOptionsContractsOptions,
  OptionsContract,
  OptionsContractsResponse,
} from "./types.ts";

// ============================================================================
// Get Options Contracts
// GET /v2/options/contracts
// ============================================================================

export const getOptionsContracts =
  ({ request }: ClientContext) =>
  (params: GetOptionsContractsOptions = {}) =>
    request<OptionsContractsResponse>({
      path: "/v2/options/contracts",
      method: "GET",
      params,
    });

// ============================================================================
// Get Options Contract by Symbol or ID
// GET /v2/options/contracts/{symbol_or_id}
// ============================================================================

export const getOptionsContract =
  ({ request }: ClientContext) =>
  ({ symbol_or_id }: GetOptionsContractOptions) =>
    request<OptionsContract>({
      path: `/v2/options/contracts/${symbol_or_id}`,
      method: "GET",
    });
