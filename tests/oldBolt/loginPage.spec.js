import { url,loginCredentials } from "./loginCredentials.spec";
import {test,expect} from "@playwright/test"


// Test case 1: Login with correct id and password
test('Login with correct id and password, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];
    const passId = loginCredentials.passId[0];

    await page.locator("#username").fill(emailId);
    await page.locator("#password").fill(passId);
    await page.locator(".p-text-right button").click();

    const popup = page.locator("#commands_btn");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();
    expect(text?.trim()).toBe('Commands');
});

// Test case 2: Login with incorrect password
test('Login with incorrect password, Test case 2', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];
    const wrongPass = "wrongPassword123";
    await page.locator("#username").fill(emailId);
    await page.locator("#password").fill(wrongPass);
    await page.locator(".p-text-right button").click();
    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    console.log('error message',await errorMsg.textContent())
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/invalid password/i);
});

// Test case 3: Login with incorrect email
test('Login with incorrect email, Test case 3', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    const wrongEmail = "wronguser@example.com";
    const passId = loginCredentials.passId[0];
    await page.locator("#username").fill(wrongEmail);
    await page.locator("#password").fill(passId);
    await page.locator(".p-text-right button").click();
    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/User not found/i);
});

// Test case 4: Login with empty credentials
test('Login with empty credentials, Test case 4', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);

    await page.locator("#username").fill("");
    await page.locator("#password").fill("");
    await page.locator(".p-text-right button").click();

    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/username or password not provided/i);
});

// Test case 5: Login with only username filled
test('Login with only username filled, Test case 5', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];

    await page.locator("#username").fill(emailId);
    await page.locator("#password").fill("");
    await page.locator(".p-text-right button").click();

    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/username or password not provided/i);
});

// Test case 6: Login with only password filled
test('Login with only password filled, Test case 6', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    const passId = loginCredentials.passId[0];

    await page.locator("#username").fill("");
    await page.locator("#password").fill(passId);
    await page.locator(".p-text-right button").click();

    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/username or password not provided/i);

});
/**
 * Test case 7: Login with whitespace-only credentials
 */
test('Login with whitespace-only credentials, Test case 7', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    await page.locator("#username").fill("   ");
    await page.locator("#password").fill("   ");
    await page.locator(".p-text-right button").click();
    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/invalid password/i);
});

/**
 * Test case 9: Login with very long credentials
 */
test('Login with very long credentials, Test case 9', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    const longString = 'a'.repeat(256);
    await page.locator("#username").fill(longString);
    await page.locator("#password").fill(longString);
    await page.locator(".p-text-right button").click();
    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/user not found/i);
});

/**
 * Test case 10: Login with special characters in credentials
 */
test('Login with special characters in credentials, Test case 10', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto(url.url);
    await page.locator("#username").fill("!@#$%^&*()");
    await page.locator("#password").fill("!@#$%^&*()");
    await page.locator(".p-text-right button").click();
    const errorMsg = page.locator(".mat-simple-snack-bar-content");
    await expect(errorMsg).toBeVisible({ timeout: 3000 });
    await expect(errorMsg).toHaveText(/user not found/i);
});
