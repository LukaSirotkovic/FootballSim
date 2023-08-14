import { Box, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const ErrorMessage = ({ message }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="5px"
      mt="10px"
      color="red.500"
      fontSize="14px"
    >
      {message && <WarningIcon color="red.500" boxSize={4} />}
      <Text>{message}</Text>
    </Box>
  );
};

export default ErrorMessage;
