import React, { 
    useEffect, 
    useRef, 
    useState 
} from 'react';
import { 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    FormControl, 
    FormLabel, 
    Input, 
    NumberDecrementStepper, 
    NumberIncrementStepper, 
    NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
    Select, 
    Stack, 
    Textarea, 
    useToast
} from "@chakra-ui/react";
import genres from "../../../assets/data/genres.json";
import types from "../../../assets/data/types.json";
import statuses from "../../../assets/data/statuses.json";
import { 
    Anime, 
    AnimeMutationDrawerProps 
} from '../../../interfaces';
import { 
    useCreateAnimeMutation, 
    useUpdateAnimeMutation 
} from '../../../redux/services/animeService';

const INITIAL_FORM_STATE: Anime = {
    title: "",
    altTitle: "",
    type: "",
    genre: "",
    status: "",
    episodes: 0,
    imageURI: "",
    synopsis: "",
};

const AnimeMutationDrawer = ({ 
    header,
    data,
    refetch,
    isOpen,
    onClose
}: AnimeMutationDrawerProps ) => {
    const [ formValues, setFormValues ] = useState<Anime>(INITIAL_FORM_STATE);
    const [ updateAnime ] = useUpdateAnimeMutation();
    const [ addAnime ] = useCreateAnimeMutation();
    const toast = useToast();
    const initialFocusRef = useRef(null);
    const finalFocusRef = useRef(null);

    const showToast = (title: string, status: "error"| "info" | "success"| "loading") => {
        toast({
          title: title,
          status: status,
          duration: 3000,
          isClosable: true
        });
    };

    const handleUpdateAnime = async () => {
        try {
          await updateAnime(formValues)
          .unwrap()
          .then(() => refetch());
          showToast("Anime updated", "success");
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

    const handleAddAnime = async () => {
        try {
          await addAnime(formValues).unwrap();
          showToast("Anime added to watchlist", "success");
          refetch();
          onClose();
          setFormValues(INITIAL_FORM_STATE);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       switch (header) {
            case "Add Anime":
                handleAddAnime();
                break;
            case "Edit Anime":
                handleUpdateAnime();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setFormValues(data);
    }, [ data ]);

    return (
        <Drawer
            initialFocusRef = { initialFocusRef }
            finalFocusRef = { finalFocusRef }
            isOpen = { isOpen }
            onClose = { onClose }
        >
            <DrawerOverlay />
            <form onSubmit = {(e) => handleSubmit(e)}>
                <DrawerContent
                    bg = "#1A1B1E"
                    boxShadow = "lg"
                    border = "1px"
                    borderColor = "#383a40"
                    color = "white"
                >
                    <DrawerHeader>
                        { header }
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
                                    ref = { initialFocusRef } 
                                    placeholder = 'Bleach' 
                                    bg = "#25262B"
                                    border = "1px"
                                    borderColor = "#383a40"
                                    isRequired
                                    value = { formValues.title }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
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
                                    value = { formValues.altTitle }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
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
                                    value = { formValues.type }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
                                        type: e.target.value
                                    })}
                                >
                                    { types.map(({ value }) => (
                                        <option key = { value } value = { value }>
                                            { value }
                                        </option>
                                    ))}
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
                                    value = { formValues.genre }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
                                        genre: e.target.value
                                    })}
                                >
                                    { genres.map(({ value }) => (
                                        <option key = { value } value = { value }>
                                            { value }
                                        </option>
                                    ))}
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
                                    value = { formValues.episodes }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
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
                                    value = { formValues.status }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
                                        status: e.target.value
                                    })}
                                >
                                    { statuses.map(({ value }) => (
                                        <option key = { value } value = { value }>
                                            { value }
                                        </option>
                                    ))}
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
                                    value = { formValues.imageURI }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
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
                                    value = { formValues.synopsis }
                                    onChange = {(e) => setFormValues({
                                        ...formValues,
                                        synopsis: e.target.value
                                    })}
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
                            { header === "Add Anime" ? "Add" : "Update"}
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
    )
};

export default AnimeMutationDrawer;