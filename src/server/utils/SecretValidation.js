exports.isValidSecretSearch = (secret) => {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    return (secret &&
        secret.remainingViews > 0 &&
        new Date(secret.expiresAt).getTime() > now
    );
};

exports.isValidCreationModel = (requestBody) => {
    return (requestBody &&
        requestBody.secretText &&
        requestBody.expireAfter &&
        requestBody.expireAfterViews &&
        typeof requestBody.secretText === "string" &&
        !isNaN(Number(requestBody.expireAfterViews)) &&
        !isNaN(Number(requestBody.expireAfter)) &&
        Number(requestBody.expireAfterViews) > 0 &&
        Number(requestBody.expireAfter) >= 0
    );
};