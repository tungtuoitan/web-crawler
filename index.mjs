import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(300000);
  page.setDefaultTimeout(300000);

  // Navigate the page to a URL
  await page.goto("https://thanhnien.vn/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".txt-search-header", "tết 2024");
  await page.keyboard.press("Enter");

  // Wait and click on first result
  const searchResultSelector = ".box-category-link-title";
  await page.waitForSelector(searchResultSelector);

  // Locate the full title with a unique string
  const titles = await page.$$eval("a.box-category-link-title", (elements) => {
    return elements.map((element) => element.textContent);
  });

  // Print the full title
  console.log('The title of this blog post is "%s".', titles);

  // await browser.close();
})();
