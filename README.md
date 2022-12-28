# IPFS NFT Collection Scrapper

A simple script to download all metadata and images from a collection hosted in IPFS. You'll only need the CID of it's metadata and it's total size.

## Disclaimer
This project was created for educational purposes, please refer to the [LICENSE](LICENSE) file for further information.

## Main features
- Download all metadata in JSON format from a NFT collection
- Download all images from a NFT collection

## Contributions
If you desire to contribute in anyway, here is my wallet address:

    0x3C214e48D3b35Df0E9FE566D8D6584864cfA68Db

## How to run it
You'll need to have Node.js installed in your machine. For this project I used 18.12.1 version, you can download the latest stable version (LTS) at https://nodejs.org/en/download/

After installing Node.js and opening it's folder in a code editor, you'll need to install all dependencies, use this command for it:

    npm install

When the depencies are installed you'll need to put the desired collection info in config.js file, here is an example of config for Bored Ape Yatch Club:

    jsonCID: "QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    collectionName: "Bored Ape Yacht Club",
    collectionSize: 10000,
    pageTimeout: 1500, // default value, don't change if you don't
                       // have a slow internet connection and are 
                       // receiving errors when downloading files

After all collection info is done, save the file and run:

    npm start

Now you only need to wait until it's finished, hope you enjoy! :)
