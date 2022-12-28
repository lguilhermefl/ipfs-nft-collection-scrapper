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

createFolders();
