import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Image,
    Text,
    List,
    ListItem,
    VStack,
    HStack,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

function ClubDetails() {
    const { clubId } = useParams(); // Get the club ID from the URL

    const [clubInfo, setClubInfo] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerInfo, setPlayerInfo] = useState(null);

    const bgColor = useColorModeValue('blue.200', 'blue.700');

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

    const openPlayerModal = async (player) => {
        setSelectedPlayer(player);
        try {
            const response = await axios.get(`/api/players/${player.id}`);
            setPlayerInfo(response.data);
        } catch (error) {
            console.error('Error fetching player details:', error);
        }
    };

    const closePlayerModal = () => {
        setSelectedPlayer(null);
        setPlayerInfo(null);
    };

    if (!clubInfo) {
        return <div>Loading...</div>;
    }

    const { name, crest, country, founded, coach, squad, website, address, venue } = clubInfo;

    const positionOrder = ['Goalkeeper', 'Defence', 'Midfield', 'Offence'];

    const columns = [[], [], [], []];
    positionOrder.forEach((position, index) => {
        columns[index % 4].push(position);
    });

    return (
        <Box p={[2, 4, 6]} display="grid" gridTemplateColumns={['1fr', '1fr 3fr']} gap={4} alignItems="top">

            <Box>
                <Image src={crest} alt={name} h={['100px', '150px']} mx="auto" />
                <VStack spacing={2} align="center" justify="center">
                    <Text fontWeight="bold" fontSize={['lg', 'xl']}>
                        {country}
                    </Text>
                    <Text fontWeight="bold" fontSize={['xl', '2xl']}>
                        {name}
                    </Text>
                    <Text fontSize={['sm', 'md']}>Founded: {founded}</Text>
                    <Text fontSize={['sm', 'md']}>Coach: {coach.name || "This club currently doesn't have a coach"}</Text>
                    <Text fontSize={['sm', 'md']}>Address: {address}</Text>
                    <Text fontSize={['sm', 'md']}>Venue: {venue}</Text>
                    <Text fontSize={['sm', 'md']}>Website: {website}</Text>
                </VStack>
            </Box>

            <VStack spacing={[6, 10]} align={['center', 'start']}>
                <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight="bold" textAlign="center">
                    {name}
                </Text>
                <HStack spacing={[1, 2, 4]} alignItems="top" flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}>
                    {columns.map((columnPositions) => (
                        <VStack key={columnPositions[0]}  align="left" w={['100%','75%', '50%',  '25%']} mb={[4, 0]}fontSize={['xs', 'sm', 'md', 'lg',]}>
                            {columnPositions.map((position) => (
                                <Box key={position}>
                                    <Divider />
                                    <Text fontSize={['sm', 'md', 'lg']} fontWeight="bold" m={1} p={1}>
                                        {position}s
                                    </Text>
                                    <List spacing={2} mt={2}>
                                        {squad
                                            .filter((player) => player.position === position)
                                            .map((player) => (
                                                <ListItem
                                                    m={1}
                                                    p={1}
                                                    key={player.id}
                                                    onClick={() => openPlayerModal(player)}
                                                    _hover={{
                                                        cursor: 'pointer',
                                                        backgroundColor: bgColor,
                                                        borderRadius: '5px',
                                                    }}
                                                >
                                                    {player.name}
                                                </ListItem>
                                            ))}
                                    </List>
                                </Box>
                            ))}
                        </VStack>
                    ))}
                </HStack>
            </VStack>

            <Modal isOpen={selectedPlayer !== null} onClose={closePlayerModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedPlayer?.name}</ModalHeader>
                    <ModalBody>
                        {playerInfo ? (
                            <HStack spacing={4}>
                                <VStack align="start" spacing={2}>
                                    <Text>Date of Birth: {playerInfo?.dateOfBirth}</Text>
                                    <Text>Nationality: {playerInfo?.nationality}</Text>
                                    <Text>Position: {playerInfo?.position}</Text>
                                    <Text>Shirt Number: {playerInfo?.shirtNumber}</Text>
                                </VStack>
                                <VStack align="center">
                                    <Image size="md" h="120px" src={playerInfo?.currentTeam.crest} alt='crest'></Image>
                                    <Text>{playerInfo?.currentTeam.name}</Text>
                                </VStack>
                            </HStack>
                        ) : (
                            <Text>Loading player info...</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closePlayerModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ClubDetails;
