import puppeteer from "puppeteer"
import { Starbucks } from "./models/starbucks.model.js"
import mongoose from "mongoose"

// 몽고DB 접속
mongoose.connect("mongodb://localhost:27017/miniProject")

async function startCrawling() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height:720 });
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do")
    await page.waitForTimeout(1000);
    
    const cnt = await page.$$eval( `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd `, (data) => data.length );
    for (let i = 1; i <= cnt*2; i++) {
      const second_cnt = await page.$$eval( `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li`, (data) => data.length );
      for (let j = 1; j <= second_cnt; j++) { 
        const img = await page.$eval( `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dt > a > img`, (el) => el.src );
        const name = await page.$eval( `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dd`, (el) => el.textContent );
        const starbucks = new Starbucks({
          name,
          img
        });
        await starbucks.save();
      }
    }

    await browser.close();
}

startCrawling();

