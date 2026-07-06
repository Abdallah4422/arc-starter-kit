const { balance, configure } = require('arcpay');
const { initArcPay, getArcConfig } = require('../utils/arc-client');
require('dotenv').config();

/**
 * Check USDC balance on Arc
 * 
 * Arc uses USDC as native gas token — no ETH needed!
 * ERC-20 USDC uses 6 decimals (not 18)[citation:4]
 */
async function checkBalance() {
  try {
    // Initialize ArcPay
    initArcPay();
    
    const result = await balance();
    
    console.log('💰 Arc Balance Check');
    console.log('═══════════════════════');
    console.log(`Network: ${getArcConfig().network}`);
    console.log(`Address: ${result.address}`);
    console.log(`USDC Balance: ${result.usdc} USDC`);
    console.log('═══════════════════════');
    
    return result;
  } catch (error) {
    console.error('❌ Error checking balance:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  checkBalance();
}

module.exports = { checkBalance };
