import {
  ClientContext,
  CreateCryptoTransferOptions,
  CryptoFee,
  CryptoTransfer,
  CryptoTransferResponse,
  CryptoWallet,
  GetCryptoFeeEstimateOptions,
  GetCryptoTransferOptions,
  GetCryptoTransfersOptions,
  GetCryptoWhitelistedAddressOptions,
  GetWalletOptions,
  RemoveCryptoWhitelistedAddressOptions,
  RequestCryptoWhitelistedAddressOptions,
  WhitelistedAddress,
} from "./types.ts";

// ============================================================================
// Get Crypto Wallet
// GET /v2/wallets/{asset}
// ============================================================================

export const getCryptoWallet =
  ({ request }: ClientContext) => ({ asset }: GetWalletOptions) =>
    request<CryptoWallet>({
      path: `/v2/wallets/${asset}`,
      method: "GET",
    });

// ============================================================================
// Get All Crypto Wallets
// GET /v2/wallets
// ============================================================================

export const getCryptoWallets = ({ request }: ClientContext) => () =>
  request<CryptoWallet[]>({
    path: "/v2/wallets",
    method: "GET",
  });

// ============================================================================
// Get Fee Estimate
// GET /v2/wallets/fees/estimate
// ============================================================================

export const getFeeEstimate =
  ({ request }: ClientContext) => (params: GetCryptoFeeEstimateOptions) =>
    request<CryptoFee>({
      path: "/v2/wallets/fees/estimate",
      method: "GET",
      params,
    });

// ============================================================================
// Get Crypto Transfer
// GET /v2/wallets/transfers/{transfer_id}
// ============================================================================

export const getCryptoTransfer =
  ({ request }: ClientContext) => ({ transfer_id }: GetCryptoTransferOptions) =>
    request<CryptoTransferResponse | CryptoTransfer>({
      path: `/v2/wallets/transfers/${transfer_id}`,
      method: "GET",
    });

// ============================================================================
// Get All Crypto Transfers
// GET /v2/wallets/transfers
// ============================================================================

export const getCryptoTransfers =
  ({ request }: ClientContext) => (params?: GetCryptoTransfersOptions) =>
    request<CryptoTransfer[]>({
      path: "/v2/wallets/transfers",
      method: "GET",
      params,
    });

// ============================================================================
// Create Crypto Transfer
// POST /v2/wallets/transfers
// ============================================================================

export const createCryptoTransfer =
  ({ request }: ClientContext) => (data: CreateCryptoTransferOptions) =>
    request<CryptoTransfer>({
      path: "/v2/wallets/transfers",
      method: "POST",
      data,
    });

// ============================================================================
// Get Crypto Whitelisted Address
// GET /v2/wallets/whitelists
// ============================================================================

export const getCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  (params: GetCryptoWhitelistedAddressOptions) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "GET",
      params,
    });

// ============================================================================
// Get All Crypto Whitelisted Addresses
// GET /v2/wallets/whitelists
// ============================================================================

export const getCryptoWhitelistedAddresses =
  ({ request }: ClientContext) => () =>
    request<WhitelistedAddress[]>({
      path: "/v2/wallets/whitelists",
      method: "GET",
    });

// ============================================================================
// Request Crypto Whitelisted Address
// POST /v2/wallets/whitelists
// ============================================================================

export const requestCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  (data: RequestCryptoWhitelistedAddressOptions) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "POST",
      data,
    });

// ============================================================================
// Remove Crypto Whitelisted Address
// DELETE /v2/wallets/whitelists/{whitelisted_address_id}
// ============================================================================

export const removeCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  ({ whitelisted_address_id }: RemoveCryptoWhitelistedAddressOptions) =>
    request({
      path: `/v2/wallets/whitelists/${whitelisted_address_id}`,
      method: "DELETE",
    });
