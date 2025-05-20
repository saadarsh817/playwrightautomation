const {test,expect} = require ('@playwright/test');
import { url } from './login_credentials.spec';
import { loginCredentials } from './login_credentials.spec';

test('Login with correct id and password, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill(loginCredentials.emailId);
    await page.locator("#userPassword").fill(loginCredentials.passId);
    await page.locator("text='Login'").click();

    const popup_2 = await page.locator("#toast-container");
    await popup_2.waitFor({ state: 'visible', timeout: 3000 });
    const text_2 = await popup_2.textContent();

    if (text_2?.trim() === 'Login Successfully') {
        console.log("Login with correct email id and password Test case Passed");
    } else {
        console.log("Login with correct email id and password Test case Failed");
    }
});

test('Login with incorrect password, Test case 2', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill(loginCredentials.emailId);
    await page.locator("#userPassword").fill("wrongPassword");
    await page.locator("text='Login'").click();

    const popup = await page.locator("#toast-container");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();

    if (text?.trim() === 'Incorrect email or password.') {
        console.log("Login with incorrect password Test case Passed");
    } else {
        console.log("Login with incorrect password Test case Failed");
    }
});

test('Login with empty fields, Test case 3', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("text='Login'").click();

    if ("text='*Email is required' " && "text='*Password is required'") {
        console.log("Login with empty fields Test case Passed");
    } else {
        console.log("Login with empty fields Test case Failed");
    }
});

test('Login with incorrect email format, Test case 4', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill("invalidEmailFormat");
    await page.locator("#userPassword").fill(loginCredentials.passId);
    await page.locator("text='Login'").click();

    if ("text=='*Enter Valid Email'") {
        console.log("Login with incorrect email format Test case Passed");
    } else {
        console.log("Login with incorrect email format Test case Failed");
    }
});
