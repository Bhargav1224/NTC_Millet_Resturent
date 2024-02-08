import express from 'express';
import logger from 'morgan';
import compression from "compression";
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';
import fetch from "node-fetch";

// import NodeRSA from 'node-rsa';
// import fs from 'fs';
// import sha256 from "sha256";
// import request from "request";
// import createError from 'http-errors';
// import bodyParser from "body-parser";
// import proxy from "http-proxy-middleware";

var app = express();

app.use(compression());
app.use(express.json());
app.use(cors({origin: 'http://localhost', credentials:true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000

const SERVER_CONSTANTS = {
  www: "www",
  notImplemented: 501,
  ok: 200,
  badRequest: 400,
  basicAdminUserName: "7382958867",
  basicAdminUserPassword: "",
  plus: "+",
  errorMessage: "errorMessage"
};


// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnqJEy6FQYcD1NSnJmi3nqjCBX+QwYqwYuIk3+MqAl5gg/
// v+cyM+w9JzRhLd1VLGkzKhzXzW8/
// PlmXVTH7Bx+MJ2bTEXf0S0T3ApLiTXl9xvq9JCgBpiYBoF2klTa9Br7wmS8JRDgoD6puX+UsMoMWvSBMkKV7ak95rE4eJgPHrvGea/
// LPkxrlcGKOq7s3K7Oi5i89l9zIrNu0vtsR/YH/2UI99CrXz0kB4YcpJKN9iUGMtPCNq6b24Gw0vF0I/
// 3Eq4vo0Lg6mdLp5DzcSD5I5RRxj8gd6lGV45tauL+4kDVSH4hZocPLN0FzqGvN5KzgdPwT8Mro4tezym9kcFuUKQIDAQAB
//  -----END PUBLIC KEY-----`;

// const key_public = new NodeRSA(publicKey);

// const encryptUser = key_public.encrypt('8999200188', 'base64');

// console.log(`encryptUser : ${encodeURIComponent(encryptUser)}`)
// console.log(`Original encryptUser : feA7Ywj65JfKzLDol4zFDhJLM8ZmxxckPVkrL0z2sWQhDH6oyOkBMhHE9h8zLb4eGhOFN%2F2agPhO7T6NGhuGcCtIevY%2BWWyHSEln0QZ%2BnTGT1mGksH0j0ptZq6%2FK%2Bt%2FrwygzSx1dzz1K5Bzj4npiqP07lb%2BVOh6dL4KHTrR0rb1S4dcLRWk2Z5toUsoOYQiG6jzCqFqnze11B4csbr5HoTm2fXHVCxGBWaDW%2Bg%2F%2BR%2FD8KYNryeDLIzY2bMbDXNhPQ9%2F%2BuXF9WJDhlXF2XXU6r11%2FJEpb88TZvFnO7Gs6aXpXXGRJbKpv2zsIl6ex%2Brv0cBv0SHhDlqXxw8erld590w%3D%3D`)

let base64data = Buffer.from(SERVER_CONSTANTS.basicAdminUserPassword).toString('base64');

const BASIC_USER = "1234567890";
const BASE_HOSTNAME = "https://drtumi.sakhaglobal.com";
const AUTH_URL = "/PortalAuth/oauth/token";
// const AUTH_URL = "9093/PortalAuth/oauth/token";
// const BASE_HOSTNAME = "http://localhost:5000";

async function fetchBasicAuthToken(username, password, subdomain, otp = "") {
  // const authUrl = "http://localhost:8080/TemplateAuth/oauth/token";
  const authUrl = BASE_HOSTNAME + AUTH_URL;
  const urlParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic YjdGNDJ1NXNpVTN6TVNJZzpsdjNRT3RON21xMkxnbVIw",
    },
    body: `client_id=b7F42u5siU3zMSIg&username=${username}&grant_type=password&password=${password}`
  };
  // console.log(`urlParams :-- ${JSON.stringify(urlParams)}`)
  // console.log(`authUrl :-- ${JSON.stringify(authUrl)}`)
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const response = await fetch(authUrl, urlParams);
    return await response.json();
  } catch (err) {
    console.log(`error -: ${err}`);
    return err;
  }
}

async function loginAuthCall(
  reconstructedUrl,
  username,
  password,
  subdomain,
  otp = ""
) {
  // let hashedPassword = "";
  let base64password = Buffer.from(password).toString('base64');
  // if (password !== "") {
  //  hashedPassword = sha256(password);
  // }
  const responseAuth = await 
  (
    username,
    base64password,
    subdomain,
    otp
  );
  // console.log('-----loginAuthCall----responseAuth : ', responseAuth);

  if (typeof responseAuth.error !== "undefined") {
    const responseData = {};
    responseData.status = SERVER_CONSTANTS.badRequest;
    responseData.body = responseAuth;
    return responseData;
  } else {
    console.log("building login response ---***--- ", responseAuth.status);
    const toBeModified = {};
    toBeModified.access_token = responseAuth.access_token;
    toBeModified.status = SERVER_CONSTANTS.ok;
    toBeModified.AllowedServices = responseAuth.AllowedServices;
    return toBeModified;
  }
}

