import { test, expect } from "@playwright/test";

test.describe("document semantics", () => {
  test("has a single main landmark and one h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("each section has its own h2 and a unique id", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h2")).toHaveCount(5);

    const ids = await page.locator("[id]").evaluateAll((els) =>
      els.map((el) => el.id).filter(Boolean),
    );
    expect(new Set(ids).size, `duplicate ids: ${ids}`).toBe(ids.length);
  });

  test("exposes a skip link as the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("every image carries an alt attribute", async ({ page }) => {
    await page.goto("/");
    const missing = await page
      .locator("img")
      .evaluateAll((els) => els.filter((el) => el.getAttribute("alt") === null).length);
    expect(missing).toBe(0);
  });
});

test.describe("contact form", () => {
  test("labels are associated, so fields are reachable by label", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/^Name/).fill("Ada Lovelace");
    await page.getByLabel(/^Email/).fill("ada@example.com");
    await page.getByLabel(/^Message/).fill("Hello");

    await expect(page.locator("#name")).toHaveValue("Ada Lovelace");
    await expect(page.locator("#email")).toHaveValue("ada@example.com");
    await expect(page.locator("#message")).toHaveValue("Hello");
  });

  test("surfaces a confirmation when the API accepts the message", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    );
    await page.goto("/");

    await page.getByLabel(/^Name/).fill("Ada Lovelace");
    await page.getByLabel(/^Email/).fill("ada@example.com");
    await page.getByLabel(/^Message/).fill("Hello");
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.getByText(/on its way/i)).toBeVisible();
    // The form clears so a second message does not resend the first.
    await expect(page.locator("#name")).toHaveValue("");
  });

  test("shows the server's reason when the API rejects the message", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 429,
        json: { error: "rate_limited", message: "Too many messages. Try again shortly." },
      }),
    );
    await page.goto("/");

    await page.getByLabel(/^Name/).fill("Ada");
    await page.getByLabel(/^Email/).fill("ada@example.com");
    await page.getByLabel(/^Message/).fill("Hello");
    await page.getByRole("button", { name: /Send Message/i }).click();

    await expect(page.getByText(/Too many messages/i)).toBeVisible();
  });
});
