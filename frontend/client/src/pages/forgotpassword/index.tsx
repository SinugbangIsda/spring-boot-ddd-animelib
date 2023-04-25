import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle, IoIosArrowRoundBack } from "react-icons/all";
import { 
  Box, 
  Button, 
  Center, 
  Checkbox, 
  Container, 
  Divider, 
  Flex, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Stack,
  Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { UserForgotPassword } from '../../interfaces';

const INITIAL_FORM_STATE: UserForgotPassword = {
  emailAddress: ""
}

const ForgotPassword = () => {
  const [ formState, setFormState] = useState<UserForgotPassword>(INITIAL_FORM_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleForgotPassword();
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    console.log(formState);
  };

  return (
    <Flex
      minH = "100vh"
      align = "center"
      justify = "center"
      bg = "#141517"
    >
      <Container maxW = "lg">
        <Stack 
          spacing = { 4 } 
          mx = {'auto'} 
        >
          <Stack align = {'center'}>
            <Flex
              as = "b"
              fontSize = "3xl"
            >
              <Text color = "white">
                Anime
              </Text>
              <Text color = "#E6613E">
                Lib
              </Text>
            </Flex>
          </Stack>
          <Box
            rounded = "lg"
            bg = "#1A1B1E"
            boxShadow = "lg"
            border = "1px"
            borderColor = "#383a40"
            p = { 8 }
          >
            <form onSubmit = {(e) => handleSubmit(e)}>
              <Stack spacing = { 4 }>
                <FormControl 
                  id = "emailAddress" 
                  color = "white"
                  isRequired
                >
                  <FormLabel>
                    Email Address
                  </FormLabel>
                  <Input 
                    type = "email"
                    placeholder = "name@company.com"
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    value = { formState.emailAddress }
                    onChange = {(e) => setFormState({
                      ...formState,
                      emailAddress: e.target.value
                    })}
                  />
                </FormControl>
                <Button
                  w = "full"
                  bg = "#E6613E"
                  color = "white"
                  _hover = {{
                    bg: "#d44f2e"
                  }}
                  type = "submit"
                >
                  Submit
                </Button>
                <Link to = "/signin">
                  <Flex
                    align = "center"
                    color = "white"
                    _hover = {{
                      "textDecoration": "underline"
                    }}
                  >
                    <IoIosArrowRoundBack 
                      size = "1.5em"
                    />
                    <Text>
                      Go back to sign in
                    </Text>
                  </Flex>
                </Link>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Flex>
  )
}

export default ForgotPassword;