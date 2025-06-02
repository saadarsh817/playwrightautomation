import { test, request, expect } from "@playwright/test";
// let userId = {'date123@gmail.com'}
// let password = {'Qwerty@12345'}
let token;
let apiContext;

const payload_condentials = { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345" };

// const validCredentials = {
//     userEmail: userId,
//     userPassword: password
// };

test('api first',async () => {
    apiContext = await request.newContext();
    const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: payload_condentials
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
    token = responseBody.token;
});

test('forget password - valid data', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/new-password", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            userEmail: 'date123@gmail.com',
            userPassword: 'Qwerty@12345',
            confirmPassword: 'Qwerty@12345'
        }
    });
    console.log('response',response)
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.message).toBeDefined();
});

test('forget password - invalid email', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/new-password", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            userEmail: 'invalid@email.com',
            userPassword: 'Qwerty@12345',
            confirmPassword: 'Qwerty@12345'
        }
    });
    expect(response.status()).not.toBe(200);
    const body = await response.json();
    expect(body.message).toBeDefined();
});

test('forget password - mismatched passwords', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/new-password", {
        headers: {
            'Authorization': token,
            'Content-type': 'application/json'
        },
        data: {
            userEmail: 'date123@gmail.com',
            userPassword: 'Qwerty@12345',
            confirmPassword: 'DifferentPassword@123'
        }
    });
    expect(response.status()).not.toBe(200);
    const body = await response.json();
    expect(body.message).toBeDefined();
});

test('forget password - missing token', async () => {
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/new-password", {
        headers: {
            'Content-type': 'application/json'
        },
        data: {
            userEmail: 'date123@gmail.com',
            userPassword: 'Qwerty@12345',
            confirmPassword: 'Qwerty@12345'
        }
    });
    expect(response.status()).not.toBe(200);
    const body = await response.json();
    expect(body.message).toBeDefined();
});