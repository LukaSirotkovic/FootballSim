import React, { useState, useEffect } from 'react';
import BracketSimulation from '../components/BracketSimulation'; // Import the component
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Bracket() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const bracketId = params.id
  useEffect(() => {
    if(bracketId === undefined) {
    axios
      .get('/api/competitors')
      .then((response) => {
        const competition = response.data.competition.name;
        const clubs = response.data.teams.map((team) => {
          return {
            name: team.name,
            shortName: team.shortName,
            id: team.id,
            crest: team.crest,
          };
        });

        setTeams(clubs);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [bracketId]);

  return (
    <div >
       <BracketSimulation teams={teams} bracketId={bracketId} />
      {/* {loading ? (
        <p>Loading...</p>
      ) : teams.length > 0 ? (
       
      ) : (
        <p>No teams available.</p>
      )} */}
    </div>

  );
}

export default Bracket;
