const {test,expect} = require ('@playwright/test');
import { url } from './login_credentials.spec';


test('Valid Email and Matching Passwords, Test case 1', async ({ page }) => {
    const forgetPasswordLocator = page.locator(".forgot-password-link").nth(0);

    await page.goto(url.url);
    await forgetPasswordLocator.click();
    await page.fill("[formcontrolname='userEmail']", 'date13@gmail.com');
    await page.fill("[formcontrolname='userPassword']", 'Aadarsh@12345');
    await page.fill("[formcontrolname='confirmPassword']", 'Aadarsh@12345');
    await page.click(".btn-block");

    const popup = await page.locator("#toast-container");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();
    console.log('text',text)
    expect(text?.trim()).toBe('Password Changed Successfully');
    });
    


test('Forget password with invalid email id, Test case 2',async({page})=>{
    
    const forgetPasswordLocator = page.locator(".forgot-password-link").nth(0)
    
    await page.goto(url.url);
    await forgetPasswordLocator.click();
    await page.fill("[formcontrolname='userEmail']", 'date@gmail.com');
    await page.fill("[formcontrolname='userPassword']", 'NewTesting@12345');
    await page.fill("[formcontrolname='confirmPassword']", 'NewTesting@12345');
    await page.click(".btn-block");

    const popup_2 = await page.locator("#toast-container");
    await popup_2.waitFor({ state: 'visible', timeout: 3000 });
    const text_2 = await popup_2.textContent();

    if (text_2?.trim()==='Password Changed Successfully') {
        console.log("For invalid email id Test case Failed");
    } else {
        console.log("For invalid email id Test case Passes");
    }
    })

test('Mismatched Passwords', async ({ page }) => {
    const forgetPasswordLocator = page.locator(".forgot-password-link").nth(0);

    await page.goto(url.url);
    await forgetPasswordLocator.click();
    await page.fill("[formcontrolname='userEmail']", 'date13@gmail.com');
    await page.fill("[formcontrolname='userPassword']", 'Aadarsh1@12345');
    await page.fill("[formcontrolname='confirmPassword']", 'Aadarsh2@12345');
    await page.click(".btn-block");

    const popup = await page.locator("#toast-container");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();

    expect(text?.trim()).not.toBe('Password Changed Successfully');
    });

test('Empty Fields', async ({ page }) => {
    const forgetPasswordLocator = page.locator(".forgot-password-link").nth(0);

    await page.goto(url.url);
    await forgetPasswordLocator.click();
    await page.fill("[formcontrolname='userEmail']", '');
    await page.fill("[formcontrolname='userPassword']", '');
    await page.fill("[formcontrolname='confirmPassword']", '');
    await page.click(".btn-block");

    const popup = await page.locator("#toast-container");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();

    expect(text?.trim()).not.toBe('Password Changed Successfully');
});

test('Short Password', async ({ page }) => {
    const forgetPasswordLocator = page.locator(".forgot-password-link").nth(0);

    await page.goto(url.url);
    await forgetPasswordLocator.click();
    await page.fill("[formcontrolname='userEmail']", 'date13@gmail.com');
    await page.fill("[formcontrolname='userPassword']", 'Aadarsh');
    await page.fill("[formcontrolname='confirmPassword']", 'Aadarsh');
    await page.click(".btn-block");

    const popup = await page.locator("#toast-container");
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    const text = await popup.textContent();

    expect(text?.trim()).not.toBe('Password Changed Successfully');
});




