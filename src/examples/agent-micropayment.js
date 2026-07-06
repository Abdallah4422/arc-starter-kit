const { pay, configure, balance } = require('arcpay');
const { initArcPay } = require('../utils/arc-client');
require('dotenv').config();

/**
 * AI Agent micropayment example
 * 
 * Demonstrates how AI agents can pay for API calls
 * using Arc's USDC-native gas[citation:6]
 */
async function agentPayment(serviceAddress, amount = '0.001') {
  try {
    initArcPay();
    
    console.log('🤖 AI Agent Payment Flow');
    console.log('═════════════════════════');
    console.log(`Service: ${serviceAddress}`);
    console.log(`Amount: ${amount} USDC (nanopayment)`);
    console.log('⏳ Processing...');
    
    const result = await pay(serviceAddress, amount);
    
    console.log('✅ Agent paid successfully!');
    console.log(`📦 Tx: ${result}`);
    console.log(`💰 New balance: ${await balance().then(b => b.usdc)} USDC`);
    
    return result;
  } catch (error) {
    console.error('❌ Agent payment failed:', error.message);
  }
}

// Simulate 10 agent payments
async function runAgentBatch(count = 10) {
  console.log(`🔄 Running ${count} agent payments...`);
  
  for (let i = 0; i < count; i++) {
    const service = `0xService${i.toString().padStart(4, '0')}`;
    await agentPayment(service, '0.001');
    await new Promise(r => setTimeout(r, 200)); // Rate limit
  }
  
  console.log('✅ Batch complete!');
}

if (require.main === module) {
  runAgentBatch(5);
}

module.exports = { agentPayment, runAgentBatch };
