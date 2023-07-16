import got from "got";
import puppeteer from "puppeteer";
import { promisify } from "util";

const sleep = promisify(setTimeout);

export const query = async (): Promise<void> => {
  const response = await got(
    "https://www.immobilienscout24.de/Suche/de/berlin/berlin/wohnung-mit-einbaukueche-mieten?price=-1200.0&exclusioncriteria=swapflat&pricetype=rentpermonth&sorting=2",
  );
  console.log(response.body);
};

export const queryPptr = async (): Promise<void> => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      // executablePath: puppeteer.executablePath(),
      channel: "chrome",
    });
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    );

    await page.goto(
      "https://www.immobilienscout24.de/Suche/de/berlin/berlin/wohnung-mit-einbaukueche-mieten?price=-1200.0&exclusioncriteria=swapflat&pricetype=rentpermonth&sorting=2",
      {
        timeout: 120_000,
        waitUntil: ["domcontentloaded", "networkidle2"],
      },
    );
    console.log("loaded");
    await sleep(5_000);
    console.log("after sleep");
  } finally {
    await browser?.close();
  }
};
