const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs')

const UsersSchema = new mongoose.Schema({
    email: String,
    password: String,
    google: {
        id: String,
        email: String,
        username: String,
        photos: String,
    },
});


UsersSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

const Users = mongoose.model("user", UsersSchema);

module.exports = Users;
