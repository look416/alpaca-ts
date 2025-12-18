import { baseURLs, ClientContext } from "./types.ts";

// ============================================================================
// Logo Types
// ============================================================================

export type Logo = string;

export type GetLogoOptions = {
  symbol: string;
  placeholder?: boolean;
};

// ============================================================================
// Logo Function
// ============================================================================

export const getLogo = (context: ClientContext) => (params: GetLogoOptions) =>
  context.request<Logo>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/logos/:symbol",
    method: "GET",
    params,
  });
