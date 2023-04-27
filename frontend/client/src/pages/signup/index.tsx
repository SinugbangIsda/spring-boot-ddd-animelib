import React, {
  useState
} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from '../../redux/services/authServices';
import { 
  Box, 
  Button, 
  Center, 
  Container, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Stack, 
  Text, 
  useToast 
} from '@chakra-ui/react';
import { SignupUser } from '../../interfaces';

const INITIAL_FORM_STATE: SignupUser = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
}

const Signup = () => {
  const [ formState, setFormState ] = useState<SignupUser>(INITIAL_FORM_STATE);
  const [ showPassword, setShowPassword ] = useState<Boolean>(false);
  const [ signup ] = useSignupMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const showToast = (title: string, status: "error"| "info" | "success"| "loading") => {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true
    });
  };

  const handleSignupWithEmail = async () => {
    try {
      await signup({ ...formState, role: "user" }).unwrap();
      navigate("/signin");
      setFormState(INITIAL_FORM_STATE);
      showToast("Successful registration", "success")
    } catch(err:any) {
      if (!err.originalStatus) {
        showToast("No Server Response", "error");
      } else if (err.originalStatus === 400) {
        showToast("Missing fields", "error");
      } else if (err.originalStatus === 401) {
        showToast("Unauthorized", "error");
      } else {
        showToast("Register failed", "error");
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignupWithEmail();
  }
  
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
              css = {{
                "WebkitUserSelect": "none",
                "msUserSelect": "none",
                "userSelectg": "none",
              }}
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
                <Text 
                  fontSize = "2xl" 
                  color = "white" 
                  align = "center"
                  as = "b"
                >
                  Create an account
                </Text>
                <Flex 
                  align = "center"
                  direction = {{ base: 'column', sm: 'row' }}
                >
                  <FormControl 
                    id = "firstName" 
                    color = "white"
                    isRequired
                    mr = { 2 }
                  >
                    <FormLabel>
                      First Name
                    </FormLabel>
                    <Input 
                      autoComplete = "off"
                      type = "text"
                      placeholder = "James"
                      bg = "#25262B"
                      border = "1px"
                      borderColor = "#383a40"
                      value = { formState.firstName }
                      onChange = {(e) => setFormState({
                        ...formState,
                        firstName: e.target.value
                      })}
                    />
                  </FormControl>
                  <FormControl 
                    id = "lastName" 
                    color = "white"
                    isRequired
                  >
                    <FormLabel>
                      Last Name
                    </FormLabel>
                    <Input 
                      autoComplete = "off"
                      type = "text"
                      placeholder = "Weed"
                      bg = "#25262B"
                      border = "1px"
                      borderColor = "#383a40"
                      value = { formState.lastName }
                      onChange = {(e) => setFormState({
                        ...formState,
                        lastName: e.target.value
                      })}
                    />
                  </FormControl>
                </Flex>
                <FormControl 
                  id = "emailAddress" 
                  color = "white"
                  isRequired
                >
                  <FormLabel>
                    Email Address
                  </FormLabel>
                  <Input 
                    autoComplete = "off"
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
                <FormControl 
                  id = "password" 
                  color = "white"
                  isRequired
                >
                  <FormLabel>
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      autoComplete = "off"
                      pr = "4.5rem"
                      type = { showPassword ? 'text' : 'password'}
                      placeholder = "********"
                      bg = "#25262B"
                      border = "1px"
                      borderColor = "#383a40"
                      value = { formState.password }
                      onChange = {(e) => setFormState({
                        ...formState,
                        password: e.target.value
                      })}
                    />
                    <InputRightElement width = "4.5rem">
                      <Button 
                        h = "1.75rem" 
                        size = "sm" 
                        bg = "#25262B"
                        border = "1px"
                        borderColor = "#383a40"
                        _hover = {{
                          bg: "#2F3035"
                        }}
                        onClick = {() => 
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          { showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
                  Sign up
                </Button>
                <Center>
                  <Flex
                    css = {{
                      "WebkitUserSelect": "none",
                      "msUserSelect": "none",
                      "userSelectg": "none",
                    }}
                    color = "gray.300"
                  >
                    <Text
                      mr = { 1 }
                    >
                      Already have an account?
                    </Text>
                    <Link to = {'/signin'}>
                      <Text
                        _hover = {{ 
                          color: "#E6613E"
                        }}
                      >
                        Sign in
                      </Text>
                    </Link>
                  </Flex>
                </Center>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Flex>
  )
}

export default Signup;
