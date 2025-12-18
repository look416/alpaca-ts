import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.217.0/assert/assert_equals.ts";
import { mockFetch } from "../util/mockFetch.ts";

Deno.test("mockFetch should return a function", () => {
  const response = { data: "mocked response" };
  const result = mockFetch(response);

  assert(typeof result === "function");
});

Deno.test(
  "mockFetch should return a promise that resolves to a response object",
  async () => {
    const response = { data: "mocked response" };
    const fetch = mockFetch(response);
    const result = await fetch("https://example.com");

    assert(result instanceof Response);
    assertEquals(result.ok, true);
    assertEquals(result.status, 200);
    assertEquals(result.headers.get("Content-Type"), "application/json");
  },
);

Deno.test("mockFetch should return the mocked response data", async () => {
  const response = { data: "mocked response" };
  const fetch = mockFetch(response);
  const result = await fetch("https://example.com");
  const data = await result.json();

  assertEquals(data.data, response.data);
});

Deno.test("mockFetch should ignore the url and init parameters", async () => {
  const response = { data: "mocked response" };
  const fetch = mockFetch(response);

  const a = await fetch("https://example.com");
  const b = await fetch("https://example.com/other", {
    method: "POST",
    body: JSON.stringify({ key: "value" }),
  });

  const c = await a.json();
  const d = await b.json();

  assertEquals(c.data, response.data);
  assertEquals(d.data, response.data);
});
