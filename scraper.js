require('dotenv').config();
const puppeteer = require('puppeteer');
const url = "https://orders.deanfoods.com/"

const scrape = async (milkList, login, password) => {
  const browser = await puppeteer.launch({headless: false, slowMo: 20})
  const page = await browser.newPage();

  await page.goto(url)

  await page.type("#ProfileID", login);
  await page.type("#AppPwd", password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.click("#listView div div.col-3.col-md-2.col-lg-1 span a");
  await page.click("#addNew");
  
  await page.keyboard.press("Tab", {delay: 400});
  await page.keyboard.press("Tab", {delay: 400});
  await page.keyboard.press("Tab", {delay: 400});
  await page.keyboard.press("Tab", {delay: 400});
  await page.keyboard.press("Space", {delay: 400})
  await page.keyboard.press("ArrowUp", {delay: 400});
  await page.keyboard.press("Enter", {delay: 400});

  await page.click("body  div.crp-body-content  div.crp-content  div  div  div  form  div:nth-child(3)  div:nth-child(8)  div  div  button")

  await page.waitForSelector("tbody > tr > td > input");

  
  for (let i=0; i<milkList.length; i++) {
    await page.type(`#grouped-gridview > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${i+1}) > td:nth-child(1) > input`, `${milkList[i].amount}`)
    await page.click(`#grouped-gridview > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(${i+1}) > td:nth-child(2) > a > svg`)
  }

  await page.click("#action-review");
  await page.waitForSelector(".well > div:nth-child(2) > div.k-grid-content > table > tbody")


  
  await page.screenshot({path: "img.png"})

  await browser.close();
};

module.exports = scrape;
