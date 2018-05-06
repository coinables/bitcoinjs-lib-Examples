let bitcoin = require("bitcoinjs-lib");

//creating and signing a p2sh segwit
//p2sh(p2wpkh): addInput('00000....', 0)
//sign(0, keyPair, redeemScript, ,value)

let NETWORK = bitcoin.networks.bitcoin; 
var txb = new bitcoin.TransactionBuilder(NETWORK);

//get unspent output details
let txid = ""; //transaction id of the output you want to spend
let outn = 0;  // n out

//need scriptPubKey for adding input
let WIF = ""; //private key of p2sh-p2wpkh output
let keypair = bitcoin.ECPair.fromWIF(WIF, NETWORK);
let pubKey = keypair.getPublicKeyBuffer()
let pubKeyHash = bitcoin.crypto.hash160(pubKey)
let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(pubKeyHash)
let scriptPubkey = redeemScript(bitcoin.crypto.hash160(	
                           keypair.getPublicKeyBuffer()
                       )
                   );

//add input
txb.addInput(txid, outn, null, scriptPubkey);

//add output
txb.addOutput("17v9bcxrrKF4V2uyRtZR9QHRRcMFvG7pdq",30000); //first argument is receiving address, the second is the amount we are sending after deducting a mining fee

//signing
txb.sign(0, keypair, redeemScript, null, 35000); //NOTE the amount is the FULL amount of the unspent output, NOT the amount we are sending
let tx = txb.build();
let txhex = tx.toHex();

console.log(txhex);

//using buildIncomplete lets you build your transaction before its signed or complete, good for debugging or multi signings
//let txhex = txb.buildIncomplete().toHex();
//console.log(txhex);
