import { 
    Button, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    useToast
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useDeleteAnimeMutation } from '../../../redux/services/animeService';
import { useNavigate } from 'react-router-dom';
import { AnimeMutationModalProps } from '../../../interfaces';

const AnimeMutationModal = ({ 
    animeId,
    isOpen,
    onClose,
    refetch
}: AnimeMutationModalProps) => {
    const initalFocusRef = useRef(null);
    const finalFocusRef = useRef(null);
    const [ deleteAnime ] = useDeleteAnimeMutation();
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

    const handleDeleteAnime = async () => {
        try {
            await deleteAnime({ animeId: animeId  }).unwrap();
            showToast("Anime deleted", "success");
            navigate("/")
            onClose();
            refetch!();
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

    const handleSubmit = async () => {
        await handleDeleteAnime();
    };

    return (
        <Modal
            initialFocusRef = { initalFocusRef }
            finalFocusRef = { finalFocusRef }
            isOpen = { isOpen }
            onClose = { onClose }
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
                <ModalHeader>
                    Delete Anime
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb = {6}>
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
                        onClick = { handleSubmit }
                    >
                        Delete
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
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default AnimeMutationModal;