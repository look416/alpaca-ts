import {
  Activity,
  ClientContext,
  GetActivitiesOptions,
  GetActivityOptions,
} from "./types.ts";

// ============================================================================
// Get All Account Activities
// GET /v2/account/activities
// ============================================================================

export const getActivities =
  ({ request }: ClientContext) =>
  (params: GetActivitiesOptions = {}) =>
    request<Activity[]>({
      path: "/v2/account/activities",
      method: "GET",
      params,
    });

// ============================================================================
// Get Activities by Type
// GET /v2/account/activities/{activity_type}
// ============================================================================

export const getActivity =
  ({ request }: ClientContext) =>
  ({ activity_type, ...params }: GetActivityOptions) =>
    request<Activity[]>({
      path: `/v2/account/activities/${activity_type}`,
      method: "GET",
      params,
    });
