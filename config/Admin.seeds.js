const { Admin } = require("../models");
const bcrypt = require('bcrypt');
// DB Config
require("dotenv").config();
require('../database/connect')();

const password = async () => {
  const hashPassword = await bcrypt.hash("bitezooo", 10);
  const newAdmin =  new Admin({
    fullName: "Bitezoo Admin",
    profilePicture: "",
    type: "Admin:Super",
    email: "bitezoo.official@gmail.com",
    password: hashPassword,
    validated: true,
  });

  newAdmin
  .save()
  .then((user) => {
      console.log(user);
      process.exit(0);
  })
  .catch((err) => console.log(err));
}

password();
