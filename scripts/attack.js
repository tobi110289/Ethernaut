const { ethers } = require("ethers");
const abiCode = require('../build/contracts/Attack.json');
require('dotenv').config();

const provider = ethers.getDefaultProvider("rinkeby", {
  etherscan: process.env.ETHERSCAN_API_KEY,
  infura: {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  }
});

const contractAddr = "0xb2bd05B8f73A48560A75427153E12de1377967dA";
const wallet = new ethers.Wallet(process.env.DEV_WALLET_PRIVATE_KEY, provider);
let contract = new ethers.Contract(contractAddr, abiCode.abi, wallet);



(async () => {
  const blockNumber = await provider.getBlockNumber();
  console.log('blocknumber', blockNumber);
  const balance = await provider.getBalance(process.env.DEV_WALLET_ADDRESS);
  console.log('balance: ', ethers.utils.formatEther(balance));
  const blockHash = await contract.functions.getBlockhash();
  const tx = await blockHash.wait();
  console.log('final result: ', tx);
})();

