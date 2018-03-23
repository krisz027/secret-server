module.exports = function(app, db) {
    app.post('/secret', (req, res) => {
        console.log(req.body);
        if(isValid(req)) {
            console.log(req.body);
            db.collection('Secret').insertOne(buildSecretModel(req), (err, result) => {
                if (err) {
                    res.send('An error has occurred');
                } else {
                    res.status(200);
                    res.send(result.ops[0]);
                }
            });
        } else {
            res.status(405);
            res.send("Invalid input");
        }
    });
};

function isValid(req){
    return (req.body &&
            req.body.secretText &&
            req.body.expireAfter &&
            req.body.expireAfterViews &&
            typeof req.body.secretText === "string" &&
            !isNaN(Number(req.body.expireAfterViews)) &&
            !isNaN(Number(req.body.expireAfter)) &&
            Number(req.body.expireAfterViews) > 0 &&
            Number(req.body.expireAfter) >= 0
        );
}

function buildSecretModel(req){
    var uniqid = require('uniqid');
    var id = uniqid();
    var createdAt = new Date();
    createdAt.setMinutes(createdAt.getMinutes() - createdAt.getTimezoneOffset());
    var expiresAt = new Date(createdAt.getTime());
    expiresAt.setMinutes(expiresAt.getMinutes() + Number(req.body.expireAfter));

    return {
        _id: id,
        hash: id,
        secretText: req.body.secretText,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        remainingViews: Number(req.body.expireAfterViews)
    };
}