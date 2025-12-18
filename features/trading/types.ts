import { ClientContext } from "../../factory/createClient.ts";

// Re-export ClientContext for convenience
export type { ClientContext };

// Utility types
export type Nullable<T> = T | null;

// Enums based on OpenAPI spec

export type AssetClass = "us_equity" | "us_option" | "crypto";

export type ExchangeForPosition =
  | "AMEX"
  | "ARCA"
  | "BATS"
  | "NYSE"
  | "NASDAQ"
  | "NYSEARCA"
  | "OTC";

export type OrderType =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop";

export type OrderSide = "buy" | "sell";

export type TimeInForce = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";

export type OrderClass = "simple" | "bracket" | "oco" | "oto" | "mleg" | "";

export type OrderStatus =
  | "new"
  | "partially_filled"
  | "filled"
  | "done_for_day"
  | "canceled"
  | "expired"
  | "replaced"
  | "pending_cancel"
  | "pending_replace"
  | "pending_new"
  | "accepted"
  | "stopped"
  | "rejected"
  | "suspended"
  | "calculated";

export type PositionSide = "long" | "short";

export type PositionIntent =
  | "buy_to_open"
  | "buy_to_close"
  | "sell_to_open"
  | "sell_to_close";

export type OrderDirection = "asc" | "desc";

// Position entity based on OpenAPI spec
export type Position = {
  asset_id: string;
  symbol: string;
  exchange: ExchangeForPosition;
  asset_class: AssetClass;
  avg_entry_price: string;
  qty: string;
  qty_available: string;
  side: PositionSide;
  market_value: string;
  cost_basis: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  unrealized_intraday_pl: string;
  unrealized_intraday_plpc: string;
  current_price: string;
  lastday_price: string;
  change_today: string;
  asset_marginable: boolean;
};

// Order entity based on OpenAPI spec
export type Order = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: Nullable<string>;
  submitted_at: Nullable<string>;
  filled_at: Nullable<string>;
  expired_at: Nullable<string>;
  canceled_at: Nullable<string>;
  failed_at: Nullable<string>;
  replaced_at: Nullable<string>;
  replaced_by: Nullable<string>;
  replaces: Nullable<string>;
  asset_id: string;
  symbol: string;
  asset_class: AssetClass;
  notional: Nullable<string>;
  qty: Nullable<string>;
  filled_qty: string;
  filled_avg_price: Nullable<string>;
  order_class: OrderClass;
  order_type: OrderType;
  type: OrderType;
  side: OrderSide;
  time_in_force: TimeInForce;
  limit_price: Nullable<string>;
  stop_price: Nullable<string>;
  status: OrderStatus;
  extended_hours: boolean;
  legs: Nullable<Order[]>;
  trail_percent: Nullable<string>;
  trail_price: Nullable<string>;
  hwm: Nullable<string>;
  subtag: Nullable<string>;
  source: Nullable<string>;
  position_intent?: PositionIntent;
};

// Take profit for bracket orders
export type TakeProfit = {
  limit_price?: string;
};

// Stop loss for bracket orders
export type StopLoss = {
  stop_price?: string;
  limit_price?: string;
};

// Multi-status response for bulk operations
export type MultiStatusResponse = {
  id: string;
  status: number;
  body?: Order;
};
