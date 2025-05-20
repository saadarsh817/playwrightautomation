const {test,expect} = require ('@playwright/test');
import { accountCreate,loginCredentials,url } from './login_credentials.spec';

test('Signup With Valid Details, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill(accountCreate.first_name);
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='email@example.com']").fill(accountCreate.user_email);
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill(accountCreate.password);
    await page.locator("[type='checkbox']").check();
    await page.locator("[value='Register']").click();
    await page.waitForTimeout(500);
    const popup = page.locator('#toast-container');
    const text = await popup.textContent();
    console.log('text',text)
    await expect(text).toBe(' Registered Successfully ')

});

test('Signup With Missing Email, Test case 2', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill(accountCreate.first_name);
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill(accountCreate.password);
    await page.locator("[type='checkbox']").check();
    await page.locator("[value='Register']").click();
    const error = await page.locator("text='*Email is required'");
    await expect(error).toBeVisible();
});

test('Signup With Missing First Name, Test case 3', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='email@example.com']").fill(accountCreate.user_email);
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill(accountCreate.password);
    await page.locator("[type='checkbox']").check();
    await page.locator("[value='Register']").click();
    const error = await page.locator("text='*First Name is required'");
    await expect(error).toBeVisible();
});

test('Signup With Invalid Email Format, Test case 4', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill(accountCreate.first_name);
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='email@example.com']").fill("invalidemail");
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill(accountCreate.password);
    await page.locator("[type='checkbox']").check();
    await page.locator("[value='Register']").click();
    const error = await page.locator("text='*Enter Valid Email'");
    await expect(error).toBeVisible();
});

test('Signup With Unchecked 18 year old, Test case 5', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill(accountCreate.first_name);
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='email@example.com']").fill(accountCreate.user_email);
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill(accountCreate.password);
    await page.locator("[value='Register']").click();
    const error = await page.locator("text='*Please check above checkbox'");
    await expect(error).toBeVisible();
});

test('Signup With Mismatched Passwords, Test case 6', async ({ page }) => {
    await page.goto(url.url);
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill(accountCreate.first_name);
    await page.locator("#lastName").fill(accountCreate.last_name);
    await page.locator("[placeholder='email@example.com']").fill(accountCreate.user_email);
    await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
    const dropdown = await page.locator("[formcontrolname='occupation']");
    await dropdown.selectOption(accountCreate.occupation);
    await page.locator(`[value='${accountCreate.gender_value}']`).click();
    await page.locator("#userPassword").fill(accountCreate.password);
    await page.locator('#confirmPassword').fill("differentPassword");
    await page.locator("[type='checkbox']").check();
    await page.locator("[value='Register']").click();
    const error = await page.locator("text='Password and Confirm Password must match with each other.'");
    await expect(error).toBeVisible();
});


test('signup with special charaters',async({page}) => {})