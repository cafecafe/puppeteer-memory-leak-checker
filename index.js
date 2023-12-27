import puppeteer from "puppeteer";
import fs from "fs";
import { parse } from "csv-parse";

const websites = [];
fs.createReadStream("./top5000.csv")
  .pipe(parse({ delimiter: "\r", from_line: 1 }))
  .on("data", function (row) {
    websites.push(row[0].trim());
  });

function getRandomWebsite() {
  const randomWebsite = websites[Math.floor(Math.random() * websites.length)];
  return randomWebsite;
}

async function run() {
  let i = 0;
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1920, height: 1080 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  while (i < 10000) {
    const page = await browser.newPage();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    await page.setUserAgent(ua);
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
    const url = `https://${getRandomWebsite()}`;
    try {
      // console.log(url)
      await page.goto(url, { waitUntil: "load", timeout: 5000 });

      // await page.screenshot({path: `file${i}.png`});
      console.log("👌🏼 Page loaded", i++, url);
    } catch (error) {
      console.log("🙅🏼‍♀️ Page did not load", i++, url);
    } finally {
      await page.close();
    }
  }
  await browser.close(); // never executes
}

run();
