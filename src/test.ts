import * as client from "./data-source/immoscout/immoscoutClient.js";

const run = async (): Promise<void> => {
  client.queryPptr();
};

run()
  .then(() => console.log("OK"))
  .catch(console.log);
