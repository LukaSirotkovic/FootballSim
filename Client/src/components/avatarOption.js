import React from 'react';
import { Avatar, IconButton, Box, useColorModeValue } from '@chakra-ui/react';

const AvatarOption = ({ src, isActive, onClick }) => {

  const avatarBgColor = useColorModeValue('blue.300', 'blue.600');
  const hoverBgColor = useColorModeValue('blue.400', 'blue.700');
  const activeBgColor = useColorModeValue('green.400', 'green.600');

  return (
    <IconButton
      size="lg"
      bg={avatarBgColor}
      _hover={{
        bg: hoverBgColor
      }}

      icon={
        <Box position="relative" >
          <Avatar size="md" src={src} />
        </Box>
      }
      onClick={onClick}
    />
  );
};

export default AvatarOption;