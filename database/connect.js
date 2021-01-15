const mongoose = require('mongoose');
const { NODE_ENV, dbURI, dbURI_DEPLOYMENT } = process.env

module.exports = async () => {
  try {
    await mongoose.connect(NODE_ENV === "development" ? dbURI : dbURI_DEPLOYMENT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
};
