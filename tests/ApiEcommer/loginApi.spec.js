import { test, request, expect, APIRequestContext } from "@playwright/test";
const payload_condentials = { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345" };
let token;
let apiContext;

const validCredentials = { userEmail: "date123@gmail.com", userPassword: "Qwerty@12345" };
const invalidEmail = { userEmail: "wrongemail@gmail.com", userPassword: "Qwerty@12345" };
const invalidPassword = { userEmail: "date123@gmail.com", userPassword: "WrongPassword" };
const emptyCredentials = { userEmail: "", userPassword: "" };


test('API Login - Valid Credentials', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: validCredentials
  });
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.token).toBeTruthy();
  token = responseBody.token;
});

test('API Login - Invalid Email', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: invalidEmail
  });
  expect(response.ok()).toBeFalsy();
  const responseBody = await response.json();
  expect(responseBody.message).toContain('Incorrect email or password.');
});

test('API Login - Invalid Password', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: invalidPassword
  });
  expect(response.ok()).toBeFalsy();
  const responseBody = await response.json();
  expect(responseBody.message).toContain('Incorrect email or password.');
});

test('API Login - Empty Credentials', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: emptyCredentials
  });
  expect(response.ok()).toBeFalsy();
  const responseBody = await response.json();
  expect(responseBody.message).toBeDefined();
});
