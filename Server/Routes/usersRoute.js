const express = require("express");
const User = require("../Models/usersModel");
const { getUsers, createUser, validateLogIn, returnUser, updateAccount, deleteAccount } = require("../Controllers/usersController")
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image data in memory
const upload = multer({ storage: storage });


router.post('/', createUser);

router.post('/login', validateLogIn);

router.get('/profile', returnUser);

router.delete('/deleteAccount/:id', deleteAccount)

router.put('/updateAccount/:id', updateAccount)

module.exports = router;