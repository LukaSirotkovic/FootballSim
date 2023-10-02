const express = require("express");
const { getCompetitors, postCompetitors, getClubInfo} = require("../Controllers/competitorsController")
const router = express.Router();

router.get('/', getCompetitors);

router.post("/", postCompetitors);

router.get('/:id', getClubInfo);


module.exports = router;