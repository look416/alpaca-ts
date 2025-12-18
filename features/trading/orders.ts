import {
  AssetClass,
  ClientContext,
  Order,
  OrderClass,
  OrderDirection,
  OrderSide,
  OrderType,
  PositionIntent,
  StopLoss,
  TakeProfit,
  TimeInForce,
} from "./types.ts";

// ============================================================================
// Create Order
// POST /v2/orders
// ============================================================================

export type CreateOrderOptions = {
  symbol: string;
  qty?: string;
  notional?: string;
  side: OrderSide;
  type: OrderType;
  time_in_force: TimeInForce;
  limit_price?: string;
  stop_price?: string;
  trail_price?: string;
  trail_percent?: string;
  extended_hours?: boolean;
  client_order_id?: string;
  order_class?: OrderClass;
  take_profit?: TakeProfit;
  stop_loss?: StopLoss;
  position_intent?: PositionIntent;
};

export const createOrder =
  ({ request }: ClientContext) => (data: CreateOrderOptions) =>
    request<Order>({
      path: "/v2/orders",
      method: "POST",
      data,
    });

// ============================================================================
// Get All Orders
// GET /v2/orders
// ============================================================================

export type GetOrdersOptions = {
  status?: "open" | "closed" | "all";
  limit?: number;
  after?: string;
  until?: string;
  direction?: OrderDirection;
  nested?: boolean;
  symbols?: string;
  side?: OrderSide;
  asset_class?: AssetClass;
};

export const getOrders =
  ({ request }: ClientContext) =>
  (params: GetOrdersOptions = {}) =>
    request<Order[]>({
      path: "/v2/orders",
      method: "GET",
      params,
    });

// ============================================================================
// Get Order by ID
// GET /v2/orders/{order_id}
// ============================================================================

export type GetOrderOptions = {
  order_id: string;
  nested?: boolean;
};

export const getOrder =
  ({ request }: ClientContext) =>
  ({ order_id, ...params }: GetOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "GET",
      params,
    });

// ============================================================================
// Get Order by Client Order ID
// GET /v2/orders:by_client_order_id
// ============================================================================

export type GetOrderByClientOrderIdOptions = {
  client_order_id: string;
};

export const getOrderByClientOrderId =
  ({ request }: ClientContext) =>
  (params: GetOrderByClientOrderIdOptions) =>
    request<Order>({
      path: "/v2/orders:by_client_order_id",
      method: "GET",
      params,
    });

// ============================================================================
// Replace Order
// PATCH /v2/orders/{order_id}
// ============================================================================

export type ReplaceOrderOptions = {
  order_id: string;
  qty?: string;
  time_in_force?: TimeInForce;
  limit_price?: string;
  stop_price?: string;
  trail?: string;
  client_order_id?: string;
};

export const replaceOrder =
  ({ request }: ClientContext) =>
  ({ order_id, ...data }: ReplaceOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "PATCH",
      data,
    });

// ============================================================================
// Cancel Order by ID
// DELETE /v2/orders/{order_id}
// ============================================================================

export type CancelOrderOptions = {
  order_id: string;
};

export const cancelOrder =
  ({ request }: ClientContext) =>
  ({ order_id }: CancelOrderOptions) =>
    request<void>({
      path: `/v2/orders/${order_id}`,
      method: "DELETE",
    });

// ============================================================================
// Cancel All Orders
// DELETE /v2/orders
// ============================================================================

export const cancelAllOrders = ({ request }: ClientContext) => () =>
  request<Order[]>({
    path: "/v2/orders",
    method: "DELETE",
  });
