import { test, request, expect, APIRequestContext } from "@playwright/test";
import { addToCart } from '../add_to_cart.spec'
import { card_details, file_download } from '../card_details.spec';
import { loginCredentials } from "../login_credentials.spec";
const payload_condentials = { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345" };
let token;
let apiContext;
let userID;
let producted_details = {
    productAddedBy: "admin@gmail.com", productCategory: "electronics",
    productDescription: "iphonenew", productFor: "women", productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg",
    productName: "IPHONE 13 PRO", productPrice: 231500, productRating: "0", productStatus: true, productSubCategory: "mobiles", productTotalOrders: "0", __v: 0,
    _id: "67a8df56c0d3e6622a297ccd"
}
let product_id = ["67a8df56c0d3e6622a297ccd"]

test.beforeAll(async () => {
  apiContext = await request.newContext(); // No need for type annotation here
  const loginApiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: payload_condentials
  });
  expect(loginApiResponse.ok()).toBeTruthy();
  const responseBody = await loginApiResponse.json()
  token = await responseBody.token
  userID = responseBody.userId;
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
            product:producted_details ,
            _id: userID
          },
        })
      const add_to_cart_check = await add_to_cart.json()
      console.log("add_to_cart_check", add_to_cart_check)
    }
  }
  await page.locator(".btn-custom").nth(2).click();


})


test('delete api - successful deletion', async () => {
    const response = await apiContext.delete(
        `https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/${userID}/${product_id[0]}`,
        {
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }
    );
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.message || responseBody.msg).toMatch(/deleted|removed/i);
});

test('delete api - deleting non-existent product', async () => {
    const fakeProductId = "nonexistentproductid123";
    const response = await apiContext.delete(
        `https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/${userID}/${fakeProductId}`,
        {
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }
    );
    expect(response.status()).toBeGreaterThanOrEqual(200);
    const responseBody = await response.json();
    expect(responseBody.message || responseBody.msg).toMatch(/not found|does not exist|invalid/i);
});

test('delete api - unauthorized request', async () => {
    const response = await apiContext.delete(
        `https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/${userID}/${product_id[0]}`,
        {
            headers: {
                'Authorization': 'invalidtoken',
                'Content-type': 'application/json'
            }
        }
    );
    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.message || responseBody.msg).toMatch(/unauthorized|invalid/i);
});

test('delete api - missing product id', async () => {
    const response = await apiContext.delete(
        `https://rahulshettyacademy.com/api/ecom/user/remove-from-cart/${userID}/`,
        {
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            }
        }
    );
    expect(response.status()).toBeGreaterThanOrEqual(400);
    const responseBody = await response.json();
    expect(responseBody.message || responseBody.msg).toMatch(/missing|invalid/i);
});