import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from '../../components/applayout';
import { IoIosArrowRoundBack } from "react-icons/all";
import { Anime, User } from '../../interfaces';
import { useCreateWatchlistMutation } from '../../redux/services/watchlistService';
import { useDeleteAnimeMutation, useGetAnimeByIdQuery, useUpdateAnimeMutation } from '../../redux/services/animeService';
import { getUserAndToken } from '../../redux/slices/authSlice';
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

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
  const [ updateAnime ] = useUpdateAnimeMutation();
  const [ deleteAnime ] = useDeleteAnimeMutation();
  const [ drawerFormState, setDrawerFormState ] = useState<Anime>(INITIAL_FORM_STATE_DRAWER);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modal = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const modalInitialRef = useRef(null);
  const modalFinalRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

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

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAnime(drawerFormState).unwrap();
      showToast("Anime updated", "success");
      refetch();
      onClose();
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

  const handleDeleteAnime = async () => {
    try {
      await deleteAnime({ animeId: id}).unwrap();
      showToast("Anime deleted", "success");
      navigate("/")
      modal.onClose();
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
            <>
              <IconButton
                aria-label = "Edit Anime"
                color = "gray.500"
                icon = { <EditIcon />}
                mx = { 2 }
                onClick = { onOpen }
              />
              <IconButton
                aria-label = "Delete Anime"
                color = "gray.500"
                icon = { <DeleteIcon />}
                onClick = { modal.onOpen }
              />
            </>
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
    <Drawer
        initialFocusRef = { initialRef }
        finalFocusRef = { finalRef }
        isOpen = { isOpen }
        onClose = { onClose }
      >
        <DrawerOverlay />
        <form onSubmit = { handleModalSubmit }>
          <DrawerContent
            bg = "#1A1B1E"
            boxShadow = "lg"
            border = "1px"
            borderColor = "#383a40"
            color = "white"
          >
            <DrawerHeader>
              Edit Anime Entry
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody 
              pb = { 4 }
              overflowY = "auto"
              css = {{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'white',
                  borderRadius: '24px',
                },
              }}
            >
              <Stack spacing = "4">
                <FormControl>
                  <FormLabel>
                    Anime Title
                  </FormLabel>
                  <Input 
                    ref = { initialRef } 
                    placeholder = 'Bleach' 
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    isRequired
                    value = { drawerFormState.title }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      title: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Alternative Title
                  </FormLabel>
                  <Input
                    placeholder = 'ブリーチ'
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    isRequired
                    value = { drawerFormState.altTitle }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      altTitle: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Type
                  </FormLabel>
                  <Select 
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    placeholder = "Select type"
                    isRequired
                    value = { drawerFormState.type }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      type: e.target.value
                    })}
                  >
                    <option value = "TV">
                      TV
                    </option>
                    <option value = "OVA">
                      OVA
                    </option>
                    <option value = "Movie">
                      Movie
                    </option>
                    <option value = "Special">
                      Special
                    </option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Genre
                  </FormLabel>
                  <Select 
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    placeholder = "Select genre"
                    isRequired
                    value = { drawerFormState.genre }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      genre: e.target.value
                    })}
                  >
                  <option value = "Action">
                      Action
                    </option>
                    <option value = "Adventure">
                      Adventure
                    </option>
                    <option value = "Comedy">
                      Comedy
                    </option>
                    <option value = "Drama">
                      Drama
                    </option>
                    <option value = "Fantasy">
                      Fantasy
                    </option>
                    <option value = "Horror">
                      Horror
                    </option>
                    <option value = "Mystery">
                      Mystery
                    </option>
                    <option value = "Psychological">
                      Psychological
                    </option>
                    <option value = "Romance">
                      Romance
                    </option>
                    <option value = "Sci-Fi">
                      Sci-Fi
                    </option>
                    <option value = "Slice of Life">
                      Slice of Life
                    </option>
                    <option value = "Supernatural">
                      Supernatural
                    </option>
                    <option value = "Shounen">
                      Shounen
                    </option>
                    <option value = "Shoujo">
                      Shoujo
                    </option>
                    <option value = "Seinen">
                      Seinen
                    </option>
                    <option value = "School">
                      School
                    </option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Episodes
                  </FormLabel>
                  <NumberInput 
                    border = "none"
                    defaultValue = { 0 }
                    min = { 1 }
                    isRequired
                    value = { drawerFormState.episodes }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      episodes: parseInt(e)
                    })}
                  >
                    <NumberInputField 
                      bg = "#25262B"
                      border = "1px"
                      borderColor = "#383a40"
                    />
                    <NumberInputStepper
                      color = "white"
                      bg = "transparent"
                      border = "none"
                      borderColor = "#383a40"
                    >
                      <NumberIncrementStepper 
                        color = "white"
                        bg = "#25262B"
                        border = "1px"
                        borderColor = "#383a40"
                      />
                      <NumberDecrementStepper 
                        color = "white"
                        bg = "#25262B"
                        border = "1px"
                        borderColor = "#383a40"
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Status
                  </FormLabel>
                  <Select 
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    placeholder = "Select status"
                    isRequired
                    value = { drawerFormState.status }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      status: e.target.value
                    })}
                  >
                    <option value = "Ongoing">
                      Ongoing
                    </option>
                    <option value = "Completed">
                      Completed
                    </option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Image URI
                  </FormLabel>
                  <Input
                    type = "url"
                    placeholder = 'https://cdn.myanimelist.net/images/about_me/ranking_items/13574129-c6405ff4-016d-47d8-96cb-d129d4661d32.jpg'
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    isRequired
                    value = { drawerFormState.imageURI }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      imageURI: e.target.value
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Synopsis
                  </FormLabel>
                  <Textarea
                    placeholder = "It follows the adventures of a teenager Ichigo Kurosaki, who inherits his parents' destiny after he obtains the powers of a Soul Reaper—a death personification similar to the Grim Reaper—from another Soul Reaper, Rukia Kuchiki."
                    bg = "#25262B"
                    border = "1px"
                    borderColor = "#383a40"
                    resize = "none"
                    isRequired
                    value = { drawerFormState.synopsis }
                    onChange = {(e) => setDrawerFormState({
                      ...drawerFormState,
                      synopsis: e.target.value
                    })}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button 
                bg = "#E6613E"
                color = "white"
                _hover = {{
                  bg: "#d44f2e"
                }}
                mr = { 3 }
                type = "submit"
              >
                Update
              </Button>
              <Button 
                bg = "white"
                color = "black"
                _hover = {{
                  bg: "#e6e6e6"
                }}
                onClick = { onClose }
              >
                  Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
      <Modal
        initialFocusRef = {modalInitialRef}
        finalFocusRef = {modalFinalRef}
        isOpen = { modal.isOpen }
        onClose = { modal.onClose }
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg = "#1A1B1E"
          boxShadow = "lg"
          border = "1px"
          borderColor = "#383a40"
          color = "white"
        >
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Are you sure you want to delete this anime entry?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              bg = "#E6613E"
              color = "white"
              _hover = {{
                bg: "#d44f2e"
              }}
              mr = { 3 }
              onClick = { handleDeleteAnime }
            >
              Delete
            </Button>
            <Button
              bg = "white"
              color = "black"
              _hover = {{
                bg: "#e6e6e6"
              }}
              onClick = { modal.onClose }
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  )
}
export default SelectedAnime;
