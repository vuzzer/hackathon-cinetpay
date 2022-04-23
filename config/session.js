const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');
const dotenv = require('dotenv')

dotenv.config()

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.NODE_ENV ==='production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/',
    databaseName: 'online-shop',
    collection: 'sessions'
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;