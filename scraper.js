require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const scraper = async (milkList, login, password) => {
  // start browser and open page
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 500,
      height: 500,
    },
  });
  const page = await browser.newPage();

  // send page to log in page
  await page.goto(url);

  // log in, click inventory, click new
  await page.type("#ProfileID", login);
  await page.type("#AppPwd", password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.click("#listView div div.col-3.col-md-2.col-lg-1 span a");
  await page.waitForSelector("#addNew");
  await page.click("#addNew");

  // tab to set full inventory and submit
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Space", { delay: 500 });
  await page.keyboard.press("ArrowUp", { delay: 500 });
  await page.keyboard.press("Enter", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Tab", { delay: 500 });
  await page.keyboard.press("Enter", { delay: 500 });
  // await page.click(
  //   "body  div.crp-body-content  div.crp-content  div  div  div  form  div:nth-child(3)  div:nth-child(8)  div  div  button"
  // );

  // fill out inventory form from milk list, submit for review
  await page.waitForNavigation();
  for (let i = 0; i < milkList.length; i++) {
    await page.type(
      `#grouped-gridview > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${
        i + 1
      }) > td:nth-child(1) > input`,
      `${milkList[i]}`
    );
    await page.click(
      `#grouped-gridview > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${
        i + 1
      }) > td:nth-child(2) > a > svg`
    );
  }
  await page.click("#action-review");

  // await review page
  await page.waitForSelector(
    ".well > div:nth-child(2) > div.k-grid-content > table > tbody > tr"
  );

  // SUBMIT INVENTORY - PRODUCTION ONLY
  /*
    await page.keyboard.press("Tab", { delay: 500 });
    await page.keyboard.press("Tab", { delay: 500 });
    await page.keyboard.press("Tab", { delay: 600 });
    await page.keyboard.press("Tab", { delay: 600 });
    await page.keyboard.press("Enter", { delay: 400})
    */

  // screenshot confirmation and encode in base64
  const image = await page.screenshot({ type: "png" });
  const imageString = await image.toString("base64");

  // close browser
  await browser.close();

  // return base64 image
  return imageString;
};

module.exports = scraper;
