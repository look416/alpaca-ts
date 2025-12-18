import { ClientContext } from "../factory/createClient.ts";

// Used for fields where the type may change based on the context, such as prices.
export type UnstableNumber = string | number;

export type Nullable<T> = T | null;

// Note: Account types and functions have been moved to features/account/
// Note: Order, Position, and related trading types have been moved to features/trading/
// Note: Asset types and functions have been moved to features/assets/
// Note: Calendar types and functions have been moved to features/calendar/
// Note: Watchlists have been moved to features/watchlists/
// Note: PortfolioHistory and Configurations have been moved to features/account/
// Note: Activities have been moved to features/activities/
// Note: Options Contracts have been moved to features/options-contracts/
// Note: Crypto Funding (wallets, transfers, whitelists) has been moved to features/crypto-funding/

export type CorporateAction = {
  id: string;
  corporate_actions_id: string;
  ca_type: string;
  ca_sub_type: string;
  initiating_symbol: string;
  initiating_original_cusip: string;
  target_symbol: string;
  target_original_cusip: string;
  declaration_date: string;
  expiration_date: string;
  record_date: string;
  payable_date: string;
  cash: string;
  old_rate: string;
  new_rate: string;
};

export type GetCorporateActionOptions = {
  id: string;
};

export const getCorporateAction =
  ({ request }: ClientContext) => ({ id }: GetCorporateActionOptions) =>
    request<CorporateAction>({
      path: `/v2/corporate_actions/announcements/${id}`,
      method: "GET",
    });

export type GetCorporateActionsOptions = {
  ca_types: string;
  since: string;
  until: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
};

export const getCorporateActions =
  ({ request }: ClientContext) => (params: GetCorporateActionsOptions) =>
    request<CorporateAction[]>({
      path: "/v2/corporate_actions/announcements",
      method: "GET",
      params,
    });
