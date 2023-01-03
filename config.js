const config = {
  ipfsMetadataSampleUrl:
    "https://ipfs.io/ipfs/QmNe7EebKaNuRoN2ov9nMuwHXQvXbYXCLM9W1nDBxnqLgL/4773.json", // Metadata link from any edition in a collection
  collectionName: "yaypegs", // It's gonna be the collection folder name
  firstEditionId: 1, // First edition from collection
  lastEditionId: 10000, // Last Edition from collection
  collectionSize: 10000, // Collection's total size
  pageTimeout: 1500, // Maximum time to wait for each page to load. If you keep getting errors you can change this number to a bigger one
};

export default config;
