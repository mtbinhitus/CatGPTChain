const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Wallet {
  constructor() {
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic('hex');
    this.privateKey = this.keyPair.getPrivate('hex');
  }

  static generateWallet() {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

    return {
      publicKey,
      privateKey
    };
  }

  signTransaction(transaction) {
    const signingKey = ec.keyFromPrivate(this.privateKey, 'hex');
    transaction.signTransaction(signingKey);
  }
}

module.exports.Wallet = Wallet;
