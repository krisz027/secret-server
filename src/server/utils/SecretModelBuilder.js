exports.buildSecretModel = (requestBody) => {
    let uniqid = require('uniqid');
    let id = uniqid();
    let createdAt = new Date();
    createdAt.setMinutes(createdAt.getMinutes() - createdAt.getTimezoneOffset());
    let expiresAt = new Date(createdAt.getTime());
    expiresAt.setMinutes(expiresAt.getMinutes() + Number(requestBody.expireAfter));

    return {
        _id: id,
        hash: id,
        secretText: requestBody.secretText,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        remainingViews: Number(requestBody.expireAfterViews)
    };
};