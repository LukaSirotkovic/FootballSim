const express = require("express");
const User = require("../Models/usersModel");
const { getUsers, createUser, validateLogIn, returnUser } = require("../Controllers/usersController")
const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/login', validateLogIn);

router.get(`/profile`, returnUser);

module.exports = router;