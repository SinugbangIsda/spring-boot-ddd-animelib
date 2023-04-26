import React, { 
  useState,
  useEffect,
  useRef
} from 'react';
import AppLayout from '../../components/applayout';
import { Link } from 'react-router-dom';
import AnimeCard from '../../components/anime/animecard';
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
import { getUserAndToken } from '../../redux/slices/authSlice';
import AnimeMutationDrawer from '../../components/anime/drawer';

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
  const [ anime, setAnime ] = useState<Anime[]>([]);
  const { data, isLoading, isError, refetch } = useGetAllAnimeQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = getUserAndToken();
  const userData: User = JSON.parse(user as string);
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
      <AnimeMutationDrawer
        isOpen = { isOpen }
        onClose = { onClose }
        data = { drawerFormState }
        header = "Edit Anime"
        refetch = { refetch }
      />
    </>
  )
}

export default Dashboard;