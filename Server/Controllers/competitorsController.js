const axios = require('axios');

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

const getCompetitors = async (req, res) => {

    try {
        const response = await axios.get('https://api.football-data.org//v4/competitions/CL/teams', {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from external API' });
    }
}


const postCompetitors = async (req, res) => {

}

const getClubInfo = async (req, res) => {
    try {
        const clubId = req.params.id;
        const response = await axios.get(`https://api.football-data.org//v4/teams/${clubId}`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching club details:', error);
        res.status(500).json({ error: 'An error occurred while fetching club details.' });
    }
}

module.exports = {
    getCompetitors,
    postCompetitors,
    getClubInfo,
}