File path: src/examples/error-handling.js

```javascript
const { pay, balance, configure } = require('arcpay');
const { initArcPay } = require('../utils/arc-client');
require('dotenv').config();

/**
 * Error handling examples for Arc payments
 * Covers: insufficient balance, failed transactions, timeouts
 */
async function handlePaymentWithErrors(recipient, amount) {
  try {
    initArcPay();

    // 1. Check balance first
    const bal = await balance();
    const usdcBalance = parseFloat(bal.usdc);

    if (usdcBalance < parseFloat(amount)) {
      console.log(`❌ Insufficient balance: ${usdcBalance} USDC < ${amount} USDC`);
      console.log(`💡 Tip: Visit https://faucet.circle.com to get testnet USDC`);
      return;
    }

    // 2. Attempt payment
    console.log(`💸 Sending ${amount} USDC to ${recipient}...`);
    const tx = await pay(recipient, amount);
    console.log(`✅ Payment sent! Tx: ${tx}`);

  } catch (error) {
    // 3. Handle specific errors
    if (error.message.includes('timeout')) {
      console.log('⏰ Transaction timed out — try again later or check network status');
    } else if (error.message.includes('insufficient')) {
      console.log('💰 Insufficient funds — get testnet USDC from faucet.circle.com');
    } else if (error.message.includes('gas')) {
      console.log('⛽ Gas issue — Arc uses USDC for gas, check your balance');
    } else {
      console.log(`❌ Unexpected error: ${error.message}`);
    }
  }
}

// Example usage
if (require.main === module) {
  const recipient = process.env.TEST_RECIPIENT || '0x123...';
  const amount = process.env.PAYMENT_AMOUNT || '1';
  handlePaymentWithErrors(recipient, amount);
}

module.exports = { handlePaymentWithErrors };
```

---

📦 Also Add This to package.json scripts

```json
"error": "node src/examples/error-handling.js"
```
