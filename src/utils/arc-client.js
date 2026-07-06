const { CircleApi } = require('@circle-fin/circle-sdk');
const { configure, pay, balance } = require('arcpay');
require('dotenv').config();

/**
 * Initialize Arc client with Circle SDK
 */
function initCircleClient() {
  return new CircleApi({
    apiKey: process.env.CIRCLE_API_KEY,
    baseUrl: 'https://api.circle.com/v1'
  });
}

/**
 * Initialize ArcPay for quick payments
 */
function initArcPay() {
  configure({
    privateKey: process.env.PRIVATE_KEY
  });
}

/**
 * Get Arc testnet configuration
 */
function getArcConfig() {
  return {
    network: 'arc-testnet',
    chainId: 5042002,
    rpcUrl: process.env.ARC_TESTNET_RPC_URL || 'https://rpc.testnet.arc.network'
  };
}

module.exports = {
  initCircleClient,
  initArcPay,
  getArcConfig
};
