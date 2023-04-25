import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minH = "100vh"
      align = "center"
      justify = "center"
      bg = "#141517"
    >
      <Box 
        textAlign = "center" 
        py = { 10 } 
        px = { 6 }
      >
        <Heading
          as = "h2"
          size = "2xl"
          bgGradient = "linear(to-r, teal.400, teal.600)"
          backgroundClip = "text"
        >
          404
        </Heading>
        <Text 
          fontSize = "18px" 
          mt = { 3 } 
          mb = { 2 }
          color = "white"
          as = "b"
        >
          Page Not Found
        </Text>

        <Text 
          color = {'gray.500'} 
          mb = { 6 }
        >
          The page you're looking for does not seem to exist
        </Text>

        <Button
          colorScheme = "teal"
          bgGradient = "linear(to-r, teal.400, teal.500, teal.600)"
          color = "white"
          variant = "solid"
          onClick = {() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  )
}

export default Error404;
