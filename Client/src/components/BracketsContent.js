import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Container, VStack, Box, Button, Heading, Select, useColorModeValue } from '@chakra-ui/react';

const BracketsContent = () => {
    const { user } = useAuth();
    const [selectedBracket, setSelectedBracket] = useState('');
    const [bracketOptions, setBracketOptions] = useState(user.brackets || []);

    const boxBgColor = useColorModeValue('blue.200', 'blue.700');
    const textColor = useColorModeValue('black', 'white');

    const handleBracketChange = (event) => {
        setSelectedBracket(event.target.value);
    };

    const handleSaveChanges = async () => {
        // Handle saving changes to the selected bracket
        console.log('Selected bracket:', selectedBracket);
    };

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
                        <option key={index} value={bracket}>
                            Bracket {index + 1}
                        </option>
                    ))}
                </Select>

                {/* Display the selected bracket's content here */}
                {/* For example, you could use a separate component */}
                {/* to render the bracket visualization */}

                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </VStack>


        </Box>
    );
};

export default BracketsContent;
