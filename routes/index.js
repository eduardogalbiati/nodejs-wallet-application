var express = require('express');
var router = express.Router();

var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')
var bitcoin = require('bitcoinjs-lib')

/* GET home page. */
router.get('/', function(req, res, next) {


	var bitcoinNetwork = bitcoin.networks.testnet
	// what you describe as 'seed'
	var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

	// your 12 word phrase
	var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex')) 

	var seed = bip39.mnemonicToSeed(mnemonic)

	var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork)

	var keyp = hdMaster.derive('0')
	console.log('derive0 ');
	console.log('PV - '+keyp.keyPair.toWIF());
	console.log('PB - '+keyp.keyPair.getAddress());

	var key1 = hdMaster.derive('1')
	console.log('derive1');
	console.log('PV - '+key1.keyPair.toWIF());
	console.log('Pb - '+key1.keyPair.getAddress());
	var key2 = hdMaster.derive('2');
	console.log('derive2');
	console.log('PV - '+key2.keyPair.toWIF());
	console.log('MPb - '+key2.keyPair.getAddress());

	var node = bitcoin.HDNode.fromBase58(key2.toBase58(), bitcoinNetwork);
	console.log('Pbd0 - '+node.derive(0).getAddress());
	console.log('Pbd1 - '+node.derive(1).getAddress());

  	res.render('index', { 
	  		title: mnemonic,
			key0 : {
				priv:keyp.keyPair.toWIF(),
				pub:keyp.keyPair.getAddress()
			},
			key1 : {
				priv:key1.keyPair.toWIF(),
				pub:key1.keyPair.getAddress()
			},
			key2 : {
				priv:key2.keyPair.toWIF(),
				pub:key2.keyPair.getAddress(),
				pub0 :node.derive(0).getAddress(),
				pub1 :node.derive(1).getAddress()
			}
	  	});

});
module.exports = router;
