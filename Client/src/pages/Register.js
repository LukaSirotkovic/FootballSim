import { Avatar, Box, Button, Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextFields from "../components/TextFields";
import CheckboxFields from "../components/CheckboxFields";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { pawdRegExp } from "../utils";
import axios from 'axios';

// create schema validation
const schema = yup.object({
    username: yup.string().required('Full Name is required'),
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').matches(pawdRegExp, 'Must Contain 8 Characters, at least one Uppercase and one Number'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
    privacy: yup.bool().oneOf([true], 'Field must be checked'),
});

const RegisterForm = () => {

    const { handleSubmit, reset, formState: { errors }, control } = useForm({
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
            const response = await axios.post("http://localhost:5000/api/users", data);
            console.log("User added:", response.data);
            reset();
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

            {/* Form */}
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
}

export default RegisterForm;