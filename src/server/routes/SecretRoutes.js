module.exports = function(app, db) {
    let secretDao =             require('./../dao/SecretDao');
    let secretValidation =      require('./../utils/SecretValidation');
    let secretModelBuilder =    require('./../utils/SecretModelBuilder');
    let responseHandler =       require('./../utils/ResponseHandler');

    app.post('/secret', (req, res) => {
        if(secretValidation.isValidCreationModel(req.body)) {
            secretDao.insertSecret(db, secretModelBuilder.buildSecretModel(req.body))
                .then((result) => {
                    delete result.ops[0]._id;
                    responseHandler.sendResponse(res, 200, result.ops[0], null);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            responseHandler.sendResponse(res, 405, null, "Invalid input");
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
                    responseHandler.sendResponse(res, 200, result, null);
                } else {
                    responseHandler.sendResponse(res, 404, null, "Secret not found");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
};