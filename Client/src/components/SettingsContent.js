import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import {
    Heading,
    VStack,
    HStack,
    Avatar,
    Box,
    Button,
    useColorModeValue,
    Input,
} from '@chakra-ui/react';
import AvatarOption from './avatarOption';

const avatars = [
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Precious&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Cali&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Abby&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Angel&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Harley&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Boots&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Charlie&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Gizmo&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Precious&hair=long,ponyTail&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Boo&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Tiger&hair=long,ponyTail&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
    'https://api.dicebear.com/6.x/miniavs/svg?seed=Charlie&hair=long,ponyTail&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4',
]

const SettingsContent = () => {

    const { user, login, signOut, loadingUser, updateUser } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [newUsername, setNewUsername] = useState('');

    const boxBgColor = useColorModeValue('blue.200', 'blue.700');
    const textColor = useColorModeValue('black', 'white');



    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`/api/users/deleteAccount/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                console.log('Account deleted successfully');
                signOut();

            } else {
                console.log('Account deletion failed');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`/api/users/updateAccount/${user._id}`, {
                userId: user._id,
                avatar: selectedAvatar,
                username: newUsername,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            // Handle success or error response
            if (response.status === 200) {
                updateUser(selectedAvatar, newUsername);
                console.log('Avatar updated successfully');
            } else {
                console.log('Avatar update failed');
            }
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
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
            <VStack spacing="6" align="start" color={textColor}>
                <Heading as="h2" size="lg">Edit Profile</Heading>
                <Heading as="h4" size="md">
                    Change avatar
                </Heading>


                <HStack spacing="2" w="50%" gap={3}>
                    {avatars.slice(0, Math.ceil(avatars.length / 2)).map((avatar) => (
                        <AvatarOption
                            key={avatar}
                            src={avatar}
                            isActive={true}
                            onClick={() => setSelectedAvatar(avatar)}
                        />
                    ))}
                </HStack>
                <HStack spacing="2" w="50%" gap={3}>
                    {avatars.slice(Math.ceil(avatars.length / 2)).map((avatar) => (
                        <AvatarOption
                            key={avatar}
                            src={avatar}
                            isActive={true}
                            onClick={() => setSelectedAvatar(avatar)}
                        />
                    ))}
                </HStack>


                <Heading as="h4" size="md">
                    Change username
                </Heading>
                <Box>
                    <Input
                        placeholder={user.username}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </Box>

                <Heading as='h4' size='md'>
                    Delete account
                </Heading>
                <Button
                    bg='red.500'
                    _hover={{
                        bg: 'red.700',
                    }}
                    onClick={handleDeleteAccount}
                >
                    Delete account
                </Button>
            </VStack>
            <VStack spacing="8" flex="1" ml='15px'>
                <Avatar size="3xl" name="User" src={selectedAvatar} />
                <Heading mt="-6" size="lg">{user.username}</Heading>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </VStack>
        </Box>
    );
};

export default SettingsContent;

