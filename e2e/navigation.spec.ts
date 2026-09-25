import { test, expect } from "@playwright/test";

const SECTIONS = ["about", "skills", "resume", "projects", "contact"] as const;
const SECTION_LABELS: Record<(typeof SECTIONS)[number], string> = {
  about: "Profile",
  skills: "Toolkit",
  resume: "Experience",
  projects: "Selected work",
  contact: "Contact",
};

test.describe("scroll-spy", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop sidebar only");

  // Regression guard: the observer once compared intersectionRatio between
  // sections, which is relative to each element's own height, so a short
  // section beat a tall one and clicking "Resume" highlighted "About".
  for (const id of SECTIONS) {
    test(`highlights ${id} after navigating to it`, async ({ page }) => {
      await page.goto("/");
      await page.locator(`aside a[href="#${id}"]`).click();

      await expect(page.locator('a[aria-current="true"]').first()).toHaveText(
        SECTION_LABELS[id],
      );
    });
  }

  test("tracks the reading position during a continuous scroll", async ({ page }) => {
    await page.goto("/");

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewport = page.viewportSize()!.height;

    for (let y = 0; y <= height - viewport; y += 400) {
      await page.evaluate((value) => window.scrollTo(0, value), y);

      // Compare against the same rule the component uses, so the assertion
      // describes intent rather than hard-coding scroll offsets.
      const expected = await page.evaluate((ids) => {
        const anchor = window.innerHeight * 0.3;
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= anchor) current = id;
        }
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        return atBottom ? ids[ids.length - 1] : current;
      }, [...SECTIONS]);

      await expect(page.locator('a[aria-current="true"]').first()).toHaveText(
        SECTION_LABELS[expected],
      );
    }
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile drawer only");

  test("opens, locks scroll, and closes on Escape", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toHaveCount(0);
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");
  });

  test("closes when a section is chosen", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator('#mobile-nav a[href="#contact"]').click();

    await expect(page.locator("#mobile-nav")).toHaveCount(0);
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("does not hide page content behind the sidebar", async ({ page }) => {
    await page.goto("/");
    // The desktop sidebar must not occupy the viewport on a phone.
    await expect(page.locator("aside")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
