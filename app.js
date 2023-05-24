require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// config
const { MONGODB_URL } = require("./app/config");

// Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(console.log("Connected to database"))
  .catch((e) => console.log(e.message));


// Our Api
const authApi = require('./app/api/auth/router')
const usersApi = require('./app/api/users/router')
const homeApi = require('./app/api/protected/home/router')
const errorHandlingMiddlware = require('./app/middleware/errorHandling')

app.use('/', homeApi)
app.use("/auth", authApi)
app.use('/users', usersApi)


app.use(errorHandlingMiddlware)
app.listen(port, () => console.log("Server up and running"));
