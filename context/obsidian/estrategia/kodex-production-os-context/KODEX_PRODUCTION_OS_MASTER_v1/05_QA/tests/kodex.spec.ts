import { test, expect } from '@playwright/test';

const scenes = ['threshold','observe','descent','archive','machine','cosmology','return'];

for (const scene of scenes) {
  test(`${scene}: no overflow and primary controls visible`, async ({ page }) => {
    await page.goto(`/kodex/#${scene}`);
    await page.waitForLoadState('networkidle');

    const metrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      errors: (window as any).__KODEX_ERRORS__ ?? [],
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.innerHeight + 1);
    expect(metrics.errors).toHaveLength(0);

    await expect(page.locator('[data-kdx-primary-action]')).toBeVisible();
    await expect(page.locator('[data-kdx-scene-nav]')).toBeVisible();

    await expect(page).toHaveScreenshot(`${scene}.png`, {
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });
  });
}

test('keyboard navigation', async ({ page }) => {
  await page.goto('/kodex/#threshold');
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/observe/);
  await page.keyboard.press('KeyI');
  await expect(page.locator('[data-kdx-index-overlay]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-kdx-index-overlay]')).toBeHidden();
});
