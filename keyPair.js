const fs = require('fs');
const crypto = require('crypto');

// private key
// we're gonna randomly generate 256 pairs of random numbers
// each 256 bits long
// so our private key is 512 random numbers
function genRandomNum(filename, numPairs) {
  const pairs = [];
  for (let i = 0; i < numPairs; i++) {
    const random1 = Math.floor(Math.random() * 2**256);
    const random2 = Math.floor(Math.random() * 2**256);
    pairs.push([random1, random2]);
  }

  const pairsString = JSON.stringify(pairs);
  fs.writeFileSync(filename, pairsString);
}

genRandomNum('random_pairs.json', 256);

// public key
// for the public key, we're gonna hash out each numbers
function genPublicKey(filename) {
  const privateKeyData = fs.readFileSync(filename, 'utf8');
  const privateKey = JSON.parse(privateKeyData);

  const publicKey = [];
  for (const number of privateKey) {
    const hash1 = crypto.createHash('sha256').update(pair[0].toString()).digest('hex');
    const hash2 = crypto.createHash('sha256').update(pair[1].toString()).digest('hex');
    publicKey.push([hash1, hash2]);
  }

  return publicKey;
}

const publicKey = genPublicKey('random_pairs.json');
console.log(publicKey);

function sign(message, privateKeyFile) {
  const privateKeyData = fs.readFileSync(privateKeyFile, 'utf8');
  const privateKey = JSON.parse(privateKeyData);
  
  const messageBinary = Buffer.from(message).toString('binary');
  const signature = [];

  for (let i = 0; i < messageBinary.length; i++) {
    const bit = messageBinary.charCodeAt(i) === 48 ? 0 : 1; // '0' => 0, '1' => 1
    const pair = privateKey[i];
    const selected = pair[bit];
    signature.push(selected);
  }

  return signature;
}