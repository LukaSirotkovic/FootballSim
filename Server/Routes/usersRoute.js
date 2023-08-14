const express = require("express");
const User = require("../Models/usersModel");
const { getUsers, createUser, checkUser } = require("../Controllers/usersController")
const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/logIn', checkUser);


module.exports = router;