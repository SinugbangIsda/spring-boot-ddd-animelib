import React, { 
  useEffect, 
  useState 
} from 'react';
import AppLayout from '../../components/applayout';
import { Link } from 'react-router-dom';
import AnimeCard from '../../components/anime/animecard';
import { 
  Anime,
  User
} from '../../interfaces';
import { SearchIcon } from '@chakra-ui/icons';
import { 
  Stack, 
  FormControl, 
  InputGroup, 
  Input, 
  InputRightElement, 
  SimpleGrid, 
} from '@chakra-ui/react';
import { useGetAllWatchlistByUserIdQuery } from '../../redux/services/watchlistService';
import { getUserAndToken } from '../../redux/slices/authSlice';

const Watchlist = () => {
  const [ anime, setAnime ] = useState<Anime[]>([]);
  const [ query, setQuery ] = useState<string>("");
  const { user } = getUserAndToken();
  const userData: User = JSON.parse(user as string);
  const { data, isLoading, isError, refetch } = useGetAllWatchlistByUserIdQuery({
    userId: userData.id!
  });

  useEffect(() => {
    if (data) {
      setAnime(data);
    };
  }, [ data ]);

  useEffect(() => {
    refetch();
  }, [ refetch ]);

  const filteredAnime = anime.filter((anime: Anime) => {
    return anime.title?.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <AppLayout>
      <Stack 
        spacing = { 4 }
        p = { 4 }
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
        <SimpleGrid
          columns = {{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing = {{ sm: 2, md: 4 }}
        >
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
  )
}

export default Watchlist;
