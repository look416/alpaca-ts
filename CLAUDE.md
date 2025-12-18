# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript SDK for the Alpaca Markets REST API and WebSocket streams. Zero-dependency library that supports both Deno (native) and Node.js (ESM/CJS via build).

## Build Commands

```bash
# Build npm package from Deno source (outputs to ./npm directory)
deno run -A build.ts <version>

# Run tests
deno test
```

## Architecture

### Entry Point
- `mod.ts` - Main module that exports all public APIs (types, functions, factories)

### Core Modules

**Factory Pattern** (`factory/`):
- `createClient.ts` - Main client factory. Takes credentials (key/secret or accessToken), creates a throttled request function with token bucket rate limiting, and returns an object with all API methods bound to the client context
- `createTokenBucket.ts` - Token bucket implementation for rate limiting (default: 200 capacity, 3 tokens/sec)
- `createStream.ts` - WebSocket streaming client (marked as incomplete/WIP)

**API Modules** (`api/`):
- `trade.ts` - Trading API methods (orders, positions, account, watchlists, crypto wallets, etc.)
- `marketData.ts` - Market data API methods (stocks, options, crypto quotes/bars/trades)

### Design Patterns

**Client Context Pattern**: Each API function is a factory that takes `ClientContext` and returns the actual method:
```typescript
export const getAccount = ({ request }: ClientContext) => () =>
  request<Account>({ path: "/v2/account" });
```

**Type Exports**: All types are exported from `mod.ts` alongside their corresponding functions. The `UnstableNumber` type (`string | number`) is used for price fields that may vary by context.

### Environment Variables
- `APCA_KEY_ID` - API key
- `APCA_KEY_SECRET` - API secret
- `APCA_ACCESS_TOKEN` - OAuth access token (alternative to key/secret)
- `APCA_DEBUG` - Enable debug logging

### Build System
Uses `@deno/dnt` to transpile Deno code to Node.js-compatible npm package. The build outputs to `./npm` with ESM format and inline type declarations.
