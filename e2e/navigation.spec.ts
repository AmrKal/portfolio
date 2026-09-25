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

  // Regression guard. The spy was once driven only by an IntersectionObserver,
  // which fires on threshold crossings. A scroll small enough to cross none —
  // the tail of a smooth scroll, or a nudge of the wheel — produced no
  // callback, so the highlight kept whatever it had decided mid-scroll. This
  // parks each section's top just below the reference line and nudges it
  // across by a few pixels, which crosses no threshold at all.
  test("updates on scrolls too small to cross an observer threshold", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(300);

    for (const id of SECTIONS.slice(1)) {
      await page.evaluate((sectionId) => {
        const anchor = window.innerHeight * 0.3;
        const el = document.getElementById(sectionId)!;
        const top = el.getBoundingClientRect().top;
        // "instant" matters: the page sets scroll-behavior: smooth, and a
        // smooth scroll emits enough events to cross thresholds on its own,
        // which would hide the very bug this guards against.
        window.scrollTo({ top: window.scrollY + (top - anchor) - 8, behavior: "instant" });
      }, id);
      await page.waitForTimeout(150);

      await page.evaluate(() => window.scrollBy({ top: 16, behavior: "instant" }));

      const expected = await page.evaluate((ids) => {
        const anchor = window.innerHeight * 0.3;
        let current = ids[0];
        for (const candidate of ids) {
          const el = document.getElementById(candidate);
          if (el && el.getBoundingClientRect().top <= anchor) current = candidate;
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
