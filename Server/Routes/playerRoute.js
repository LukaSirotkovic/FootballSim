
const express = require("express");
const { getPlayerInfo } = require("../Controllers/playerController")
const router = express.Router();

router.get('/:id', getPlayerInfo);


module.exports = router;