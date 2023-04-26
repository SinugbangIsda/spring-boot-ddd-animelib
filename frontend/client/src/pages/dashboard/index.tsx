import React, { 
  useState,
  useEffect
} from 'react';
import AppLayout from '../../components/applayout';
import { Link } from 'react-router-dom';
import AnimeCard from '../../components/anime/animecard';
import { 
  Anime,
  User
} from '../../interfaces';
import { useGetAllAnimeQuery } from '../../redux/services/animeService';
import { 
  Button, 
  Flex, 
  FormControl,
  Input, 
  InputGroup, 
  InputRightElement, 
  SimpleGrid, 
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getUserAndToken } from '../../redux/slices/authSlice';
import AnimeMutationDrawer from '../../components/anime/drawer';

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
  const [ drawerFormState, setDrawerFormState ] = useState<Anime>(INITIAL_FORM_STATE_DRAWER);
  const [ anime, setAnime ] = useState<Anime[]>([]);
  const [ query, setQuery ] = useState<string>("");
  const { data, isLoading, isError, refetch } = useGetAllAnimeQuery({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = getUserAndToken();
  const userData: User = JSON.parse(user as string);

  useEffect(() => {
    if (data) {
      setAnime(data);
    }
  }, [ data ]);

  useEffect(() => {
    refetch();
  }, [ refetch ]);

  const filteredAnime = anime.filter((anime: Anime) => {
    return anime.title?.toLowerCase().includes(query.toLowerCase());
  });

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
              mr = {{ base: 0, sm: 4 }}
              mb = {{ base: 4, sm: 0 }}
            >
              <InputGroup width = {{ base: "full", md: "xs"}}>
                <Input 
                  type = "text"
                  placeholder = "Search Anime"
                  bg = "#25262B"
                  border = "1px"
                  borderColor = "#383a40"
                  value = { query }
                  onChange = {(e) => setQuery(e.target.value)}
                />
                <InputRightElement>
                  <SearchIcon 
                    css = {{
                      "WebkitUserSelect": "none",
                      "msUserSelect": "none",
                      "userSelectg": "none",
                    }}
                  />
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
            { filteredAnime.map((anime: Anime) => (
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
        header = "Add Anime"
        refetch = { refetch }
      />
    </>
  )
}

export default Dashboard;