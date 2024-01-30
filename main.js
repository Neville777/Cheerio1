// main.js
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";

const storeUrl =
  "https://warehouse-theme-metal.myshopify.com/collections/sales";

// Download HTML with Got Scraping
const response = await gotScraping(storeUrl);
const html = response.body;

// Parse HTML with Cheerio
const $ = cheerio.load(html);

// Find all products on the page
const products = $(".product-item");

const results = [];
for (const product of products) {
  const titleElement = $(product).find("a.product-item__title");
  const title = titleElement.text().trim();

  const priceElement = $(product).find("span.price");
  const price = priceElement.contents()[2].nodeValue.trim();

  results.push({ title, price });
}

console.log(results);
