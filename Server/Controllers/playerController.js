const axios = require('axios');

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const getPlayerInfo = async (req, res) => {
    try {
        const playerId = req.params.id;
        const response = await axios.get(`https://api.football-data.org//v4/persons/${playerId}`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        })
        const playerInfo = response.data;
        res.json(playerInfo);

    } catch (error) {
        console.error('Error fetching player details:', error);
        res.status(500).json({ error: 'An error occurred while fetching club details.' });
    }
}

module.exports = {
    getPlayerInfo,
}