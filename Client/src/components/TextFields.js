import { FormControl, Input, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorIntoField } from "../utils";
import ErrorMessage from "./ErrorMessage";

const TextFields = ({ label, inputProps, control, name, errors }) => {
  const isPasswordInput = name === 'password' || name === 'confirmPassword';

  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...addErrorIntoField(errors[name])}
            required
            type={isPasswordInput ? 'password' : 'text'}
            inputProps={inputProps}
          />
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </FormControl>
  );
};

export default TextFields;
