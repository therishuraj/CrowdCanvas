const { Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');

// Replace with your 12-word seed phrase
const seedPhrase = 'rare screen bottom during shift spot deer crouch pumpkin element cross civil';

async function recoverWallet() {
  try {
    // Convert seed phrase to seed
    const seed = await bip39.mnemonicToSeed(seedPhrase);
    
    // Derive the keypair (Phantom uses derivation path m/44'/501'/0'/0')
    const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    
    console.log('\n=== WALLET RECOVERED ===');
    console.log('Address:', keypair.publicKey.toString());
    console.log('\nPrivate Key (copy this to .env):');
    console.log(JSON.stringify(Array.from(keypair.secretKey)));
    console.log('\n=== INSTRUCTIONS ===');
    console.log('1. Copy the array above');
    console.log('2. Open backend/.env');
    console.log('3. Set: PARENT_WALLET_PRIVATE_KEY=[paste array here]');
    console.log('4. Restart backend server');
    console.log('\nMake sure this address matches your Phantom wallet!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

recoverWallet();
