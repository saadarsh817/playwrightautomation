import { url,loginCredentials } from "./loginCredentials.spec";
import {test,expect} from "@playwright/test"


test('Valid Email and Matching Passwords, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    const emailId = loginCredentials.emailId[0];
    await page.locator("#email").fill(emailId);
    await page.locator(".w-full").click();
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", 'aadarsh.singh@roadcast.net');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    console.log('errorPopup', errorText);
    expect(errorText?.toLowerCase()).toContain('user name not exist');
});


test('Invalid Email Format, Test case 3', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", 'invalid-email');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('invalid email');
});

// Test case: Empty Email Field
test('Empty Email Field, Test case 5', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", '');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('email is required');
});

// Test case: Email with Spaces
test('Email with Spaces, Test case 6', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", '   ');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('email is required');
});

// Test case: Email with Special Characters
test('Email with Special Characters, Test case 7', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", 'test!@#$.com');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('invalid email');
});

// Test case: Unregistered Email
test('Unregistered Email, Test case 8', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    await page.fill("#email", 'notregistered@example.com');
    await page.click("[label='Continue']");
    const errorPopup = page.locator(".p-toast-detail");
    await errorPopup.waitFor({ state: 'visible', timeout: 1000 });
    const errorText = await errorPopup.textContent();
    expect(errorText?.toLowerCase()).toContain('user name not exist');
});


test('Registered Email, Test case 4', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Forgot Password?'").click();
    const validEmail = loginCredentials.emailId[0];
    await page.fill("#email", validEmail);
    await page.click("[label='Continue']");
    // Assuming a success message or navigation occurs
    const successPopup = page.locator(".p-toast-detail");
    await successPopup.waitFor({ state: 'visible', timeout: 1000 });
    const successText = await successPopup.textContent();
    expect(successText?.toLowerCase()).toContain('reset link sent');
});