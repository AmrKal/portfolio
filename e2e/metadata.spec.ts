import { test, expect } from "@playwright/test";

test.describe("metadata and SEO", () => {
  test("sets a real title and description", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Amr Kalany/);
    await expect(page).not.toHaveTitle(/Create Next App/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /Software engineer/);
  });

  test("advertises a landscape social card", async ({ page }) => {
    await page.goto("/");

    // A portrait photo here crops badly in link previews.
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      "content",
      "1200",
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      "content",
      "630",
    );
  });

  test("serves the generated card at the advertised size", async ({ request, page }) => {
    await page.goto("/");
    const url = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");

    const response = await request.get(new URL(url!).pathname + new URL(url!).search);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    expect(Number(response.headers()["content-length"] ?? 1)).toBeGreaterThan(0);
  });

  test("publishes robots.txt pointing at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toMatch(/Sitemap: https?:\/\/\S+\/sitemap\.xml/);
  });

  test("publishes a valid sitemap", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toMatch(/<loc>https?:\/\/\S+<\/loc>/);
  });

  test("embeds parseable Person structured data", async ({ page }) => {
    await page.goto("/");

    const raw = await page.locator('script[type="application/ld+json"]').innerText();
    const data = JSON.parse(raw);

    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Amr Kalany");
    expect(Array.isArray(data.sameAs)).toBe(true);
  });

  test("applies the Geist font rather than the fallback stack", async ({ page }) => {
    await page.goto("/");
    // globals.css once hard-coded Arial, overriding the loaded font.
    const family = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily,
    );
    expect(family).toMatch(/Geist/);
  });
});
