import React, { 
  useState,
  useEffect,
  useRef
} from 'react';
import AppLayout from '../../components/applayout';
import { Link } from 'react-router-dom';
import AnimeCard from '../../components/animecard';
import { 
  Anime, 
  SearchAnimeQuery, 
  User
} from '../../interfaces';
import { 
  useGetAllAnimeQuery,
  useCreateAnimeMutation
} from '../../redux/services/animeService';
import { 
  Button, 
  Flex, 
  FormControl,
  Input, 
  InputGroup, 
  InputRightElement, 
  SimpleGrid, 
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  DrawerContent,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Select,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { getUserAndToken } from '../../redux/slices/authSlice';

const INITIAL_FORM_STATE_SEARCH: SearchAnimeQuery = {
  query: ""
};

const INITIAL_FORM_STATE_DRAWER: Anime = {
  id: null,
  title: "",
  altTitle: "",
  type: "",
  episodes: 0,
  genre: "",
  synopsis: "",
  imageURI: "",
  status: ""
};

const Dashboard = () => {
  const [ searchFormState, setSearchFormState ] = useState<SearchAnimeQuery>(INITIAL_FORM_STATE_SEARCH);
  const [ drawerFormState, setDrawerFormState ] = useState<Anime>(INITIAL_FORM_STATE_DRAWER);
  const [ addAnime ] = useCreateAnimeMutation();
  const [ anime, setAnime ] = useState<Anime[]>([]);
  const { data, isLoading, isError, refetch } = useGetAllAnimeQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = getUserAndToken();
  const userData: User = JSON.parse(user as string);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (data) {
      setAnime(data);
    }
  }, [ data ]);

  const showToast = (title: string, status: "error"| "info" | "success"| "loading") => {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true
    });
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddAnime();
    onClose();
  };

  const handleAddAnime = async () => {
    try {
      await addAnime(drawerFormState);
      showToast("Anime added to watchlist", "success");
      refetch();
    } catch(err: any) {
      if (!err.originalStatus) {
        showToast("Network Error", "error");
      } else if (err.originalStatus === 400) {
        showToast("Bad Request", "error");
      } else if (err.originalStatus === 401) {
        showToast("Unauthorized", "error");
      } else if (err.originalStatus === 500) {
        showToast("This anime has already been added to your watchlist", "error");
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
        >
          <Flex
            justify = "center"
            direction = {{ base: 'column', sm: 'row' }}
          >
            <FormControl 
              id = "search" 
              color = "white"
            >
              <InputGroup width = {{ base: "full", md: "xs"}}>
                <Input 
                  type = "text"
                  placeholder = "Search Anime"
                  bg = "#25262B"
                  border = "1px"
                  borderColor = "#383a40"
                  value = { searchFormState.query }
                  onChange = {(e) => setSearchFormState({
                    ...searchFormState,
                    query: e.target.value
                  })}
                />
                <InputRightElement>
                  <Button
                    variant = "ghost"
                    _hover={{ bg: 'gray.700' }}
                    onClick = {() =>
                      console.log("Searching: " + searchFormState.query)
                    }
                  >
                    <SearchIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            { userData.role === "admin" && (
              <Button
                bg = "#E6613E"
                color = "white"
                _hover = {{
                  bg: "#d44f2e"
                }}
                onClick = { onOpen }
              >
                Add Anime
              </Button>
            )}
          </Flex>
          <SimpleGrid columns = {{ sm: 2, md: 3, lg: 4, xl: 5 }}> 
            { anime.map((anime: Anime) => (
              <Link
                key = { anime.id }
                to = { `/anime/${anime.id}` }
              >
                <AnimeCard
                  id = { anime.id }
                  title = { anime.title }
                  type = { anime.type }
                  imageURI = { anime.imageURI }
                />
              </Link>
            ))}
          </SimpleGrid>
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
            Add Anime Entry
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
              Save
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
    </>
  )
}

export default Dashboard;