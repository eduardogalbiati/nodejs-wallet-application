var express = require('express');
var router = express.Router();
var bitcoin = require('bitcoinjs-lib')
/* GET home page. */
router.get('/', function(req, res, next) {
	/*
	function rng () { return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz') }

    // generate random keyPair
    var keyPair = bitcoin.ECPair.makeRandom({ rng: rng },bitcoin.network.testnet)
    var address = keyPair.getAddress()

   //assert.strictEqual(address, '1F5VhMHukdnUES9kfXqzPzMeF1GPHKiF64')
   */

   var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex')) 

// what is accurately described as the wallet seed
var seed = bip39.mnemonicToSeed('march diary shop claw never unknown cool cotton regret scrap seminar prosper') // you'll use this in #3 below


var bitcoin = require('bitcoinjs-lib') // npm i -S bitcoinjs-lib

var bitcoinNetwork = bitcoin.networks.testnet
var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork) // seed from above

var keyp = hdMaster.derive('0')
console.log('derivaPV 0 ');
console.log('PV - '+keyp.keyPair.toWIF());
console.log('Pb - '+keyp.keyPair.getAddress());

var key1 = hdMaster.derive('1')
console.log('deriva 1 ');
console.log('PV - '+key1.keyPair.toWIF());
console.log('Pb - '+key1.keyPair.getAddress());
var key2 = hdMaster.derive('2');
console.log('deriva 2 ');
console.log('PV - '+key2.keyPair.toWIF());
console.log('MPb - '+key2.keyPair.getAddress());

var node = bitcoin.HDNode.fromBase58(key2.toBase58(), bitcoinNetwork);
console.log('Pbd0 - '+node.derive(0).getAddress());
console.log('Pbd1 - '+node.derive(1).getAddress());
//var xpub = key1.toBase58();
//console.log(xpub)
//console.log(xpub)
//var node = bitcoin.HDNode.fromBase58(xpub, bitcoinNetwork);
//var address = node.derive(0).getAddress()


  res.render('index', { title: key1.keyPair.toWIF(), ad:address});
});

module.exports = router;
