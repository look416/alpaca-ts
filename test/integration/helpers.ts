import { createClient, Client } from "../../mod.ts";

/**
 * Creates a real client for integration testing using environment variables.
 * Requires ALPACA_API_KEY and ALPACA_SECRET_KEY to be set.
 */
export function createIntegrationClient(): Client {
  const key = Deno.env.get("ALPACA_API_KEY");
  const secret = Deno.env.get("ALPACA_SECRET_KEY");

  if (!key || !secret) {
    throw new Error(
      "Integration tests require ALPACA_API_KEY and ALPACA_SECRET_KEY environment variables"
    );
  }

  return createClient({
    key,
    secret,
    paper: true, // Always use paper trading for tests
  });
}

/**
 * Helper to skip test if credentials are not available
 */
export function requireCredentials(): void {
  const key = Deno.env.get("ALPACA_API_KEY");
  const secret = Deno.env.get("ALPACA_SECRET_KEY");

  if (!key || !secret) {
    throw new Deno.errors.NotSupported(
      "Skipping: ALPACA_API_KEY and ALPACA_SECRET_KEY required"
    );
  }
}

/**
 * Wait for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
