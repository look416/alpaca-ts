import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// ============================================================================
// Crypto Wallet Types
// ============================================================================

export type CryptoWallet = {
  id: string;
  currency: string;
  balance: string;
  available: string;
  held: string;
  profile_id: string;
};

export type GetWalletOptions = {
  asset: string;
};

// ============================================================================
// Crypto Fee Types
// ============================================================================

export type CryptoFee = {
  fee: string;
  network_fee: string;
  estimated_delivery: string;
};

export type GetCryptoFeeEstimateOptions = {
  asset: string;
  from_address: string;
  to_address: string;
  amount: string;
};

// ============================================================================
// Crypto Transfer Types
// ============================================================================

export type CryptoTransferDirection = "INCOMING" | "OUTGOING";

export type CryptoTransferStatus = "PROCESSING" | "FAILED" | "COMPLETE";

export type CryptoTransfer = {
  id: string;
  tx_hash: string;
  direction: CryptoTransferDirection;
  status: CryptoTransferStatus;
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string;
};

export type CryptoTransferResponse = {
  wallets?: CryptoWallet | CryptoWallet[];
  transfers?: CryptoTransfer[];
};

export type GetCryptoTransferOptions = {
  transfer_id: string;
};

export type GetCryptoTransfersOptions = {
  asset?: string;
};

export type CreateCryptoTransferOptions = {
  amount: string;
  address: string;
  asset: string;
};

// ============================================================================
// Whitelisted Address Types
// ============================================================================

export type WhitelistedAddressStatus = "ACTIVE" | "PENDING";

export type WhitelistedAddress = {
  id: string;
  chain: string;
  asset: string;
  address: string;
  status: WhitelistedAddressStatus;
  created_at: string;
};

export type GetCryptoWhitelistedAddressOptions = {
  address: string;
  asset: string;
};

export type RequestCryptoWhitelistedAddressOptions = {
  address: string;
  asset: string;
};

export type RemoveCryptoWhitelistedAddressOptions = {
  whitelisted_address_id: string;
};
