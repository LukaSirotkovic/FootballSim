import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import {
  Container,
  Heading,
  VStack,
  HStack,
  Avatar,
  Box,
  Button,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import SettingsContent from '../components/SettingsContent'; // Create this component
import BracketsContent from '../components/BracketsContent';

const Profile = () => {
  const { user, login, signOut, loadingUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [avatarOptions, setAvatarOptions] = useState([]);
  const [activeSection, setActiveSection] = useState('settings');

  const boxBgColor = useColorModeValue('blue.400', 'blue.900');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, []);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Error loading user data.</p>;
  }

  return (

    <HStack spacing="0" justify="center" >
      <Box
        alignItems="top"
        h="calc(100vh - 68px)"
        color={textColor}
        bg={boxBgColor}
        p="4" 
        w={150}
        display="flex"
        flexDirection="column"

      >
        <VStack align="start" spacing="4" color={textColor}>
          <HStack gap='7' mb='10px'>

            <Avatar size="sm" name="User" src={user.avatar} />
            <Heading as='h3' size='sm' color={textColor}>{user.username}</Heading>
          </HStack>
          <Divider bg={textColor}/>
          <Button
            color={textColor}
            variant="link"
            onClick={() => setActiveSection('settings')}
          >
            Settings
          </Button>
          <Button
            color={textColor}
            variant="link"
            onClick={() => setActiveSection('brackets')}
          >
            Brackets
          </Button>
          <Button
            color={textColor}
            variant="link"
            onClick={signOut}
          >
            Logout
          </Button>
        </VStack>
      </Box>
      {activeSection === "settings" ? (<SettingsContent />) : (<BracketsContent />)}

    </HStack >
  );
};

export default Profile;