import { url,loginCredentials } from "./loginCredentials.spec";
import {test,expect} from "@playwright/test"


// Test case 1: Login with correct id and password
test('Login with correct id and password, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];
    const passId = loginCredentials.passId[0];
    await page.waitForTimeout(2000);
    await page.locator("#email").fill(emailId);
    await page.locator(".w-full").click();
    await page.locator("#password").fill(passId);
    await page.locator("[styleclass='w-full']").click();
    const popup = page.locator(".gap-2");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();
    expect(text?.trim()).toBe('Admin Dashboard');
});

// Test case 2: Login with incorrect password
test('Login with incorrect password, Test case 2', async ({ page }) => {
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];
    const wrongPass = "wrongPassword123";
    await page.waitForTimeout(2000);
    await page.locator("#email").fill(emailId);
    await page.locator(".w-full").click();
    await page.locator("#password").fill(wrongPass);
    await page.locator("[styleclass='w-full']").click();
    await page.waitForTimeout(3000);
    const errorPopup = page.locator(".ng-star-inserted").nth(6);
    await errorPopup.waitFor({ state: 'visible', timeout: 3000 });
    const errorText = await errorPopup.textContent();
    console.log('errorPopup', errorText);
    expect(errorText?.toLowerCase()).toContain('email or password is incorrect');
});

// Test case 4: Login with correct email and empty password
test('Login with correct email and empty password, Test case 4', async ({ page }) => {
    await page.goto(url.url);

    const emailId = loginCredentials.emailId[0];
    await page.waitForTimeout(2000);
    await page.locator("#email").fill(emailId);
    await page.locator(".w-full").click();
    await page.locator("#password").fill('');
    await page.locator("[styleclass='w-full']").click();
    await page.waitForTimeout(3000);
    const errorPopup = page.locator(".ng-star-inserted").nth(6);
    await errorPopup.waitFor({ state: 'visible', timeout: 3000 });
    const errorText = await errorPopup.textContent();
    console.log('errorPopup', errorText);
    expect(errorText?.toLowerCase()).toContain('email or password is incorrect');
});

// Test case 5: Login with empty email and correct password
test('Login with empty email and correct password, Test case 5', async ({ page }) => {
    await page.goto(url.url);

    const passId = loginCredentials.passId[0];
    await page.waitForTimeout(2000);
    await page.locator("#email").fill('');
    await page.locator(".w-full").click();
    console.log("Provide valid username")
    await page.locator("#password").fill(passId);
    await page.locator("[styleclass='w-full']").click();
    const errorPopup = page.locator(".error-message");
    await errorPopup.waitFor({ state: 'visible', timeout: 3000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('required');
});

// Test case 6: Login with invalid email format
test('Login with invalid email format, Test case 6', async ({ page }) => {
    await page.goto(url.url);

    const invalidEmail = "invalid-email-format";
    const passId = loginCredentials.passId[0];
    await page.waitForTimeout(2000);
    await page.locator("#email").fill(invalidEmail);
    await page.locator(".w-full").click();
    await page.locator("#password").fill(passId);
    await page.locator("[styleclass='w-full']").click();
    const errorPopup = page.locator(".error-message");
    await errorPopup.waitFor({ state: 'visible', timeout: 3000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('valid email');
});

// Test case 7: Login with whitespace in email and password fields
test('Login with whitespace in email and password fields, Test case 7', async ({ page }) => {
    await page.goto(url.url);
    await page.waitForTimeout(2000);
    await page.locator("#email").fill('   ');
    await page.locator(".w-full").click();
    await page.locator("#password").fill('   ');
    await page.locator("[styleclass='w-full']").click();
    const errorPopup = page.locator(".error-message");
    await errorPopup.waitFor({ state: 'visible', timeout: 3000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('required');
});

// Test case 8: Login with correct credentials and check for logout button
test('Login with correct credentials and check for logout button, Test case 8', async ({ page }) => {
    await page.goto(url.url);

    const emailId = loginCredentials.emailId[0];
    const passId = loginCredentials.passId[0];
    await page.waitForTimeout(2000);
    await page.locator("#email").fill(emailId);
    await page.locator(".w-full").click();
    await page.locator("#password").fill(passId);
    await page.locator("[styleclass='w-full']").click();
    const popup = page.locator(".gap-2");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const logoutButton = page.locator("button:has-text('Logout')");
    await expect(logoutButton).toBeVisible();
});
