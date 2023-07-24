const express = require("express");
const { Blockchain } = require("./blockchain");
const { Transaction } = require("./transaction");
const { Wallet } = require("./wallet");

const app = express();
const port = 3000;

const myBlockchain = new Blockchain();
const myWallet = new Wallet();

app.use(express.json());

app.get("/blocks", (req, res) => {
  res.json(myBlockchain.chain);
});

app.get("/wallets", (req, res) => {
  const newWallet = Wallet.generateWallet();
  res.json(newWallet);
});

app.get("/mine", (req, res) => {
  const miningRewardAddress = myWallet.publicKey;
  myBlockchain.minePendingTransactions(miningRewardAddress);
  res.json({ message: "Block successfully mined!" });
});

app.post("/transactions", (req, res) => {
  const { toAddress, amount } = req.body;
  const newTransaction = new Transaction(myWallet.publicKey, toAddress, amount);
  newTransaction.signTransaction(myWallet.keyPair);
  myBlockchain.createTransaction(newTransaction);
  res.json({ message: "Transaction added successfully!" });
});

app.get("/balance/:publicKey", (req, res) => {
  const publicKey = req.params.publicKey;
  const balance = myBlockchain.getBalanceOfAddress(publicKey);
  res.json({ balance });
});

app.listen(port, () => {
  console.log(`Blockchain API listening on port ${port}`);
});
