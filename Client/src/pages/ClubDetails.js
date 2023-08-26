import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Box, Image, Text, List, ListItem, VStack, HStack, Divider } from '@chakra-ui/react';

function ClubDetails() {
    const { clubId } = useParams(); // Get the club ID from the URL

    const [clubInfo, setClubInfo] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/competitors/${clubId}`)
            .then((response) => {
                setClubInfo(response.data);
            })
            .catch((error) => {
                console.error('Error fetching club details:', error);
            });
    }, [clubId]);

    if (!clubInfo) {
        return <div>Loading...</div>;
    }

    const { name, crest, country, founded, coach, squad, website, address, venue} = clubInfo;

    const positionOrder = ['Goalkeeper', 'Defence', 'Midfield', 'Offence'];

    const columns = [[], [], [], []];
    positionOrder.forEach((position, index) => {
        columns[index % 4].push(position);
    });

    return (
        <Box p={4} display="grid" gridTemplateColumns="1fr 3fr" gap={4} alignItems="start">

            
            <Box>
                <Image src={crest} alt={name} h="150px" mx="auto" />
                <VStack spacing={2}  align="center" >
                    <Text fontWeight="bold">{country}</Text>
                    <Text fontWeight="bold" fontSize="xl">
                        {name}
                    </Text>
                    <Text>Founded: {founded}</Text>
                    <Text>Coach: {coach.name || "this club curently doesn't have coach"}</Text>
                    <Text>Address: {address}</Text>
                    <Text>Venue: {venue}</Text>
                    <Text>Website: {website}</Text>
                    
                </VStack>
            </Box>

            <VStack spacing={10} align="start">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    {name}
                </Text>
                <HStack spacing={4} alignItems="flex-start">
                    {columns.map((columnPositions) => (
                        <VStack key={columnPositions[0]} align="start" h="100%">
                            {columnPositions.map((position) => (
                                <Box key={position}>
                                    <Divider />
                                    <Text fontSize="lg" fontWeight="bold">
                                        {position}s
                                    </Text>
                                    <List spacing={2} mt={2}>
                                        {squad
                                            .filter((player) => player.position === position)
                                            .map((player) => (
                                                <ListItem key={player.id}>{player.name}</ListItem>
                                            ))}
                                    </List>
                                </Box>
                            ))}
                        </VStack>
                    ))}
                </HStack>
            </VStack>
        </Box>
    );
}

export default ClubDetails;
