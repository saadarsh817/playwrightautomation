const {test} = require ('@playwright/test');
const { waitForDebugger } = require('inspector');
import { card_details,file_download } from './card_details.spec';
import { accountCreate,loginCredentials,url } from './login_credentials.spec';
import {addToCart,removeToCart} from './add_to_cart.spec';


test.only('zara cost',async({page})=>{

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
    await page.locator(".infoWrap").first().waitFor();
    console.log('testing ',await page.locator(".infoWrap").allTextContents())
    const delete_cart = await page.$$(".infoWrap");
    for (let i = 0; i < delete_cart.length; i++) {
        count += 1;
        await page.waitForSelector('.fa-trash-o');
        const element = delete_cart[i];
        const elementText = await element.textContent();
        if (delete_box.some(el => elementText.includes(el))) {
            console.log('Deleting item at index:', elementText);
            await page.locator(".fa-trash-o").nth(i).click();
        }
    }
    console.log('count',count)
    await page.waitForTimeout(1000);
    await page.locator(".totalRow button").click()
    await page.waitForTimeout(3000);
    await page.locator(".text-validated").nth(0).fill('');
    await page.locator(".text-validated").nth(0).fill(card_details.card_number);

    console.log('data page ',await page.locator(".ddl").nth(1).textContent())
    const dropdown1 = await page.locator(".ddl").nth(0);
    await dropdown1.selectOption(card_details.month);

    const dropdown2 = await page.locator(".ddl").nth(1);
    await dropdown2.selectOption(card_details.date);

    await page.locator(".txt").nth(1).fill(card_details.cvv_code)
    await page.locator(".txt").nth(2).fill(card_details.card_name)
    await page.locator(".txt").nth(3).fill(card_details.coupon_code)
    await page.locator(".txt").nth(4).fill(card_details.shiping_details_email)
    await page.locator(".txt").nth(5).click()
    const selector = page.locator(".txt").nth(5)
    await selector.type(card_details.country_name, { delay: 1000 }); // 100 ms delay between keystrokes
    await page.locator(".ng-star-inserted").nth(3).waitFor({state:'visible'})
    const country_name = await page.locator(".ng-star-inserted").allTextContents()
    for (const element of country_name){
        if(await element.includes(card_details.country_name)){
            await page.locator(`text="${ card_details.country_name}"`).click()
            break;
        }
    }
    await page.locator(".actions a").nth(0).click()
    await page.waitForTimeout(3000);
    await page.locator(`text="${file_download.file_name}"`).waitFor({state:'visible'})
    await page.locator(`text="${file_download.file_name}"`).click()
    await page.pause()

    const popup_2 = await page.locator("#toast-container");
    await popup_2.waitFor({state:'visible',timeout:3000});
    const text_2 = await popup_2.textContent();
    if(text_2?.trim()==='Incorrect email or password.'){
        await page.locator(".text-reset").click();
        await page.locator("#firstName").fill(accountCreate.first_name);
        await page.locator("#lastName").fill(accountCreate.last_name);
        await page.locator("[placeholder='email@example.com']").fill(accountCreate.user_email);
        // await page.pause()
        await page.locator("[placeholder='enter your number']").fill(String(accountCreate.phone_number));
        const dropdown = await page.locator("[formcontrolname='occupation']");
        await dropdown.selectOption(accountCreate.occupation);
        await page.locator(`[value='${accountCreate.gender_value}']`).click();
        await page.locator("#userPassword").fill(accountCreate.password);
        await page.locator('#confirmPassword').fill(accountCreate.password);
        await page.locator("[type='checkbox']").check();
        await page.locator("[value='Register']").click()
        await page.waitForTimeout(2000); // waits for 3 seconds

        const popup = page.locator('#toast-container');
        try {
        await popup.waitFor({ state: 'visible', timeout: 3000 });
        const text = await popup.textContent();
        console.log("text here",text)
        if (text?.trim()==='User already exisits with this Email Id!'){
            console.log("inside the box",text)
            await page.close();
        }
        else{
            await page.locator("text='Login'").click()
            await page.locator("[type='email']").fill(accountCreate.user_email)
            await page.locator("[id='userPassword']").fill(accountCreate.password)
            await page.locator("[name='login']").click()
        }
        } catch (e) {
        console.log('Popup did not appear');
        }  
    }
    
    await page.pause()   
})