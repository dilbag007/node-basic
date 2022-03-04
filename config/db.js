'use strict';
var mongoose  = require('mongoose');
var config    = require('./config');

const MONGODB = config.db.connString;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //process.exit(1);
  }
};

module.exports = connectDB;