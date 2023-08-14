import React from 'react';
import { FormProvider } from 'react-hook-form';
import RegisterForm from '../components/RegisterShema';

const Register = () => {
    return (
        <FormProvider>
            <RegisterForm />
        </FormProvider>
        );
};

export default Register;