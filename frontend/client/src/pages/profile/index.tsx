import React from 'react';
import AppLayout from '../../components/applayout';
import { 
  Avatar,
  Box,
  Flex,
  Stack,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getUserAndToken } from '../../redux/slices/authSlice';
import { User } from '../../interfaces';

const Profile = () => {
  const { user } = getUserAndToken();
  const userData: User = JSON.parse((user) as string);
  const { firstName, lastName, emailAddress, role, imageURI } = userData;
  const navigate = useNavigate();

  return (
    <AppLayout>
        <Stack
          spacing = { 4 }
          p = { 4 }
          color = "white"
        >
          <Flex color = "white">
            <Flex
              onClick = {() => navigate(-1)}
              _hover = {{
                "textDecoration": "underline",
                "cursor": "pointer"
              }}
            >
              <IoIosArrowRoundBack size = "1.5em" />
              <Text fontSize = "md">
                Back
              </Text>
            </Flex>
          </Flex>
          <Stack
            spacing = { 8 }
            color = "white"
            align = "center"
          >
            <Avatar
              size = "2xl"
              src = { imageURI ? imageURI : ""}
              name = { !imageURI ? firstName + ' ' + lastName : ""}
              bg = { imageURI ? 'transparent' : '#4f5e70'}
              color = { imageURI ? 'transparent' : 'white' }
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
