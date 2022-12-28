import config from "./config.js";
import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";

let currentEdition = 1;

const baseIpfsUrl = "https://ipfs.io/ipfs";
const { jsonCID, collectionName, collectionSize, pageTimeout } = config;

function createFolders() {
  if (!fs.existsSync(collectionName)) {
    fs.mkdirSync(collectionName);
    fs.mkdirSync(`${collectionName}/metadata`);
    fs.mkdirSync(`${collectionName}/images`);
  }
}

async function initPuppeteer() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const ua =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
  await page.setUserAgent(ua);

  return { browser, page };
}

createFolders();
