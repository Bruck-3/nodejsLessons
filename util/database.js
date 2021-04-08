const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://bruck:gj1BwxL22NDDMgDZ@cluster0.5dpa3.mongodb.net/shop?retryWrites=true&w=majority";
const dbname = "shop";
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect ( url, 
    { useUnifiedTopology: true })
    .then((client) => {
      // this the database connection response
      console.log('Connected')
      _db = client.db(dbname);
      callback();
    })
    .catch((err) => {
      throw err;
    });
};

const getDatabase = () => {
  if (_db) {
    return _db;
  }
  throw "Not Connected to a DB";
};

exports.mongoConnect = mongoConnect;
exports.getDatabase = getDatabase;
