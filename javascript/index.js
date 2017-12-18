const SHA256 = require('crypto-js/sha256')

class Block {
	
	constructor(index, timestamp, data, previousHash = '') {
		this.index        = index;
		this.timestamp    = timestamp;
		this.data         = data;
		this.previousHash = previousHash;
		this.hash         = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class BlockChain {
	constructor() {
		this.chain = [this.createGenesisBlock()]
	}

	// Genesis Block is the first block of the chain, so we have to manually create it.
	createGenesisBlock() {
		return new Block(0, '01/01/2018', "Genesis Block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1]
	}

	addBlock( newBlock ) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

let gCoin = new BlockChain()

gCoin.addBlock( new Block(1, '02/01/2018', {amount: 10}));
gCoin.addBlock( new Block(2, '03/01/2018', {amount: 15}));

console.log(JSON.stringify(gCoin, null, 4));