async function getApiCall(endPointUrl, authToken) {

  const url = `http://localhost:8080${endPointUrl}`;
  const urlParams = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${authToken}`
    }
  };
  // console.log(`url = ${url} and urlParams = ${urlParams} `);
  try {
    const response = await fetch(url, urlParams);
    const responseBody = await response.text();
    return { status: response.status, body: responseBody };
  } catch (err) {
    console.log(`fetch error : ${err}`);
    return { status: SERVER_CONSTANTS.notImplemented, body: JSON.stringify(err) };
  }
}

async function postApiCall(endPointUrl, requestBody, authToken) {
  console.log(`------postApiCall---Open----`);
  const postRequestBody = requestBody;
  postRequestBody.userAdditionalInfo = "";
  const url = `http://localhost:8080${endPointUrl}`;
  const urlParams = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(postRequestBody)
  };
  console.log(`------postApiCall---End----`);
  try {
    const response = await fetch(url, urlParams);
    const responseBody = await response.text();
    return { status: response.status, body: responseBody };
  } catch (err) {
    console.log(err);
    return { status: SERVER_CONSTANTS.notImplemented, body: JSON.stringify(err) };
  }
}

const setControlSecurityPolicy = (res, path) => {
  res.setHeader('Content-Security-Policy', 'frame-ancestors \'self\'')
}

/* Serving client/build , This folder is created once production build is executed on client. */
app.use(express.static(path.join(__dirname, "client/build"),{setHeaders:setControlSecurityPolicy}));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


// This is test url for the seeder : http://localhost:5000/seeder
app.get("^/seeder", async function(req, res) {
  console.log("app.get [GET Method] Requested url from the client : ", req.url);
  res.send('I am seeder and working fine.');
});

app.get("^/*", async function(req, res) {
  console.log("app.get [GET Method] Requested url from the client : ", req.url);

  const subdomain = "";
  if (typeof req.headers.authorization === "undefined") {
    // pre login apis
    const responseAuth = await fetchBasicAuthToken(
      SERVER_CONSTANTS.basicAdminUserName,
      base64data,
      subdomain
    );
    const reconstructedUrl = req.url.replace("/before/api/", "/TemplateApi/");
    const apiOp = await getApiCall(reconstructedUrl, responseAuth.access_token);
    let data = apiOp;
    res.status(data.status).send(encodeURIComponent(data.body));
  }
});

/* 
  POST method : Login Application contains :

  ^/before/* --> This URL is called for basic user authentication and this api is made before the actual(main-server) login call
   api of application. When access token is not present it looks and made basic user authentication to fetch the access_token.

*/

app.post("^/before/*", async function(req, res) {
  console.log(`------app.post---End----`);
  console.log("app.post [POST Method] Requested url from the client : ", req.url);

  const subdomain = "";
  // let reconstructedUrl = req.url.replace("/before/api/", "/TemplateApi/");
  let responseAuth = {};
  // console.log("-----", req.url.split("?")[0])
  // console.log("-----", req.headers.authorization)

  if (
    !req.url.split("?")[0].endsWith("login") &&
    typeof req.headers.authorization === "undefined"
  ) {
    /* pre login api - when the access_token is not present and URL doesn't ends with login, and basic user in server.js file is used for authentication to fetch the access_token from main server. */
    responseAuth = await fetchBasicAuthToken(
      SERVER_CONSTANTS.basicAdminUserName,
      base64data,
      subdomain
    );
    console.log("auth response---", responseAuth);
    res.send(responseAuth); 
    // written send response on responseAuth
    // const apiOp = await postApiCall(
    //   req.url,
    //   // reconstructedUrl,
    //   req.body,
    //   responseAuth.access_token
    // );
    // const data = apiOp;
    // let encodedBody = encodeURIComponent(data.body);
    // if (
    //   data.status !== SERVER_CONSTANTS.ok &&
    //   Object.keys(JSON.parse(data.body)).includes(SERVER_CONSTANTS.errorMessage)
    // ) {
    //   encodedBody = encodedBody.replace(/%20/g, SERVER_CONSTANTS.plus);
    // }
    // res.status(data.status).send(encodedBody);
  } else {
    /* for login api only - when the access_token is present and URL ends with login, and form data is used for authentication. */
    console.log("reconstructedUrl--", reconstructedUrl);
    console.log("username--", req.body.username);
    console.log("password--", req.body.password);
    console.log("subdomain--", subdomain);
    responseLogin = await loginAuthCall(
      reconstructedUrl,
      req.body.username,
      req.body.password,
      subdomain,
      req.body.otp
    );
    if (typeof responseLogin !== "undefined") {
      res
        .status(responseLogin.status)
        .send(encodeURIComponent(JSON.stringify(responseLogin)));
    } else {
      res
        .status(responseLogin.status)
        .send(encodeURIComponent(JSON.stringify(responseLogin.body)));
    }
  }
});


console.log("------------- Server Logging Started -------------")
app.use(logger('dev'));

/* catch 404 and forward to error handler */
app.use(function(err, req, res, next) {
  console.log("error : ", err);
});


app.listen(5000,()=>console.log("server started @ port : " + PORT));