const express = require('express');
const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const app = express();
const port = 3000;

const myBlockchain = new Blockchain();

app.use(express.json());

app.get('/blocks', (req, res) => {
  res.json(myBlockchain.chain);
});

app.get('/mine', (req, res) => {
  const miningRewardAddress = 'your-mining-reward-address';
  myBlockchain.minePendingTransactions(miningRewardAddress);
  res.json({ message: 'Block successfully mined!' });
});

app.post('/transactions', (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;
  const newTransaction = new Transaction(fromAddress, toAddress, amount);
  myBlockchain.createTransaction(newTransaction);
  res.json({ message: 'Transaction added successfully!' });
});

app.get('/balance/:address', (req, res) => {
  const address = req.params.address;
  const balance = myBlockchain.getBalanceOfAddress(address);
  res.json({ balance });
});

app.listen(port, () => {
  console.log(`Blockchain API listening on port ${port}`);
});
