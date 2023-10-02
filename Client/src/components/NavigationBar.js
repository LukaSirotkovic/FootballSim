
import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
  TagRightIcon,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Links = ['Bracket', 'Clubs'];

const SyleLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="div"
      alignItems={'center'}
      px={3}
      py={3}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('blue.100', 'blue.700'),
      }}
    >
      {children}
    </Box>
  );
};

const CustomLink = ({ to, children, ...props }) => {

  return (
    <SyleLink {...props}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </SyleLink>
  );
};

export default function NavigationBar() {

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, signOut, login, loadingUser } = useAuth();

  const hoverBgColor = useColorModeValue('blue.200', 'blue.900');


  return (
    <>
      <Box bg={useColorModeValue('blue.300', 'blue.800')} px={6}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            alignItems={'center'}
            px={4}
            py={1}
            rounded={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            _hover={{
              bg: hoverBgColor,
            }}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as='strong'>FootballSim</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <CustomLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </CustomLink>
              ))}

            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} >
              <Button onClick={toggleColorMode}
                mt={1}
                variant="ghost"
                alignItems={'center'}
                px={4}
                py={1}
                rounded={'md'}
                _hover={{
                  bg: hoverBgColor,
                }}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!user && !loadingUser ? (
                <Button
                  as={'a'}
                  mt={1}
                  alignItems={'center'}
                  px={3}
                  py={1}
                  display={{ base: 'inline-flex' }}
                  color={'black'}
                  bg={'yellow.300'}
                  href={'/login'}
                  _hover={{
                    bg: 'yellow.400',
                    color: 'white',
                  }}>
                  Sign In
                </Button>


              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={user?.avatar}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={user?.avatar}
                      />
                    </Center>
                    <br />
                    <Center>
                      
                      <p>{user?.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>
                      <Link to="/profile">Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}

            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <CustomLink key={link} to={`/${link.toLowerCase()}`}>
                  {link}
                </CustomLink>
              ))}

            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
} 
