let aesjs = require('aes-js');
let pbkdf2 = require('pbkdf2');
// Hex to Bytes
export let decryptKeyCBC = (password, studyKey, iv, salt) => {
    let studyKeyBytes = aesjs.utils.hex.toBytes(studyKey); // correct

// Salt to a Buffer
    let bitSalt = aesjs.utils.hex.toBytes(salt); // correct
    let initVector = aesjs.utils.hex.toBytes(iv); // correct
    let buffSalt = Buffer.from(bitSalt);
    let buffInitVector = Buffer.from(initVector);


// // The cipher-block chaining mode of operation maintains internal
// // state, so to decrypt a new instance must be instantiated.
    let derivedKey_k2 = pbkdf2.pbkdf2Sync(password, buffSalt, 2300, 16, 'sha512');
//
    let aesCbc = new aesjs.ModeOfOperation.cbc(derivedKey_k2, buffInitVector);
    let decryptedBytes = aesCbc.decrypt(studyKeyBytes);
//
// Convert our bytes back into text
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}