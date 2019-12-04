"use strict"

const {
  loadConfig,
  getGlobalChain,
  sha256,
  sleep
} = require('comm/lib');

const moduleConfig = require('conf/moduleConfig.js');
// const config = loadConfig();

let Contract = require("contract/Contract.js");

let MPC = require("mpc/schnorrMpc.js");
let SchnorrMPC = require("mpc/schnorrMpc.js");

module.exports = class BaseAgent {
  constructor(crossChain, tokenType, record = null) {
    this.logger = global.monitorLogger;
    this.config = global.config;
    this.crossChain = crossChain;
    this.tokenType = tokenType;
    this.crossConf = this.config.crossTokens[crossChain].CONF;
    this.crossTokens = this.config.crossTokens[crossChain].TOKEN;
    // this.isLeader = this.config.isLeader;
    this.isLeader = global.isLeader ? true : false

    this.schnorrMpc = moduleConfig.crossInfoDict[crossChain].CONF.schnorrMpc;
    if (this.schnorrMpc) {
      this.storemanPk = this.crossConf.storemanPk;
    }
    this.mpcSignature = moduleConfig.mpcSignature;
    this.secureLockIntervalRatio = moduleConfig.secureLockIntervalRatio;

    let crossInfoInst = moduleConfig.crossInfoDict[crossChain][tokenType];
    this.crossInfoInst = crossInfoInst;
    this.getContractInfo();

    this.transChainType = this.getChainType();
    this.chain = getGlobalChain(this.transChainType);
    this.storemanAddress = this.crossConf.storemanOri;

    this.depositEvent = crossInfoInst.depositEvent;
    this.withdrawEvent = crossInfoInst.withdrawEvent;

    if (this.mpcSignature) {
      this.mpcSignData = {};
    }

    this.record = record;
    if (record !== null) {
      this.hashKey = record.hashX;
      if (record.x !== '0x') {
        this.key = record.x;
      }

      // this.crossDirection = crossDirection; /* 0 -- token to Wtoken, 1 -- Wtoken to token */
      this.crossDirection = this.record.direction;
      this.crossFunc = (this.crossDirection === 0) ? crossInfoInst.depositFunc : crossInfoInst.withdrawFunc;

      this.hashKey = record.hashX;
      this.amount = record.value;
      this.crossAddress = record.crossAddress;

      this.tokenAddr = record.tokenAddr;
      this.tokenSymbol = record.tokenSymbol;
      this.decimals = this.crossTokens[this.tokenAddr].decimals;
    }
  }

  setKey(key) {
    this.key = key;
  }
  setHashKey(hashKey) {
    this.hashKey = hashKey;
  }

  getChainPassword() {
    return global.secret[this.transChainType.toUpperCase() + '_PWD'];
  }

  getChainType() {
    return this.crossChain.toLowerCase();
  }

  // getContract() {
  //   if (this.contract.contractAddr) {
  //     if (this.  ) {
  //       console.log("this.chainType", this.transChainType);
  //       this.depositLockEvent = this.contract.getEventSignature(this.crossInfoInst.depositEvent[0]);
  //       this.depositRedeemEvent = this.contract.getEventSignature(this.crossInfoInst.depositEvent[1]);
  //       this.depositRevokeEvent = this.contract.getEventSignature(this.crossInfoInst.depositEvent[2]);
  //       this.withdrawLockEvent = this.contract.getEventSignature(this.crossInfoInst.withdrawEvent[0]);
  //       this.withdrawRedeemEvent = this.contract.getEventSignature(this.crossInfoInst.withdrawEvent[1]);
  //       this.withdrawRevokeEvent = this.contract.getEventSignature(this.crossInfoInst.withdrawEvent[2]);
      
      
  //       console.log("this.depositLockEvent", this.depositLockEvent);
  //       console.log("this.depositRedeemEvent", this.depositRedeemEvent);
  //       console.log("this.depositRevokeEvent", this.depositRevokeEvent);
  //       console.log("this.withdrawLockEvent", this.withdrawLockEvent);
  //       console.log("this.withdrawRedeemEvent", this.withdrawRedeemEvent);
  //       console.log("this.withdrawRevokeEvent", this.withdrawRevokeEvent);
  //     }
  //   } else {
      
  //   }
  // }

  getContractInfo() {
    let abi = this.crossInfoInst.originalChainHtlcAbi;
    this.contractAddr = this.crossInfoInst.originalChainHtlcAddr;
    if (this.contractAddr) {
      this.contract = new Contract(abi, this.contractAddr);
    } else {
      this.contract = null;
    }
  }

  getNonce() {
    return new Promise(async (resolve, reject) => {
      try {
        let nonce = 0;
        let chainNonce = this.transChainType + 'LastNonce';
        let nonceRenew = this.transChainType + 'NonceRenew';
        let noncePending = this.transChainType + 'NoncePending';
        let storemanAddress = this.storemanAddress;
        this.logger.debug("getNonce begin!", storemanAddress)
        let chainMutex = this.transChainType + 'Mutex';
        while (global[chainMutex][storemanAddress]) {
          await sleep(3);
        }
        this.logger.debug(chainMutex, storemanAddress, "mutexNonce true");
        global[chainMutex][storemanAddress] = true;

        console.log("aaron debug here getNonce", storemanAddress);


        if (global[nonceRenew][storemanAddress]) {
          nonce = await this.chain.getNonceSync(storemanAddress);
          nonce = parseInt(nonce, 16);
          global[nonceRenew][storemanAddress] = false;
        } else if (global[noncePending][storemanAddress]) {
          nonce = await this.chain.getNonceIncludePendingSync(storemanAddress);
          nonce = parseInt(nonce, 16);
          global[noncePending][storemanAddress] = false;
        } else {
          nonce = global[chainNonce][storemanAddress];
        }

        this.logger.debug(chainMutex, storemanAddress, "mutexNonce false");
        global[chainMutex][storemanAddress] = false;

        if (nonce >= global[chainNonce][storemanAddress]) {
          global[chainNonce][storemanAddress] = nonce;
          global[chainNonce][storemanAddress]++;
        }
        resolve(nonce);
      } catch (err) {
        this.logger.error("getNonce failed", storemanAddress, err);
        this.logger.debug(chainMutex, storemanAddress, "mutexNonce false");
        global[chainMutex][storemanAddress] = false;
        reject(err);
      }
    });
  }

  async initAgentTransInfo(action) {
    if (action !== null) {
      let transInfo = await this.getTransInfo(action);
      this.trans = new this.RawTrans(...transInfo);
    }
  }

  async createTrans(action) {
    return new Promise(async (resolve, reject) => {
      try {
        if (action === 'approveZero') {
          this.data = await this.getApproveData();
          this.build = this.buildApproveZeroData;
        } else if (action === 'approve') {
          this.data = await this.getApproveData();
          this.build = this.buildApproveData;
        } else if (action === 'lock') {
          this.data = await this.getLockData();
          this.build = this.buildLockData;
        } else if (action === 'redeem') {
          this.data = await this.getRedeemData();
          this.build = this.buildRedeemData;
        } else if (action === 'revoke') {
          this.data = await this.getRevokeData();
          this.build = this.buildRevokeData;
        }

        this.logger.debug("********************************** setData **********************************", JSON.stringify(this.data, null, 4), "hashX", this.hashKey);
        this.trans.setData(this.data);
        if (this.tokenType === 'COIN' && this.crossDirection === 1 && action === 'lock'){
          this.trans.setValue(this.amount.toString(16));
        } else {
          this.trans.setValue(0);
        }
        resolve();
      } catch (err) {
        reject("createTrans: " + err);
      }
    })
  }

  sendTransSync() { 
    return new Promise((resolve, reject) => {
      this.sendTrans((err, result) => {
        if (!err && result !== null) {
          resolve(result);
        } else {
          global[this.transChainType + 'NoncePending'][this.storemanAddress] = true;
          reject(err);
        }
      });
    });
  }

  async sendTrans(callback) {
    this.logger.debug("********************************** sendTransaction ********************************** hashX", this.hashKey);
    let self = this;
    try {
      let rawTx;
      if (this.isLeader) {
        let chainId = await this.chain.getNetworkId();
        if(this.mpcSignature && !this.schnorrMpc) {
          let mpc = new MPC(this.trans.txParams, this.chain.chainType, chainId, this.hashKey);
          rawTx = await mpc.signViaMpc();
          this.logger.debug("********************************** sendTransaction signViaMpc ********************************** hashX", this.hashKey, rawTx);
        } else {
          this.logger.debug("********************************** sendTransaction get signature ********************************** hashX", this.hashKey, this.trans);
          rawTx = await this.signTrans();
          this.logger.debug("********************************** sendTransaction get signature successfully ********************************** hashX", this.hashKey, rawTx);
        }

        this.chain.sendRawTransaction(rawTx, (err, result) => {
          if (!err) {
            self.logger.debug("sendRawTransaction result: hashX, result: ", self.hashKey, result);
            self.logger.debug("********************************** sendTransaction success ********************************** hashX", self.hashKey);
            let content = self.build(self.hashKey, result);
            callback(err, content);
          } else {
            self.logger.error("********************************** sendTransaction failed ********************************** hashX", self.hashKey, err);
            callback(err, result);
          }
        });
      }
    } catch (err) {
      this.logger.error("********************************** sendTransaction failed ********************************** hashX", this.hashKey, err);
      callback(err, null);
    }
  }

  validateTrans() {
    this.logger.debug("********************************** validateTrans ********************************** hashX", this.hashKey);
    return new Promise(async (resolve, reject) => {
      try {
        let chainId = await this.chain.getNetworkId();
        let mpc = new MPC(this.trans.txParams, this.chain.chainType, chainId, this.hashKey);

        mpc.addValidMpcTx();
        resolve();
      } catch (err) {
        this.logger.error("********************************** validateTrans failed ********************************** hashX", this.hashKey, err);
        reject(err);
      }
    });
  }

  internalSignViaMpc(signData, typesArray) {
    return new Promise(async (resolve, reject) => {
      if (this.mpcSignature && this.schnorrMpc) {
        try {
          this.logger.debug("********************************** internalSignViaMpc ********************************** hashX", this.hashKey, signData, typesArray);
          this.mpcSignData = this.encode(signData, typesArray);
          let internalSignature;
          if (this.isLeader) {
            internalSignature = await this.getInternalSign(this.mpcSignData);
            // this.mpcSignData = this.mpcSignData.push(internalSignature.R, internalSignature.s);
          } else {
            internalSignature = await this.validateInternalSign(this.mpcSignData);
          }
          resolve(internalSignature);
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(signData);
      }
    })
  }

  getInternalSign(mpcSignData) {
    return new Promise(async (resolve, reject) => {
      try {
        this.logger.debug("********************************** getInternalSign Via Mpc ********************************** hashX", this.hashKey, mpcSignData);
        let mpc = new SchnorrMPC(mpcSignData, this.storemanPk, this.hashKey);
        // internalSignature is a object, {R:, S:}
        let internalSignature = await mpc.signViaMpc();
        this.logger.debug("********************************** getInternalSign Via Mpc Success********************************** hashX", this.hashKey, internalSignature);
        resolve(internalSignature);
      } catch (err) {
        this.logger.error("********************************** getInternalSign Via Mpc failed ********************************** hashX", this.hashKey, err);
        reject(err);
      }
    });
  }

  validateInternalSign(mpcSignData) {
    return new Promise(async (resolve, reject) => {
      try {
        this.logger.debug("********************************** validateInternalSign Via Mpc ********************************** hashX", this.hashKey, mpcSignData);
        let mpc = new SchnorrMPC(mpcSignData, this.storemanPk, this.hashKey);
        let internalSignature = await mpc.addValidDataViaMpc();
        this.logger.debug("********************************** validateInternalSign Via Mpc Success********************************** hashX", this.hashKey, internalSignature);
        resolve({
          R: null,
          s: null
        });
      } catch (err) {
        this.logger.error("********************************** validateInternalSign Via Mpc failed ********************************** hashX", this.hashKey, err);
        reject(err);
      }
    });
  }

  signTrans() {
    return new Promise((resolve, reject) => {
      try {
        let password = this.getChainPassword();
        let rawTx = this.trans.signFromKeystore(password);
        resolve(rawTx);
      } catch (err) {
        this.logger.error("********************************** signTrans failed ********************************** hashX", this.hashKey);
        reject(err);
      }
    });
  }

  buildLockData(hashKey, result) { 
    this.logger.debug("********************************** insertLockData trans **********************************", hashKey);

    let content = {
      storemanLockTxHash: (Array.isArray(this.record.storemanLockTxHash)) ? [...this.record.storemanLockTxHash] : [this.record.storemanLockTxHash]
    }
    content.storemanLockTxHash.push(result.toLowerCase());
    return content;
  }

  buildRedeemData(hashKey, result) {
    this.logger.debug("********************************** insertRedeemData trans **********************************", hashKey);

    let content = {
      storemanRedeemTxHash: (Array.isArray(this.record.storemanRedeemTxHash)) ? [...this.record.storemanRedeemTxHash] : [this.record.storemanRedeemTxHash]
    }
    content.storemanRedeemTxHash.push(result.toLowerCase());
    return content;
  }

  buildRevokeData(hashKey, result) {
    this.logger.debug("********************************** insertRevokeData trans **********************************", hashKey);

    let content = {
      storemanRevokeTxHash: (Array.isArray(this.record.storemanRevokeTxHash)) ? [...this.record.storemanRevokeTxHash] : [this.record.storemanRevokeTxHash]
    }
    content.storemanRevokeTxHash.push(result.toLowerCase());
    return content;
  }

  getDecodeCrossAddress(decodeEvent) {
    return decodeEvent.args.wanAddr;
  }

  getDecodeCrossHashX(args) {
    if (!args.xHash && args.x) {
      args.xHash = sha256(args.x);
      return args;
    } else {
      return args;
    }
  }

  getDecodeEventDbData(chainType, crossChain, tokenType, decodeEvent, event, lockedTime) {
    let content = {};
    let args = this.getDecodeCrossHashX(decodeEvent.args);
    let eventName = decodeEvent.event;

    if (!args.xHash) {
      return null;
    }

    let hashX = args.xHash;
    let storeman;

    console.log("aaron debug event", eventName,chainType, this.crossInfoInst.withdrawAction, this.crossInfoInst.depositAction);
    try {
      if (!((eventName === this.depositEvent[2] && chainType !== 'WAN') ||
        (eventName === this.withdrawEvent[2] && chainType === 'WAN') ||
        (eventName === this.withdrawEvent[1] && chainType === 'EOS' && crossChain === 'EOS') ||
        (eventName === this.withdrawEvent[1] && chainType === 'WAN' && crossChain === 'EOS'))) {
        storeman = this.getDecodeEventStoremanGroup(decodeEvent);

        if([this.crossConf.storemanOri, this.crossConf.storemanPk, this.crossConf.storemanWan].indexOf(storeman) === -1) {
          return null;
        }
      }
      if ((eventName === this.depositEvent[0] && chainType !== 'WAN') ||
        (eventName === this.withdrawEvent[0] && chainType === 'WAN')) {
        this.logger.debug("********************************** 1: found new wallet lock transaction ********************************** hashX", hashX, " on Chain:", chainType);
        let tokenAddr = this.getDecodeEventTokenAddr(decodeEvent);
        content = {
          hashX: hashX,
          direction: (chainType !== 'WAN') ? 0 : 1,
          crossChain: crossChain,
          tokenType: tokenType,
          tokenAddr: tokenAddr,
          tokenSymbol: this.crossTokens[tokenAddr].tokenSymbol,
          decimals: this.crossTokens[tokenAddr].decimals,
          originChain: chainType,
          from: (chainType !== 'WAN') ? args.user : args.wanAddr,
          crossAddress: this.getDecodeCrossAddress(decodeEvent),
          toHtlcAddr: this.getDecodeEventToHtlcAddr(decodeEvent),
          storeman: storeman,
          value: this.getDecodeEventValue(decodeEvent),
          blockNumber: decodeEvent.blockNumber,
          timestamp: decodeEvent.timestamp * 1000,
          lockedTime: lockedTime * 1000,
          suspendTime: (1000 * (lockedTime - lockedTime / moduleConfig.secureLockIntervalRatio) + Number(decodeEvent.timestamp) * 1000).toString(),
          HTLCtime: (1000 * 2 * lockedTime + Number(decodeEvent.timestamp) * 1000).toString(),
          walletLockEvent: event
        };
      } else if ((eventName === this.depositEvent[0] && chainType === 'WAN') ||
        (eventName === this.withdrawEvent[0] && chainType !== 'WAN')) {
        this.logger.debug("********************************** 2: found storeman lock transaction ********************************** hashX", hashX, " on Chain:", chainType);
        content = {
          storemanLockEvent: event
        };
      } else if ((eventName === this.depositEvent[1] && chainType === 'WAN') ||
        (eventName === this.withdrawEvent[1] && chainType !== 'WAN')) {
        this.logger.debug("********************************** 3: found wallet redeem transaction ********************************** hashX", hashX, " on Chain:", chainType);
        content = {
          x: args.x,
          walletRedeemEvent: event
        };
      } else if ((eventName === this.depositEvent[1] && chainType !== 'WAN') ||
        (eventName === this.withdrawEvent[1] && chainType === 'WAN')) {
        this.logger.debug("********************************** 4: found storeman redeem transaction ********************************** hashX", hashX, " on Chain:", chainType);
        content = {
          storemanRedeemEvent: event
        };
      } else if ((eventName === this.depositEvent[2] && chainType !== 'WAN') ||
        (eventName === this.withdrawEvent[2] && chainType === 'WAN')) {
        this.logger.debug("********************************** 5: found wallet revoke transaction ********************************** hashX", hashX, " on Chain:", chainType);
        content = {
          walletRevokeEvent: event,
        };
      } else if ((eventName === this.depositEvent[2] && chainType === 'WAN') ||
        (eventName === this.withdrawEvent[2] && chainType !== 'WAN')) {
        this.logger.debug("********************************** 6: found storeman revoke transaction ********************************** hashX", hashX, " on Chain:", chainType);
        content = {
          storemanRevokeEvent: event
        };
      }
      return [hashX, content];
    } catch (err) {
      this.logger.error("some wrong happened during getDecodeEventDbData", chainType, crossChain, tokenType, decodeEvent, err);
      return null;
    }    
  }
}