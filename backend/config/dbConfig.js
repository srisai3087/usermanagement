const mongoose = require('mongoose');
require('dotenv').config();

const db_connection_url = process.env.DB_URL.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

const connectToDB = () => {
  try {
    mongoose.connect(db_connection_url);
    console.log('------------DB connected successful--------------');
  } catch (error) {
    console.log('------------Error connecting to DB---------------');
    console.log(error.message);
  }
};

module.exports = connectToDB();
