exports.sendResponse = (res, statusCode, secretData, message) => {
    let encrypter = require('./Encripter');
    if(statusCode === 200){
        let activeResponseType = getResponseType();
        let decryptedSecret = Object.assign({}, secretData, {secretText: encrypter.decryptString(secretData.secretText)});

        if(activeResponseType.key === "xml" ){
            decryptedSecret = buildXmlResponse(decryptedSecret);
        }
        res.header('Content-Type', activeResponseType.contentType);
        res.status(statusCode);
        res.send(decryptedSecret);
    } else {
        res.status(statusCode);
        res.send(message);
    }
};

function getResponseType() {
    if(process.env.RESP_TYPE){
        return {key: process.env.RESP_TYPE, contentType: process.env.RESP_CONTENT_TYPE};
    } else {
        let configReader = require('read-config');
        let responseConfig = configReader(__dirname + '/../../../res/config/response.config.json');
        return responseConfig.responseType.filter(item => item.active )[0];
    }
};

function buildXmlResponse(data) {
    let xml = require('xml');
    let convertableData = {
        Secret: [
            {hash: data.hash},
            {secretText: data.secretText},
            {createdAt: data.createdAt},
            {expiresAt: data.expiresAt},
            {remainingViews: data.remainingViews}
        ]};
    return xml(convertableData, {declaration: true, indent: true});
}