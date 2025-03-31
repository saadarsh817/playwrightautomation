const { test, expect } = require('@playwright/test');


test ("testing",async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log('this is page name',await page.title());
    await expect(page).toHaveTitle('Goggle')
});

test ("checking", async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator('#username').fill('rahulshettyacademy');
        await page.locator("[type='password']").fill('learning');
        await page.locator('text=Sign In').click();
        
    }
)


test("other website",async({page})=>{


    const username = page.locator("[placeholder='Username']")
    const password = page.locator("[for='input-password']")
    const submit = page.locator("text=Submit")

    await page.goto("https://synco-attendance.web.app/auth/login");
    await username.fill("roadcast_test@roadcast.in")
    await password.fill("Kuchnahi")
    console.log(await page.locator("[for='input-password']").textContent());
    await submit.click()
    console.log(await page.locator(".alert-message-list.ul-none").textContent());
    // await page.locator(".navigation d-cursor").click()
    // await page.locator(".menu-items li").nth(4).click()
    // console.log(await page.locator(".menu-items li").nth(4).textContent())
    // const alltext =await page.locator(".menu-items li").first().waitFor();
    // console.log(await page.locator(".menu-items li").allTextContents());

    // const cookies = await page.context().cookies();

    // console.log(cookies);


    // await page.waitForNavigation(); // OR waitForSelector of dashboard

    // console.log(await page.url());


    const manage = page.locator(".menu-items li").nth(4);
    await manage.waitFor({state:'visible'});
    await manage.click();
    // console.log(await page.locator(".menu-items li").nth(4).textContent())

    const create_driver = page.locator(".route-tabset li").nth(2);
    await create_driver.waitFor({state:'visible'});
    await create_driver.click();

    await page.getByText('Create New').click();
    // await page.pause();

    console.log("above the dropdown")
    const dropdown = page.locator(".ng-arrow-wrapper").first();
    await dropdown.click();
    // console.log(await page.locator(".ng-arrow-wrapper").textContent())

    // await page.pause();

    await page.locator(".ng-dropdown-panel-items scroll-host").waitFor();
    console.log("below the dropdown")
    console.log(await page.locator(".ng-dropdown-panel-items scroll-host").allTextContents())
    
    // await dropdown.selectOption("Pune")
    await page.pause();

})


test.only("testing rahul shetty", async({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("[name='username']").fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("learning");
    await page.locator(".customradio").first().click();
    // console.log(expect(await page.locator(".customradio").first()).toBeChecked())

    const radio = await page.locator(".customradio").first()
    console.log(await expect(await page.locator(".customradio").first()).toBeChecked())
    console.log(await page.locator(".customradio").first().textContent())
    const dropdown = await page.locator(".form-control").last();
    await dropdown.selectOption("Consultant")
    await page.locator("#terms").click();
    await page.locator("#signInBtn").click();
    // await page.pause()a

    const download_link = await page.locator("[href*='documents-request']")
    const [newpage] = await Promise.all([
        context.waitForEvent("page"),
        download_link.click(),
    ])
    const text = await newpage.locator("[class='im-para red']").textContent()
    const email_name=text.split("@")
    const name = email_name[0].split(' ')
    await page.locator("[name='username']").fill(name[name.length-1]+'@'+email_name[1].split(' ')[0])
    await page.pause()




})



test.only("orange website",async({browser})=>{
    
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")


    const download_link = await page.locator("[href*='www.orangehrm.com']")

    const [newpage]=await Promise.all([
        context.waitForEvent('page'),
        download_link.click(),
    ])



})


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