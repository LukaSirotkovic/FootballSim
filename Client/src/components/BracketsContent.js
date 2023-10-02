import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Box, Button, Heading, Select, useColorModeValue, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BracketsContent = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedBracket, setSelectedBracket] = useState('');
    const [bracketOptions, setBracketOptions] = useState([]);
    const boxBgColor = useColorModeValue('blue.200', 'blue.700');
    const textColor = useColorModeValue('black', 'white');

    const handleBracketChange = (event) => {
        setSelectedBracket(event.target.value);
    };



    const fetchBrackets = async () => {
        try {
            // Replace 'userId' with the actual user ID or criteria
            const userId = user._id;

            // Make a GET request to retrieve brackets associated with the user
            const response = await axios.get(`/api/bracket/getBracket/${userId}`);

            if (response.status === 200) {
                const { brackets } = response.data;

                // Set the retrieved brackets as options

                setBracketOptions(brackets);
            } else {
                // Handle the error if the request fails
                console.error('Failed to retrieve brackets');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    useEffect(() => {
        // Call fetchBrackets when the component mounts or when user data is available
        if (user) {
            fetchBrackets();
        }
    }, [user]);

    const editBracket = (selectedBracketId) => {
        navigate("/bracket/" + selectedBracketId);     
    }

    return (
        <Box
            w='700px'
            color={textColor}
            bg={boxBgColor}
            p="4"
            display="flex"
            alignItems="top"
            h="calc(100vh - 68px)"
        >
            <VStack spacing="6" align="start">
                <Heading as="h2" size="lg">
                    Your brackets
                </Heading>

                <Select
                    placeholder="Select a bracket"
                    value={selectedBracket}
                    onChange={handleBracketChange}
                >
                    {bracketOptions.map((bracket, index) => (
                        <option key={index} value={bracket._id}>
                            {bracket.bracketName}
                        </option>
                    ))}
                </Select>

                <Button onClick={() => { editBracket(selectedBracket) }}>Edit</Button>
            </VStack>
        </Box>
    );
};

export default BracketsContent;
