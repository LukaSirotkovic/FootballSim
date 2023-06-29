const axios = require('axios');
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://lukasirotkovic5:jfreq38322@leaguesimdb.07fh6bm.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDb");
    } catch (error) {
        concole.error(error);
    }
};
connect();

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userTree"] })
})

app.listen(5000, () => {
    console.log("server started on port 5000")
})


