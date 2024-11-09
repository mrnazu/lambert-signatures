const fs = require('fs');

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