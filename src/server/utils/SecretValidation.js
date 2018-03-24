exports.isValidSecretSearch = (secret) => {
    return (secret &&
        secret.remainingViews > 0 &&
        new Date(secret.expiresAt).getTime() > new Date().getTime()
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