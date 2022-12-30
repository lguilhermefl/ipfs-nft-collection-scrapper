import config from "./config.js";
import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";

let currentEdition = 1;
let metadataObject;
let errorCount = 0;
let currentEditionWithError = currentEdition;

const baseIpfsUrl = "https://ipfs.io/ipfs";
const { jsonCID, collectionName, collectionSize, pageTimeout } = config;

async function getCollection() {
  const { browser, page } = await initPuppeteer();
  try {
    while (currentEdition <= collectionSize) {
      page.setDefaultTimeout(pageTimeout);

      const metadataFileName = `${currentEdition}.json`;
      const metadataPath = generateFilePath(metadataFileName);
      const existsJsonFile = fs.existsSync(metadataPath);

      if (!existsJsonFile) {
        const metadataUrl = `${baseIpfsUrl}/${jsonCID}/${currentEdition}.json`;
        await getMetadataFromIpfs(page, metadataUrl);
        saveMetadataFile(metadataPath);
      }

      if (metadataObject) {
        const imageName = metadataObject.name;
        const imagePath = generateFilePath(imageName);
        const existsImageFile = fs.existsSync(imagePath);

        if (!existsImageFile) {
          const imageUrl = metadataObject.image;
          const ipfsImageUrl = generateIpfsImageUrl(imageUrl);
          const imageBuffer = await getImagesFromIpfs(page, ipfsImageUrl);
          saveImageFile(imagePath, imageBuffer);
        }
      }

      currentEdition++;

      if (currentEdition > collectionSize) {
        await browser.close();
        return console.log("Collection completely fetched!");
      }
    }
  } catch (error) {
    await browser.close();
    const hasTooManyResquestsFailed = checkForError();
    if (hasTooManyResquestsFailed) {
      return console.log(
        "There is something wrong, could be your config or internet connection!"
      );
    }
    setTimeout(() => {
      getCollection();
    }, 100);
  }
}

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

function generateFilePath(fileName) {
  if (fileName.includes(".json")) {
    return path.resolve(collectionName, "metadata", fileName);
  }
  return path.resolve(collectionName, "images", fileName);
}

async function getMetadataFromIpfs(page, metadataUrl) {
  await page.goto(metadataUrl);
  await page.content();

  metadataObject = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });
}

async function getImagesFromIpfs(page, ipfsImageUrl) {
  const response = await page.goto(`${ipfsImageUrl}`);
  const imageBuffer = await response.buffer();
  return imageBuffer;
}

function saveMetadataFile(metadataPath) {
  fs.writeFileSync(metadataPath, JSON.stringify(metadataObject, null, 2));

  console.log(
    `${collectionName} #${currentEdition} metadata saved to ${metadataPath}`
  );
}

function saveImageFile(imagePath, imageBuffer) {
  const writeStream = fs.createWriteStream(imagePath);
  writeStream.write(imageBuffer);

  console.log(
    `${collectionName} #${currentEdition} image saved to ${imagePath}`
  );
}

const generateIpfsImageUrl = (imageUrl) => {
  const imageUrlSplited = imageUrl.split("/");
  const imageCID = imageUrlSplited[2];

  let imageFormat;

  if (imageUrlSplited[3]) {
    imageFormat = imageUrlSplited[3].split(".")[1];
  }

  let ipfsImageUrl;

  if (imageFormat) {
    ipfsImageUrl = `${baseIpfsUrl}/${imageCID}/${currentEdition}.${imageFormat}`;
  } else {
    ipfsImageUrl = `${baseIpfsUrl}/${imageCID}`;
  }

  return ipfsImageUrl;
};

function checkForError() {
  const maxErrorCount = 100;
  if (currentEdition === currentEditionWithError) {
    errorCount++;
    if (errorCount >= maxErrorCount) {
      return true;
    }
  }
  currentEditionWithError = currentEdition;
}

createFolders();
getCollection();
