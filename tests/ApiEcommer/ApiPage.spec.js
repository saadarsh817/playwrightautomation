import { test, request, expect, APIRequestContext } from "@playwright/test";
import { addToCart } from '../add_to_cart.spec'
import { card_details, file_download } from '../card_details.spec';
import { loginCredentials } from "../login_credentials.spec";
const payload_condentials = { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345" };
let token;
let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext(); // No need for type annotation here
  const loginApiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: payload_condentials
  });
  expect(loginApiResponse.ok()).toBeTruthy();
  const responseBody = await loginApiResponse.json()
  token = await responseBody.token
});

// Add at least one test case so Playwright recognizes this file as a test
test('dummy test', async () => {
  // This is a placeholder test
  expect(true).toBe(true);
});

test('api login', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token)

  // this is for after api we have to call the website that is here is 
  await page.goto("https://rahulshettyacademy.com/client/")

  // add to cart details fill here
  const name_box = ['ZARA COAT 3']
  await page.locator(".card-body").first().waitFor({ state: 'visible' });
  const body_content = await page.$$(".card-body")
  for (const element of body_content) {
    const new_element = await element.textContent()
    console.log('product',new_element)
    if (name_box.some(el => new_element.includes(el))) {
      if (name_box.every(el => !new_element.includes(el))) {
        break;
      }
      await page.locator("text=' Add To Cart'").nth(body_content.indexOf(await element)).click()

      const add_to_cart = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart",
        {
          headers: {
            'Authorization': token,
            'Content-type': 'application/json'
          },
          data: {
            product: {
              productAddedBy: "admin@gmail.com", productCategory: "electronics",
              productDescription: "iphonenew", productFor: "women", productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg",
              productName: "IPHONE 13 PRO", productPrice: 231500, productRating: "0", productStatus: true, productSubCategory: "mobiles", productTotalOrders: "0", __v: 0,
              _id: "67a8df56c0d3e6622a297ccd"
            },
            _id: "68062d2cfc76541aad38e2eb"
          },
        })
      const add_to_cart_check = await add_to_cart.json()
      console.log("add_to_cart_check", add_to_cart_check)
    }
  }
  await page.locator(".btn-custom").nth(2).click();

  // card details page start here
  await page.locator(".totalRow button").click()
  await page.waitForTimeout(3000);
  await page.locator(".text-validated").nth(0).fill('');
  await page.locator(".text-validated").nth(0).fill(card_details.card_number);

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

  // for create api details
    const createOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
      headers:{
        'Authorization':token,
        'Content-type':'application/json'
      },
      data:{orders:[{country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}
    })

  // expect(createOrder.ok()).toBeTruthy();
  const responseBody = await createOrder.json()
  await page.pause()
})


test('delete api testing', async ({ page }) => {
  const delete_cart = await apiContext.delete(`https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/${'68062d2cfc76541aad38e2eb'}/${'67a8df56c0d3e6622a297ccd'}`, {
    headers: {
      'Authorization': token,
      'Content-type': 'application/json'
    }
  })
  console.log('delete_cart', delete_cart)
})


test('forget password', async ({ page }) => {
  const forgetPassword = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/new-password",
    {
      headers: {
        'Authorization': token,
        'Content-type': 'application/json'
      }, data: { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345", confirmPassword: "Qwerty@12345" }
    }
  )

})

