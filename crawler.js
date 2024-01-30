import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";

const WEBSITE_URL = "https://warehouse-theme-metal.myshopify.com";
const storeUrl = `${WEBSITE_URL}/collections/sales`;

const response = await gotScraping(storeUrl);
const html = response.body;

const $ = cheerio.load(html);

const productLinks = $("a.product-item__title");

// Prepare an empty array for our product URLs.
const productUrls = [];

for (const link of productLinks) {
  const relativeUrl = $(link).attr("href");
  const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);

  // Collect absolute product URLs.
  productUrls.push(absoluteUrl);
}

// Loop over the stored URLs to process
// each product page individually.
for (const url of productUrls) {
  // Download HTML.
  const productResponse = await gotScraping(url);
  const productHtml = productResponse.body;

  // Load into Cheerio to parse the HTML.
  const $productPage = cheerio.load(productHtml);

  // Extract the product's title from the <h1> tag.
  const productPageTitle = $productPage("h1").text().trim();

  // Print the title to the terminal to see
  // confirm we downloaded the correct pages.
  console.log(productPageTitle);
}
