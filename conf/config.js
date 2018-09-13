const user = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;
// const dbUrl = `mongodb://${user}:${pwd}@localhost:27017`;
const dbUrl = `mongodb://localhost:27017`;

const isLeader = 'true';

const config = {
	// ethWeb3Url: "http://localhost:8545",
	// wanWeb3Url: "http://localhost:8545",
	ethWeb3Url: "http://18.236.235.133:18545",
	wanWeb3Url: "http://18.236.235.133:8545",
	// mpcUrl: "http://18.236.235.133:8545",

	mpcUrl: "/home/ubuntu/.wanchain/gwan.ipc",

	crossEthDbUrl: dbUrl + "/crossEthChain",
	email: {
		"region": "us-west-2",
		"sender": "monitor@wanchain.org"
	}
};

config.erc20Abi = [{"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {"indexed": true, "name": "_to", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {"indexed": true, "name": "_spender", "type": "address"}, {"indexed": false, "name": "_value", "type": "uint256"}], "name": "Approval", "type": "event"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transfer", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "transferFrom", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}], "name": "approve", "outputs": [{"name": "success", "type": "bool"}], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}], "name": "allowance", "outputs": [{"name": "remaining", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}];

config.crossTypeDict = {
	ETH: 0,
	BTC: 1,
	ERC20: 2
}

config.crossInfoDict = {
	0 : {
		  depositFunc: ['eth2wethLock','eth2wethRefund','eth2wethRevoke'],
		  depositEvent: ['ETH2WETHLock','ETH2WETHRefund','ETH2WETHRevoke'],
		  withdrawFunc: ['weth2ethLock','weth2ethRefund','weth2ethRevoke'],
		  withdrawEvent: ['WETH2ETHLock','WETH2ETHRefund','WETH2ETHRevoke'],

		  /* on WAN chain */
		  wanchainHtlcAddr: '0x7a333ba427fce2e0c6dd6a2d727e5be6beb13ac2',
		  wanchainHtlcAbi: [{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"},{"name":"storeman","type":"address"},{"name":"ethAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"weth2ethLock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"eth2wethRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"weth2ethRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETH_INDEX","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"storemanGroupAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setStoremanGroupAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapXHashFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"},{"name":"wanAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"eth2wethLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"weth2ethRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wethManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"storeman","type":"address"},{"name":"value","type":"uint256"}],"name":"getWeth2EthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setWETHManager","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"eth2wethRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ETH2WETHLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"ETH2WETHRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"ETH2WETHRevoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"ethAddr","type":"address"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"WETH2ETHLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"WETH2ETHRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"WETH2ETHRevoke","type":"event"}],
		  /* on ETH chain */
		  originalChainHtlcAddr: '0x78eb00ec1c005fec86a074060cc1bc7513b1ee88',
		  originalChainHtlcAbi: [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"},{"name":"storeman","type":"address"},{"name":"wanAddr","type":"address"}],"name":"eth2wethLock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"eth2wethRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"weth2ethRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"weth2ethRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"},{"name":"user","type":"address"}],"name":"weth2ethLock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"xHash","type":"bytes32"}],"name":"eth2wethRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"wanAddr","type":"address"}],"name":"ETH2WETHLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"ETH2WETHRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"ETH2WETHRevoke","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"WETH2ETHLock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"}],"name":"WETH2ETHRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storeman","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"}],"name":"WETH2ETHRevoke","type":"event"}]
	},
	2 : {
		  depositFunc: ['inboundLock','inboundRefund','inboundRevoke'],
		  depositEvent: ['InboundLockLogger','InboundRefundLogger','InboundRevokeLogger'],
		  withdrawFunc: ['outboundLock','outboundRefund','outboundRevoke'],
		  withdrawEvent: ['OutboundLockLogger','OutboundRefundLogger','OutboundRevokeLogger'],

		  /* on WAN chain */
		  wanchainHtlcAddr: '0xe10515355e684e515c9c632c9eed04cca425cda1',
		  wanchainHtlcAbi: [{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"},{"name":"wanAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"inboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"storemanGroup","type":"address"},{"name":"value","type":"uint256"}],"name":"getOutboundFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"inboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"quotaLedger","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"},{"name":"storemanGroup","type":"address"},{"name":"ethAddr","type":"address"},{"name":"value","type":"uint256"}],"name":"outboundLock","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"outboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"x","type":"bytes32"}],"name":"inboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokenManager","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"x","type":"bytes32"}],"name":"outboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"storemanGroupAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setStoremanGroupAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setQuotaLedger","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"InboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"InboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":true,"name":"tokenOrigAddr","type":"address"}],"name":"InboundRevokeLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"ethAddr","type":"address"},{"indexed":false,"name":"fee","type":"uint256"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"wanAddr","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":true,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundRevokeLogger","type":"event"}],
		  /* on ETH chain */
		  originalChainHtlcAddr: '0x87a0dee965e7679d15327ce0cc3df8dfc009b43d',
		  originalChainHtlcAbi: [{"constant":true,"inputs":[],"name":"RATIO_PRECISE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"inboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"},{"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"outboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"getHTLCLeftLockedTime","outputs":[{"name":"time","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"outboundRevoke","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashShadow","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"x","type":"bytes32"}],"name":"inboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEF_LOCKED_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"x","type":"bytes32"}],"name":"outboundRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOrigAddr","type":"address"},{"name":"value","type":"uint256"},{"name":"xHash","type":"bytes32"},{"name":"storemanGroup","type":"address"},{"name":"wanAddr","type":"address"}],"name":"inboundLock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lockedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"revokeFeeRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"mapXHashHTLCTxs","outputs":[{"name":"direction","type":"uint8"},{"name":"source","type":"address"},{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"status","type":"uint8"},{"name":"lockedTime","type":"uint256"},{"name":"beginLockedTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEF_MAX_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ratio","type":"uint256"}],"name":"setRevokeFeeRatio","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"setLockedTime","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"xHash","type":"bytes32"}],"name":"xHashExist","outputs":[{"name":"exist","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"wanAddr","type":"address"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"InboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"InboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":true,"name":"tokenOrigAddr","type":"address"}],"name":"InboundRevokeLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundLockLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundRefundLogger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"storemanGroup","type":"address"},{"indexed":true,"name":"xHash","type":"bytes32"},{"indexed":true,"name":"tokenOrigAddr","type":"address"}],"name":"OutboundRevokeLogger","type":"event"}]
		}
}

config.crossTokenDict = {
	"ETH": {
		chainType : 'ETH',
		tokenType : 'ETH',
		tokenSymbol: 'ETH',
		tokenAddr : '0x'
	},
	"WCT": {
		chainType : 'ETH',
		tokenType : 'ERC20',
		tokenSymbol: 'WCT',
		tokenAddr : '0xb410aa9124e5623d62cbb82b4fbe38a7230c6590'
	},
}

module.exports = config;
