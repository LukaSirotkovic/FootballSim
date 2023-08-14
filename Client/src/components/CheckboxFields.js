import React from 'react';
import { Checkbox, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

const CheckboxFields = ({ name, errors, control }) => {
  return (
    <FormControl isInvalid={errors[name] !== undefined}>
      <FormLabel gap={5}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} size="lg" colorScheme="teal" marginRight="10px" />
          )}
        />
        I Agree to MyApp Terms and Privacy Policy
      </FormLabel>
      {errors[name] && (

        <ErrorMessage message={errors[name].message} />

      )}
    </FormControl>
  );
};

export default CheckboxFields;