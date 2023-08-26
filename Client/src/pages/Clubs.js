import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, GridItem, Image, Text, useColorModeValue, Heading, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Make sure you have React Router set up

function Clubs() {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [competitionName, setCompetitionName] = useState();

  const boxBgColor = useColorModeValue('blue.200', 'blue.700')

  useEffect(() => {
    axios
      .get('/api/competitors')
      .then((response) => {
        const competition = response.data.competition.name;
        console.log(competition)
        const teams = response.data.teams.map((team) => {
          return {
            name: team.name,
            id: team.id,
            crest: team.crest,
          };
        });

        setClubs(teams);
        setCompetitionName(competition);
        console.log(teams)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box alignItems='center'>
      <Heading m={5}>
        <Center>
          {competitionName}
        </Center>
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} m='10px'>

        {clubs.map((club) => (
          <GridItem key={club.id}>
            <Link to={`/clubs/${club.id}`}>
              <Box
                p={4}
                bgColor={boxBgColor}
                borderWidth="1px"
                borderRadius="lg"
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{
                  boxShadow: 'lg',
                  transform: 'translateY(-5px)',
                }}
                h="200px" // Set a fixed height for the box
                overflow="hidden" // Hide overflow content
              >
                <Image src={club.crest} alt={club.name} h="120px" mx="auto" />
                <Text mt={2} textAlign="center" fontWeight="bold" noOfLines={2} textOverflow="ellipsis">
                  {club.name}
                </Text>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Clubs;
