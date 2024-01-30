// main.js
import { writeFileSync } from "fs"; // <---- added a new import
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
import { parse } from "json2csv";

const storeUrl =
  "https://warehouse-theme-metal.myshopify.com/collections/sales";

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

const products = $(".product-item");

const results = [];
for (const product of products) {
  const titleElement = $(product).find("a.product-item__title");
  const title = titleElement.text().trim();

  const priceElement = $(product).find("span.price");
  const price = priceElement.contents()[2].nodeValue.trim();

  results.push({ title, price });
}

const json = parse(results);
writeFileSync("products.json", json);
