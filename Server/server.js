require("dotenv").config();
const axios = require('axios');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./Routes/usersRoute")

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());

app.use(bodyParser.json());

app.use("/api/users", userRoute);

mongoose.
    connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`)

        });
    }).catch((error) => {
        console.log(error, "Server error")
    })