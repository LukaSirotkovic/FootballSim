const express = require("express");
const { getBracket, postBracket, getBracketById} = require("../Controllers/bracketController")
const router = express.Router();

router.get('/getBracket/:userId', getBracket);

router.post('/saveBracket', postBracket);

router.get('/getBracketById/:bracketId', getBracketById);

module.exports = router;