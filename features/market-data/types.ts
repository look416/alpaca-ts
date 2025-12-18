import { baseURLs, ClientContext } from "../../factory/createClient.ts";

export { baseURLs };
export type { ClientContext };

export type Nullable<T> = T | null;

export type Sort = "asc" | "desc";

export type Feed = "sip" | "iex" | "otc";
