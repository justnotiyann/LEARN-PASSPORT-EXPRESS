require("dotenv").config();
const { MONGODB_URL, SALT } = process.env;

module.exports = {
    MONGODB_URL,
    SALT,
};
