const bitcoin = require("bitcoinjs-lib");

//creating and signing a standard p2pkh transaction

let NETWORK = bitcoin.networks.bitcoin; 
let txb = new bitcoin.TransactionBuilder(NETWORK);

//get unspent output details
let txid = ""; //transaction id
let outn = 0;  // n out

//add input
txb.addInput(txid, outn);

//add output
txb.addOutput("bc1qmwzvnazs8263g6v9ctscwheu329dvsax6jl369",35000); //first argument is address that will receive the funds, the second is the value to send in satoshis after deducting the mining fees. In this example there are 5000 satoshis in mining fees (40000-35000=5000)

//signing
let WIF = ""; //private key of the address associated with this unspent output
let keypair = bitcoin.ECPair.fromWIF(WIF, NETWORK);
txb.sign(0, keypair);
let tx = txb.build();
let txhex = tx.toHex();

console.log (txhex);

//using buildIncomplete lets you build your transaction before its signed or complete, good for debugging or multi signings
//let txhex = txb.buildIncomplete().toHex();
//console.log(txhex);
