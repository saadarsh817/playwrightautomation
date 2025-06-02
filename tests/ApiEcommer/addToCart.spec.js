import { test, request, expect, APIRequestContext } from "@playwright/test";
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

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const loginApiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: payload_condentials
    });
    expect(loginApiResponse.ok()).toBeTruthy();
    const responseBody = await loginApiResponse.json();
    token = responseBody.token;
    userID = responseBody.userId;
});

// Test: Add a single product to cart
test('should add a single product to cart via API', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            product: producted_details,
            _id: userID
        }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.message).toContain('Product Added To Cart');
});

// Test: Add the same product twice and check for duplicate handling
test('should not allow adding the same product twice', async () => {
    // First add
    await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            product: producted_details,
            _id: userID
        }
    });
    // Second add
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            product: producted_details,
            _id: userID
        }
    });
    const body = await response.json();
    expect(body.message).toMatch(/already exists|already added/i);
});

// Test: Add multiple different products to cart
test('should add multiple different products to cart', async () => {
    const anotherProduct = {
        ...producted_details,
        productName: "SAMSUNG GALAXY S21",
        _id: "67a8df56c0d3e6622a297cce"
    };
    const response1 = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            product: producted_details,
            _id: userID
        }
    });
    const response2 = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            product: anotherProduct,
            _id: userID
        }
    });
    expect(response1.ok()).toBeTruthy();
    expect(response2.ok()).toBeTruthy();
    const body1 = await response1.json();
    const body2 = await response2.json();
    expect(body1.message).toContain('Product Added To Cart');
    expect(body2.message).toContain('Product Added To Cart');
});

// Test: Add to cart with invalid token
test('should fail to add product to cart with invalid token', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            'Authorization': 'invalidtoken',
            'Content-type': 'application/json'
        },
        data: {
            product: producted_details,
            _id: userID
        }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toMatch(/unauthorized|invalid/i);
});