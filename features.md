**Trading** (v2 Trading API)

Positions:
- GET /v2/positions - getPositions
- GET /v2/positions/{symbol_or_asset_id} - getPosition
- DELETE /v2/positions - closeAllPositions
- DELETE /v2/positions/{symbol_or_asset_id} - closePosition
- POST /v2/positions/{symbol_or_contract_id}/exercise - exerciseOption
- POST /v2/positions/{symbol_or_contract_id}/do-not-exercise - doNotExerciseOption

Orders:
- POST /v2/orders - createOrder
- GET /v2/orders - getOrders
- GET /v2/orders/{order_id} - getOrder
- GET /v2/orders:by_client_order_id - getOrderByClientOrderId
- PATCH /v2/orders/{order_id} - replaceOrder
- DELETE /v2/orders/{order_id} - cancelOrder
- DELETE /v2/orders - cancelAllOrders

Documentation: https://docs.alpaca.markets/openapi/trading-api.json
