const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test ("testing",async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log('this is page name',await page.title());
    await expect(page).toHaveTitle('Goggle')
});


test.only ("checking", async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator('#username').fill('rahulshettyacademy');
        await page.locator("[type='password']").fill('learning');
        await page.locator('text=Sign In').click();
        
        
    }
)