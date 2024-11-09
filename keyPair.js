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
    const hash = crypto.createHash('sha256').update(number.toString()).digest('hex');
    publicKey.push(hash);
  }

  return publicKey;
}

const publicKey = genPublicKey('random_pairs.json');
console.log(publicKey);