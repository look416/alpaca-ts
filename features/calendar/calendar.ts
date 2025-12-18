import {
  Calendar,
  ClientContext,
  Clock,
  GetCalendarOptions,
} from "./types.ts";

// ============================================================================
// Get Market Calendar
// GET /v2/calendar
// ============================================================================

export const getCalendar =
  ({ request }: ClientContext) =>
  (params: GetCalendarOptions = {}) =>
    request<Calendar[]>({
      path: "/v2/calendar",
      method: "GET",
      params,
    });

// ============================================================================
// Get Market Clock
// GET /v2/clock
// ============================================================================

export const getClock = ({ request }: ClientContext) => () =>
  request<Clock>({
    path: "/v2/clock",
    method: "GET",
  });
