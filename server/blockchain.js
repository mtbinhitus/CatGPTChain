const SHA256 = require("crypto-js/sha256");
const { Transaction } = require("./transaction");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.networkNodes = [];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2023", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      this.chain.length,
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.data) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  getAllTransactions() {
    const transactions = [];
    for (const block of this.chain) {
      for (const transaction of block.data) {
        transactions.push(transaction);
      }
    }
    return transactions;
  }

  registerNode(nodeUrl) {
    if (!this.networkNodes.includes(nodeUrl)) {
      this.networkNodes.push(nodeUrl);
    }
  }

  async syncChain() {
    const promises = this.networkNodes.map((nodeUrl) =>
      axios.get(`${nodeUrl}/blocks`)
    );

    try {
      const results = await Promise.all(promises);
      const remoteChains = results.map((res) => res.data);

      // Find the longest chain
      const longestChain = remoteChains.reduce((currentChain, remoteChain) => {
        if (remoteChain.length > currentChain.length) {
          return remoteChain;
        } else {
          return currentChain;
        }
      }, this.chain);

      // Update the chain if the longest chain is valid
      if (this.isChainValid(longestChain)) {
        this.chain = longestChain;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error syncing chain:', error.message);
      return false;
    }
  }

}

module.exports.Blockchain = Blockchain;
