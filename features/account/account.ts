import {
  Account,
  AccountConfigurations,
  ClientContext,
  GetPortfolioHistoryOptions,
  PortfolioHistory,
  UpdateAccountConfigurationsOptions,
} from "./types.ts";

// ============================================================================
// Get Account
// GET /v2/account
// ============================================================================

export const getAccount = ({ request }: ClientContext) => () =>
  request<Account>({
    path: "/v2/account",
    method: "GET",
  });

// ============================================================================
// Get Account Configurations
// GET /v2/account/configurations
// ============================================================================

export const getAccountConfigurations = ({ request }: ClientContext) => () =>
  request<AccountConfigurations>({
    path: "/v2/account/configurations",
    method: "GET",
  });

// ============================================================================
// Update Account Configurations
// PATCH /v2/account/configurations
// ============================================================================

export const updateAccountConfigurations =
  ({ request }: ClientContext) =>
  (data: UpdateAccountConfigurationsOptions) =>
    request<AccountConfigurations>({
      path: "/v2/account/configurations",
      method: "PATCH",
      data,
    });

// ============================================================================
// Get Portfolio History
// GET /v2/account/portfolio/history
// ============================================================================

export const getPortfolioHistory =
  ({ request }: ClientContext) =>
  (params: GetPortfolioHistoryOptions = {}) =>
    request<PortfolioHistory>({
      path: "/v2/account/portfolio/history",
      method: "GET",
      params,
    });
