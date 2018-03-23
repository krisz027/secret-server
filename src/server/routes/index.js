const secretRoutes = require('./SecretRoutes');

module.exports = function(app, db) {
    secretRoutes(app, db);
};