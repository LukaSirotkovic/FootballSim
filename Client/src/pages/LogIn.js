import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import trophyImage from "../images/champions.jpg"
export default function LogIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', {
        username: username,
        password: password,
      });

      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Redirect the user to the profile page or another authenticated route
      navigate("/profile");

      setError(null);
    } catch (error) {
      setError('Invalid credentials');
    }
  };


  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={{ base: 'xl', md: '2xl' }}>
            Sign in to your account
          </Heading>
          <FormControl id="email">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={{ base: 6, md: 8 }}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
            </Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleLogin}
              w={{ base: 'full', md: 'auto' }}
            >
              Sign in
            </Button>
            {error && <Text color="red">{error}</Text>}
            <Text mt={{ base: 2, md: 0 }}>
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="blue">
                Sign Up
              </Link>
            </Text>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          width={"100%"}
          src={trophyImage}
        />
      </Flex>
    </Stack>
  );
}