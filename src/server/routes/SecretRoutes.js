module.exports = function(app, db) {
    let secretDao = require('./../dao/SecretDao');
    let secretValidation = require('./../utils/SecretValidation');
    let secretModelBuilder = require('./../utils/SecretModelBuilder');

    app.post('/secret', (req, res) => {
        if(secretValidation.isValidCreationModel(req.body)) {
            secretDao.insertSecret(db, secretModelBuilder.buildSecretModel(req.body))
                .then((result) => {
                    res.status(200);
                    res.send(result.ops[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.status(405);
            res.send("Invalid input");
        }
    });

    app.get('/secret/:hash', (req, res) => {
        let query = {hash: req.params.hash};
        let projection = {projection: {_id: 0, hash: 1, secretText: 1, createdAt: 1, expiresAt: 1, remainingViews: 1}};
        secretDao.findSecretByHash(db, query, projection)
            .then((result) => {
                if(secretValidation.isValidSecretSearch(result)) {
                    let newRemainingViews = result.remainingViews - 1;
                    let update = {$set: {remainingViews: newRemainingViews}};
                    result.remainingViews = newRemainingViews;

                    secretDao.updateSecret(db, query, update)
                        .then(() => {
                            console.log("Update successful");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    res.status(200);
                    res.send(result);
                } else {
                    res.status(404);
                    res.send("Secret not found");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};