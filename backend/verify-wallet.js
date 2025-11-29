const { Keypair } = require('@solana/web3.js');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

console.log('\n═══════════════════════════════════════════════════════════');
console.log('🔍 PARENT WALLET VERIFICATION');
console.log('═══════════════════════════════════════════════════════════\n');

const privateKey = process.env.PARENT_WALLET_PRIVATE_KEY;

if (!privateKey) {
  console.log('❌ PARENT_WALLET_PRIVATE_KEY not found in .env file');
  console.log('\nPlease add your private key to backend/.env:');
  console.log('PARENT_WALLET_PRIVATE_KEY=[your private key here]\n');
  process.exit(1);
}

try {
  let privateKeyArray;
  
  // Handle both formats
  if (privateKey.startsWith('[')) {
    console.log('Format: Array');
    privateKeyArray = Uint8Array.from(JSON.parse(privateKey));
  } else {
    console.log('Format: Base58');
    const bs58 = require('bs58');
    privateKeyArray = bs58.decode(privateKey);
  }
  
  console.log('Private key length:', privateKeyArray.length, 'bytes');
  
  if (privateKeyArray.length !== 64) {
    console.log('❌ Invalid private key size!');
    console.log('Expected: 64 bytes');
    console.log('Got:', privateKeyArray.length, 'bytes\n');
    process.exit(1);
  }
  
  const keypair = Keypair.fromSecretKey(privateKeyArray);
  const address = keypair.publicKey.toString();
  
  console.log('\n✅ Private key is valid!\n');
  console.log('📍 ADDRESS DERIVED FROM PRIVATE KEY:');
  console.log('   ', address);
  
  console.log('\n📍 ADDRESS IN CONFIG.TS:');
  console.log('   ', '85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15');
  
  console.log('\n🔍 MATCH CHECK:');
  if (address === '85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15') {
    console.log('   ✅ ADDRESSES MATCH! Configuration is correct.\n');
  } else {
    console.log('   ❌ ADDRESSES DO NOT MATCH!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  ACTION REQUIRED:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou have TWO options:\n');
    console.log('OPTION 1: Update config.ts with the correct address');
    console.log('  1. Open: backend/src/config.ts');
    console.log('  2. Find: parentWalletAddress: ...');
    console.log('  3. Replace with:', address);
    console.log('  4. Save and restart backend\n');
    console.log('OPTION 2: Get the correct private key for the configured address');
    console.log('  1. Open Phantom wallet with address: 85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15');
    console.log('  2. Export the private key');
    console.log('  3. Update PARENT_WALLET_PRIVATE_KEY in .env');
    console.log('  4. Restart backend\n');
  }
  
  console.log('═══════════════════════════════════════════════════════════\n');
  
} catch (error) {
  console.log('\n❌ ERROR:', error.message);
  console.log('\nMake sure your private key in .env is correctly formatted.\n');
  process.exit(1);
}
