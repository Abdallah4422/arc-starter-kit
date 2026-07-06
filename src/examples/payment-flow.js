const { pay, configure } = require('arcpay');
const { initArcPay } = require('../utils/arc-client');
require('dotenv').config();

/**
 * Send USDC payment on Arc
 * 
 * One-liner payment using ArcPay SDK[citation:9]
 */
async function sendPayment(recipient, amount) {
  try {
    initArcPay();
    
    console.log(`💸 Sending ${amount} USDC to ${recipient}...`);
    console.log('⏳ Transaction in progress...');
    
    const result = await pay(recipient, amount);
    
    console.log('✅ Payment sent!');
    console.log(`📦 Transaction: ${result}`);
    console.log(`🔗 Explorer: https://testnet.arcscan.app/tx/${result}`);
    
    return result;
  } catch (error) {
    console.error('❌ Payment failed:', error.message);
  }
}

// Example usage
if (require.main === module) {
  const recipient = process.env.TEST_RECIPIENT || '0x123...';
  const amount = process.env.PAYMENT_AMOUNT || '1';
  
  sendPayment(recipient, amount);
}

module.exports = { sendPayment };
