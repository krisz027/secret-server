exports.findSecretByHash = (db, query, projection) => {
    return db.collection('Secret').findOne(query, projection);
};

exports.insertSecret = (db, newSecret) => {
    return db.collection('Secret').insertOne(newSecret);
};

exports.updateSecret = (db, query, update) => {
    return db.collection('Secret').updateOne(query, update);
};