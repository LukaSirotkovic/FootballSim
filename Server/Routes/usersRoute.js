const express = require("express");
const User = require("../Models/usersModel");
const { getUsers, createUser } = require("../Controllers/usersController")
const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);


module.exports = router;