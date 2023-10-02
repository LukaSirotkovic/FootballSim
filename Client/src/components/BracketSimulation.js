import React, { useState, useEffect } from 'react';
import { SingleEliminationBracket, Match, createTheme, SVGViewer } from "@g-loot/react-tournament-brackets";
import { shuffle, sample, pull, isEmpty, findIndex, set } from "lodash";
import { bigBracket } from './bigBracket';
import {
    Box,
    Button,
    Input,
    Heading,
    VStack,
    HStack,
    useToast
} from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import axios from 'axios';

function BracketSimulation({ teams, bracketId }) {
    const toast = useToast();
    const { user } = useAuth();
    const [allMatches, setAllMatches] = useState(bigBracket);
    const [isBracketCreated, setIsBracketCreated] = useState(false);
    const [bracketName, setBracketName] = useState('')

    useEffect(() => {
        if (bracketId === undefined) {
            if (isBracketCreated) {
                assignTeams();
            }
        }
        else{
            setIsBracketCreated(false);
            fetchBracketData();
        }
    }, [bracketId]);

    const fetchBracketData = async () => {
        try {
            // Fetch the bracket data by its bracketId
            const response = await axios.get(`/api/bracket/getBracketById/${bracketId}`);
           
            if (response.status === 200) {
                const { bracketName, allMatches } = response.data;

                // Set the bracketName and allMatches in the component's state
                setBracketName(bracketName);
                setAllMatches(allMatches);

                // Set isBracketCreated to true
                setIsBracketCreated(true);
            } else {
                console.error('Failed to fetch bracket data');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    const assignTeams = () => {
        const shuffledTeams = shuffle(teams);
        const copiedBracket = [...bigBracket];

        const roundOneMatches = copiedBracket.filter(match => match.tournamentRoundText === "1");

        roundOneMatches.forEach((match, index) => {
            const teamOne = sample(shuffledTeams);
            pull(shuffledTeams, teamOne);

            const teamTwo = sample(shuffledTeams);
            pull(shuffledTeams, teamTwo);

            match.participants = [
                {
                    id: teamOne?.id,
                    resultText: "TBA",
                    isWinner: false,
                    status: null,
                    name: teamOne?.shortName,
                    picture: teamOne?.crest
                },
                {
                    id: teamTwo?.id,
                    resultText: "TBA",
                    isWinner: false,
                    status: null,
                    name: teamTwo?.shortName,
                    picture: teamTwo?.crest
                }
            ];
        });

        setAllMatches(copiedBracket);
    };

    const checkLosers = () => {
        const updatedMatches = [...allMatches];

        // Iterate through all matches
        updatedMatches.forEach((match) => {
            if (isEmpty(match.participants) || match.state === "DONE") return;

            const { nextMatchId } = match;
            const nextMatchIdx = findIndex(updatedMatches, { id: nextMatchId });
            if (match.participants[0]?.isWinner) {
                set(match, "participants[1].resultText", "LOSE");
                updatedMatches[nextMatchIdx].participants.push({
                    ...match.participants[0],
                    isWinner: false,
                    resultText: "TBA"
                });
                match.state = "DONE";
            } else if (match.participants[1]?.isWinner) {
                set(match, "participants[0].resultText", "LOSE");
                updatedMatches[nextMatchIdx].participants.push({
                    ...match.participants[1],
                    isWinner: false,
                    resultText: "TBA"
                });
                match.state = "DONE";
            }

        });

        // Update the state with the modified matches
        setAllMatches(updatedMatches);
    };

    const onParticipantClick = (participant) => {
        console.log(participant)
        participant.isWinner = true;
        participant.resultText = "WIN";
        console.log(participant)
        console.log(allMatches)
        checkLosers();
    };

    const handleCreateBracket = () => {
        setIsBracketCreated(true);
    };

    const WhiteTheme = createTheme({
        matchBackground: { wonColor: 'blue', lostColor: 'red' },


        roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
        connectorColor: '#CED1F2',
        connectorColorHighlight: '#da96c6',
        svgBackground: '#1a202c',
    });

    const saveBracketData = () => {

        const userId = user?._id;
        // Send a POST request to your backend API to save bracketName and allMatches data to MongoDB
        axios.post(`/api/bracket/saveBracket`, { userId, bracketName, allMatches })
            .then(response => {
                if (response.status === 201) {
                    // Data saved successfully
                    toast({
                        title: 'Success',
                        description: 'Bracket data saved successfully.',
                        status: 'success',
                        duration: 3000, // Display for 3 seconds
                        isClosable: true,
                    });
                } else {
                    // Handle error if data saving fails
                    toast({
                        title: 'Error',
                        description: 'Failed to save bracket data.',
                        status: 'error',
                        duration: 3000, // Display for 3 seconds
                        isClosable: true,
                    });
                }
            })
            .catch(error => {
                // Handle network or other errors
                console.error('Error:', error);
                // Display an error toast
                toast({
                    title: 'Error',
                    description: 'An error occurred while saving bracket data.',
                    status: 'error',
                    duration: 3000, // Display for 3 seconds
                    isClosable: true,
                });
            });
    };


    return (

        <Box >
            {!isBracketCreated ? (
                <VStack align='left' m='5' p="3" >
                    <Input
                        width={['100%', '400px']}
                        type="text"
                        placeholder="Enter Bracket Name"
                        onChange={(e) => setBracketName(e.target.value)}
                        mb="2"
                    />
                    <Button
                        onClick={handleCreateBracket}
                        width={['100%', '200px']}
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        mt={4}
                    >
                        Create Bracket
                    </Button>
                </VStack>
            ) : (
                <Box mt="4">
                    <VStack align='center' mb='2'>
                        <Heading textAlign='center'>{bracketName}</Heading>
                        <Button
                            onClick={saveBracketData}
                            width={['100%', '200px']}
                            colorScheme="teal"
                            size="sm"
                            m='2'
                        >
                            Save bracket
                        </Button>
                    </VStack>

                    <SingleEliminationBracket
                        matches={allMatches}
                        matchComponent={Match}
                        onPartyClick={(participant) => onParticipantClick(participant)}
                        svgWrapper={({ children, ...props }) => (
                            <SVGViewer
                                background={WhiteTheme.svgBackground}
                                SVGBackground={WhiteTheme.svgBackground}
                                width={1500}
                                height={500}
                                {...props}>
                                {children}
                            </SVGViewer>
                        )}
                    />


                </Box>
            )}
        </Box>


    );

}

export default BracketSimulation;
