import React, { useEffect, useState } from 'react';
import { 
  useNavigate, 
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
  Box,
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
          w = "full"
          h = "full"
          color = "white"
        >
          <Stack
            position = "absolute"
            w = "full"
            zIndex = "1"
          >
            <Box 
              position = "absolute"
              bgGradient = "linear(to-r, black, transparent)"
              w = "full"
              h = "23em"
            />
            <Stack
              position = "absolute"
              spacing = { 4 }
              p = { 4 }
              w = "full"
            >
              <Stack>
                <Flex 
                  align = "center"
                  justify = "space-between"
                >
                  <Flex
                    onClick = {() => navigate(-1)}
                    _hover = {{
                      "textDecoration": "underline"
                    }}
                  >
                    <IoIosArrowRoundBack size = "1.5em" />
                    <Text fontSize = "lg">
                      Back
                    </Text>
                  </Flex>
                  { userData.role === "admin" && (
                    <Menu>
                      <MenuButton 
                        as = { IconButton } 
                        bg = "#5f5e60"
                        size = "sm"
                        _hover = {{
                          bg: "#444345"
                        }}
                        _active = {{
                          bg: "#444345"
                        }}
                      >
                        <SettingsIcon />
                      </MenuButton>
                      <MenuList
                        bg = "#1A1B1E"
                        border = "1px"
                        borderColor = "#383a40"
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
              </Stack>
              <Stack>
                <Flex 
                  direction = {{ base: 'column', sm: 'row' }}
                  align = {{ base: "center", md: "flex-start" }}
                  textAlign = {{ base: "center", sm: "left" }}
                >
                  <Image
                    src = { animeData.data?.imageURI }
                    alt = { animeData.data?.title }
                    w = "13em"
                    h = "17em"
                    objectFit = "cover"
                    mr = { 4 }
                  />
                  <Stack
                    letterSpacing = "widest"
                    spacing = { 2 }
                  >
                    <Text
                      fontSize = "3xl"
                      fontWeight = "bold"
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
                    <Button
                      bg = { checkIfAnimeAdded.data ?  "#797979" : "#E6613E"  }
                      color = "white"
                      _hover = {{
                        bg: checkIfAnimeAdded.data ? "#4f4f4f" : "#d44f2e"
                      }}
                      w = {{ base: "full", sm: "14em" }}
                      h = "4em"
                      p = { 6 }
                      fontSize = "sm"
                      onClick = { checkIfAnimeAdded.data ? handleRemoveFromWatchlist : handleAddToWatchlist }
                    >
                      { checkIfAnimeAdded.data ? "Remove from" : "Add to" } watchlist
                    </Button>
                  </Stack>
                </Flex>
              </Stack>
              <Stack>
                <Text
                  fontSize = "2xl"
                  fontWeight = "bold"
                  mt = { 4}
                >
                  Synopsis
                </Text>
                <Divider />
                <Text>
                  { animeData.data?.synopsis }
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            h = "full"
            w = "full"
            zIndex = "0"
            top = "-2"
            position = "relative" 
          >
            <Image 
              w = "full"
              h = "23em"
              src = { animeData.data?.imageURI }
              alt = { animeData.data?.title }
              opacity = { 0.4 }
              objectFit = "cover" 
            />
          </Stack>
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