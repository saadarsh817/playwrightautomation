const {test,expect} = require ('@playwright/test');
import { url } from './login_credentials.spec';
import { loginCredentials } from './login_credentials.spec';
import {addToCart,removeToCart} from './add_to_cart.spec';

test('To check add correct item in cart Single, Test case 1', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill(loginCredentials.emailId);
    await page.locator("#userPassword").fill(loginCredentials.passId);
    await page.locator("text='Login'").click();

    const name_box = addToCart.name_box
    await page.locator(".card-body").first().waitFor({state:'visible'});
    const body_content = await page.$$(".card-body")
        for (const element of body_content){
            const new_element = await element.textContent()
            if (name_box.some(el => new_element.includes(el))) {
                if (name_box.every(el => !new_element.includes(el))) {
                    break;
                }
                await page.locator("text=' Add To Cart'").nth(body_content.indexOf(await element)).click()
            }
        }
    await page.locator(".btn-custom").nth(2).click();
    const delete_box = removeToCart.delete_box
    let count = 0
    let contentadd = []
    await page.locator(".infoWrap").first().waitFor();
    console.log('testing ',await page.locator(".infoWrap").allTextContents())
    const delete_cart = await page.$$(".infoWrap .cartSection h3");
    for (let i = 0; i < delete_cart.length; i++) {
        count += 1;
        const element = delete_cart[i];
        const elementText = await element.textContent();
        contentadd.push(elementText)
    }
    console.log('contentadd',contentadd)
    console.log('name_box',name_box)
    expect(contentadd.sort()).toEqual(name_box.sort());
});



test('To check add correct item in cart, Single Item Test', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill(loginCredentials.emailId);
    await page.locator("#userPassword").fill(loginCredentials.passId);
    await page.locator("text='Login'").click();

    const name_box = [addToCart.name_box[0]]; // Single item
    await page.locator(".card-body").first().waitFor({ state: 'visible' });
    const body_content = await page.$$(".card-body");
    for (const element of body_content) {
        const new_element = await element.textContent();
        if (name_box.some(el => new_element.includes(el))) {
            await page.locator("text=' Add To Cart'").nth(body_content.indexOf(await element)).click();
            break;
        }
    }
    await page.locator(".btn-custom").nth(2).click();
    const contentadd = [];
    await page.locator(".infoWrap").first().waitFor();
    const delete_cart = await page.$$(".infoWrap .cartSection h3");
    for (const element of delete_cart) {
        const elementText = await element.textContent();
        contentadd.push(elementText);
    }
    expect(contentadd.sort()).toEqual(name_box.sort());
});


test('To check no items added to cart, Empty Cart Test', async ({ page }) => {
    await page.goto(url.url);
    await page.locator("#userEmail").fill(loginCredentials.emailId);
    await page.locator("#userPassword").fill(loginCredentials.passId);
    await page.locator("text='Login'").click();

    const name_box = []; // No items
    await page.locator(".card-body").first().waitFor({ state: 'visible' });
    await page.locator(".btn-custom").nth(2).click();
    const contentadd = [];
    // await page.locator(".infoWrap").first().waitFor();
    const delete_cart = await page.$$(".infoWrap .cartSection h3");
    for (const element of delete_cart) {
        const elementText = await element.textContent();
        contentadd.push(elementText);
    }
    expect(contentadd.sort()).toEqual(name_box.sort());
});