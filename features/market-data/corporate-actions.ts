import { baseURLs, ClientContext, Nullable, Sort } from "./types.ts";

// ============================================================================
// Corporate Actions Types
// ============================================================================

export type ReverseSplit = {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
};

export type ForwardSplit = {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
};

export type UnitSplit = {
  old_symbol: string;
  old_rate: number;
  new_symbol: string;
  new_rate: number;
  alternate_symbol: string;
  alternate_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockDividend = {
  symbol: string;
  rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
};

export type CashDividend = {
  symbol: string;
  rate: number;
  special: boolean;
  foreign: boolean;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_on_date?: string;
  due_bill_off_date?: string;
};

export type SpinOff = {
  source_symbol: string;
  source_rate: number;
  new_symbol: string;
  new_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
};

export type CashMerger = {
  acquirer_symbol: string;
  acquiree_symbol: string;
  rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockMerger = {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockAndCashMerger = {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  cash_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type Redemption = {
  symbol: string;
  rate: number;
  process_date: string;
  payable_date?: string;
};

export type NameChange = {
  old_symbol: string;
  new_symbol: string;
  process_date: string;
};

export type WorthlessRemoval = {
  symbol: string;
  process_date: string;
};

export type CorporateActions = {
  corporate_actions: {
    reverse_splits?: ReverseSplit[];
    forward_splits?: ForwardSplit[];
    unit_splits?: UnitSplit[];
    stock_dividends?: StockDividend[];
    cash_dividends?: CashDividend[];
    spin_offs?: SpinOff[];
    cash_mergers?: CashMerger[];
    stock_mergers?: StockMerger[];
    stock_and_cash_mergers?: StockAndCashMerger[];
    redemptions?: Redemption[];
    name_changes?: NameChange[];
    worthless_removals?: WorthlessRemoval[];
    next_page_token: Nullable<string>;
  };
};

export type GetStocksCorporateActionsOptions = {
  symbols: string;
  types?: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

// ============================================================================
// Corporate Actions Function
// ============================================================================

export const getStocksCorporateActions =
  (context: ClientContext) => (params: GetStocksCorporateActionsOptions) =>
    context.request<CorporateActions>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/corporate-actions",
      method: "GET",
      params,
    });
