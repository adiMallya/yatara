const fs = require('fs');
const mongoose = require('mongoose');
const connectDatabase = require('./config/db');

const Restaurent = require('./models/restaurent.model');
const User = require('./models/user.model');

//Connect to DB
connectDatabase();

//Read data from files
const userData = JSON.parse(fs.readFileSync('./_data/users.json', 'utf-8'));
const restaurentData = JSON.parse(fs.readFileSync('./_data/restaurents.json', 'utf-8'));

//Import data
const importData = async () => {
  try {
    await User.create(userData);
    await Restaurent.create(restaurentData);

    console.log('Data imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}
//Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Restaurent.deleteMany();

    console.log("Data destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect()
  }
}

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}