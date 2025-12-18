import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// Activity types enum
export type ActivityType =
  | "FILL"
  | "TRANS"
  | "MISC"
  | "ACATC"
  | "ACATS"
  | "CSD"
  | "CSR"
  | "CSW"
  | "DIV"
  | "DIVCGL"
  | "DIVCGS"
  | "DIVFEE"
  | "DIVFT"
  | "DIVNRA"
  | "DIVROC"
  | "DIVTW"
  | "DIVTXEX"
  | "INT"
  | "INTNRA"
  | "INTTW"
  | "JNL"
  | "JNLC"
  | "JNLS"
  | "MA"
  | "NC"
  | "OPASN"
  | "OPEXP"
  | "OPXRC"
  | "PTC"
  | "PTR"
  | "REORG"
  | "SC"
  | "SSO"
  | "SSP"
  | "CFEE"
  | "FEE";

// Activity category
export type ActivityCategory = "trade_activity" | "non_trade_activity";

// Trading activity entity
export type TradeActivity = {
  activity_type: "FILL";
  id: string;
  cum_qty: string;
  leaves_qty: string;
  price: string;
  qty: string;
  side: "buy" | "sell";
  symbol: string;
  transaction_time: string;
  order_id: string;
  type: string;
  order_status?: string;
};

// Non-trade activity entity
export type NonTradeActivity = {
  activity_type: Exclude<ActivityType, "FILL">;
  id: string;
  date: string;
  net_amount: string;
  symbol?: string;
  qty?: string;
  per_share_amount?: string;
  description?: string;
  status?: string;
};

// Union type for all activities
export type Activity = TradeActivity | NonTradeActivity;

// Get all activities options
export type GetActivitiesOptions = {
  activity_types?: string;
  category?: ActivityCategory;
  date?: string;
  until?: string;
  after?: string;
  direction?: "asc" | "desc";
  page_size?: number;
  page_token?: string;
};

// Get activity by type options
export type GetActivityOptions = {
  activity_type: ActivityType;
  date?: string;
  until?: string;
  after?: string;
  direction?: "asc" | "desc";
  page_size?: number;
  page_token?: string;
};
