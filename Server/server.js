const axios = require('axios');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const User = require("./Models/usersModel");
const cors = require('cors');
const app = express();

app.use(cors());

const uri = "mongodb+srv://lukasirotkovic5:jfreq38322@leaguesimdb.07fh6bm.mongodb.net/FootballLeagueSimDB?retryWrites=true&w=majority";

app.use(bodyParser.json());


app.get('/users', (req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error retrieving users' });
      });
  });
/*
app.get("/users/:id", async (req, res) => {
    try {

        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})*/
app.post('/users', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then((savedUser) => {
            res.json(savedUser);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error saving user' });
        });
});

mongoose.
    connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(5000, () => {
            console.log(`Node API app is running on port 5000`)

        });
    }).catch((error) => {
        console.log(error)
    })