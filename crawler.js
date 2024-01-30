import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";

// Split the base URL from the category to use it later.
const WEBSITE_URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${WEBSITE_URL}/collections/sales`;

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $("a.product-item__title");

for (const link of productLinks) {
  const relativeUrl = $(link).attr("href");
  // Resolve relative URLs using the website's URL
  const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);
  console.log(absoluteUrl.href);
}
