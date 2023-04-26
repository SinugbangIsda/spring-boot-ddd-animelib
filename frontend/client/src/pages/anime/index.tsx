import React, { useEffect, useState } from 'react';
import { 
  Link, 
  useParams 
} from "react-router-dom";
import AppLayout from '../../components/applayout';
import { IoIosArrowRoundBack } from "react-icons/all";
import { 
  Anime, 
  User 
} from '../../interfaces';
import { useCreateWatchlistMutation, useDeleteWatchlistMutation } from '../../redux/services/watchlistService';
import { 
  useGetAnimeByIdQuery, 
  useCheckIfAnimeInWatchlistQuery 
} from '../../redux/services/animeService';
import { getUserAndToken } from '../../redux/slices/authSlice';
import { 
  Button, 
  Divider, 
  Flex, 
  IconButton, 
  Image, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  Stack, 
  Text, 
  useDisclosure, 
  useToast 
} from '@chakra-ui/react';
import { 
  DeleteIcon, 
  EditIcon, 
  SettingsIcon 
} from '@chakra-ui/icons';
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
  const animeData = useGetAnimeByIdQuery({ animeId: id });
  const checkIfAnimeAdded = useCheckIfAnimeInWatchlistQuery({ userId: userData.id, animeId: id });
  const [ removeFromWatchlist ] = useDeleteWatchlistMutation();
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
    if (animeData.data) {
      setDrawerFormState(animeData.data);
    }
  }, [animeData.data]);

  const handleAddToWatchlist = async () => {
    try { 
      await addToWatchlist({ userId: userData.id, animeId: id });
        showToast("Added to watchlist", "success");
        checkIfAnimeAdded.refetch();
    } catch(err: any) {
      if (!err.originalStatus) {
        showToast("No Server Response", "error");
      } else if (err.originalStatus === 401) {
        showToast("Unauthorized", "error");
      } else {
        showToast("Something went wrong", "error");
      }
    }
  };
  
  const handleRemoveFromWatchlist = async () => {
    try {
      await removeFromWatchlist({ userId: userData.id, animeId: id });
      showToast("Removed from watchlist", "success");
      checkIfAnimeAdded.refetch();
    } catch(err: any) {
      if (!err.originalStatus) {
        showToast("No Server Response", "error");
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
          <Flex 
            color = "white"
            align = "center"
            justify = "space-between"
          >
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
          <Flex 
            direction = {{ base: 'column', sm: 'row' }}
            align = {{ base: "center", md: "flex-start" }}
            textAlign = {{ base: "center", sm: "left" }}
          >
            <Image
              src = { animeData.data?.imageURI }
              alt = { animeData.data?.title }
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
                { animeData.data?.title }
              </Text>
              <Text
                fontSize = "lg"
                as = "i"
              >
                { animeData.data?.altTitle }
              </Text>
              <Text>
                Type: { animeData.data?.type }
              </Text>
              <Text>
                Genre: { animeData.data?.genre }
              </Text>
              <Text>
                Status: { animeData.data?.status }
              </Text>
              <Text>
                Episodes: { animeData.data?.episodes }
              </Text>
            </Flex>
          </Flex>
          <Stack
            w = {{ base: "100%", md: "11em" }}
          >
            <Button
              bg = { checkIfAnimeAdded.data ?  "gray.400" : "#d44f2e"  }
              color = { checkIfAnimeAdded.data ? "gray.700" : "white" }
              _hover = {{
                bg: checkIfAnimeAdded.data ? "#25262b" : "#d44f2e"
              }}
              fontSize = "sm"
              onClick = { checkIfAnimeAdded.data ? handleRemoveFromWatchlist : handleAddToWatchlist }
              mr = { 2 }
            >
              { checkIfAnimeAdded.data ? "Remove from" : "Add to" } watchlist
            </Button>
          </Stack>
          <Text
            fontSize = "2xl"
            as = "h1"
            fontWeight = "bold"
          >
            Synopsis
          </Text>
          <Divider />
          <Text>
            { animeData.data?.synopsis }
          </Text>
        </Stack>
      </AppLayout>
      <AnimeMutationDrawer
        isOpen = { drawer.isOpen }
        onClose = { drawer.onClose }
        data = { drawerFormState }
        header = "Edit Anime"
        refetch = { animeData.refetch }
      />
      <AnimeMutationModal
        isOpen = { modal.isOpen }
        onClose = { modal.onClose }
        header = "Delete Anime"
        animeId = { id }
        refetch = { animeData.refetch }
      />
    </>
  )
}
export default SelectedAnime;