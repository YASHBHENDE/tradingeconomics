// DOCUMENTATION:
// http://docs.tradingeconomics.com
// Package Installation: npm install tradingeconomics

import te from "tradingeconomics"
import { apiKey } from "./config.js";

export const NewsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login(apiKey);

    // Get the latest news
    // You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data = await te.getNews();

   return data
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

