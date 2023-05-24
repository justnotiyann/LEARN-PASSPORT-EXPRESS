require("dotenv").config();
const { MONGODB_URL, CLIENT_ID, CLIENT_SECRET, CLIENT_CALLBACK } = process.env;

module.exports = {
    MONGODB_URL,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_CALLBACK
};
