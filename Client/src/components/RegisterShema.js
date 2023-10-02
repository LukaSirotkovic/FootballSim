import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { LockIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { pawdRegExp } from "../utils";
import axios from 'axios';
import CheckboxFields from './CheckboxFields'
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';
// create schema validation
const schema = yup.object({
    username: yup.string().required('Full Name is required'),
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').matches(pawdRegExp, 'Must Contain 8 Characters, at least one Uppercase and one Number'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
    privacy: yup.bool().oneOf([true], 'Field must be checked'),
});

const RegisterForm = () => {

    const navigate = useNavigate();
    const formBgColor = useColorModeValue('gray.200', 'gray.700');
    const toast = useToast();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            privacy: false
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/users", data);
            console.log("User added:", response.data);
            reset();
            navigate("/login");
            
            toast({
                title: "Registration Successful",
                description: "You have successfully registered.",
                status: "success",
                duration: 5000, // How long the toast should be displayed (in milliseconds)
                isClosable: true, // Whether the user can close the toast manually
            });

        } catch (error) {
            if (error.response && error.response.status === 400) {

                const errorMessage = "Username or email are already in use. Please try again.";
                yup.reach(schema, error.response.data.error.field).validate(null, { abortEarly: false }).catch(err => {
                    throw new yup.ValidationError(errorMessage, null, error.response.data.error.field);


                });
            } else {
                console.error("Error adding user:", error);
            }
        }
    };

    return (
        <Center minH={'100vh'} mt="10px" >
            <Box
                bg={formBgColor}
                p={8}
                maxWidth={{ base: '100%', md: 'md' }}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Avatar bg="teal.500" icon={<LockIcon />} />
                <Text as="h1" fontSize="xl" mt={4}>Sign up</Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4} mt={4}>
                        <FormControl isInvalid={errors.username}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                {...register('username')}
                            />
                            <ErrorMessage message={errors.username?.message} />
                        </FormControl>

                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="text"
                                {...register('email')}
                            />
                            <ErrorMessage message={errors.email?.message} />
                        </FormControl>

                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                {...register('password')}
                            />
                            <ErrorMessage message={errors.password?.message} />
                        </FormControl>
                        <FormControl isInvalid={errors.confirmPassword}>
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                                type="password"
                                {...register('confirmPassword')}
                            />
                            <ErrorMessage message={errors.confirmPassword?.message} />
                        </FormControl>

                        <FormControl isInvalid={errors.privacy}>
                            <CheckboxFields name='privacy' errors={errors} control={control} />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="teal"
                            size="lg"
                            mt={4}
                            isLoading={isSubmitting}
                        >
                            Sign up
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Center>
    );
}

export default RegisterForm;


/*
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <HowToRegIcon />
            </Avatar>
            <Typography component='h1'>Sign up</Typography>
 
            
            <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: 500,
                    mt: '2rem',
                    p: '2rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            >
                <TextFields errors={errors} control={control} name='username' label='Username' />
                <TextFields errors={errors} control={control} name='email' label='Email' />
                <TextFields errors={errors} control={control} name='password' label='Password' />
                <TextFields errors={errors} control={control} name='confirmPassword' label='Confirm Password' />
                <CheckboxFields errors={errors} control={control} name='privacy' />
 
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign up
                </Button>
            </Box>
        </Box>
    );
}*/