require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./Routes/usersRoute");
const competitorsRoute = require("./Routes/competitorsRoute");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoute); // Use single quotes consistently
app.use('/api/competitors', competitorsRoute); // Use single quotes consistently

mongoose
    .connect(MONGO_URL, {
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Add a global error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
