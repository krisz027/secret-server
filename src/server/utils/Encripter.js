exports.encryptString = (value) => {
    let dbConfig       = require('./../../../res/config/db.config');
    let encrypter = new (require('encrypter'))(dbConfig.encryptionKey);
    return encrypter.encrypt(value);
};

exports.decryptString = (value) => {
    let dbConfig       = require('./../../../res/config/db.config');
    let encrypter = new (require('encrypter'))(dbConfig.encryptionKey);
    return encrypter.decrypt(value);
};