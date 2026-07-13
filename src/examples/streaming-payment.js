const { pay, balance, configure } = require('arcpay');
const { initArcPay } = require('../utils/arc-client');
require('dotenv').config();

/**
 * Payment Streaming Demo (x402-style)
 * 
 * Simulates a continuous payment stream — like a subscription,
 * real-time wage, or API billing.
 * 
 * Arc's low fees + USDC-as-gas make this actually viable.
 */
async function streamPayment(recipient, totalAmount, intervalMs = 2000) {
  try {
    initArcPay();

    // Check balance first
    const bal = await balance();
    const usdcBalance = parseFloat(bal.usdc);

    if (usdcBalance < totalAmount) {
      console.log(`❌ Insufficient balance: ${usdcBalance} USDC < ${totalAmount} USDC`);
      console.log(`💡 Visit https://faucet.circle.com to get testnet USDC`);
      return;
    }

    console.log(`🔄 Starting payment stream to ${recipient}`);
    console.log(`📦 Total: ${totalAmount} USDC`);
    console.log(`⏱️  Interval: ${intervalMs}ms per payment`);
    console.log('─────────────────────────────');

    let sent = 0;
    let count = 0;

    // Split total into smaller chunks
    const chunkSize = 0.01; // 0.01 USDC per chunk
    const totalChunks = Math.floor(totalAmount / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      try {
        const tx = await pay(recipient, chunkSize.toString());
        sent += chunkSize;
        count++;

        console.log(`✅ #${count} | Sent ${chunkSize} USDC | Total: ${sent.toFixed(4)} USDC | Tx: ${tx.slice(0, 10)}...`);

        // Wait before next payment (simulates real-time stream)
        await new Promise(r => setTimeout(r, intervalMs));

      } catch (error) {
        if (error.message.includes('insufficient')) {
          console.log(`❌ Stopped — insufficient balance at ${sent.toFixed(4)} USDC`);
          break;
        } else if (error.message.includes('timeout')) {
          console.log(`⏰ Timeout — pausing for 5s...`);
          await new Promise(r => setTimeout(r, 5000));
          i--; // Retry this chunk
        } else {
          console.log(`❌ Error: ${error.message}`);
          break;
        }
      }
    }

    console.log('─────────────────────────────');
    console.log(`✅ Stream complete! Total sent: ${sent.toFixed(4)} USDC in ${count} payments`);

  } catch (error) {
    console.error(`❌ Stream failed: ${error.message}`);
  }
}

// Example usage
if (require.main === module) {
  const recipient = process.env.TEST_RECIPIENT || '0xRecipientAddressHere';
  const totalAmount = parseFloat(process.env.STREAM_AMOUNT || '0.10'); // 0.10 USDC total
  const intervalMs = parseInt(process.env.STREAM_INTERVAL || '2000'); // 2 seconds

  streamPayment(recipient, totalAmount, intervalMs);
}

module.exports = { streamPayment };
