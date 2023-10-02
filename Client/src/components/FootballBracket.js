import React, { useState, useEffect } from 'react';
import { Box, Button, Flex,  Text, Image, HStack, VStack, useColorModeValue } from '@chakra-ui/react';

const FootballBracket = ({ teams }) => {
    const [matches, setMatches] = useState([]);

    const [roundTwoMatches, setRoundTwoMatches] = useState([]);
    const [roundThreeMatches, setRoundThreeMatches] = useState([]);
    const [roundFourMatches, setRoundFourMatches] = useState([]);
    const [roundFiveMatches, setRoundFiveMatches] = useState([]);

    const [round, setRound] = useState(0);

    const textColor = useColorModeValue("black", "white");
    const boxBgColor = useColorModeValue("blue.200", "blue.700");
    const boxHoverBgColor = useColorModeValue("blue.300", "blue.800");
    const boxChosenBgColor = useColorModeValue("green.200", "green.700");



    const generateMatches = () => {
        if (teams.length > 0 && !hasFetchedTeams) {
            const shuffledTeams = shuffleArray([...teams]);
            const newMatches = [];

            for (let i = 0; i < 16; i++) {
                newMatches.push({
                    team1: shuffledTeams[i * 2],
                    team2: shuffledTeams[i * 2 + 1],
                    winner: null,
                });
            }
            setRound(1);
            setMatches(newMatches);
            setHasFetchedTeams(true);
        }
    };

    const generateFazeTwo = () => {
        const fazeTwoMatches = [];
        for (let i = 0; i < matches.length; i += 2) {
            fazeTwoMatches.push({
                team1: matches[i]?.winner,
                team2: matches[i + 1]?.winner,
                winner: null,
            });
        }
        setRound(2);
        setRoundTwoMatches(fazeTwoMatches);
    };
    const generateFazeThree = () => {
        const fazeThreeMatches = [];
        for (let i = 0; i < roundTwoMatches.length; i += 2) {
            fazeThreeMatches.push({
                team1: roundTwoMatches[i]?.winner,
                team2: roundTwoMatches[i + 1]?.winner,
                winner: null,
            });
        }
        setRound(3);
        setRoundThreeMatches(fazeThreeMatches);
    };
    const generateFazeFour = () => {
        const fazeFourMatches = [];
        for (let i = 0; i < roundThreeMatches.length; i += 2) {
            fazeFourMatches.push({
                team1: roundThreeMatches[i]?.winner,
                team2: roundThreeMatches[i + 1]?.winner,
                winner: null,
            });
        }
        setRound(4);
        setRoundFourMatches(fazeFourMatches);
    };

    const generateFazeFive = () => {
        const fazeFiveMatches = [];
        for (let i = 0; i < roundFourMatches.length; i += 2) {
            fazeFiveMatches.push({
                team1: roundFourMatches[i]?.winner,
                team2: roundFourMatches[i + 1]?.winner,
                winner: null,
            });
        }
        setRound(5);
        setRoundFiveMatches(fazeFiveMatches);
    };

    const handleWinnerSelect = (index, winner) => {
        if (round >= 1) {
            if (matches[index]?.team1 && matches[index]?.team2) {
                const updatedMatches = [...matches];
                updatedMatches[index].winner = winner;
                setMatches(updatedMatches);
            }
        }
        if (round >= 2) {
            if (roundTwoMatches[index]?.team1 && roundTwoMatches[index]?.team2) {
                const updatedRoundTwo = [...roundTwoMatches];
                updatedRoundTwo[index].winner = winner;
                setRoundTwoMatches(updatedRoundTwo);
            }
        }
        if (round >= 3) {
            if (roundThreeMatches[index]?.team1 && roundThreeMatches[index]?.team2) {
                const updatedRoundThree = [...roundThreeMatches];
                updatedRoundThree[index].winner = winner;
                setRoundThreeMatches(updatedRoundThree);
            }
        }
        if (round >= 4) {
            if (roundFourMatches[index]?.team1 && roundFourMatches[index]?.team2) {
                const updatedRoundFour = [...roundFourMatches];
                updatedRoundFour[index].winner = winner;
                setRoundFourMatches(updatedRoundFour);
            }
        }
        if (round >= 5) {
            if (roundFiveMatches[index]?.team1 && roundFiveMatches[index]?.team2) {
                const updatedRoundFive = [...roundFiveMatches];
                updatedRoundFive[index].winner = winner;
                setRoundFiveMatches(updatedRoundFive);
            }
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (round === 1) {
            generateFazeTwo();
        } else if (round === 2) {
            generateFazeThree();
        } else if (round === 3) {
            generateFazeFour();
        } else if (round === 4) {
            generateFazeFive();
        }
    }, [matches, roundTwoMatches, roundThreeMatches, roundFourMatches, roundFiveMatches]);

    const MatchBox = ({ match, index }) => (
        <Flex key={index} direction="column" alignItems="center" mb={2}>
            {/* Box for Team 1 */}
            <Box
                w="100%"
                m="2px"
                bg={match?.winner === match?.team1 ? boxChosenBgColor : boxBgColor}
                borderRadius="md"
                textAlign="left"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => {
                    if (match?.winner === null) {
                        handleWinnerSelect(index, match.team1);
                    }
                }}
                _hover={
                    match?.winner === null ? { cursor: "pointer", bg: boxHoverBgColor } : {}
                }
            >
                <Flex align="center">
                    {match?.team1 && match.team1?.crest && (
                        <Image
                            h="30px"
                            src={match.team1?.crest}
                            alt={match.team1?.name}
                            mr={2}
                        />
                    )}
                    <Text color={textColor} fontSize="9px">
                        {match.team1?.shortName || match.team1?.name}
                    </Text>

                </Flex>

            </Box>

            <Box
                w="100%"
                m="2px"
                bg={match?.winner === match?.team2 ? boxChosenBgColor : boxBgColor}
                borderRadius="md"
                textAlign="left"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => {
                    if (match?.winner === null) {
                        handleWinnerSelect(index, match.team2);
                    }
                }}
                _hover={
                    match?.winner === null ? { cursor: "pointer", bg: boxHoverBgColor } : {}
                }
            >
                <Flex align="center">
                    {match.team2 && match.team2?.crest && (
                        <Image
                            h="30px"
                            src={match.team2?.crest}
                            alt={match.team2?.name}
                            mr={2}
                        />
                    )}
                    <Text color={textColor} fontSize="9px">
                        {match.team2?.shortName || match.team2?.name}
                    </Text>

                </Flex>



            </Box>
        </Flex>
    );



    return (
        <Box mt={8} m={5}>


            <Flex direction="row" gap={10}>
                {/* First Column: 16 matches */}
                <VStack>
                    <Button onClick={generateMatches}>Generate Matches</Button>
                    <VStack align='left'>
                        {matches.map((match, index) => (
                            <Box key={index}>
                                <MatchBox match={match} index={index} />
                                <Box mt='10px' />
                            </Box>
                        ))}
                    </VStack>
                </VStack>

                <VStack>

                    {/* Second Column: 8 matches */}


                    <VStack align='left'>
                        {roundTwoMatches.map((match, index) => (
                            <MatchBox key={index} match={match} index={index} />
                        ))}
                    </VStack>

                </VStack>


                {/* Third Column: 4 matches */}
                <VStack>



                    <VStack align='left'>
                        {roundThreeMatches.map((match, index) => (
                            <MatchBox key={index} match={match} index={index} />
                        ))}
                    </VStack>


                </VStack>
                {/* Fourth Column: 2 matches */}
                <VStack>


                    <VStack align='left'>
                        {roundFourMatches.map((match, index) => (
                            <MatchBox key={index} match={match} index={index} />
                        ))}
                    </VStack>

                </VStack>

                <VStack>


                    <VStack align='left'>
                        {roundFiveMatches.map((match, index) => (
                            <MatchBox key={index} match={match} index={index} />
                        ))}
                    </VStack>

                </VStack>
            </Flex>
        </Box>
    );
};

export default FootballBracket;
