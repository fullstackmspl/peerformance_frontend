let aesjs = require('aes-js');

// This will decrypt Key CTR
export let decryptDataCTR = (encryptedData, studyKey, iv) => {

    // Convert the study key to bytes
    let studyKeyBytes = aesjs.utils.utf8.toBytes(studyKey);
    let encryptedBytes_k1 = aesjs.utils.hex.toBytes(encryptedData); // correct
    let initVector = aesjs.utils.hex.toBytes(iv); // correct
    let buffInitVector = Buffer.from(initVector);
   
    let aesCbc = new aesjs.ModeOfOperation.ctr(studyKeyBytes, buffInitVector);
    let decryptedBytes = aesCbc.decrypt(encryptedBytes_k1);

// Convert our bytes back into text
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}