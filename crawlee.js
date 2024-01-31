// To save data to disk, we need to import Dataset.
import { CheerioCrawler, Dataset } from "crawlee";

const crawler = new CheerioCrawler({
  requestHandler: async ({ $, request, enqueueLinks }) => {
    console.log(`Fetching URL: ${request.url}`);

    if (request.label === "start-url") {
      await enqueueLinks({
        selector: "a.product-item__title",
      });
      // When on the start URL, we don't want to
      // extract any data after we extract the links.
      return;
    }

    // We copied and pasted the extraction code
    // from the previous lesson with small
    // refactoring: e.g. `$productPage` to `$`.
    const title = $("h1").text().trim();
    const vendor = $("a.product-meta__vendor").text().trim();
    const price = $("span.price").contents()[2].nodeValue;
    const reviewCount = parseInt($("span.rating__caption").text(), 10);
    const description = $('div[class*="description"] div.rte').text().trim();

    // Instead of printing the results to
    // console, we save everything to a file.
    await Dataset.pushData({
      title,
      vendor,
      price,
      reviewCount,
      description,
    });
  },
});

await crawler.addRequests([
  {
    url: "https://warehouse-theme-metal.myshopify.com/collections/sales",
    label: "start-url",
  },
]);

await crawler.run();
