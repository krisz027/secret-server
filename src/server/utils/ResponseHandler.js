exports.sendResponse = (res, statusCode, secretData, message) => {
    if(statusCode === 200){
        let activeResponseType = getResponseType();

        if(activeResponseType.key === "xml" ){
            secretData = buildXmlResponse(secretData);
        }
        res.header('Content-Type', activeResponseType.contentType);
        res.status(statusCode);
        res.send(secretData);
    } else {
        res.status(statusCode);
        res.send(message);
    }
};

function getResponseType() {
    let configReader = require('read-config');
    let responseConfig = configReader(__dirname + '/../../../res/config/response.config.json');
    return responseConfig.responseType.filter(item => item.active )[0];
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