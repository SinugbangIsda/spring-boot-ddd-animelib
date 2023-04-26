import React from 'react';
import AppLayout from '../../components/applayout';
import { 
  AbsoluteCenter,
  Avatar,
  Center,
  Flex,
  Stack,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getUserAndToken } from '../../redux/slices/authSlice';
import { User } from '../../interfaces';

const Profile = () => {
  const { user } = getUserAndToken();
  const userData: User = JSON.parse((user) as string);
  const { id, firstName, lastName, emailAddress, role, imageURI } = userData;

  return (
    <AppLayout>
        <Stack
          spacing = { 4 }
          p = { 4 }
          color = "white"
        >
          <Flex color = "white">
            <Link to = "/">
              <Flex
                _hover = {{
                  "textDecoration": "underline"
                }}
              >
                <IoIosArrowRoundBack size = "1.5em" />
                <Text fontSize = "lg">
                  Back
                </Text>
              </Flex>
            </Link>
          </Flex>
          <Stack
            spacing = { 4 }
            color = "white"
            align = "center"
          >
            <Center>
              <Stack
                alignItems = "center"
                spacing = { 2 }
              >
                <Avatar
                  size = "2xl"
                  src = { imageURI ? imageURI : "" }
                  name = { userData.firstName + ' ' + userData.lastName }
                  bg = { userData.imageURI ? 'transparent' : '#4f5e70'}
                  color = { userData.imageURI ? 'transparent' : 'white' }
                />
                <Text 
                  fontSize = "4xl"
                  fontWeight = "semibold"
                >
                  { firstName } { lastName }
                </Text>
                <Text fontSize = "md">
                  { emailAddress }
                </Text>
                <Text 
                  fontSize = "md"
                  textTransform = "capitalize"
                >
                  AnimeLib { role }
                </Text>
              </Stack>
            </Center>
          </Stack>
        </Stack>
      </AppLayout>
  )
}

export default Profile;
