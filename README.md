# Problem Set 1: Hash-based Signature Schemes
In the first part of this problem set, I’ll implement Lamport signatures. In the second part, I’ll take advantage of incorrect usage to forge signatures.

## Part 1
In this problem set, I will build a hash-based signature system: https://en.wikipedia.org/wiki/Lamport_signature

Implement the `genRandomNum()`, `genPublicKey()` functions in nodejs. `sign()` and `verify()` functions as well.

Hint: I will need to look at the bits in each byte in a hash. I can use bit operators in order to do so.