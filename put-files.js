/*
  node put-files.js --token=<YOUR_TOKEN> ~/filename1 ~/filename2 ~/filenameN
*/

import process from "process";
import minimist from "minimist";
import { Web3Storage, getFilesFromPath } from "web3.storage";

async function main() {
  const args = minimist(process.argv.slice(2));
  const token = args.token;

  console.log("args: ", args);

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token });
  const files = [];

  for (const path of args._) {
    console.log("path: ", path);
    const pathFiles = await getFilesFromPath(path);
    console.log("pathFiles: ", pathFiles);
    files.push(...pathFiles);
  }

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

main();
