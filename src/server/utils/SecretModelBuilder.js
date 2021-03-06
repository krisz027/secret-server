exports.buildSecretModel = (requestBody) => {
    let uniqid =    require('uniqid');
    let encrypter = require('./Encripter');

    let id = uniqid();
    let currentDate = new Date();
    let expiresAt = new Date(currentDate.getTime());
    expiresAt.setMinutes(expiresAt.getMinutes() + Number(requestBody.expireAfter));
    return {
        _id: id,
        hash: id,
        secretText: encrypter.encryptString(requestBody.secretText),
        createdAt: currentDate.toISOString(),
        expiresAt: expiresAt.toISOString(),
        remainingViews: Number(requestBody.expireAfterViews)
    };
};