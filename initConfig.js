"use strict"
const optimist = require('optimist');

let argv    = optimist
  .usage('Usage: nodejs $0 $1 $2 $3 [--testnet]')
  .argv;
global.testnet = argv.testnet ? true : false;

let configJson = require('conf/config.json');
let config = global.testnet?configJson.testnet:configJson.main;

const {
  initConfig
} = require('comm/lib');

async function init() {
  let paras = process.argv.splice(2);
  if (paras.length === 3 || paras.length === 4) {
    try {
      let crossTokens = await initConfig(paras[0], paras[1], paras[2]);
      if (crossTokens === null) {
        console.log("Couldn't find any tokens that the storeman is in charge of. ", paras);
        process.exit();
      }
      console.log(crossTokens);
    } catch (err) {
      console.log("Storeman agent init error, plz check the paras and try again.", err);
      process.exit();
    }
  } else {
    console.log("Input command: ", argv);
    if (Object.keys(config["crossTokens"]).length === 0) {
      console.log("storeman agent should be initialized with storemanWanAddr storemanEthAddr at the first time!");
      process.exit();
    }
  }
}

init();