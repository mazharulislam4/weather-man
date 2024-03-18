"use client";
import Cookies from "js-cookie";
import { postcodeValidator } from "postcode-validator";
import data from "../../common.json";

import { DateTime } from "luxon";

export const passwordRgx =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  export const isStrong = (str) => passwordRgx.test(str);
// zip code patter from user prompt 

export const zipCodePatter = /(?:^|\b)(w:[A-Za-z0-9]+)(?![\s\S]*\1)/gi;

export const getZipCodeFromPrompt = (text) => {
   return text.match(zipCodePatter);
 };


/**
 * get cookie  .
 * @param {string} name - cookie name.
 */

const getCookie = () => {
  return Cookies.get(data.auth_cookie_name);
};

export const isLoggedIn = () => {
  const cookie = getCookie();

  if (cookie !== undefined || !cookie || cookie !== null) {
    return cookie;
  } else {
    return null;
  }
};

// second to date
export const secondToDate = (second) => {
  const mins = second / 60;
  return new Date(new Date().getTime() + mins * 60 * 1000);
};

// set cookies
/**
 * cookie set .
 * @param {string} name - cookie name.
 * @param {string} accessToken - access token.
 * @param {string} refreshToken - access token.
 * @param {Date} expiresIn - expiresIn .
 * @param {uid} uid - uid of user .
 */
export const setCookie = (name, accessToken, refreshToken, expiresIn, uid) => {
  Cookies.set(
    name,
    JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
      uid: uid,
    }),
    { expires: expiresIn, path: "/" }
  );
};


/**
 * @param {string} countryCode - Country code like [US, BD, JP]
 * @param {string} zipCode - zip code or post code
 */

export const  validateZipCode =  (countryCode , zipCode)=>{
   return  postcodeValidator(zipCode , countryCode);
}




// Function to convert Unix timestamp to local time string with format like "6:50 am"
/**
 * @param {*} unixTimestamp 
 * @returns {Date} - Data local formatted string
 */

export function convertUnixToLocalTimeString(unixTimestamp) {
  const localTime = DateTime.fromMillis(unixTimestamp * 1000).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return localTime.toLowerCase().replace(".", ""); // Remove the dot after the am/pm
}



// Function to convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// Function to convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}