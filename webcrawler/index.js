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
    
    const img = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(8) > ul > li:nth-child(1) > dl > dt > a > img`,
        (el) => el.textContent
      );
    const name = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(8) > ul > li:nth-child(1) > dl > dd`,
        (el) => el.textContent
      );

    for (let i = 0; i < img.length; i++) {
        const starbucks = new Starbucks({
            img : img[i],
            name : name[i],
        })
        await starbucks.save();
    }

    await browser.close();
}

startCrawling();

