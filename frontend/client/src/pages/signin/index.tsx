import React, { 
  useState
} from 'react';
import { 
  Link, 
  useNavigate
} from "react-router-dom";
import { useSigninMutation } from '../../redux/services/authServices';
import { SigninUser } from '../../interfaces';
import { 
  Center, 
  Container, 
  Text,
  Box,
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  Divider,
  useToast
} from "@chakra-ui/react";

const INITIAL_FORM_STATE: SigninUser = {
  emailAddress: "",
  password: "",
}

const Signin = () => {
  const [ formState, setFormState ] = useState<SigninUser>(INITIAL_FORM_STATE);
  const [ signin ] = useSigninMutation();
  const [ showPassword, setShowPassword ] = useState<Boolean>(false);
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

  const handleSigninWithGoogle = () => {

  }

  const handleSigninWithEmail = async () => {
    try {
      const userData = await signin(formState).unwrap();
      const token = userData.token;
      const user = userData.user;
      if (token && user) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        showToast("Successful login", "success");
        navigate("/");
        setFormState(INITIAL_FORM_STATE);
      }
    } catch(err: any) {
      if (!err.originalStatus) {
        showToast("Incorrect credentials", "error");
      } else if (err.originalStatus === 400) {
        showToast("Missing Email or Password", "error");
      } else if (err.originalStatus === 401) {
        showToast("Unauthorized", "error");
      } else {
        showToast("Login failed", "error");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSigninWithEmail();
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
                  Sign in to your account
                </Text>
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
              </Stack>
              <Stack 
                spacing = { 10 }
                py = { 4 }
              >
                <Stack
                  direction = {{ base: 'column', sm: 'row' }}
                  align = {'start'}
                  justify = {'space-between'}
                  color = "white"
                  css = {{
                    "WebkitUserSelect": "none",
                    "msUserSelect": "none",
                    "userSelectg": "none",
                  }}
                >
                  <Checkbox>
                    Remember me
                  </Checkbox>
                  <Link to = {'/forgotpassword'}>
                    <Text color = "blue.200">
                      Forgot password?
                    </Text>
                  </Link>
                </Stack>
              </Stack>
              <Button
                w = "full"
                bg = "#E6613E"
                color = "white"
                _hover = {{
                  bg: "#d44f2e"
                }}
                type = "submit"
              >
                Sign in
              </Button>
              <Stack 
                spacing = { 3 }
                py = { 2 }
              >
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
                      Don't have an account?
                    </Text>
                    <Link to = {'/signup'}>
                      <Text
                        _hover = {{ 
                          color: "#E6613E"
                        }}
                      >
                        Sign up
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

export default Signin;