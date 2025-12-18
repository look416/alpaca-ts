import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// Options contract status
export type OptionsContractStatus = "active" | "inactive";

// Options contract type
export type OptionsContractType = "call" | "put";

// Options contract style
export type OptionsContractStyle = "american" | "european";

// Deliverable entity
export type Deliverable = {
  type: "cash" | "equity";
  symbol?: string;
  asset_id?: string;
  amount?: string;
  allocation_percentage?: string;
  settlement_type?: string;
  settlement_method?: string;
};

// Options contract entity based on OpenAPI spec
export type OptionsContract = {
  id: string;
  symbol: string;
  name: string;
  status: OptionsContractStatus;
  tradable: boolean;
  expiration_date: string;
  root_symbol?: string;
  underlying_symbol: string;
  underlying_asset_id: string;
  type: OptionsContractType;
  style: OptionsContractStyle;
  strike_price: string;
  multiplier?: string;
  size?: string;
  open_interest?: string;
  open_interest_date?: string;
  close_price?: string;
  close_price_date?: string;
  deliverables?: Deliverable[];
};

// Options contracts response with pagination
export type OptionsContractsResponse = {
  option_contracts: OptionsContract[];
  next_page_token?: string;
};

// Get options contracts options
export type GetOptionsContractsOptions = {
  underlying_symbols?: string;
  show_deliverables?: boolean;
  status?: OptionsContractStatus;
  expiration_date?: string;
  expiration_date_gte?: string;
  expiration_date_lte?: string;
  root_symbol?: string;
  type?: OptionsContractType;
  style?: OptionsContractStyle;
  strike_price_gte?: string;
  strike_price_lte?: string;
  page_token?: string;
  limit?: number;
};

// Get options contract by symbol or id options
export type GetOptionsContractOptions = {
  symbol_or_id: string;
};
