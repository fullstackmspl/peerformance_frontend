let aesjs = require('aes-js');
let pbkdf2 = require('pbkdf2');
// Hex to Bytes
export let encryptKey = (data, studyKey, iv) => {

    // data to bytes
    let dataBytes = aesjs.utils.utf8.toBytes(data);
    let textBytes = aesjs.utils.utf8.toBytes(studyKey);
    let buf_to_studyKey = Buffer.from(textBytes);
    let backToByte_IV = aesjs.utils.hex.toBytes(iv)
    let buf_to_IV = Buffer.from(backToByte_IV);
    let aesCbc = new aesjs.ModeOfOperation.ctr(buf_to_studyKey, buf_to_IV);
    let encryptedBytes_k1 = aesCbc.encrypt(dataBytes);

    // convert to the hex
    let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes_k1);

    return encryptedHex;
}