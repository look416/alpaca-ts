import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// Account status enum
export type AccountStatus =
  | "ONBOARDING"
  | "SUBMISSION_FAILED"
  | "SUBMITTED"
  | "ACCOUNT_UPDATED"
  | "APPROVAL_PENDING"
  | "ACTIVE"
  | "REJECTED"
  | "APPROVAL_PENDING"
  | "APPROVED"
  | "DISABLED"
  | "DISABLE_PENDING"
  | "EDITED"
  | "INACTIVE"
  | "ONBOARDING"
  | "REAPPROVAL_PENDING"
  | "RESUBMITTED"
  | "SIGNED_UP";

export type OptionsApprovedLevel = 0 | 1 | 2;
export type OptionsTradingLevel = 0 | 1 | 2;

// Account entity based on OpenAPI spec
export type Account = {
  id: string;
  account_number: string;
  status: AccountStatus;
  crypto_status?: AccountStatus;
  currency: string;
  cash: string;
  portfolio_value: string;
  non_marginable_buying_power: string;
  accrued_fees: string;
  pending_transfer_in: string;
  pending_transfer_out: string;
  pattern_day_trader: boolean;
  trade_suspended_by_user: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
  account_blocked: boolean;
  created_at: string;
  shorting_enabled: boolean;
  long_market_value: string;
  short_market_value: string;
  equity: string;
  last_equity: string;
  multiplier: string;
  buying_power: string;
  initial_margin: string;
  maintenance_margin: string;
  sma: string;
  daytrade_count: number;
  last_maintenance_margin: string;
  daytrading_buying_power: string;
  regt_buying_power: string;
  options_buying_power?: string;
  options_approved_level?: OptionsApprovedLevel;
  options_trading_level?: OptionsTradingLevel;
  crypto_tier?: number;
};

// Account configurations based on OpenAPI spec
export type AccountConfigurations = {
  dtbp_check: "both" | "entry" | "exit";
  trade_confirm_email: "all" | "none";
  suspend_trade: boolean;
  no_shorting: boolean;
  fractional_trading: boolean;
  max_margin_multiplier: "1" | "2";
  max_options_trading_level?: 0 | 1 | 2;
  pdt_check: "both" | "entry" | "exit";
  ptp_no_exception_entry: boolean;
};

// Update configurations options (all optional)
export type UpdateAccountConfigurationsOptions = Partial<AccountConfigurations>;

// Portfolio history based on OpenAPI spec
export type PortfolioHistory = {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
  base_value_asof: string;
  timeframe: string;
};

// Get portfolio history options
export type GetPortfolioHistoryOptions = {
  period?: string;
  timeframe?: "1Min" | "5Min" | "15Min" | "1H" | "1D";
  intraday_reporting?: "market_hours" | "extended_hours" | "continuous";
  start?: string;
  end?: string;
  pnl_reset?: "per_day" | "no_reset";
  date_end?: string;
  extended_hours?: boolean;
};
