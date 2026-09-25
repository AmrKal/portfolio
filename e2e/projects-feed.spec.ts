import { test, expect } from "@playwright/test";

const GITHUB_API = "https://api.github.com/**";

// The unauthenticated GitHub API is rate limited to 60 requests/hour, so the
// live endpoint is never called here: every case is driven by a stubbed
// response, which also makes these deterministic in CI.
test.describe("GitHub feed", () => {
  test("renders repositories returned by the API", async ({ page }) => {
    await page.route(GITHUB_API, (route) =>
      route.fulfill({
        status: 200,
        json: [
          {
            id: 1,
            name: "some-repo",
            html_url: "https://github.com/amrkal/some-repo",
            description: "A repository description.",
            language: "Rust",
            fork: false,
            private: false,
          },
        ],
      }),
    );

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "some-repo" })).toBeVisible();
    await expect(page.getByText("A repository description.")).toBeVisible();
    await expect(page.getByText("Rust")).toBeVisible();
  });

  test("falls back to a profile link when rate limited", async ({ page }) => {
    // Regression guard: this used to be an unhandled throw, because the error
    // body is an object and the component called .filter() on it. The section
    // was then stuck on "Loading..." forever.
    await page.route(GITHUB_API, (route) =>
      route.fulfill({
        status: 403,
        json: { message: "API rate limit exceeded" },
      }),
    );

    await page.goto("/");
    await expect(page.getByText(/Couldn.t load repositories/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /browse them on GitHub/i })).toBeVisible();
    await expect(page.getByText("Loading")).toHaveCount(0);
  });

  test("survives a malformed response body", async ({ page }) => {
    await page.route(GITHUB_API, (route) =>
      route.fulfill({ status: 200, json: { unexpected: "shape" } }),
    );

    await page.goto("/");
    await expect(page.getByText(/Couldn.t load repositories/i)).toBeVisible();
  });

  test("hides repositories already shown as featured projects", async ({ page }) => {
    await page.route(GITHUB_API, (route) =>
      route.fulfill({
        status: 200,
        json: [
          {
            id: 2,
            name: "AI-CODE-REVIEWER",
            html_url: "https://github.com/amrkal/ai-code-reviewer",
            description: "Duplicate of a featured project.",
            language: "TypeScript",
            fork: false,
            private: false,
          },
        ],
      }),
    );

    await page.goto("/");
    await expect(page.getByText("Duplicate of a featured project.")).toHaveCount(0);
  });

  test("always lists the featured projects", async ({ page }) => {
    await page.route(GITHUB_API, (route) => route.abort());
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "AI Code Reviewer" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "PowerStock" })).toBeVisible();
  });
});
