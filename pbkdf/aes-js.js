let aesjs = require('aes-js');
let pbkdf2 = require('pbkdf2');
let crypto;

try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}


//1. frond-end
let email = 'test@tes.co.uk';
let password = 'simplePassword';

//2. Send data to the backend

//3.
// a. Generate a random 128-bit key (k1), a random 128-bit IV, and a random salt (64 bits is probably sufficient).
let random_study_key_k1 = crypto.randomBytes(16); // 128bits = 16 byte
console.log("typeof- >", typeof random_study_key_k1)

// The initialization vector (must be 16 bytes)
let random_bit_salt = crypto.randomBytes(16); // 128bits = 16 byte

let random_IV = crypto.randomBytes(16); // 128bits = 16 byte

console.log(random_study_key_k1)
console.log('\n', random_bit_salt)
console.log('\n', random_IV)

// Step b -- k2
let derivedKey_k2 = pbkdf2.pbkdf2Sync(password, random_bit_salt, 2300, 16, 'sha512');
console.log('derivedKey', derivedKey_k2);

let aesCbc = new aesjs.ModeOfOperation.cbc(derivedKey_k2, random_IV);
//let textToByteTest = aesjs.utils.utf8.toBytes(random_study_key_k1);
// console.log("textToByteTest",textToByteTest)
let encryptedBytes = aesCbc.encrypt(random_study_key_k1);

// console.log("encryptedBytes", encryptedBytes);

// convert to the hex
let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
console.log(encryptedHex.length);

// Decryption ----------------------------------------------------------------------------------------------------
// When ready to decrypt the hex string, convert it back to bytes
console.log('Decryption');
encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex); // correct
console.log('encryptedBytes 2', encryptedBytes);

// The cipher-block chaining mode of operation maintains internal
// state, so to decrypt a new instance must be instantiated.
derivedKey_k2 = pbkdf2.pbkdf2Sync(password, random_bit_salt, 2300, 16, 'sha512');
console.log('derivedKey 2', derivedKey_k2);

aesCbc = new aesjs.ModeOfOperation.cbc(derivedKey_k2, random_IV);
let decryptedBytes = aesCbc.decrypt(encryptedBytes);
console.log('decryptedBytes', decryptedBytes);

// Convert our bytes back into text
let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
// "TextMustBe16Byte"


let decryptedBytesToHex = aesjs.utils.hex.fromBytes(decryptedBytes);
console.log(decryptedBytesToHex)


