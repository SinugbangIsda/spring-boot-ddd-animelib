import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from '../../components/applayout';
import { IoIosArrowRoundBack } from "react-icons/all";
import { Anime, User } from '../../interfaces';
import { useCreateWatchlistMutation } from '../../redux/services/watchlistService';
import { useDeleteAnimeMutation, useGetAnimeByIdQuery, useUpdateAnimeMutation } from '../../redux/services/animeService';
import { getUserAndToken } from '../../redux/slices/authSlice';
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import AnimeMutationDrawer from '../../components/anime/drawer';
import AnimeMutationModal from '../../components/anime/modal';

const INITIAL_FORM_STATE_DRAWER: Anime = {
  title: "",
  altTitle: "",
  type: "",
  genre: "",
  status: "",
  episodes: 0,
  imageURI: "",
  synopsis: "",
};

const SelectedAnime = () => {
  const { animeId } = useParams();
  const id = parseInt(animeId?.valueOf() as string);
  const { user } = getUserAndToken();
  const userData: User = JSON.parse(user as string);
  const { data, isLoading, isError, refetch } = useGetAnimeByIdQuery({ animeId: id });
  const [ addToWatchlist ] = useCreateWatchlistMutation();
  const [ drawerFormState, setDrawerFormState ] = useState<Anime>(INITIAL_FORM_STATE_DRAWER);
  const drawer = useDisclosure();
  const modal = useDisclosure();
  const toast = useToast();

  const showToast = (title: string, status: "error"| "info" | "success"| "loading") => {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true
    });
  };

  useEffect(() => {
    if (data) {
      setDrawerFormState(data);
    }
  }, [data]);

  const handleAddToWatchlist = async () => {
    try { 
      await addToWatchlist({ userId: userData.id, animeId: id });
      showToast("Added to watchlist", "success");
    } catch(err: any) {
      if (!err.originalStatus) {
        showToast("No Server Response", "error");
      } else if (err.originalStatus === 400) {
        showToast("Missing fields", "error");
      } else if (err.originalStatus === 401) {
        showToast("Unauthorized", "error");
      } else {
        showToast("Something went wrong", "error");
      }
    }
  };

  return (
    <>
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
          <Flex direction = {{ base: 'column', sm: 'row' }}>
            <Image
              src = { data?.imageURI }
              alt = { data?.title }
              w = "11em"
              h = "15em"
              objectFit = "cover"
              mr = { 4 }
            />
            <Flex
              direction = "column"
              justify = "space-between"
            >
              <Text
                fontSize = "3xl"
                as = "b"
              >
                { data?.title }
              </Text>
              <Text
                fontSize = "lg"
                as = "i"
              >
                { data?.altTitle }
              </Text>
              <Text>
                Type: { data?.type }
              </Text>
              <Text>
                Genre: { data?.genre }
              </Text>
              <Text>
                Status: { data?.status }
              </Text>
              <Text>
                Episodes: { data?.episodes }
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Button
              bg = "#E6613E"
              color = "white"
              w = "11em"
              _hover = {{
                bg: "#d44f2e"
              }}
              onClick = { handleAddToWatchlist }
            >
              Add to Watchlist
            </Button>
            { userData.role === "admin" && (
              <Menu>
                <MenuButton 
                  as = { IconButton } 
                  color = "gray.600" 
                  bg = "gray.300"
                >
                  <SettingsIcon />
                </MenuButton>
                <MenuList
                  bg = "#1A1B1E"
                  border = "1px"
                  borderColor = "#383a40"
                  color = "white"
                >
                  <MenuItem 
                    bg = "transparent"
                    icon = { <EditIcon /> } 
                    onClick = { drawer.onOpen }
                    _hover = {{
                      bg: "#25262b"
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    bg = "transparent"
                    icon = { <DeleteIcon /> } 
                    onClick = { modal.onOpen }
                    _hover = {{
                      bg: "#25262b"
                    }}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Text
            fontSize = "2xl"
            as = "h1"
            fontWeight = "bold"
          >
            Synopsis
          </Text>
          <Divider />
          <Text>
            { data?.synopsis }
          </Text>
        </Stack>
      </AppLayout>
      <AnimeMutationDrawer
        isOpen = { drawer.isOpen }
        onClose = { drawer.onClose }
        data = { drawerFormState }
        header = "Edit Anime"
        refetch = { refetch }
      />
      <AnimeMutationModal
        isOpen = { modal.isOpen }
        onClose = { modal.onClose }
        header = "Delete Anime"
        animeId = { id }
        refetch = { refetch }
      />
    </>
  )
}
export default SelectedAnime;