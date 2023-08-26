import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios'
const FootballBracket = () => {
/*
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    axios
      .get('/api/competitors')
      .then((response) => {
        const teams = response.data.teams.map((team) => {
          return {
            name: team.name,
            id: team.id,
            crest: team.crest,
          };
        });
        setClubs(teams)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const shuffledTeams = shuffleArray([...clubs]);
    const newMatches = [];

    for (let i = 0; i < 16; i++) {
      newMatches.push({
        team1: shuffledTeams[i * 2].name,
        team2: shuffledTeams[i * 2 + 1].name,
        winner: null,
      });
    }

    setMatches(newMatches);
  }, [clubs]);

  const handleWinnerSelect = (index, winner) => {
    const updatedMatches = [...matches];
    updatedMatches[index].winner = winner;
    setMatches(updatedMatches);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
*/
  return (
    <>
    </>
    /*
    <Box mt={8}>
      <Flex direction="row" justifyContent="space-between">
        <Flex direction="column" alignItems="center">
          {matches.slice(0, 8).map((match, index) => (
            <Flex key={index} alignItems="center" mb={4}>
              <Box
                bg="gray.100"
                p={2}
                borderRadius="md"
                w={`${150 + index * 20}px`}
                textAlign="center"
              >
                {match.team1}
              </Box>
              <Spacer />
              <Text>vs</Text>
              <Spacer />
              <Box
                bg="gray.100"
                p={2}
                borderRadius="md"
                w={`${150 + index * 20}px`}
                textAlign="center"
              >
                {match.team2}
              </Box>
              {match.winner !== null ? (
                <Text ml={4} fontWeight="bold">
                  Winner: {match.winner}
                </Text>
              ) : (
                <Stack direction="row" ml={4} spacing={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleWinnerSelect(index, match.team1)}
                  >
                    {match.team1}
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleWinnerSelect(index, match.team2)}
                  >
                    {match.team2}
                  </Button>
                </Stack>
              )}
            </Flex>
          ))}
        </Flex>
        <Flex direction="column" alignItems="center">
          {matches.slice(8).map((match, index) => (
            <Flex key={index} alignItems="center" mb={4}>
              <Box
                bg="gray.100"
                p={2}
                borderRadius="md"
                w={`${150 + index * 20}px`}
                textAlign="center"
              >
                {match.team1}
              </Box>
              <Spacer />
              <Text>vs</Text>
              <Spacer />
              <Box
                bg="gray.100"
                p={2}
                borderRadius="md"
                w={`${150 + index * 20}px`}
                textAlign="center"
              >
                {match.team2}
              </Box>
              {match.winner !== null ? (
                <Text ml={4} fontWeight="bold">
                  Winner: {match.winner}
                </Text>
              ) : (
                <Stack direction="row" ml={4} spacing={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleWinnerSelect(index + 8, match.team1)}
                  >
                    {match.team1}
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleWinnerSelect(index + 8, match.team2)}
                  >
                    {match.team2}
                  </Button>
                </Stack>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>*/
  );
};

export default FootballBracket;
