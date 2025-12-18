import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// Asset class enum
export type AssetClass = "us_equity" | "us_option" | "crypto";

// Asset status enum
export type AssetStatus = "active" | "inactive";

// Asset exchange enum
export type AssetExchange =
  | "AMEX"
  | "ARCA"
  | "BATS"
  | "NYSE"
  | "NASDAQ"
  | "NYSEARCA"
  | "OTC";

// Asset attributes
export type AssetAttributes =
  | "ptp_no_exception"
  | "ptp_with_exception"
  | "ipo"
  | "options_enabled"
  | "fractional_eh_enabled";

// Asset entity based on OpenAPI spec
export type Asset = {
  id: string;
  class: AssetClass;
  exchange: AssetExchange;
  symbol: string;
  name: string;
  status: AssetStatus;
  tradable: boolean;
  marginable: boolean;
  shortable: boolean;
  easy_to_borrow: boolean;
  fractionable: boolean;
  margin_requirement_long?: string;
  margin_requirement_short?: string;
  maintenance_margin_requirement?: number;
  attributes?: AssetAttributes[];
  min_order_size?: string;
  min_trade_increment?: string;
  price_increment?: string;
};

// Get assets options
export type GetAssetsOptions = {
  status?: AssetStatus;
  asset_class?: AssetClass;
  exchange?: AssetExchange;
  attributes?: string;
};

// Get asset by symbol or id options
export type GetAssetOptions = {
  symbol_or_asset_id: string;
};
