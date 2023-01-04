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

## Important

**Any collection fetched by this script must have all METADATA and IMAGES files on IPFS**

## How to run it
You'll need to have Node.js installed in your machine. For this project I used 18.12.1 version, you can download the latest stable version (LTS) at https://nodejs.org/en/download/

After installing Node.js and opening it's folder in a code editor, you'll need to install all dependencies, use this command for it:

    npm install

When the depencies are installed you'll need to put the desired collection info in config.js file, here is an example of config for Bored Ape Yatch Club:

    ipfsMetadataSampleUrl: "https://ipfs.io/ipfs/QmNe7EebKaNuRoN2ov9nMuwHXQvXbYXCLM9W1nDBxnqLgL/9497.json",
    collectionName: "Yaypegs",
    firstEditionId : 1,
    lastEditionId: 10000,
    collectionSize: 10000,
    pageTimeout: 1500, // default value, only change if you're
                       // receiving too many erros

Detailed explanation for each values in config file:

**ipfsMetadataSampleUrl:** You can get it at opensea collection's page. Click on one of the NFTs, open the tab "Details" and click on "Token ID" number. You'll be redirected to it's metadata page. If it's a IPFS url copy it and paste it here replacing it's value.
**collectionName:**  Name of the folder where all files will be saved.
**firstEditionId:** It's the first collection's edition. Some collections start with edition 0, but most of them start with 1.
**lastEditionId:** It's the last collection's edition. You can test if it's right by changing the number in the end of any edition's url at opensea.
**collectionSize:** The total size of desired collection.

After all collection info is done, save the file and run:

    npm start

Now you only need to wait until it's finished, hope you enjoy! :)
