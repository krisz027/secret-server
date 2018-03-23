const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const dbConfig             = require('./../../res/config/db.config');

const app            = express();
const port = 8000;

app.use(express.static(__dirname +'./../../'));
app.use(bodyParser.urlencoded({
    extended: true
}));

MongoClient.connect(dbConfig.url, (err, dbClient) =>
{
    if(err){
        return console.log(err);
    }
    var db = dbClient.db("secret-db");
    require('./routes')(app, db);
    app.listen(port, () => {
        console.log('Server is running on ' + port);
    });
});