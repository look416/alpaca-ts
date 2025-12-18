import { ClientContext } from "../../factory/createClient.ts";

export type { ClientContext };

// Calendar entity based on OpenAPI spec
export type Calendar = {
  date: string;
  open: string;
  close: string;
  session_open?: string;
  session_close?: string;
  settlement_date: string;
};

// Clock entity based on OpenAPI spec
export type Clock = {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
};

// Get calendar options
export type GetCalendarOptions = {
  start?: string;
  end?: string;
  date_type?: "TRADING" | "SETTLEMENT";
};
