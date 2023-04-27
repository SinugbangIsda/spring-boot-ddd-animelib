import React from 'react';
import AppLayout from '../../components/applayout';
import { 
  AbsoluteCenter,
  Avatar,
  Box,
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
  const { firstName, lastName, emailAddress, role, imageURI } = userData;

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
                <Text fontSize = "md">
                  Back
                </Text>
              </Flex>
            </Link>
          </Flex>
          <Stack
            spacing = { 8 }
            color = "white"
            align = "center"
          >
            <Avatar
              size = "2xl"
              src = { userData.imageURI ? userData.imageURI : ""}
              name = { !userData.imageURI ? userData.firstName + ' ' + userData.lastName : ""}
              bg = { userData.imageURI ? 'transparent' : '#4f5e70'}
              color = { userData.imageURI ? 'transparent' : 'white' }
              css = {{
                "WebkitUserSelect": "none",
                "msUserSelect": "none",
                "userSelectg": "none",
              }}
            />
            <Stack 
              spacing = { 1 }
              align = "center"
            >
              <Text
                fontSize = "3xl"
                fontWeight = "bold"
              >
                Personal Info
              </Text>
              <Text>
                Info about you and your account
              </Text>
            </Stack>
            <Box
              border = "1px"
              borderColor = "#383a40"
              p = { 4 }
              rounded = "md"
              w = "full"
            >
              <Stack
                spacing = { 4 }
                color = "white"
              >
                <Flex
                  align = "center"
                  justify = "space-between"
                >
                  <Text
                    fontSize = "md"
                    fontWeight = "bold"
                  >
                    First Name
                  </Text>
                  <Text>
                    { firstName }
                  </Text>
                </Flex>
                <Flex
                  align = "center"
                  justify = "space-between"
                >
                  <Text
                    fontSize = "md"
                    fontWeight = "bold"
                  >
                    Last Name
                  </Text>
                  <Text>
                    { lastName }
                  </Text>
                </Flex>
                <Flex
                  align = "center"
                  justify = "space-between"
                >
                  <Text
                    fontSize = "md"
                    fontWeight = "bold"
                  >
                    Email
                  </Text>
                  <Text>
                    { emailAddress }
                  </Text>
                </Flex>
                <Flex
                  align = "center"
                  justify = "space-between"
                >
                  <Text
                    fontSize = "md"
                    fontWeight = "bold"
                  >
                    Role
                  </Text>
                  <Text textTransform = "capitalize">
                    AnimeLib { role }
                  </Text>
                </Flex>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </AppLayout>
  )
}

export default Profile;
